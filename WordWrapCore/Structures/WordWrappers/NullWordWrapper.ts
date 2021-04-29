import { WordWrapper } from './WordWrapper';
import { IWordWrapArgs } from './WordWrapArgs/IWordWrapArgs';

/** Default wrapper that simply leaves the text as-is. */
export class NullWordWrapper extends WordWrapper
{
    protected WouldCauseOverflow(currentWord: string, currentLine: string): boolean 
    {
        return false;
    }
    
    get WrapCode(): string { return "null"; }

    Wrap(args: IWordWrapArgs): string
    {
        return args.rawTextToWrap;
    }
}