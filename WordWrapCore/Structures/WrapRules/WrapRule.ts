import { IWrapRule } from './IWrapRule';

export abstract class WrapRule<TInputOutput> implements IWrapRule<TInputOutput>
{
    AppliedTo(input: TInputOutput): TInputOutput
    {
        if (!this.CanApplyTo(input))
            return input;

        return this.ProcessInput(input);
    }

    protected CanApplyTo(input: TInputOutput): boolean
    {
        return input != null;
    }

    /** Where the actual applying happens. */
    protected abstract ProcessInput(input: TInputOutput): TInputOutput
}