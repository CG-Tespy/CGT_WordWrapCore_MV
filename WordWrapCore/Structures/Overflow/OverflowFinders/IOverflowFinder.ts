import { IOverflowFindArgs } from './IOverflowFindArgs';

/**
 * What WordWrappers use to see when overflow would happen.
 */
export interface IOverflowFinder
{
    /** 
     * Returns whether or not the line would get too long if the word
     * were added.
     */
    Find(args: IOverflowFindArgs): boolean;
}