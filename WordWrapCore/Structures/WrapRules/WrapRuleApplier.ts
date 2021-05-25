import { LineWrapRule} from "./PostRules/LineWrapRule";
import { StringWrapRule } from './PreRules/StringWrapRule';
import { WrapRule } from './WrapRule';
import { newlines } from '../../Shared/_Regexes';

let ArrayEx = CGT.Core.Extensions.ArrayEx;

export interface IWrapRuleApplier
{
    /** Applies rules meant for the text before it gets wrapped into lines. */
    ApplyPreRulesTo(text: string): string;
    /** Applies rules means for the text after the initial line-wrapping. */
    ApplyPostRulesTo(lines: string[]): string[];

}

/** Applies Wrap Rules for the word-wrapping process. */
export class WrapRuleApplier implements IWrapRuleApplier
{
    protected preWrapRules: Set<StringWrapRule> = new Set<StringWrapRule>();
    protected postWrapRules: Set<LineWrapRule> = new Set<LineWrapRule>();

    ApplyPreRulesTo(text: string): string
    {
        return this.ApplyRules(this.preWrapRules, text);
    }

    /** Exists to cut down on boilerplate code */
    protected ApplyRules<TInput, TRuleType extends WrapRule<TInput>>(rules: Set<TRuleType>, 
        input: TInput): TInput
    {
        for (const ruleEl of rules)
        {
            input = ruleEl.AppliedTo(input);
        }

        return input;
    }

    ApplyPostRulesTo(lines: string[]): string[]
    {
        return this.ApplyRules(this.postWrapRules, lines);
    }

    RegisterPreRule(rule: StringWrapRule)
    {
        this.preWrapRules.add(rule);
    }

    RegisterPostRule(rule: LineWrapRule)
    {
        this.postWrapRules.add(rule);
    }

    RemovePreRule(rule: StringWrapRule)
    {
        this.preWrapRules.delete(rule);
    }

    RemovePostRule(rule: LineWrapRule)
    {
        this.postWrapRules.delete(rule);
    }

}