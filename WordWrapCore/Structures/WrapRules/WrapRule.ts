import { IWrapRule } from './IWrapRule';

export abstract class WrapRule<TInput> implements IWrapRule<TInput>
{
    AppliedTo(input: TInput): TInput
    {
        if (!this.CanApplyTo(input))
            return input;

        return this.ProcessInput(input);
    }

    CanApplyTo(input: TInput): boolean
    {
        return input != null;
    }

    /** Where the actual applying happens. */
    protected abstract ProcessInput(input: TInput): TInput
}