import { IWordWrapArgs } from '../WordWrapArgs/IWordWrapArgs';

export interface ILineWrapper
{
    WrapIntoLines(wordWrapArgs: IWordWrapArgs, actualTextToWrap: string): string[];
}
