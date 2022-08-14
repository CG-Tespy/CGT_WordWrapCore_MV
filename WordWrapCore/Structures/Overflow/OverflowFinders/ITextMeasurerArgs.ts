import { IWrapperSpacing } from "../../WordWrappers/WordWrapArgs/IWrapperSpacing";

export interface ITextMeasurerArgs
{
    text: string;
    textField: Bitmap;
    textHasBoldOrItalic: boolean;
    spacing: IWrapperSpacing;
}