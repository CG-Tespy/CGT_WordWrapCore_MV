import { globalMultiline } from '../Shared/_Strings';
let Event = CGT.Core.Utils.Event;
type Event = CGT.Core.Utils.Event;
let ArrayEx = CGT.Core.Extensions.ArrayEx;

/**
 * Params to affect the word-wrapping, set in the Plugin Manager.
 */
export class CoreWrapParams
{
    /** Affects how this decides when a line can't hold more. */
    get WrapMode(): string { return this.wrapMode; }
    private wrapMode: string = "null";
    set WrapMode(value) { this.wrapMode = value;; }

    get WrapModeChanged(): Event { return this.wrapModeChanged; }
    private wrapModeChanged: Event = new Event(2);

    /** 
     * Decides how the wrapper detects nametags.
     * Set to the Yanfly format by default. 
     * */
    get NametagFormats(): RegExp[] { return this.nametagFormats; }
    private nametagFormats = [];
    set NametagFormats(value) 
    { 
        ArrayEx.Clear(this.nametagFormats);
        this.nametagFormats = this.nametagFormats.concat(value); 
    }

    /** 
     * Whether or not this aligns parentheses a certain way.
     */
    get ParenthesesAlignment(): boolean { return this.parenthesisAlignment; }
    private parenthesisAlignment: boolean = true;
    set ParenthesesAlignment(value) { this.parenthesisAlignment = value; }

    /**
     * How many words this makes sure each line has, when the text
     * besides the nametag has enough.
     */
    get LineMinWordCount(): number { return this.lineMinWordCount; }
    private lineMinWordCount: number = 3;
    set LineMinWordCount(value: number) { this.lineMinWordCount = value; }

    get LineBreakMarkers(): string[] { return this.lineBreakMarkers; }
    private lineBreakMarkers: string[] = [];
    set LineBreakMarkers(value) 
    {
        ArrayEx.Clear(this.lineBreakMarkers);
        this.lineBreakMarkers = this.lineBreakMarkers.concat(value); 
    }

    get EmptyText(): RegExp[] { return this.emptyText; }
    private emptyText: RegExp[] = [];
    set EmptyText(value) 
    { 
        ArrayEx.Clear(this.emptyText);
        this.emptyText = this.emptyText.concat(value); 
    }

    get WordSeparator(): string { return this.wordSeparator; }
    private wordSeparator: string = " ";
    set WordSeparator(value) { this.wordSeparator = value; }

    get SeparateWithSeparator(): boolean { return this.separateWithSeparator; }
    private separateWithSeparator: boolean = true;
    set SeparateWithSeparator(value) { this.separateWithSeparator; }

    // Spacing
    
    /** How many pixels wide we treat the mugshots as being. */
    get MugshotWidth(): number { return this.mugshotWidth; };
    private mugshotWidth = 144; 
    set MugshotWidth(value) { this.mugshotWidth = value; }

    /** 
     * How many pixels wide we treat the space between the mugshot and the
     * text as being.
     */
    get MugshotPadding(): number { return this.mugshotPadding; }
    private mugshotPadding = 20;
    set MugshotPadding(value) { this.mugshotPadding = value; }

    get SidePadding(): number { return this.sidePadding; }
    private sidePadding: number = 5;
    set SidePadding(value) { this.sidePadding = value; }

}

export class WrapParamsFactory
{
    static FromBaseParams(baseParams: object): CoreWrapParams
    {
        let wrapParams = new CoreWrapParams();
        this.SetStringsFromParams(baseParams, wrapParams);
        this.SetNumbersFromParams(baseParams, wrapParams);
        this.SetBooleansFromParams(baseParams, wrapParams);
        this.SetRegexesFromParams(baseParams, wrapParams);
        this.SetArraysFromParams(baseParams, wrapParams);
        
        return wrapParams;
    }

    protected static SetStringsFromParams(baseParams: object, wrapParams: CoreWrapParams)
    {
        wrapParams.WrapMode = baseParams[names.WrapMode];
        wrapParams.WordSeparator = baseParams[names.WordSeparator];
    }

    protected static SetNumbersFromParams(baseParams: object, wrapParams: CoreWrapParams)
    {
        wrapParams.LineMinWordCount = Number(baseParams[names.LineMinWordCount]);
        wrapParams.SidePadding = Number(baseParams[names.SidePadding]);
        wrapParams.MugshotPadding = Number(baseParams[names.MugshotPadding]);
        wrapParams.MugshotWidth = Number(baseParams[names.MugshotWidth]);
    }

    protected static SetRegexesFromParams(baseParams: object, wrapParams: CoreWrapParams)
    {
        this.SetNametagFormats(baseParams, wrapParams);
        this.SetEmptyText(baseParams, wrapParams);
    }

    protected static SetNametagFormats(baseParams: object, wrapParams: CoreWrapParams)
    {
        let patternsAsStrings: string[] = JSON.parse(baseParams[names.NametagFormats]);
        let regexes: RegExp[] = this.StringPatternsToRegexes(patternsAsStrings);

        wrapParams.NametagFormats = regexes;
    }

    protected static StringPatternsToRegexes(patterns: string[])
    {
        let regexes: RegExp[] = [];

        for (const patternEl of patterns)
        {
            let newRegExp = new RegExp(patternEl, globalMultiline);
            regexes.push(newRegExp);
        }

        return regexes;
    }

    protected static SetEmptyText(baseParams: object, wrapParams: CoreWrapParams)
    {
        let patternsAsStrings: string[] = JSON.parse(baseParams[names.EmptyText]);
        let regexes: RegExp[] = this.StringPatternsToRegexes(patternsAsStrings);

        wrapParams.EmptyText = regexes;
    }

    protected static SetBooleansFromParams(baseParams: object, wrapParams: CoreWrapParams)
    {
        wrapParams.ParenthesesAlignment = baseParams[names.ParenthesisAlignment] === 'true';
        wrapParams.SeparateWithSeparator = baseParams[names.SeparateWithSeparator] === 'true';
    }

    protected static SetArraysFromParams(baseParams: object, wrapParams: CoreWrapParams)
    {
        wrapParams.LineBreakMarkers = JSON.parse(baseParams[names.LineBreakMarkers]);
    }

}

// To avoid magic strings when fetching from Plugin Params
export let names = 
{
    WrapMode: "Wrapper",
    LineMinWordCount: "LineMinWordCount",
    NametagFormats: "NametagFormats",
    ParenthesisAlignment: "ParenthesisAlignment",
    SplitWordsBetweenLines: "SplitWordsBetweenLines",
    LineBreakMarkers: "LineBreakMarkers",
    EmptyText: "EmptyText",
    WordSeparator: "WordSeparator",
    SeparateWithSeparator: "SeparateWithSeparator",

    SidePadding: "SidePadding",
    MugshotPadding: "MugshotPadding",
    MugshotWidth: "MugshotWidth",
};