import { ISpacialOverflowFinder } from './ISpacialOverflowFinder';

export class SpacialOverflowFinder implements ISpacialOverflowFinder
{
    constructor(textField?: Bitmap)
    {
        this.textField = textField;
    }

    get TextField(): Bitmap { return this.textField; }
    private textField: Bitmap;
    set TextField(value) { this.textField = value; }

    FindFor(text: string, line: string): boolean
    {
        throw 'must be implemented in subclass!';
    }
}