import { WrapRule } from '../WrapRule';

/** For Wrap Rules that work with wrapped lines of text */
export abstract class LineWrapRule extends WrapRule<string[]> {}