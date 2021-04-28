import { WordWrapArgs } from './WordWrapArgs/WordWrapArgs';

export interface IWordWrapper
{
    //Wrap(info: WordWrapArgs): string;
    Wrap(args: WordWrapArgs): string;
    OverflowFinder: CGT.WWCore.IOverflowFinder;
    
    /** Unique code for a particular wrapper. */
    WrapCode: string;
}