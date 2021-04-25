export interface IWordWrapper
{
    Wrap(textField: Bitmap, text: string): string;
    OverflowFinder: CGT.WWCore.IOverflowFinder;
    /** Unique code for a particular wrapper. */
    WrapCode: string;
}