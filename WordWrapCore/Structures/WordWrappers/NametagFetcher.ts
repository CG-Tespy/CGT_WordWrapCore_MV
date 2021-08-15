import { emptyString } from '../../Shared/_Strings';
import { newlines } from '../../Shared/_Regexes';

export class NametagFetcher
{
    FetchFrom(text: string)
    {
        let nametagsFound: RegExpMatchArray = [];

        for (const format of this.NametagFormats)
        {
            let matchesFound = text.match(format) || [];
            nametagsFound = nametagsFound.concat(matchesFound);
        }

        nametagsFound.push(emptyString); // For when no matches were found
        let firstMatch = 0;
        return nametagsFound[firstMatch].trim().replace(newlines, emptyString); 
        // We don't want any extra spaces in the tag. We also want to account for when a
        // nametag regex includes a newline for the sake of better detection
    }

    protected get NametagFormats(): RegExp[] 
    { 
        // @ts-ignore
        return CGT.WWCore.Params.NametagFormats; 
    }
}