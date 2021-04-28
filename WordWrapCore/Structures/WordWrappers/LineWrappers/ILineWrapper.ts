import { LineWrapArgs } from './LineWrapArgs';

export interface ILineWrapper
{
    WrapIntoLines(context: LineWrapArgs);
}

