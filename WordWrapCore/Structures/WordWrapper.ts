import { IWordWrapper } from './IWordWrapper';
import { singleSpace, emptyString, singleNewline } from '../Shared/_Strings';
import { newlines, doubleSpaces } from '../Shared/_Regexes';

/** 
 * Encapsulates an algorithm for doing word-wrapping. 
 * You're supposed to inherit from this class and override the hooks;
 * we're using the Template Method pattern here.
 * */
export class WordWrapper implements IWordWrapper
{
    get WrapCode(): string { return ""; }

    Wrap(textField: Bitmap, text: string): string
    {
        this.EnsureTextFieldValidity(textField);
        this.EnsureTextValidity(text);

        text = this.PrepareForWrapping(text);
        let nametag = this.GetNametagFrom(text);
        let withoutNametag = text.replace(nametag, emptyString);
        withoutNametag = withoutNametag.trim(); 
        // ^For when there are any extra spaces left over from extracting the
        // nametag
        nametag = this.WithNewlineAsNeeded(nametag);

        let lines = this.AsWrappedLines(textField, withoutNametag);
        lines = this.ApplyLineMinWordCount(lines);
        lines = this.ApplyParenthesisAlignment(lines);

        let result = nametag + lines.join(singleNewline);
        
        return result;
    }

    protected EnsureTextFieldValidity(textField: Bitmap)
    {
        if (textField == null)
            throw 'Cannot wrap for a null bitmap/text field!';
    }

    protected EnsureTextValidity(text: string)
    {
        if (text == null)
            throw "Cannot wrap null text!";
    }

    /**
     * For when you need to make any alterations to the text before wrapping it.
     * @param text 
     */
    protected PrepareForWrapping(text: string): string
    {
        // By default, we want to ensure a couple things here:
        // 1. All spaces follow proper English grammar
        // 2. This strategy decides where newlines go
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
    protected AsWrappedLines(textField: Bitmap, text: string): string[]
    {
        throw subclassImplementationAlert;
    }

    protected WouldCauseOverflow(currentWord: string, currentLine: string): boolean
    {
        throw subclassImplementationAlert;
    }

    /** Returns the lines with the min word count enforced. */
    ApplyLineMinWordCount(lines: string[])
    {
        let cannotApply = lines.length < 2;

        if (cannotApply)
            return lines;

        lines = lines.slice(); // So we don't modify the original input

        let lastLineWords = lines[lines.length - 1].split(singleSpace);
        let secondToLastLineWords = lines[lines.length - 2].split(singleSpace);

        let lastLineNeedsMore = lastLineWords.length < this.LineMinWordCount;
        let secondToLastDoesNot = secondToLastLineWords.length > this.LineMinWordCount;

        while (lastLineNeedsMore && secondToLastDoesNot)
        {
            let wordToMove = secondToLastLineWords.pop();
            lastLineWords.unshift(wordToMove);

            lastLineNeedsMore = lastLineWords.length < this.LineMinWordCount;
            secondToLastDoesNot = secondToLastLineWords.length > this.LineMinWordCount;
        }

        lines[lines.length - 1] = lastLineWords.join(singleSpace);
        lines[lines.length - 2] = secondToLastLineWords.join(singleSpace);

        return lines;

    }

    get LineMinWordCount(): number { return CGT.WWCore.Params.LineMinWordCount; }

    ApplyParenthesisAlignment(lines: string[])
    {
        let cannotApply = lines.length < 2 || !this.ShouldAlignWithParentheses;
        if (cannotApply)
            return lines;

        lines = lines.slice(); // Using a copy to avoid changing the input

        // Find the first line that starts with a parenthesis
        let startsWithParenthesis = "";
        let firstParenIndex = 0;
        for (let i = 0; i < lines.length; i++)
        {
            let lineEl = lines[i];
            if (lineEl[0] === "(")
            {
                startsWithParenthesis = lineEl;
                firstParenIndex = i;
                break;
            }
        }

        let nothingFound = startsWithParenthesis == "";
        let foundAtLastLine = firstParenIndex === lines.length - 1;
        if (nothingFound || foundAtLastLine)
            return lines;

        // Apply the leading spaces as appropriate
        for (let i = firstParenIndex + 1; i < lines.length; i++)
        {
            let lineAfter = lines[i];
            lineAfter = " " + lineAfter;
            lines[i] = lineAfter;

            let endsWithClosingParenthesis = lineAfter[lineAfter.length - 1] === ")";
            if (endsWithClosingParenthesis)
                break;
        }

        return lines;

    }

    get ShouldAlignWithParentheses(): boolean { return CGT.WWCore.Params.ParenthesesAlignment; }

    constructor(overflowFinder?: IOverflowFinder) {}

    get OverflowFinder() : IOverflowFinder { return this.overflowFinder; };
    private overflowFinder: IOverflowFinder;
    set OverflowFinder(value) { this.overflowFinder = value; }
    
}

type IOverflowFinder = CGT.WWCore.IOverflowFinder;

let subclassImplementationAlert = 'Must be implemented by subclass!';

