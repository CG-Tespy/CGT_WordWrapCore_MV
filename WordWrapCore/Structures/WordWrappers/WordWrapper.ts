import { IWordWrapper } from './IWordWrapper';
import { singleSpace, emptyString, singleNewline } from '../../Shared/_Strings';
import { newlines, doubleSpaces } from '../../Shared/_Regexes';
import { WrapRule } from '../WrapRules/WrapRule';
import { MinWordPerLineEnforcer } from '../WrapRules/MinWordPerLineEnforcer';
import { ParenthesisAlignmentEnforcer } from '../WrapRules/ParenthesisAlignmentEnforcer';
import { WordWrapArgs } from './WordWrapArgs/WordWrapArgs';
import { IWordWrapArgValidator, WordWrapArgValidator } from './WordWrapArgs/WordWrapArgValidator';

let ArrayEx = CGT.Core.Extensions.ArrayEx;

/** 
 * Encapsulates an algorithm for doing word-wrapping. 
 * You're supposed to inherit from this class and override the hooks;
 * we're using the Template Method pattern here.
 * */
export abstract class WordWrapper implements IWordWrapper
{
    get WrapCode(): string { return emptyString; }

    Wrap(args: WordWrapArgs): string
    {
        this.argValidator.Validate(args);
        let text = args.textToWrap;

        if (this.HasAlreadyWrapped(text)) 
            return this.WrapResultFor(text);

        let originalText: string = text.slice(); 
        // ^To register the input and output later in the cache, potentially saving work
        // later in runtime
        
        let alteredText = this.PreparedForWrapping(text);
        let nametag = this.GetNametagFrom(alteredText);
        let withoutNametag = alteredText.replace(nametag, emptyString);
        withoutNametag = withoutNametag.trim(); 
        // ^For when there are any extra spaces left over from extracting the
        // nametag
        nametag = this.WithNewlineAsNeeded(nametag);

        let wrappedLines = this.AsWrappedLines(args.textField, withoutNametag);
        wrappedLines = this.WithWrapRulesApplied(wrappedLines);

        let result = nametag + wrappedLines.join(singleNewline);
        
        this.RegisterAsWrapped(originalText, result);
        return result;
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

    protected WrapResultFor(text: string): string
    {
        this.EnsureWeAlreadyWrapped(text);
        return this.wrapResults.get(text);
    }

    protected EnsureWeAlreadyWrapped(text: string)
    {
        if (!this.HasAlreadyWrapped(text))
        {
            let message = `There is no wrap result for input: ${text}`;
            alert(message);
            throw new Error(message);
        }
    }

    /**
     * For when you need to make any alterations to the text before wrapping it.
     * @param text 
     */
    protected PreparedForWrapping(text: string): string
    {
        // By default, we want to ensure a couple things here:
        // 1. All spaces follow proper English grammar
        // 2. This wrapper decides where newlines go
        text = this.WithoutBaseNewlines(text);
        text = this.TrimExtraSpaces(text);

        return text;
    }

    protected WithoutBaseNewlines(text: string)
    {
        return text.replace(newlines, singleSpace);
    }

    protected TrimExtraSpaces(text: string)
    {
        return text.replace(doubleSpaces, singleSpace);
    }

    /**
     * Returns the first nametag found in the text, based on the formats
     * set in the params. If none is found, an empty string is returned.
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

        nametagsFound.push(emptyString); // So we return this when no matches were found

        return nametagsFound[0];
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

    /**
     * Wraps the (nametagless) text into a string array holding the lines.
     * @param text 
     */
    protected abstract AsWrappedLines(textField: Bitmap, text: string): string[]

    protected abstract WouldCauseOverflow(currentWord: string, currentLine: string): boolean

    get WrapRules(): WrapRule[] { return this.wrapRules.slice(); }
    // ^ We return a copy so clients can't modify them directly
    private wrapRules: WrapRule[] = [
        new MinWordPerLineEnforcer(),
        new ParenthesisAlignmentEnforcer(),
    ];

    protected WithWrapRulesApplied(lines: string[]): string[]
    {
        for (let rule of this.wrapRules)
        {
            lines = rule.AppliedTo(lines);
        }

        return lines;
    }

    constructor(private overflowFinder?: IOverflowFinder) {}

    get OverflowFinder() : IOverflowFinder { return this.overflowFinder; };
    set OverflowFinder(value) { this.overflowFinder = value; }

    protected RegisterAsWrapped(originalInput: string, output: string): void
    {
        this.wrapResults.set(originalInput, output);
    }

    RegisterWrapRule(newRule: WrapRule): void
    {
        if (!ArrayEx.Includes(this.wrapRules, newRule)) // Avoid duplicates
            this.wrapRules.push(newRule);
    }

    UnregisterWrapRule(rule: WrapRule): void
    {
        ArrayEx.Remove(this.wrapRules, rule);
    }
    
}

type IOverflowFinder = CGT.WWCore.IOverflowFinder;
