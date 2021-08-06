import { emptyString } from '../../../Shared/_Strings';
import { LineWrapRule } from "./LineWrapRule";

/** 
 * Applies a minimum chars-per-line on the input, or instead removes the tags
 * that demand that this rule be ignored. 
 * */
export class CharPerLineMin extends LineWrapRule
{
    protected invalidationTags = [/ <ignoreLmcc>/gmi];

    CanApplyTo(lines: string[]): boolean
    {
        let baseRequirements = super.CanApplyTo(lines);
        let atLeastTwoLinesToWorkWith = lines.length > 1;
        return baseRequirements && atLeastTwoLinesToWorkWith;
    }

    protected ShouldRemoveTagsFrom(lines: string[]): boolean
    {
        for (const lineEl of lines)
        {
            for (const tag of this.invalidationTags)
            {
                let lineHasTag = tag.test(lineEl);
                if (lineHasTag)
                    return true;
            }
        }

        return false;
    }

    protected WithoutTags(lines: string[]): string[]
    {
        lines = lines.slice(); // <- To avoid modifying the orig

        for (let i = 0; i < lines.length; i++)
        {
            let lineEl = lines[i], withTagsRemoved = "";

            for (const tag of this.invalidationTags)
                withTagsRemoved = lineEl.replace(tag, emptyString);

            lines[i] = withTagsRemoved;
        }

        return lines;
    }

    protected ProcessNormally(lines: string[]): string[]
    {
        lines = lines.slice(); // <- To not modify the orig

        let lastTwoLines = this.GetLastTwoSplitLinesOf(lines);

        let lastLineWords = lastTwoLines[theLastOfWhich];
        let secondToLastLineWords = lastTwoLines[theFirstOfWhich];

        let balancedLastLines = this.BalanceCharCountBetween(secondToLastLineWords, lastLineWords);
        lastLineWords = balancedLastLines[theLastOfWhich];
        secondToLastLineWords = balancedLastLines[theFirstOfWhich];

        lines = this.WithLastLinesApplied(lines, balancedLastLines);

        return lines;
    }

    /** Returned in the same order as they are in the original array they came from. */
    protected GetLastTwoSplitLinesOf(lines: string[])
    {
        let lastLineFull = lines[lines.length - 1];
        let lastLineSplit = lastLineFull.split(this.WordSeparator);

        let secondToLastLineFull = lines[lines.length - 2];
        let secondToLastLineSplit = secondToLastLineFull.split(this.WordSeparator);

        return [secondToLastLineSplit, lastLineSplit];
    }

    get WordSeparator(): string { return CGT.WWCore.Params.WordSeparator; }

    /**
     * Returns an array containing versions of the passed arrays that fulfill the char per
     * line minimum, and in the same order as they were in their original source array.
     * @param sharerLine The full line that may have its words moved to the other one
     * @param takerLine Line that, if it doesn't have enough characters, may have words moved to it from the other line
     */
    protected BalanceCharCountBetween(sharerLine: string[], takerLine: string[])
    {
        sharerLine = sharerLine.slice();
        takerLine = takerLine.slice();
        // ^ To avoid modifying the originals

        let fullTakerLine = takerLine.join(this.WordSeparator);
        let fullSharerLine = sharerLine.join(this.WordSeparator);
        // ^ Since the inputs are string arrays that each have words as their
        // elements.

        let lastWordInSharer = sharerLine[sharerLine.length - 1];
        let sharerReducedByAWord = (fullSharerLine.length - lastWordInSharer.length);
        let canAffordToShare = sharerReducedByAWord >= this.LineMinCharCount;
        let thereIsAnImbalance = fullTakerLine.length < this.LineMinCharCount;

        while (thereIsAnImbalance && canAffordToShare)
        {
            let wordToMove = sharerLine.pop();
            this.MoveToBeginningOf(takerLine, wordToMove);

            // We want to be sure whether or not we need to still move words from one
            // line to the other, hence the need to update these vars below to then 
            // check them again.
            fullTakerLine = takerLine.join(this.WordSeparator);
            fullSharerLine = sharerLine.join(this.WordSeparator);

            sharerReducedByAWord = (fullSharerLine.length - lastWordInSharer.length);
            canAffordToShare = sharerReducedByAWord >= this.LineMinCharCount;
            thereIsAnImbalance = fullTakerLine.length < this.LineMinCharCount;
        }

        return [sharerLine, takerLine];
    }

    get LineMinCharCount(): number { return CGT.WWCore.Params.LineMinCharCount; }

    protected MoveToBeginningOf(line: string[], toMove: string): void
    {
        line.unshift(toMove);
    }

    protected WithLastLinesApplied(toApplyTo: string[], lastTwoLines: string[][])
    {
        toApplyTo = toApplyTo.slice();

        // Keep in mind that each element of lastTwoLines is an array with each element
        // within being words
        let lastLineCombined = lastTwoLines[theLastOfWhich].join(this.WordSeparator);
        let secondToLastLineCombined = lastTwoLines[theFirstOfWhich].join(this.WordSeparator);

        toApplyTo[toApplyTo.length - 1] = lastLineCombined;
        toApplyTo[toApplyTo.length - 2] = secondToLastLineCombined;

        return toApplyTo;
    }

}

let theFirstOfWhich = 0, theLastOfWhich = 1;