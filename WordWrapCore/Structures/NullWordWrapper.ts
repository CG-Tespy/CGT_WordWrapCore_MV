import { WordWrapper } from './WordWrapper';

/** Default wrapper that simply leaves the text as-is. */
export class NullWordWrapper extends WordWrapper
{
    get WrapCode(): string { return "null"; }

    Wrap(textField: Bitmap, text: string): string
    {
        return text;
    }
}