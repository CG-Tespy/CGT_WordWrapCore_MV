import { IWordWrapArgs } from '../../WordWrappers/WordWrapArgs/IWordWrapArgs';

export interface IOverflowFindArgs
{
    word: string;
    line: string;
    wordWrapArgs: IWordWrapArgs;
    fullTextHasBoldOrItalics: boolean;
}