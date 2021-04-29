import { ILineWrapper } from './ILineWrapper';

export class NullLineWrapper implements ILineWrapper
{

    WrapIntoLines(textField: Bitmap, text: string): string[] 
    {
        return [text];
    }
    
}