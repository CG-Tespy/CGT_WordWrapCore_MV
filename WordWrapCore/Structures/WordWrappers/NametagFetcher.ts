import { emptyString } from '../../Shared/_Strings';
import { newlines } from '../../Shared/_Regexes';
import { IRegexEntry } from '../IRegexEntry';
import { IWordWrapArgs } from './WordWrapArgs/IWordWrapArgs';

export class NametagFetcher
{
    FetchFrom(text: string, wrapArgs: IWordWrapArgs)
    {
        if (!this.ShouldScanForNametagIn(text, wrapArgs))
        { 
            return emptyString; 
        }

        let nametagsFound: RegExpMatchArray = [];

        for (const format of this.NametagFormats)
        {
            if (!format.Enabled)
                continue;
            let formatRegex = format.Regex;
            let matchesFound = text.match(formatRegex) || [];
            nametagsFound = nametagsFound.concat(matchesFound);
        }

        nametagsFound.push(emptyString); // For when no matches were found
        let firstMatch = 0;
        return nametagsFound[firstMatch].trim().replace(newlines, emptyString); 
        // We don't want any extra spaces in the tag. We also want to account for when a
        // nametag regex includes a newline for the sake of better detection
    }

    protected ShouldScanForNametagIn(text: string, wrapArgs: IWordWrapArgs): boolean
    {
        return !this.YanflyNametagIsThere(wrapArgs) && !this.HasDisableNametagScanTag(text);
    }

    protected YanflyNametagIsThere(wrapArgs: IWordWrapArgs): boolean 
    { 
        // Since the nametag gets taken out of the text by the time FetchFrom gets called,
        // at least in normal message boxes
        let shouldCareForIt = !wrapArgs.ignoreYanflyNamebox;
        let theNametag = CGT.WWCore.Yanfly.activeNametagText;
        return shouldCareForIt && theNametag.length > 0; 
    }

    protected HasDisableNametagScanTag(text: string)
    {
        return text.match(NametagFetcher.noNametagScanTag) != null;
    }

    protected static noNametagScanTag: RegExp = /<disableNametagScan>\s?/gmi;

    protected WithoutNametagScanTags(text: string)
    {
        return text.replace(NametagFetcher.noNametagScanTag, emptyString);
    }

    protected get NametagFormats(): IRegexEntry[] 
    { 
        // @ts-ignore
        return CGT.WWCore.Params.NametagFormats;
    }
}