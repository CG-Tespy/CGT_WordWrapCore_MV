import { ITextMeasurer } from './ITextMeasurer';
import { emptyString } from '../../../Shared/_Strings';
import { ITextMeasurerArgs } from './ITextMeasurerArgs';
type IRegexEntry = CGT.WWCore.IRegexEntry;

/**
 * Measures text while using a history to help keep track of what's
 * bolded or italicised.
 */ 
export abstract class TextMeasurer implements ITextMeasurer
{
    MeasureFor(args: ITextMeasurerArgs): number
    {
        let text = args.text + emptyString; // In case a non-string is passed
        text = this.WithoutEmptyTexts(text);
        let textField = args.textField;
        
        let baseWidth: number = this.GetDefaultWidthOf(text, textField);
        let offset = 0;
        if (args.textHasBoldOrItalic)
            offset = args.spacing.BoldItalicPadding;
            // ^ We want to treat the text as bigger in this case to help avoid
            // overflow caused by bolding or italicization

        let totalWidth = baseWidth + offset;

        return totalWidth;
    }

    protected WithoutEmptyTexts(text: string)
    {
        for (const emptyTextEl of this.EmptyText)
        {
            let theRegex = emptyTextEl.Regex;
            text = text.replace(theRegex, emptyString);
        }

        return text;
    }

    protected get EmptyText(): IRegexEntry[] { return CGT.WWCore.Params.EmptyText; }

    // Override this to use the units your measurer uses
    protected abstract GetDefaultWidthOf(text: string, textField: Bitmap): number;
    

}