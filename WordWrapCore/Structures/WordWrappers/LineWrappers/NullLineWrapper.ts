import { ILineWrapper } from './ILineWrapper';
import { IWordWrapArgs } from '../WordWrapArgs/IWordWrapArgs';

export class NullLineWrapper implements ILineWrapper
{

    WrapIntoLines(wordWrapArgs: IWordWrapArgs, actualTextToWrap: string): string[] 
    {
        return [wordWrapArgs.rawTextToWrap];
    }
    
}