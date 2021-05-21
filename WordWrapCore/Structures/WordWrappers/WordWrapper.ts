import { IWordWrapper } from './IWordWrapper';
import { emptyString, singleNewline } from '../../Shared/_Strings';
import { WordPerLineMin } from '../WrapRules/PostRules/WordPerLineMin';
import { ParenthesisAlignment } from '../WrapRules/PostRules/ParenthesisAlignment';
import { IWordWrapArgs } from './WordWrapArgs/IWordWrapArgs';
import { IWordWrapArgValidator, WordWrapArgValidator } from './WordWrapArgs/WordWrapArgValidator';
import { WrapRuleApplier } from '../WrapRules/WrapRuleApplier';
import { WithoutExtraSpaces } from '../WrapRules/PreRules/WithoutExtraSpaces';
import { WithoutBaseNewlines } from '../WrapRules/PreRules/WithoutBaseNewlines';
import { ILineWrapper } from './LineWrappers/ILineWrapper';
import { OverflowFinder } from '../OverflowFinders/OverflowFinder';
import { LineWrapper } from './LineWrappers/LineWrapper';

type IOverflowFinder = CGT.WWCore.OverflowFinding.IOverflowFinder;

/** 
 * Encapsulates an algorithm for doing word-wrapping. 
 * You're supposed to inherit from this class and override the hooks;
 * we're using the Template Method pattern here.
 * */
export abstract class WordWrapper implements IWordWrapper
{
    get WrapCode(): string { return emptyString; }
    static get WrapCode(): string { return this.prototype.WrapCode; }

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

    constructor(private overflowFinder?: OverflowFinder) 
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

        this.wrapResultFetchers.set(inputAlreadyWrapped, this.ReturnFromCache);
        this.wrapResultFetchers.set(!inputAlreadyWrapped, this.ApplyWrapOperations);
    }

    protected ReturnFromCache(args: IWordWrapArgs): string
    {
        return this.wrapResults.get(args.rawTextToWrap);
    }

    protected ApplyWrapOperations(args: IWordWrapArgs): string
    {
        let originalText: string = args.rawTextToWrap; 
        // ^Used as a key for caching the result when this is done

        let beforeLineWrapping = this.ruleApplier.ApplyPreRulesTo(originalText);
        let nametag = this.GetNametagFrom(beforeLineWrapping);
        let dialogueOnly = beforeLineWrapping.replace(nametag, emptyString);
        dialogueOnly = dialogueOnly.trim(); 
        // ^For when there are any extra spaces left over from extracting the
        // nametag
        nametag = this.WithNewlineAsNeeded(nametag);

        let wrappedLines = this.lineWrapper.WrapIntoLines(args, dialogueOnly);
        wrappedLines = this.ruleApplier.ApplyPostRulesTo(wrappedLines);

        let result = nametag + wrappedLines.join(singleNewline);
        
        this.RegisterAsWrapped(originalText, result);
        this.OverflowFinder.Refresh();
        return result;
    }

    /**
     * Returns the first nametag found in the text, based on the formats
     * set in the params. If nothing is found, an empty string is returned.
     * @param text 
     */
    protected GetNametagFrom(text: string): string
    {
        let nametagsFound: RegExpMatchArray = [];

        for (const format of this.NametagFormats)
        {
            let matchesFound = text.match(format) || [];
            nametagsFound = nametagsFound.concat(matchesFound);
        }

        nametagsFound.push(emptyString); // For when no matches were found
        let firstMatch = 0;
        return nametagsFound[firstMatch];
    }
 
    get NametagFormats(): RegExp[] 
    { 
        // @ts-ignore
        return CGT.WWCore.Params.NametagFormats; 
    }
 
    protected WithNewlineAsNeeded(nametag: string): string
    {
        if (nametag.length > 0)
            nametag += singleNewline;
        
        return nametag;
    }

    protected lineWrapper: ILineWrapper = new LineWrapper();

    protected abstract WouldCauseOverflow(currentWord: string, currentLine: string): boolean

    protected ruleApplier: WrapRuleApplier = new WrapRuleApplier();

    get OverflowFinder(): OverflowFinder { return this.overflowFinder; };

    set OverflowFinder(value: OverflowFinder) { this.overflowFinder = value; }

    protected RegisterAsWrapped(originalInput: string, wrappedOutput: string): void
    {
        this.wrapResults.set(originalInput, wrappedOutput);
    }

}