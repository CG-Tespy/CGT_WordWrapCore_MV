import { WordWrapper } from './WordWrapper';
import { IWordWrapArgs } from './WordWrapArgs/IWordWrapArgs';

/** Default wrapper that simply leaves the text as-is. */
export class NullWordWrapper extends WordWrapper
{
    protected WouldCauseOverflow(currentWord: string, currentLine: string): boolean 
    {
        return false;
    }

    Wrap(args: IWordWrapArgs): string
    {
        return args.rawTextToWrap;
    }
}