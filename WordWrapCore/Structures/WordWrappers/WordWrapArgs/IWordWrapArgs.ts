import { IWrapperSpacing } from "./IWrapperSpacing";

/** Context for word-wrappers to do their thing. */
export interface IWordWrapArgs
{
    textField: Bitmap;
    rawTextToWrap: string;
    spacing: IWrapperSpacing;
}