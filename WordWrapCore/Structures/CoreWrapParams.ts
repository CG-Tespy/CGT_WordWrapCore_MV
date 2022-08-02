import { emptyString, caseInsensitive, unicode, global } from '../Shared/_Strings';
import { doubleQuotes } from '../Shared/_Regexes';
import { INametagFormat } from './INametagFormat';
import { IBaseCoreWrapParams } from './IBaseCoreWrapParams';
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
     * */
    get NametagFormats(): INametagFormat[] { return this.nametagFormats; }
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

    get RememberResults(): boolean { return this.rememberResults; }
    private rememberResults: boolean = true;
    set RememberResults(value) { this.rememberResults = value; }

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
    /* Converted by fenix-tools convertParameters func*/
    static FromConvertedParams(baseParams: IBaseCoreWrapParams): CoreWrapParams
    {
        let wrapParams = new CoreWrapParams();
        this.SetStringsFromParams(baseParams, wrapParams);
        this.SetNumbersFromParams(baseParams, wrapParams);
        this.SetBooleansFromParams(baseParams, wrapParams);
        this.SetRegexesFromParams(baseParams, wrapParams);
        this.SetArraysFromParams(baseParams, wrapParams);
        
        return wrapParams;
    }

    protected static SetStringsFromParams(baseParams: IBaseCoreWrapParams, wrapParams: CoreWrapParams)
    {
        wrapParams.WrapMode = baseParams.Wrapper;
        let wordSeparator: string = baseParams.WordSeparator;
        wordSeparator = wordSeparator.replace(doubleQuotes, emptyString);
        wrapParams.WordSeparator = wordSeparator;
    }

    protected static SetNumbersFromParams(baseParams: IBaseCoreWrapParams, wrapParams: CoreWrapParams)
    {
        wrapParams.LineMinCharCount = baseParams.LineMinCharCount;
        wrapParams.SidePadding = baseParams.SidePadding;
        wrapParams.MugshotPadding = baseParams.MugshotPadding;
        wrapParams.MugshotWidth = baseParams.MugshotWidth;
        wrapParams.CULenience = baseParams.CULenience;

        let basePercent = baseParams.BoldItalicWidthMod;
        wrapParams.BoldItalicWidthMod = 1 + (basePercent / 100.0);
    }

    protected static SetRegexesFromParams(baseParams: IBaseCoreWrapParams, wrapParams: CoreWrapParams)
    {
        this.SetNametagFormats(baseParams, wrapParams);
        this.SetEmptyText(baseParams, wrapParams);
    }

    protected static SetNametagFormats(baseParams: IBaseCoreWrapParams, wrapParams: CoreWrapParams)
    {
        let baseFormatObjects = baseParams.NametagFormats;
        let formatObjects: INametagFormat[] = this.GetNametagFormatArray(baseFormatObjects);
        this.ApplyRegexObjectsTo(formatObjects);
        // ^Since the Param def doesn't let you define Regex objects, we have to
        // convert things ourselves

        wrapParams.NametagFormats = formatObjects;
        wrapParams.NametagFormatRegexes = this.RegexObjectsFrom(formatObjects);
    }

    protected static GetNametagFormatArray(hasBaseFormats: object): INametagFormat[]
    {
        let theArray: INametagFormat[] = [];
        // fenix-tools parses arrays as regular objects, so we have to use the "in"
        // keyword. Same for other array params we set up here
        for (const key in hasBaseFormats)
        {
            let formatEl = hasBaseFormats[key];
            theArray.push(formatEl);
        }

        return theArray;
    }

    protected static ApplyRegexObjectsTo(formats: INametagFormat[]): void
    {
        // fenix-tools parses arrays as regular objects, so we have to use the "in"
        // keyword 
        for (const formatKey in formats)
        {
            let formatEl = formats[formatKey];
            let defAsString = formatEl.RegexAsString;
            formatEl.Regex = new RegExp(defAsString, global + caseInsensitive);
        }
    }

    protected static RegexObjectsFrom(formats: INametagFormat[]): RegExp[]
    {
        let theObjects: RegExp[] = [];
        for (const formatKey in formats)
        {
            let formatObj = formats[formatKey];
            theObjects.push(formatObj.Regex);
        }

        return theObjects;
    }

    protected static FormatStructsToRegexes(patterns: string[])
    {
        let regexes: RegExp[] = [];

        for (const patternKey in patterns)
        {
            let patternEl = patterns[patternKey];
            let newRegExp = new RegExp(patternEl, global + caseInsensitive);
            regexes.push(newRegExp);
        }

        return regexes;
    }

    protected static SetEmptyText(baseParams: IBaseCoreWrapParams, wrapParams: CoreWrapParams)
    {
        let patternsAsStrings: string[] = baseParams.EmptyText;
        let regexes: RegExp[] = this.FormatStructsToRegexes(patternsAsStrings);

        wrapParams.EmptyText = regexes;
    }

    protected static SetBooleansFromParams(baseParams: IBaseCoreWrapParams, wrapParams: CoreWrapParams)
    {
        wrapParams.ParenthesesAlignment = baseParams.ParenthesisAlignment;
        wrapParams.WrapDescs = baseParams.WrapDescs;
        wrapParams.CascadingUnderflow = baseParams.CascadingUnderflow;
        wrapParams.RememberResults = baseParams.RememberResults;
    }

    protected static SetArraysFromParams(baseParams: IBaseCoreWrapParams, wrapParams: CoreWrapParams)
    {
        let markerArray: string[] = [];
        let baseMarkers = baseParams.LineBreakMarkers;

        for (const markerKey in baseMarkers)
        {
            let markerEl = baseMarkers[markerKey];
            markerArray.push(markerEl);
        }

        wrapParams.LineBreakMarkers = markerArray;
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