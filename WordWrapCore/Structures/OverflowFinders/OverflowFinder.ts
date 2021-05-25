import { IOverflowFinder } from './IOverflowFinder';
import { ITextMeasurer } from './ITextMeasurer';
import { IOverflowFindArgs } from './IOverflowFindArgs';
import { TextMeasurer } from './TextMeasurer';

// Best inherit from this, since what defines wrap width
// can vary between wrapper types
export abstract class OverflowFinder implements IOverflowFinder
{
    protected textMeasurer: TextMeasurer;

    Find(args: IOverflowFindArgs): boolean 
    {
        let textField = args.wordWrapArgs.textField;
        let text = args.line + args.word;
        
        let totalWidth: number = this.textMeasurer.MeasureFor(text, textField);
        this.textMeasurer.RegisterInHistory(text);
        // ^To inform measurements for later inputs

        this.GetWrapWidth(args);

        return totalWidth > this.WrapWidth;
    }

    get WrapWidth(): number { return this.wrapWidth; }
    protected wrapWidth: number = 1;
    set WrapWidth(value) { this.wrapWidth = value; }

    /** 
     * Override this to decide on how much horizontal space this finder
     * treats any given textbox as having.
     */
    protected abstract GetWrapWidth(args: IOverflowFindArgs): number;

    /** Call this after you finish a full wrapping session. */
    Refresh()
    {
        this.textMeasurer.ClearHistory();
    }
}