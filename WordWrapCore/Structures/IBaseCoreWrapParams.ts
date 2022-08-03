import { IRegexEntry } from './IRegexEntry';

// The stuff converted from fenix-tool's convertParameters func
export interface IBaseCoreWrapParams
{
    // ~~~DesignatedWrappers~~~
    MessageWrapper: string;
    DescWrapper: string;
    MessageBacklogWrapper: string;
    BubbleWrapper: string;

    NametagFormats: IRegexEntry[];
    EmptyText: IRegexEntry[];
    LineBreakMarkers: string[];
    
    // ~~~Special Rules~~~
    LineMinCharCount: number;
    ParenthesisAlignment: boolean;
    WordSeparator: string;
    CascadingUnderflow: boolean;
    CULenience: number;
    RememberResults: boolean;

    // ~~~Spacing~~~
    MugshotWidth: number;
    MugshotPadding: number;
    SidePadding: number;
    BoldItalicPadding: number;
}