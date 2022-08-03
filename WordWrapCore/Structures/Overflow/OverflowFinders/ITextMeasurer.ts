import { ITextMeasurerArgs } from "./ITextMeasurerArgs";

/**
 * Helper for OverflowFinders to detect overflow
 */
export interface ITextMeasurer
{
    MeasureFor(args: ITextMeasurerArgs): number
}

