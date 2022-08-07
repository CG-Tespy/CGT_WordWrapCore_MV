import { StringWrapRule } from './StringWrapRule';
import { newlines } from '../../../Shared/_Regexes';

/** For replacing all newlines that were already in the input it gets given,
 * with the word separator set in the params. */
export class TurnNewlinesIntoSeparators extends StringWrapRule
{
    ProcessNormally(text: string)
    {
        return text.replace(newlines, this.WordSeparator);
    }

    protected get WordSeparator() { return CGT.WWCore.Params.WordSeparator; }
}