import { singleSpace, emptyString } from '../../../Shared/_Strings';
import { LineWrapRule } from "./LineWrapRule";

/** 
 * Applies a minimum words-per-line on the input, or instead removes the tags
 * that demand that this rule be ignored. 
 * */
export class WordPerLineMin extends LineWrapRule
{
    protected invalidationTags = [/ <ignoreLmwc>/gmi];

    CanApplyTo(lines: string[]): boolean
    {
        let baseRequirements = super.CanApplyTo(lines);
        let atLeastTwoLinesToWorkWith = lines.length > 1;
        return baseRequirements && atLeastTwoLinesToWorkWith;
    }

    protected ShouldRemoveTagsFrom(linesCopy: string[]): boolean
    {
        for (const line of linesCopy)
        {
            for (const tag of this.invalidationTags)
                if (line.match(tag) != null)
                    return true;
        }

        return false;
    }

    protected WithoutTags(lines: string[]): string[]
    {
        for (let i = 0; i < lines.length; i++)
        {
            let lineEl = lines[i];
            for (const tag of this.invalidationTags)
                lineEl = lineEl.replace(tag, emptyString);
            lines[i] = lineEl;
        }

        return lines;
    }

    protected ProcessNormally(linesCopy: string[]): string[]
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