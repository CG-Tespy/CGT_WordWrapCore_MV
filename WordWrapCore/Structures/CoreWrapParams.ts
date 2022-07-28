import { globalMultiline, emptyString, caseInsensitive, unicode } from '../Shared/_Strings';
import { doubleQuotes } from '../Shared/_Regexes';
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

    // Spacing
    
    /** How wide mugshots are treated as being, in a wrapper-decided unit */
    get MugshotWidth(): number { return this.mugshotWidth; };
    private mugshotWidth = 144; 
    set MugshotWidth(value) { this.mugshotWidth = value; }

    /** The space between the mugshot and the text, in a wrapper-decided unit. */
    get MugshotPadding(): number { return this.mugshotPadding; }
    private mugshotPadding = 20;
    set MugshotPadding(value) { this.mugshotPadding = value; }

    /** For the message box sides, in a wrapper-decided unit. */
    get SidePadding(): number { return this.sidePadding; }
    private sidePadding: number = 5;
    set SidePadding(value) { this.sidePadding = value; }

    get BoldItalicWidthMod(): number { return this.boldItalicWidthMod; }
    private boldItalicWidthMod: number = 1;
    set BoldItalicWidthMod(value) { this.boldItalicWidthMod = value; }

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
        let wordSeparator: string = baseParams[names.WordSeparator];
        wordSeparator = wordSeparator.replace(doubleQuotes, emptyString);
        wrapParams.WordSeparator = wordSeparator;
    }

    protected static SetNumbersFromParams(baseParams: object, wrapParams: CoreWrapParams)
    {
        wrapParams.LineMinCharCount = Number(baseParams[names.LineMinCharCount]);
        wrapParams.SidePadding = Number(baseParams[names.SidePadding]);
        wrapParams.MugshotPadding = Number(baseParams[names.MugshotPadding]);
        wrapParams.MugshotWidth = Number(baseParams[names.MugshotWidth]);
        wrapParams.CULenience = Number(baseParams[names.CULenience]);

        let basePercent = Number(baseParams[names.BoldItalicWidthMod]);
        wrapParams.BoldItalicWidthMod = 1 + (basePercent / 100.0);
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
            let newRegExp = new RegExp(patternEl, globalMultiline + caseInsensitive);
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
        wrapParams.WrapDescs = baseParams[names.WrapDescs] === 'true';
        wrapParams.CascadingUnderflow = baseParams[names.CascadingUnderflow] === 'true';
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
    
    // Spacing
    MugshotWidth: "MugshotWidth",
    MugshotPadding: "MugshotPadding",
    SidePadding: "SidePadding",

    BoldItalicWidthMod: "BoldItalicWidthMod",
    
};