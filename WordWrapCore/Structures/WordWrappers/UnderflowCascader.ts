import { emptyString } from "../../Shared/_Strings";
import { TextMeasurer } from "../Overflow/_SetupOverflow";
import { IUnderflowCascadeArgs } from "./IUnderflowCascadeArgs";
import { ITextMeasurerArgs } from '../Overflow/OverflowFinders/ITextMeasurerArgs';

// For applying cascading underflow
export class UnderflowCascader
{
    protected textMeasurer: TextMeasurer;

    WithCascadingUnderflow(args: IUnderflowCascadeArgs): string[]
    {
        args = this.CopyOf(args); // To avoid mutating the orig
        this.AddEmptyLineForSafetyTo(args.lines);

        let result = this.WithWordsShiftedAsNeeded(args);
        this.RemoveExtraLineAsNeeded(result);
        
        return result;
    }

    protected CopyOf(args: IUnderflowCascadeArgs): IUnderflowCascadeArgs
    {
        let theCopy = {
            lines: args.lines.slice(),
            textField: args.textField,
            focusedLineIndex: args.focusedLineIndex,
            spacing: args.spacing
        };

        return theCopy;
    }

    protected AddEmptyLineForSafetyTo(lines: string[])
    {
        // In case the wrapped text as-is doesn't have enough to have things cascade properly.
        // As we're working with a copy of the LineWrapper's orig input, it's fine to mutate things
        // directly in it
        lines.push(emptyString);
    }

    protected WithWordsShiftedAsNeeded(args: IUnderflowCascadeArgs): string[]
    {
        if (!this.ShouldApplyCascading(args)) // Since we're using recursion here
            return args.lines;

        let lines = args.lines;
        let wordMoveDecision: IMoveWordDecisionContext = this.MakeDecisionAboutMovingWord(args);

        while (wordMoveDecision.moveIt)
        {
            let withTextMoved: ILinesToCascade = this.WithWordMovedToNextLine(wordMoveDecision.linesToCascade);
            // ^We want to move one word (or "word", depending on the lang) at a time

            lines[args.focusedLineIndex] = withTextMoved.focusedLine;
            let nextLineIndex = args.focusedLineIndex + 1;
            lines[nextLineIndex] = withTextMoved.nextLine;

            wordMoveDecision = this.MakeDecisionAboutMovingWord(args);
        }

        args.focusedLineIndex++; // So that the next call shifts stuff from the next line as needed

        lines = this.WithWordsShiftedAsNeeded(args);
        return lines;
    }

    protected ShouldApplyCascading(args: IUnderflowCascadeArgs)
    {
        let lastLineIndex = args.lines.length - 1;
        return args.focusedLineIndex < lastLineIndex;
    }

    protected MakeDecisionAboutMovingWord(args: IUnderflowCascadeArgs)
    {
        let toCascade: ILinesToCascade = this.GetLinesToCascade(args);
        let widthsMeasured: IWidthAnalysisResults = this.MeasuredWidthsOf(toCascade, args);

        let decision: IMoveWordDecisionContext = 
        {
            linesToCascade: toCascade,
            widthsMeasured: widthsMeasured,
            moveIt: widthsMeasured.currentLineWidth > widthsMeasured.firstLineWidth,
        };
        
        return decision;
    }

    // The lines involved in a potential word-shift. They're decided based on the index of what
    // we're treating as the current line, which we're assuming is always at least 1 here
    protected GetLinesToCascade(args: IUnderflowCascadeArgs): ILinesToCascade
    {
        let focusedLineIndex = args.focusedLineIndex;
        let theLines = {
            focusedLine: args.lines[focusedLineIndex],
            firstLine: args.lines[0],
            nextLine: args.lines[focusedLineIndex + 1],
        };
        return theLines;
    }

    protected MeasuredWidthsOf(relevantLines: ILinesToCascade, cascadeArgs: IUnderflowCascadeArgs): IWidthAnalysisResults
    {
        let textField = cascadeArgs.textField;
        let firstLine = relevantLines.firstLine;
        let currentLine = relevantLines.focusedLine;

        let firstLineArgs: ITextMeasurerArgs = 
        {
            text: firstLine,
            textField: textField,
            textHasBoldOrItalic: false,
            spacing: cascadeArgs.spacing,
            // ^Won't matter at this point, given how the base line-wrapping already handled
            // any concerns with bolding and italics for the input
        };

        let currentLineArgs: ITextMeasurerArgs = 
        {
            text: currentLine,
            textField: textField,
            textHasBoldOrItalic: false,
            spacing: cascadeArgs.spacing,
        };

        let results: IWidthAnalysisResults = 
        {
            firstLineWidth: this.textMeasurer.MeasureFor(firstLineArgs) + this.CULenience,
            currentLineWidth: this.textMeasurer.MeasureFor(currentLineArgs),
        };

        return results;
    }

    protected get CULenience(): number { return CGT.WWCore.Params.CULenience; }

    protected WithWordMovedToNextLine(toCascade: ILinesToCascade): ILinesToCascade
    {
        let focusedLineSplit = toCascade.focusedLine.split(this.WordSeparator);
        let nextLineSplit = toCascade.nextLine.split(this.WordSeparator);

        let wordToMove = focusedLineSplit.pop();
        nextLineSplit.unshift(wordToMove);

        let withThingsShifted: ILinesToCascade = 
        {
            firstLine: toCascade.firstLine,
            focusedLine: focusedLineSplit.join(this.WordSeparator),
            nextLine: nextLineSplit.join(this.WordSeparator),
        };

        return withThingsShifted;
    }

    protected get WordSeparator(): string { return CGT.WWCore.Params.WordSeparator; }

    /** Without this, the outputted text could lead to an empty message box */
    protected RemoveExtraLineAsNeeded(lines: string[])
    {
        let extraLine = lines[lines.length - 1];
        let itIsEmpty = extraLine == emptyString;
        if (itIsEmpty)
            lines.pop();
    }
}

interface ILinesToCascade
{
    focusedLine: string,
    firstLine: string,
    nextLine: string
}

interface IWidthAnalysisResults
{
    firstLineWidth: number,
    currentLineWidth: number,
    // We don't worry about the next line's width before it becomes the current one.
}

interface IMoveWordDecisionContext
{
    linesToCascade: ILinesToCascade,
    widthsMeasured: IWidthAnalysisResults,
    moveIt: boolean
}
