import { IOverflowFinder } from './IOverflowFinder';
import { ITextMeasurer } from './ITextMeasurer';


export abstract class OverflowFinder implements IOverflowFinder
{
    protected textMeasurer: ITextMeasurer;

    abstract FindFor(word: string, line: string): boolean 
}