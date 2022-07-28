import { TextMeasurer } from "../Overflow/_SetupOverflow";
import { IUnderflowCascadeArgs } from "./IUnderflowCascadeArgs";

// For applying cascading underflow
export class UnderflowCascader
{
    protected textMeasurer: TextMeasurer;

    WithCascadingOverflow(args: IUnderflowCascadeArgs): string[]
    {
        return this.ApplyIt(args);
    }

    protected ApplyIt(args: IUnderflowCascadeArgs): string[]
    {
        if (!this.ShouldApplyCascading(args)) // Since we're using recursion here
            return args.lines;

        let lines = args.lines.slice(); // To avoid mutating the orig
        let wordMoveDecision: IMoveWordDecisionContext = this.MakeDecisionAboutMovingWord(args);

        let withTextMoved: ILinesToCascade = null;
        let argsForNextCall: IUnderflowCascadeArgs = // We want this as a separate object to avoid mutating the orig
        {
            lines: args.lines,
            focusedLineIndex: args.focusedLineIndex + 1,
            textField: args.textField,
        };

        if (wordMoveDecision.moveIt)
        {
            withTextMoved = this.WithWordMovedToNextLine(wordMoveDecision.linesToCascade);
            // ^We want to move one word (or "word", depending on the lang) at a time

            lines[args.focusedLineIndex] = withTextMoved.focusedLine;
            let nextLineIndex = args.focusedLineIndex + 1;
            lines[nextLineIndex] = withTextMoved.nextLine;

            let withMovedTextApplied = lines;

            argsForNextCall.lines = withMovedTextApplied;
        }

        lines = this.ApplyIt(argsForNextCall);
        return lines;
    }

    protected ShouldApplyCascading(args: IUnderflowCascadeArgs)
    {
        let lastLineIndex = args.lines.length - 1;
        return args.focusedLineIndex >= lastLineIndex;
    }

    protected MakeDecisionAboutMovingWord(args: IUnderflowCascadeArgs)
    {
        let focusedLineIndex = args.focusedLineIndex;
        let toCascade: ILinesToCascade = this.GetLinesToCascade(args.lines, focusedLineIndex);

        let textField = args.textField;
        let widthsMeasured: IWidthAnalysisResults = this.MeasuredWidthsOf(toCascade, textField);

        let decision: IMoveWordDecisionContext = 
        {
            linesToCascade: toCascade,
            widthsMeasured: widthsMeasured,
            moveIt: widthsMeasured.currentLineWidth > widthsMeasured.previousLineWidth,
        };
        
        return decision;
    }

    // The lines involved in a potential word-shift. They're decided based on the index of what
    // we're treating as the current line, which we're assuming is always at least 1 here
    protected GetLinesToCascade(allLines: string[], currentLineIndex: number): ILinesToCascade
    {
        return {
            focusedLine: allLines[currentLineIndex],
            previousLine: allLines[currentLineIndex - 1],
            nextLine: allLines[currentLineIndex + 1],
        };
    }

    protected MeasuredWidthsOf(relevantLines: ILinesToCascade, textField: Bitmap): IWidthAnalysisResults
    {
        let previousLine = relevantLines.previousLine;
        let currentLine = relevantLines.focusedLine;

        let results: IWidthAnalysisResults = 
        {
            previousLineWidth: this.textMeasurer.MeasureFor(previousLine, textField) + this.CULenience,
            currentLineWidth: this.textMeasurer.MeasureFor(currentLine, textField),
        };

        return results;
    }

    protected get CULenience(): number  { return CGT.WWCore.Params.CULenience; }

    protected WithWordMovedToNextLine(relevantLines: ILinesToCascade): ILinesToCascade
    {
        let currentLineSplit = relevantLines.focusedLine.split(this.WordSeparator);
        let nextLineSplit = relevantLines.nextLine.split(this.WordSeparator);

        let wordToMove = currentLineSplit.pop();
        nextLineSplit.unshift(wordToMove);

        let withThingsShifted: ILinesToCascade = 
        {
            previousLine: relevantLines.previousLine,
            focusedLine: currentLineSplit.join(this.WordSeparator),
            nextLine: nextLineSplit.join(this.WordSeparator),
        };

        return withThingsShifted;
    }

    protected get WordSeparator(): string { return CGT.WWCore.Params.WordSeparator; }
}

interface ICascadeArgAnalysis
{

    shouldMoveText: boolean,
}

interface ILinesToCascade
{
    focusedLine: string,
    previousLine: string,
    nextLine: string
}

interface IWidthAnalysisResults
{
    previousLineWidth: number,
    currentLineWidth: number,
    // We don't worry about the next line's width before it becomes the current one.
}

interface IMoveWordDecisionContext
{
    linesToCascade: ILinesToCascade,
    widthsMeasured: IWidthAnalysisResults,
    moveIt: boolean
}
