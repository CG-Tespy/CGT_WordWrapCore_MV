import { IOverflowFinder } from './IOverflowFinder';

/**
 * Takes the space inside a message box (usually drawn in a Bitmap)
 * into account when finding overflow.
 */
export interface ISpacialOverflowFinder extends IOverflowFinder
{
    TextField: Bitmap;
}