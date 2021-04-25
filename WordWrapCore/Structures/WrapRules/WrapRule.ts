/**
 * Encapsulates algorithms that ensure that text follows a certain rule, like
 * making sure each line follows a word count minimum.
 */
export interface IWrapRuleApplier
{
    /**
     * Returns a copy of the text with this rule applied.
     * @param lines 
     */
    AppliedTo(lines: string[]): string[];

    CanApplyTo(lines: string[]): boolean;
}

export abstract class WrapRule implements IWrapRuleApplier
{
    AppliedTo(lines: string[]): string[] 
    {
        if (!this.CanApplyTo(lines))
            return lines;

        lines = lines.slice(); // So we don't modify the original input
        return this.ProcessText(lines);
    }

    abstract CanApplyTo(lines: string[]): boolean

    /** Where the actual applying happens. */
    protected abstract ProcessText(linesCopy: string[]): string[]
    
}