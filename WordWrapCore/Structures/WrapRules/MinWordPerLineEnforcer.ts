import { WrapRule } from './WrapRule';
import { singleSpace } from '../../Shared/_Strings';

export class MinWordPerLineEnforcer extends WrapRule
{

    CanApplyTo(lines: string[]): boolean
    {
        return lines.length > 1;
    }

    ProcessText(linesCopy: string[]): string[]
    {
        let lastLineIndex = linesCopy.length - 1;
        let secondToLastLineIndex = lastLineIndex - 1;

        let lastLineWords = linesCopy[lastLineIndex].split(singleSpace);
        let secondToLastLineWords = linesCopy[secondToLastLineIndex].split(singleSpace);

        let lastLineNeedsMore = lastLineWords.length < this.LineMinWordCount;
        let secondToLastCanShare = secondToLastLineWords.length > this.LineMinWordCount;

        while (lastLineNeedsMore && secondToLastCanShare)
        {
            let wordToMove = secondToLastLineWords.pop();
            this.MoveToBeginningOf(lastLineWords, wordToMove);

            lastLineNeedsMore = lastLineWords.length < this.LineMinWordCount;
            secondToLastCanShare = secondToLastLineWords.length > this.LineMinWordCount;
        }

        linesCopy[lastLineIndex] = lastLineWords.join(singleSpace);
        linesCopy[secondToLastLineIndex] = secondToLastLineWords.join(singleSpace);

        return linesCopy;
    }

    protected MoveToBeginningOf(line: string[], toMove: string): void
    {
        line.unshift(toMove);
    }

    get LineMinWordCount(): number { return CGT.WWCore.Params.LineMinWordCount; }

}