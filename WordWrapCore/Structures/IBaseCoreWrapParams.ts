import { INametagFormat } from './INametagFormat';
// The stuff converted from fenix-tool's convertParameters func
export interface IBaseCoreWrapParams
{
    Wrapper: string;
    NametagFormats: INametagFormat[];
    LineBreakMarkers: string[];
    EmptyText: string[];

    // ~~~Special Rules~~~
    LineMinCharCount: number;
    ParenthesisAlignment: boolean;
    WordSeparator: string;
    WrapDescs: boolean;
    CascadingUnderflow: boolean;
    CULenience: number;

    // ~~~Spacing~~~
    MugshotWidth: number;
    MugshotPadding: number;
    SidePadding: number;
    BoldItalicWidthMod: number;
}