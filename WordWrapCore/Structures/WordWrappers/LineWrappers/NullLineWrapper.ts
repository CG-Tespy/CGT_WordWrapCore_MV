import { IWordWrapArgs } from '../WordWrapArgs/IWordWrapArgs';
import { LineWrapper } from './LineWrapper';

export class NullLineWrapper extends LineWrapper
{
    WrapIntoLines(wordWrapArgs: IWordWrapArgs, actualTextToWrap: string): string[] 
    {
        return [wordWrapArgs.rawTextToWrap];
    }
}