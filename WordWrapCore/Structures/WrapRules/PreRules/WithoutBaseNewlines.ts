import { StringWrapRule } from './StringWrapRule';
import { newlines } from '../../../Shared/_Regexes';
import { emptyString } from '../../../Shared/_Strings';

/** For removing all newlines that were already in the input it gets given. */
export class WithoutBaseNewlines extends StringWrapRule
{
    ProcessNormally(text: string)
    {
        return text.replace(newlines, emptyString);
    }
}