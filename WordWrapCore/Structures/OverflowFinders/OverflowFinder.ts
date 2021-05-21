import { IOverflowFinder } from './IOverflowFinder';
import { ITextMeasurer } from './ITextMeasurer';
import { IOverflowFindArgs } from './IOverflowFindArgs';
import { TextMeasurer } from './TextMeasurer';

export class OverflowFinder implements IOverflowFinder
{
    protected textMeasurer: TextMeasurer = new TextMeasurer();

    Find(args: IOverflowFindArgs): boolean 
    {
        let textField = args.wordWrapArgs.textField;
        let text = args.line + args.word;
        
        let totalWidth: number = this.textMeasurer.MeasureFor(text, textField);
        this.textMeasurer.RegisterInHistory(text);
        // ^To inform measurements for later inputs

        return totalWidth > this.wrapWidth;
    }

    get WrapWidth(): number { return this.wrapWidth; }
    protected wrapWidth: number = 1;
    set WrapWidth(value) { this.wrapWidth = value; }

    /** Call this after you finish a full wrapping session. */
    Refresh()
    {
        this.textMeasurer.ClearHistory();
    }
}