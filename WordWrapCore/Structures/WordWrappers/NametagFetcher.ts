import { emptyString } from '../../Shared/_Strings';
import { newlines } from '../../Shared/_Regexes';
import { INametagFormat } from '../INametagFormat';

export class NametagFetcher
{
    FetchFrom(text: string)
    {
        if (this.YanflyNametagIsThere) 
            return emptyString; 
            // ^Since the nametag gets taken out of the text by the time this func gets called

        let nametagsFound: RegExpMatchArray = [];

        for (const format of this.NametagFormats)
        {
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

    protected get YanflyNametagIsThere(): boolean { return CGT.WWCore.activeYanflyNametag.length > 0; }

    protected get NametagFormats(): INametagFormat[] 
    { 
        // @ts-ignore
        return CGT.WWCore.Params.NametagFormats; 
    }
}