import { ISpacialOverflowFinder } from './ISpacialOverflowFinder';
import { OverflowFinder } from './OverflowFinder';

export abstract class SpacialOverflowFinder extends OverflowFinder
implements ISpacialOverflowFinder
{
    constructor(textField?: Bitmap)
    {
        super();
        this.textField = textField;
    }

    get TextField(): Bitmap { return this.textField; }
    private textField: Bitmap;
    set TextField(value) { this.textField = value; }

}