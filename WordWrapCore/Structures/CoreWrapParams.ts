let Event = CGT.Core.Utils.Event;
type Event = CGT.Core.Utils.Event;

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
    set NametagFormats(value) { this.nametagFormats = value; }

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

    /** 
     * You'll want this to be set to true if your game's text is all in Japanese,
     * or some other language that doesn't use English spaces.
     */
    get SplitWordsBetweenLines(): boolean { return this.splitWordsBetweenLines; }
    private splitWordsBetweenLines: boolean = false;
    set SplitWordsBetweenLines(value) { this.splitWordsBetweenLines = value; }

    get LineBreakMarkers(): string[] { return this.lineBreakMarkers; }
    private lineBreakMarkers: string[] = [];
    set LineBreakMarkers(value) { this.lineBreakMarkers = value; }

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
    }

    protected static SetNumbersFromParams(baseParams: object, wrapParams: CoreWrapParams)
    {
        wrapParams.LineMinWordCount = Number(baseParams[names.LineMinWordCount]);
    }

    protected static SetRegexesFromParams(baseParams: object, wrapParams: CoreWrapParams)
    {
        let patternsAsStrings: string[] = JSON.parse(baseParams[names.NametagFormats]);
        let regexes: RegExp[] = [];

        for (let i = 0; i < patternsAsStrings.length; i++)
        {
            let stringPattern = patternsAsStrings[i];
            regexes.push(new RegExp(stringPattern, "gm"));
        }

        wrapParams.NametagFormats = regexes;
    }

    protected static SetBooleansFromParams(baseParams: object, wrapParams: CoreWrapParams)
    {
        wrapParams.ParenthesesAlignment = baseParams[names.ParenthesisAlignment] === 'true';
        wrapParams.SplitWordsBetweenLines = baseParams[names.SplitWordsBetweenLines] === 'true';
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
};