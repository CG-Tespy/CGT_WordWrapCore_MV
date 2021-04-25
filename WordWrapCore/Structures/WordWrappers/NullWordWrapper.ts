import { WordWrapper } from './WordWrapper';

/** Default wrapper that simply leaves the text as-is. */
export class NullWordWrapper extends WordWrapper
{
    protected AsWrappedLines(textField: Bitmap, text: string): string[] {
        return [text];
    }

    protected WouldCauseOverflow(currentWord: string, currentLine: string): boolean {
        return false;
    }
    
    get WrapCode(): string { return "null"; }

    Wrap(textField: Bitmap, text: string): string
    {
        return text;
    }
}