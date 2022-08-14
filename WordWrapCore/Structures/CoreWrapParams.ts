import { emptyString, caseInsensitive, unicode, global, globalMultiline } from '../Shared/_Strings';
import { doubleQuotes } from '../Shared/_Regexes';
import { IRegexEntry } from './IRegexEntry';
import { IBaseCoreWrapParams } from './IBaseCoreWrapParams';
import { IWrapperSpacing } from './WordWrappers/WordWrapArgs/IWrapperSpacing';
let Event = CGT.Core.Utils.Event;
type Event = CGT.Core.Utils.Event;
let ArrayEx = CGT.Core.Extensions.ArrayEx;

/**
 * Params to affect the word-wrapping, set in the Plugin Manager.
 */
export class CoreWrapParams
{
    /** Affects how this decides when a line can't hold more. */
    get MessageWrapper(): string { return this.messageWrapper; }
    private messageWrapper: string = "null";
    set MessageWrapper(value) { this.messageWrapper = value; }

    get MessageSpacing(): IWrapperSpacing { return this.messageSpacing; }
    private messageSpacing: IWrapperSpacing;
    set MessageSpacing(value) { this.messageSpacing = value; }

    get DescWrapper(): string { return this.descWrapper; }
    private descWrapper: string = "null";
    set DescWrapper(value) { this.descWrapper = value; }

    get DescSpacing(): IWrapperSpacing { return this.descSpacing; }
    private descSpacing: IWrapperSpacing;
    set DescSpacing(value) { this.descSpacing = value; }

    get MessageBacklogWrapper(): string { return this.messageBacklogWrapper; }
    private messageBacklogWrapper: string = "null";
    set MessageBacklogWrapper(value) { this.messageBacklogWrapper = value; }

    get BacklogSpacing(): IWrapperSpacing { return this.backlogSpacing; }
    private backlogSpacing: IWrapperSpacing;
    set BacklogSpacing(value) { this.backlogSpacing = value; }

    get BubbleWrapper(): string { return this.bubbleWrapper; }
    private bubbleWrapper: string = "null";
    set BubbleWrapper(value) { this.bubbleWrapper = value; }

    get BubbleSpacing(): IWrapperSpacing { return this.bubbleSpacing; }
    private bubbleSpacing: IWrapperSpacing;
    set BubbleSpacing(value) { this.bubbleSpacing = value; }

    get WrapModeChanged(): Event { return this.wrapModeChanged; }
    private wrapModeChanged: Event = new Event(2);

    /** 
     * Decides how the wrapper detects nametags.
     * */
    get NametagFormats(): IRegexEntry[] { return this.nametagFormats; }
    private nametagFormats = [];
    set NametagFormats(value) 
    { 
        ArrayEx.Clear(this.nametagFormats);
        this.nametagFormats = this.nametagFormats.concat(value);
    }

    get NametagFormatRegexes(): RegExp[] { return this.nametagFormatRegexes; }
    private nametagFormatRegexes = [];
    set NametagFormatRegexes(value)
    {
        ArrayEx.Clear(this.nametagFormatRegexes);
        this.nametagFormatRegexes = this.NametagFormatRegexes.concat(value);
    }
    
    get LineBreakMarkers(): string[] { return this.lineBreakMarkers; }
    private lineBreakMarkers: string[] = [];
    set LineBreakMarkers(value) 
    {
        ArrayEx.Clear(this.lineBreakMarkers);
        this.lineBreakMarkers = this.lineBreakMarkers.concat(value); 
    }

    get EmptyText(): IRegexEntry[] { return this.emptyText; }
    private emptyText: IRegexEntry[] = [];
    set EmptyText(value) 
    { 
        ArrayEx.Clear(this.emptyText);
        this.emptyText = this.emptyText.concat(value); 
    }

    // ~~~Special Rules~~~

    /**
     * How many chars this makes sure each line has, when the text
     * besides the nametag has enough.
     */
    get LineMinCharCount(): number { return this.lineMinCharCount; }
    private lineMinCharCount: number = 3;
    set LineMinCharCount(value: number) { this.lineMinCharCount = value; }

    /** 
     * Whether or not this aligns parentheses a certain way.
     */
    get ParenthesesAlignment(): boolean { return this.parenthesisAlignment; }
    private parenthesisAlignment: boolean = true;
    set ParenthesesAlignment(value) { this.parenthesisAlignment = value; }

    get WordSeparator(): string { return this.wordSeparator; }
    private wordSeparator: string = " ";
    set WordSeparator(value) { this.wordSeparator = value; }

    get SeparateWithSeparator(): boolean { return this.separateWithSeparator; }
    private separateWithSeparator: boolean = true;
    set SeparateWithSeparator(value) { this.separateWithSeparator; }

    get WrapDescs(): boolean { return this.wrapDescs; }
    private wrapDescs: boolean = false;
    set WrapDescs(value) { this.wrapDescs = value; }

    get CascadingUnderflow(): boolean { return this.cascadingUnderflow; }
    private cascadingUnderflow: boolean = false;
    set CascadingUnderflow(value) { this.cascadingUnderflow = value; }

    get CULenience(): number { return this.cuLenience; }
    private cuLenience: number = 5;
    set CULenience(value) { this.cuLenience = value; }

    get RememberResults(): boolean { return this.rememberResults; }
    private rememberResults: boolean = true;
    set RememberResults(value) { this.rememberResults = value; }

    get WrapMessageLog(): boolean { return this.wrapMessageLog; }
    private wrapMessageLog: boolean = true;
    set WrapMessageLog(value) { this.wrapMessageLog = value; }

}

export class WrapParamsFactory
{
    /* Converted by fenix-tools convertParameters func*/
    static FromConvertedParams(baseParams: IBaseCoreWrapParams): CoreWrapParams
    {
        let wrapParams = new CoreWrapParams();
        this.SetStringsFromParams(baseParams, wrapParams);
        this.SetNumbersFromParams(baseParams, wrapParams);
        this.SetBooleansFromParams(baseParams, wrapParams);
        this.SetRegexesFromParams(baseParams, wrapParams);
        this.SetArraysFromParams(baseParams, wrapParams);
        this.SetSpacingFromParams(baseParams, wrapParams);
        
        return wrapParams;
    }

    protected static SetStringsFromParams(baseParams: IBaseCoreWrapParams, wrapParams: CoreWrapParams)
    {
        let wordSeparator: string = baseParams.WordSeparator;
        wordSeparator = wordSeparator.replace(doubleQuotes, emptyString);
        wrapParams.WordSeparator = wordSeparator;

        wrapParams.MessageWrapper = baseParams.MessageWrapper;
        wrapParams.DescWrapper = baseParams.DescWrapper;
        wrapParams.MessageBacklogWrapper = baseParams.MessageBacklogWrapper;
        wrapParams.BubbleWrapper = baseParams.BubbleWrapper;
    }

    protected static SetNumbersFromParams(baseParams: IBaseCoreWrapParams, wrapParams: CoreWrapParams)
    {
        wrapParams.LineMinCharCount = baseParams.LineMinCharCount;
        wrapParams.CULenience = baseParams.CULenience;
    }

    protected static SetRegexesFromParams(baseParams: IBaseCoreWrapParams, wrapParams: CoreWrapParams)
    {
        this.SetNametagFormats(baseParams, wrapParams);
        this.SetEmptyText(baseParams, wrapParams);
    }

    protected static SetNametagFormats(baseParams: IBaseCoreWrapParams, wrapParams: CoreWrapParams)
    {
        let formatObjects = baseParams.NametagFormats;
        this.ApplyRegexObjectsTo(formatObjects);
        // ^Since the Param def doesn't let you define Regex objects, we have to
        // convert things ourselves

        wrapParams.NametagFormats = formatObjects;
        wrapParams.NametagFormatRegexes = this.RegexObjectsFrom(formatObjects);
    }

    protected static ApplyRegexObjectsTo(formats: IRegexEntry[]): void
    {
        for (const formatEl of formats)
        {
            let asString = formatEl.RegexAsString;
            formatEl.Regex = new RegExp(asString, globalMultiline + caseInsensitive);
        }
    }

    protected static RegexObjectsFrom(formats: IRegexEntry[]): RegExp[]
    {
        let result: RegExp[] = [];

        for (const formatEl of formats)
        {
            result.push(formatEl.Regex);
        }

        return result;
    }

    protected static SetEmptyText(hasParams: IBaseCoreWrapParams, wrapParams: CoreWrapParams)
    {
        wrapParams.EmptyText = hasParams.EmptyText;
        this.ApplyRegexObjectsTo(wrapParams.EmptyText);
    }

    protected static SetBooleansFromParams(baseParams: IBaseCoreWrapParams, wrapParams: CoreWrapParams)
    {
        wrapParams.ParenthesesAlignment = baseParams.ParenthesisAlignment;
        wrapParams.CascadingUnderflow = baseParams.CascadingUnderflow;
        wrapParams.RememberResults = baseParams.RememberResults;
    }

    protected static SetArraysFromParams(baseParams: IBaseCoreWrapParams, wrapParams: CoreWrapParams)
    {
        wrapParams.LineBreakMarkers = baseParams.LineBreakMarkers;
    }

    protected static SetSpacingFromParams(baseParams: IBaseCoreWrapParams, wrapParams: CoreWrapParams)
    {
        wrapParams.MessageSpacing = baseParams.MessageSpacing;
        wrapParams.DescSpacing = baseParams.DescSpacing;
        wrapParams.BacklogSpacing = baseParams.BacklogSpacing;
        wrapParams.BubbleSpacing = baseParams.BubbleSpacing;
    }
}

// To avoid magic strings when fetching from Plugin Params
export let names = 
{
    WrapMode: "Wrapper",
    NametagFormats: "NametagFormats",
    LineBreakMarkers: "LineBreakMarkers",
    EmptyText: "EmptyText",
    
    // Special rules
    LineMinCharCount: "LineMinCharCount",
    ParenthesisAlignment: "ParenthesisAlignment",
    WordSeparator: "WordSeparator",
    WrapDescs: "WrapDescs",
    CascadingUnderflow: "CascadingUnderflow",
    CULenience: "CULenience",
    RememberResults: "RememberResults",
    
    // Spacing
    MugshotWidth: "MugshotWidth",
    MugshotPadding: "MugshotPadding",
    SidePadding: "SidePadding",

    BoldItalicWidthMod: "BoldItalicWidthMod",
    
};