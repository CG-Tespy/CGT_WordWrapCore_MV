import { IWordWrapArgs } from './WordWrapArgs/IWordWrapArgs';

export interface IWordWrapper
{
    //Wrap(info: WordWrapArgs): string;
    Wrap(args: IWordWrapArgs): string;
    LineWrapper: CGT.WWCore.LineWrapper;
    
    /** Unique code for a particular wrapper. */
    WrapCode: string;
}