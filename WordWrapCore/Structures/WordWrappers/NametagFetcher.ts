import { emptyString } from '../../Shared/_Strings';

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
        return nametagsFound[firstMatch];
    }

    protected get NametagFormats(): RegExp[] 
    { 
        // @ts-ignore
        return CGT.WWCore.Params.NametagFormats; 
    }
}