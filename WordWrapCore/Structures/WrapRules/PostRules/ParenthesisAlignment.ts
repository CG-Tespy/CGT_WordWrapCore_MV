import { LineWrapRule } from "./LineWrapRule";
import { emptyString, openingParenthesis, closingParenthesis, singleSpace } from '../../../Shared/_Strings';

export class ParenthesisAlignment extends LineWrapRule
{
    CanApplyTo(linesCopy: string[]): boolean 
    {
        let baseRequirements = super.CanApplyTo(linesCopy);
        let enoughLines = baseRequirements && linesCopy.length > 1;
        let openingParenIndex = baseRequirements && this.OpeningParenthesisIndex(linesCopy);
        let parenthesisIsThere = baseRequirements && openingParenIndex >= 0;
        let thatLineIsntTheLast = baseRequirements && openingParenIndex != linesCopy.length - 1;

        return enoughLines && parenthesisIsThere && thatLineIsntTheLast && this.AllowedToAct;
    }

    /**
     * Returns the index of the line where this should start applying leading spaces. 
     * Returns -1 if there is no line starting with an opening parenthesis.
     * @param lines 
     */
    protected OpeningParenthesisIndex(lines: string[]): number
    {
        let lineFound = this.LineWithStartingParenthesis(lines);
        let lineIsValid = lineFound != emptyString;

        if (lineIsValid)
            return lines.indexOf(lineFound);
        else
            return -1;
    }

    get AllowedToAct(): boolean { return CGT.WWCore.Params.ParenthesesAlignment; }

    protected ProcessNormally(lines: string[]): string[] 
    {
        let lineWithParenthesis = this.LineWithStartingParenthesis(lines);
        let whereThatLineIs = lines.indexOf(lineWithParenthesis);
        let rightAfterThatLine = whereThatLineIs + 1;
        // ^So the alignment is applied after the line with the starting parenthesis
        return this.WithLeadingSpacesApplied(lines, rightAfterThatLine);
    }

    /** The first such line in the input, anyway. */
    protected LineWithStartingParenthesis(lines: string[]): string
    {
        for (const line of lines)
        {
            let firstLetterInLine = line[0];
            let startsWithOpeningParenthesis = firstLetterInLine === openingParenthesis;

            if (startsWithOpeningParenthesis) 
                return line;
        }

        return emptyString;
    }

    protected WithLeadingSpacesApplied(lines: string[], startingIndex: number): string[]
    {
        for (let whereWeAre = startingIndex; whereWeAre < lines.length; whereWeAre++)
        {
            let currentLine = lines[whereWeAre]; 
            let withAlignmentApplied = singleSpace + currentLine;
            lines[whereWeAre] = withAlignmentApplied;

            let lastLetterInLine = currentLine[currentLine.length - 1];
            let endsWithClosingParenthesis = lastLetterInLine === closingParenthesis;
            let missionAccomplished = endsWithClosingParenthesis;
            if (missionAccomplished)
                return lines;
        }

        return lines;
        // ^This func getting to this point implies that the writer forgot to include 
        // any closing parentheses. Mission's still accomplished, since this rule isn't 
        // supposed to worry about grammar
    }
    
}