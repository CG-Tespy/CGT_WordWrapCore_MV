import { StringWrapRule } from './StringWrapRule';
import { doubleSpaces } from '../../../Shared/_Regexes';
import { singleSpace } from '../../../Shared/_Strings';

export class WithoutExtraSpaces extends StringWrapRule
{
    ProcessNormally(text: string)
    {
        return text.replace(doubleSpaces, singleSpace)
    }
}