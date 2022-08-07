export interface IUnderflowCascadeArgs
{
    textField: Bitmap;
    lines: string[];

    /** Index of the line to potentially have a word moved from it to the next */
    focusedLineIndex: number; // 
}