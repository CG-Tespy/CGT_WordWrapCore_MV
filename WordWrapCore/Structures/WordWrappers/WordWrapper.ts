import { IWordWrapper } from './IWordWrapper';
import { emptyString, singleNewline } from '../../Shared/_Strings';
import { WordPerLineMin } from '../WrapRules/PostRules/WordPerLineMin';
import { ParenthesisAlignment } from '../WrapRules/PostRules/ParenthesisAlignment';
import { IWordWrapArgs } from './WordWrapArgs/IWordWrapArgs';
import { IWordWrapArgValidator, WordWrapArgValidator } from './WordWrapArgs/WordWrapArgValidator';
import { WrapRuleApplier } from '../WrapRules/WrapRuleApplier';
import { WithoutExtraSpaces } from '../WrapRules/PreRules/WithoutExtraSpaces';
import { WithoutBaseNewlines } from '../WrapRules/PreRules/WithoutBaseNewlines';
import { LineWrapper } from './LineWrappers/LineWrapper';
import { noWrapTag as noWrapTag } from '../../Shared/_Regexes';
import { NametagFetcher } from './NametagFetcher';

/** 
 * Encapsulates an algorithm for doing word-wrapping. 
 * Best create instances of this class, passing it the LineWrapper
 * you want it to use.
 * */
export class WordWrapper implements IWordWrapper
{
    get WrapCode(): string { return this.wrapCode; }
    private wrapCode: string = emptyString;
    set WrapCode(value) { this.wrapCode = value; }

    Wrap(args: IWordWrapArgs): string
    {
        this.argValidator.Validate(args);

        let shouldFetchFromCache: boolean = this.HasAlreadyWrapped(args.rawTextToWrap);
        let getOutput = this.wrapResultFetchers.get(shouldFetchFromCache);

        return getOutput(args);
    }

    protected argValidator: IWordWrapArgValidator = new WordWrapArgValidator();

    protected HasAlreadyWrapped(text: string): boolean
    {
        return this.wrapResults.has(text);
    }

    /** 
     * This is a cache maintained to minimize the string garbage we generate, by fetching
     * previous results for inputs the wrapper already worked with.
     */
    protected wrapResults: Map<string, string> = new Map<string, string>();

    /** 
     * Wrappers do their thing two ways: by either going through a conversion process,
     * or fetching from a cache said process maintains.
     * This is a map containing the methods that do those two things, with the key
     * being whether or not the input has already been wrapped.
    */
    protected wrapResultFetchers: Map<boolean, Function> = new Map<boolean, Function>();

    constructor(protected lineWrapper?: LineWrapper) 
    {
        this.InitSubmodules();
    }

    protected InitSubmodules()
    {
        this.InitRuleApplier();
        this.InitWrapResultFetchers();
    }

    protected InitRuleApplier()
    {
        // The order of these rules matter
        this.ruleApplier.RegisterPreRule(new WithoutBaseNewlines());
        this.ruleApplier.RegisterPreRule(new WithoutExtraSpaces());

        this.ruleApplier.RegisterPostRule(new WordPerLineMin());
        this.ruleApplier.RegisterPostRule(new ParenthesisAlignment());
    }

    protected InitWrapResultFetchers()
    {
        let inputAlreadyWrapped = true;

        this.wrapResultFetchers.set(inputAlreadyWrapped, this.ReturnFromCache.bind(this));
        this.wrapResultFetchers.set(!inputAlreadyWrapped, this.ApplyWrapOperations.bind(this));
    }

    protected ReturnFromCache(args: IWordWrapArgs): string
    {
        return this.wrapResults.get(args.rawTextToWrap);
    }

    protected ApplyWrapOperations(args: IWordWrapArgs): string
    {
        let originalText: string = args.rawTextToWrap; 
        // ^Used as a key for caching the result when this is done
        let result = emptyString;

        if (this.ShouldWrap(originalText))
        {
            let beforeLineWrapping = this.ruleApplier.ApplyPreRulesTo(originalText);
            let nametag = this.nametagFetcher.FetchFrom(beforeLineWrapping);
            let dialogueOnly = beforeLineWrapping.replace(nametag, emptyString);
            dialogueOnly = dialogueOnly.trim(); 
            // ^For when there are any extra spaces left over from extracting the
            // nametag
            nametag = this.WithNewlineAsNeeded(nametag);

            let wrappedLines = this.lineWrapper.WrapIntoLines(args, dialogueOnly);
            wrappedLines = this.ruleApplier.ApplyPostRulesTo(wrappedLines);

            result = nametag + wrappedLines.join(singleNewline);
        }
        else
        {
            result = this.WithoutTag(noWrapTag, originalText);
        }
        
        this.RegisterAsWrapped(originalText, result);
        this.lineWrapper.OnWrapJobFinished();
        return result;
    }

    protected ShouldWrap(text: string)
    {
        return text.match(noWrapTag) == null;
    }

    private nametagFetcher: NametagFetcher = new NametagFetcher();

    protected WithoutTag(tagRegex: RegExp, text: string)
    {
        return text.replace(tagRegex, emptyString);
    }
 
    protected WithNewlineAsNeeded(nametag: string): string
    {
        if (nametag.length > 0)
            nametag += singleNewline;
        
        return nametag;
    }

    protected ruleApplier: WrapRuleApplier = new WrapRuleApplier();

    protected RegisterAsWrapped(originalInput: string, wrappedOutput: string): void
    {
        this.wrapResults.set(originalInput, wrappedOutput);
    }

    // @ts-ignore
    get LineWrapper(): LineWrapper { return this.lineWrapper; }

}