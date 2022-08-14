import { IRegexEntry } from './IRegexEntry';
import { IWrapperSpacing } from './WordWrappers/WordWrapArgs/IWrapperSpacing';

// The stuff converted from fenix-tool's convertParameters func
export interface IBaseCoreWrapParams
{
    // ~~~DesignatedWrappers~~~
    MessageWrapper: string;
    MessageSpacing: IWrapperSpacing;

    DescWrapper: string;
    DescSpacing: IWrapperSpacing;

    MessageBacklogWrapper: string;
    BacklogSpacing: IWrapperSpacing;

    BubbleWrapper: string;
    BubbleSpacing: IWrapperSpacing;

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
}