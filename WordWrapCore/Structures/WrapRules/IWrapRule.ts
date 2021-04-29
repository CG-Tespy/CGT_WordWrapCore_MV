/**
 * Encapsulates algorithms that ensure that text follows a certain rule, like
 * making sure each line follows a word count minimum.
 */
export interface IWrapRule<TInputOutput>
{
    /**
     * Returns a copy of the input with this rule applied.
     */
    AppliedTo(input: TInputOutput): TInputOutput;

}
