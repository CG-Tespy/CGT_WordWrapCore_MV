import { IOverflowFinder } from './IOverflowFinder';
import { ITextMeasurer } from './ITextMeasurer';
import { IOverflowFindArgs } from './IOverflowFindArgs';

export abstract class OverflowFinder implements IOverflowFinder
{
    protected textMeasurer: ITextMeasurer;

    Find(args: IOverflowFindArgs): boolean 
    {
        let wordWidth: number = this.textMeasurer.MeasureFor(args.word);
        let lineWidth: number = this.textMeasurer.MeasureFor(args.line);
        let totalWidth: number = wordWidth + lineWidth;

        return totalWidth > this.wrapWidth;
    }

    get WrapWidth(): number { return this.wrapWidth; }
    protected wrapWidth: number = 1;
    set WrapWidth(value) { this.wrapWidth = value; }
}