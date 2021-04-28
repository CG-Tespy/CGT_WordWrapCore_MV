import { IWordWrapArgs } from './WordWrapArgs/IWordWrapArgs';

export interface IWordWrapper
{
    //Wrap(info: WordWrapArgs): string;
    Wrap(args: IWordWrapArgs): string;
    OverflowFinder: CGT.WWCore.IOverflowFinder;
    
    /** Unique code for a particular wrapper. */
    WrapCode: string;
}