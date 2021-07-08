import { ILineWrapper } from './ILineWrapper';
import { IWordWrapArgs } from '../WordWrapArgs/IWordWrapArgs';
import { NullOverflowFinder } from '../../Overflow/OverflowFinders/NullOverflowFinder';
import { LineWrapper } from './LineWrapper';

export class NullLineWrapper extends LineWrapper
{
    
    WrapIntoLines(wordWrapArgs: IWordWrapArgs, actualTextToWrap: string): string[] 
    {
        return [wordWrapArgs.rawTextToWrap];
    }
    
}