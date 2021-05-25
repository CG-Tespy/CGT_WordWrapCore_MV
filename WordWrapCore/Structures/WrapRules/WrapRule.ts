import { IWrapRule } from './IWrapRule';

/**
 * Base class for applying certain rules to text meant to be word-wrapped.
 * Can be made to not quite apply if the text has tags meant to tell the rule not
 * to apply; in that case, all the rules will do is remove said tags, otherwise
 * leaving the input as-is.
 */
export abstract class WrapRule<TInputOutput> implements IWrapRule<TInputOutput>
{
    /** Regexes for tags that say that this particular rule shouldn't apply to certain inputs. */
    get InvalidationTags(): RegExp[] { return this.invalidationTags.slice(); } 

    /** Override this to set the tags your rule should only handle removing. */
    protected invalidationTags: RegExp[] = [];

    AppliedTo(input: TInputOutput): TInputOutput
    {
        if (!this.CanApplyTo(input))
            return input;

        return this.ProcessInput(input);
    }

    /**
     * Does not take into account tags telling the rule not to apply.
     */
    protected CanApplyTo(input: TInputOutput): boolean
    {
        return input != null;
    }

    /**
     *  Handles either applying the rule, or removing the tags telling it to
    not quite apply.
     * @param input 
     */
    protected ProcessInput(input: TInputOutput): TInputOutput
    {
        if (this.ShouldRemoveTagsFrom(input))
            return this.WithoutTags(input);
        else
            return this.ProcessNormally(input);
    }

    /** Override this if there are any tags to tell this rule not to apply. */
    protected ShouldRemoveTagsFrom(input: TInputOutput): boolean { return false; }

    /** Returns the passed input, minus the tags telling it not to apply. */
    protected WithoutTags(input: TInputOutput): TInputOutput { return input; }

    /** Where the actual applying happens. */
    protected abstract ProcessNormally(input: TInputOutput): TInputOutput

    /** Whether or not the text has any tags that'd tell this rule not to apply to it. */
    IsValidFor(text: string): boolean
    {
        for (const tag of this.invalidationTags)
        {
            let hasTag = text.match(tag) != null;
            if (hasTag)
                return false;
        }

        return true;
    }
}