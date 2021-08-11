import { StringWrapRule } from './StringWrapRule';
import { newlines } from '../../../Shared/_Regexes';
import { emptyString } from '../../../Shared/_Strings';

/** For replacing all newlines that were already in the input it gets given,
 * with the word separator set in the params. */
export class ReplaceBaseNewlinesWithSeparator extends StringWrapRule
{
    ProcessNormally(text: string)
    {
        return text.replace(newlines, this.WordSeparator);
    }

    protected get WordSeparator() { return CGT.WWCore.Params.WordSeparator; }
}