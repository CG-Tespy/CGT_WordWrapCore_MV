import { IOverflowFinder } from './IOverflowFinder';
import { ITextMeasurer } from './ITextMeasurer';
import { IOverflowFindArgs } from './IOverflowFindArgs';
import { TextMeasurer } from './TextMeasurer';
import { CoreWrapParams } from '../../CoreWrapParams';

// Best inherit from this, since what defines wrap width
// can vary between wrapper types
export abstract class OverflowFinder implements IOverflowFinder
{
    protected textMeasurer: TextMeasurer;

    Find(args: IOverflowFindArgs): boolean 
    {
        let textField = args.wordWrapArgs.textField;
        let text = args.line + args.word;
        
        let spaceTakenUp: number = this.textMeasurer.MeasureFor(text, textField);
        this.textMeasurer.RegisterInHistory(text);
        // ^To inform measurements for later inputs

        let spaceAvailable = this.GetWrapSpace(args);

        return spaceTakenUp > spaceAvailable;
    }


    /** Returns how much space there is to have text on a single line, based on the inputs. */
    protected GetWrapSpace(args: IOverflowFindArgs): number
    {
        let mugshotIsThere = $gameMessage.faceName() != "";

        if (mugshotIsThere)
            return this.SpaceMinusMugshot(args);
        else
            return this.RegularWrapSpace(args);
    }

    protected SpaceMinusMugshot(args: IOverflowFindArgs): number
    {
        let offset = this.Params.MugshotWidth + this.Params.MugshotPadding;
        return this.RegularWrapSpace(args) - offset;
    }

    /**
     * How much space there is for text in a mugshotless textbox, after taking into
     * account non-mugshot-related padding params.
     * @param args 
     */
    protected abstract RegularWrapSpace(args: IOverflowFindArgs): number;

    /** 
     * How much space there is for text in a textbox without a mugshot, in a
     * unit decided by the finder.
     */
    protected abstract FullWrapSpace(args: IOverflowFindArgs): number

    /** Call this after you finish a full wrapping session. */
    OnWrapJobFinished()
    {
        this.textMeasurer.ClearHistory();
    }

    // @ts-ignore
    protected get Params(): CoreWrapParams { return CGT.WWCore.Params; }
}