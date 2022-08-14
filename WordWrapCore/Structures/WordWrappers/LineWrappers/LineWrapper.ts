import { ILineWrapper } from './ILineWrapper';
import { OverflowFinder } from '../../Overflow/OverflowFinders/OverflowFinder';
import { IWordWrapArgs } from '../WordWrapArgs/IWordWrapArgs';
import { emptyString, singleNewline } from '../../../Shared/_Strings';
import { IOverflowFindArgs } from '../../Overflow/OverflowFinders/IOverflowFindArgs';
import { UnderflowCascader } from '../UnderflowCascader';
import { IUnderflowCascadeArgs } from '../IUnderflowCascadeArgs';
import { italicsMarkers, boldMarkers } from '../../../Shared/_Regexes';

export class LineWrapper implements ILineWrapper
{
    protected overflowFinder: OverflowFinder;
    protected underflowCascader: UnderflowCascader;

    WrapIntoLines(args: IWordWrapArgs, actualTextToWrap: string): string[] 
    {
        actualTextToWrap += emptyString; // In case the orig was a non-string
        let lines: string[] = this.WithNormalLineWrapping(args, actualTextToWrap);

        if (this.ShouldApplyCascadingUnderflowTo(lines))
            lines = this.ApplyCUTo(lines, args);
        
        return lines;
    }

    protected WithNormalLineWrapping(args: IWordWrapArgs, actualTextToWrap: string)
    {
        let lines: string[] = [];
        let words: string[] = actualTextToWrap.split(this.WordSeparator);
        let currentLine: string = emptyString;
        let overflowFindArgs = this.CreateOverflowFindArgs();
        overflowFindArgs.fullTextHasBoldOrItalics = this.HasBoldOrItalicMarkers(actualTextToWrap);

        for (const currentWord of words)
        {
            // "currentWord" would be a bit misleading for when the text is like Japanese or 
            // Chinese, where there's no designated character to separate words... but hey.
            this.Update(overflowFindArgs, args, currentWord, currentLine);

            let thereIsOverflow = this.overflowFinder.Find(overflowFindArgs);
            let foundLineBreak = this.IsLineBreak(currentWord);
            
            if (thereIsOverflow || foundLineBreak)
            {
                lines.push(currentLine.trim()); // Make sure not to include any extra spaces
                currentLine = emptyString;
            }

            if (foundLineBreak) // We don't want any line break codes added to the next line
                continue;

            currentLine += currentWord + this.WordSeparator;
        }

        // The last line is always left out by the above loop, so...
        lines.push(currentLine.trim());

        return lines;
    }

    protected CreateOverflowFindArgs(): IOverflowFindArgs
    {
        let args: IOverflowFindArgs = 
        {
            word: "",
            line: "",
            wordWrapArgs: null,
            fullTextHasBoldOrItalics: false,
        };

        return args;
    }

    protected HasBoldOrItalicMarkers(text: string)
    {
        return text.match(boldMarkers) != null || text.match(italicsMarkers) != null;
    }

    protected get WordSeparator(): string { return CGT.WWCore.Params.WordSeparator; }

    protected Update(overflowFindArgs: IOverflowFindArgs, wordWrapArgs: IWordWrapArgs, word: string, line: string)
    {
        overflowFindArgs.word = word;
        overflowFindArgs.line = line;
        overflowFindArgs.wordWrapArgs = wordWrapArgs;
    }

    IsLineBreak(text: string): boolean
    {
        // If the pre-rule for replacing LB tags with newlines works right, each newline
        // should be separated from the rest of the text as its own word 
        // (or "word" in the case of langs like jp or cn)
        return text == singleNewline;
    }

    get LineBreakMarkers(): string[] { return CGT.WWCore.Params.LineBreakMarkers; }

    /** Call every time you finish a word-wrapping session. */
    OnWrapJobFinished()
    {
        this.overflowFinder.OnWrapJobFinished();
    }

    protected ShouldApplyCascadingUnderflowTo(lines: string[]): boolean
    {
        let moreThanOneLine = lines.length > 1;
        let userEnabledIt = CGT.WWCore.Params.CascadingUnderflow == true;
        let cascaderIsThere = this.underflowCascader != null;
        // ^It might not be if the user's using older versions of the specific wrappers
        return moreThanOneLine && userEnabledIt && cascaderIsThere;
    }

    protected ApplyCUTo(lines: string[], args: IWordWrapArgs)
    {
        let cascaderArgs: IUnderflowCascadeArgs = 
        {
            textField: args.textField,
            lines: lines,
            focusedLineIndex: 1, // We treat the first line as the base, so we have to start from the second
            spacing: args.spacing,
        };

        lines = this.underflowCascader.WithCascadingOverflow(cascaderArgs);
        return lines;
    }


}