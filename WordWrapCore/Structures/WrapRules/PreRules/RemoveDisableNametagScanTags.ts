import { disableNametagScanTag } from '../../../Shared/_Regexes';
import { StringWrapRule } from './StringWrapRule';
import { emptyString } from '../../../Shared/_Strings';

export class RemoveDisableNametagScanTags extends StringWrapRule
{
    // Pre-rules execute before the nametag gets fetched, and as the fetcher should return nothing
    // if the tag is there...
    protected ProcessNormally(input: string): string {
        return input.replace(disableNametagScanTag, emptyString);
    }

}