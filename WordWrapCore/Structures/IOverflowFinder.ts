/**
 * What WordWrappers use to see when overflow would happen.
 */
export interface IOverflowFinder
{
    /** 
     * Returns whether or not the line would get too long if the word
     * were added.
     */
    FindFor(word: string, line: string): boolean;
}