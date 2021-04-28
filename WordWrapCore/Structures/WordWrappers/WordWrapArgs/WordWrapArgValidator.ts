import { WordWrapArgs } from './WordWrapArgs';

export interface IWordWrapArgValidator
{
    /** Throws an error is any of the args are not valid. */
    Validate(args: WordWrapArgs);
}

export class WordWrapArgValidator implements IWordWrapArgValidator
{
    
    Validate(args: WordWrapArgs): void
    {
        let textField = args.textField;

        if (textField == null)
        {
            let message = 'Cannot wrap for a null bitmap/text field!';
            alert(message);
            throw new Error(message);
        }

        let text = args.textToWrap;

        if (text == null)
        {
            let message = "Cannot wrap null text!";
            alert(message);
            throw new Error(message);
        }
    }
}