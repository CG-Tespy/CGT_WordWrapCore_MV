import { ISpacialOverflowFinder } from './ISpacialOverflowFinder';

/**
 * Takes a text field into consideration when judging overflow.
 */
export class SpacialOverflowFinder implements ISpacialOverflowFinder
{
    constructor(protected textField: Bitmap) {}

    get TextField(): Bitmap { return this.textField; }
    set TextField(value) { this.textField = value; }
    
    FindFor(word: string, line: string): boolean
    {
        throw 'Must implement in subclass!';
    }
}
