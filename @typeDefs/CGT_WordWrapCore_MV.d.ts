declare namespace CGT
{
    namespace WWCore
    {
        namespace Shared
        {
            
            namespace Regexes
            {
                let doubleSpaces: RegExp;
                let newlines: RegExp;
                let notWhitespace: RegExp;
                let spaceAsSeparator: RegExp;
                let yanflyNametag: RegExp;
                let basicNametag: RegExp;
                let bracketNametag: RegExp;
                let bracketNametagNoColon: RegExp;
            }

            namespace Strings
            {
                let singleNewline: string;
                let singleSpace: string;
                let emptyString: string;

                let corePluginName: string;
            }
        }

        interface IWordWrapper
        {
            Wrap(args: IWordWrapArgs): string;
        }

        namespace Overflow
        {
            /**
             * What LineWrappers use to see when overflow would happen.
             */
            interface IOverflowFinder
            {
                /** 
                 * Returns whether or not the line would get too long if the text
                 * were added.
                 */
                Find(args: IOverflowFindArgs): boolean;
            }

            interface IOverflowFindArgs
            {
                word: string;
                line: string;
                wordWrapArgs: IWordWrapArgs;
            }

            abstract class OverflowFinder implements IOverflowFinder
            {
                protected textMeasurer: TextMeasurer;
                
                Find(args: IOverflowFindArgs): boolean 

                /**
                 * How much space there is for text in a mugshotless textbox, after taking into
                 * account non-mugshot-related padding params. This is in a unit decided by the finder.
                 * @param args 
                 */
                protected abstract RegularWrapSpace(args: IOverflowFindArgs): number;
                
                /** Returns how much space there is to have text on a single line. */
                protected GetWrapSpace(args: IOverflowFindArgs): number;

                /** 
                 * How much space there is for text in a textbox without a mugshot, in a
                 * unit decided by the finder.
                 */
                protected abstract FullWrapSpace(args: IOverflowFindArgs): number

                /** Call this after you finish a full wrapping session. */
                OnWrapJobFinished();
            }

            /**
             * Helper for OverflowFinders to detect overflow
             */
            interface ITextMeasurer
            {
                MeasureFor(text: string): number
            }

            /**
             * Measures text based on the space they take up in pixels on screen, with
             * a history to inform its decisions.
             */ 
            abstract class TextMeasurer implements ITextMeasurer
            {
                get History(): string;
                
                protected abstract GetDefaultWidthOf(text: string, textField: Bitmap): number;

                MeasureFor(text: string): number;
                RegisterInHistory(text: string);
                ClearHistory();
            }

        }

        class NametagFetcher
        {
            FetchFrom(text: string): string;
        }

        /** 
         * Encapsulates an algorithm for doing word-wrapping. 
         * You're supposed to inherit from this class and override the hooks;
         * we're using the Template Method pattern here.
         * */
        class WordWrapper implements IWordWrapper
        {
            /** A unique code for this particular wrapper class. */
            static get WrapCode(): string;
            get WrapCode(): string;
            set WrapCode(value);

            Wrap(args: IWordWrapArgs): string;
            get NametagFormats(): INametagFormat[];

            get LineWrapper(): LineWrapper;

            constructor(lineWrapper?: LineWrapper);
        }

        interface INametagFormat
        {
            Name: string;
            RegexAsString: string;
            Regex: RegExp;
        }

        /**
         *  Default wrapper that just returns the input as given... In other words, 
         * a false wrapper.
         * */
        class NullWordWrapper extends WordWrapper {}

        /** Context for word-wrappers to do their thing. */
        interface IWordWrapArgs
        {
            textField: Bitmap;
            rawTextToWrap: string;
        }

        interface ILineWrapper
        {
            WrapIntoLines(args: IWordWrapArgs, actualTextToWrap: string): string[];
        }

        class LineWrapper implements ILineWrapper
        {
            /** Override this in your custom line wrapper  */
            protected overflowFinder: Overflow.OverflowFinder;

            protected underflowCascader: UnderflowCascader;

            WrapIntoLines(args: IWordWrapArgs, actualTextToWrap: string);

            /** Call this after you finish a full wrapping session. */
            OnWrapJobFinished();
        }

        /**
         * Params to affect the word-wrapping, set in the Plugin Manager.
         */
        class CoreWrapParams
        {
            /** Affects how this decides when a line can't hold more. */
            get WrapMode(): string;

            /**
             * 2-arg event that triggers when the wrap mode changes.
             * Arg1: old wrap mode
             * Arg2: new wrap mode
             */
            get WrapModeChanged(): Event;

            /** 
             * Decides how the wrapper detects nametags.
             * Set to the Yanfly format by default. 
             * */
            
            /** 
             * You put these in the text where you want to guarantee a line break.
             */
             get LineBreakMarkers(): string[];

             /** 
             * Regexes (in string form) that define text that should NOT be treated as
             * taking up space in the textbox. 
             * */
            get EmptyText(): RegExp[];


            // ~~~Special Rules~~~

             /**
             * How many characters this makes sure each line has, when the text
             * besides the nametag has enough.
             */
            get LineMinCharCount(): number;
            set LineMinCharCount(value);

            /** 
             * Whether or not this aligns parentheses a certain way.
             */
            get ParenthesesAlignment(): boolean;
            set ParenthesesAlignment(value);

            /** What the wrapper should look for to tell words apart. */
            get WordSeparator(): string;
            set WordSeparator(value);

            /** Whether or not the wrapper should wrap descriptions. */
            get WrapDescs(): boolean;
            set WrapDescs(value);

            /** Whether or not lines in an input after the first should be wider than said first. */
            get CascadingUnderflow(): boolean;
            set CascadingUnderflow(value);

            /** How much wider than the first line that the others from the same input are allowed to be. */
            get CULenience(): number;
            set CULenience(value);

            /** 
             * Whether or not this should keep track of all its outputs, returning them 
             * when given the corresponding inputs.
             */
            get RememberResults(): boolean;
            set RememberResults(value);

            // ~~~Spacing~~~
            /** How wide mugshots are treated as being, in a unit decided by the active wrapper. */
            get MugshotWidth(): number;
            set MugshotWidth(value);

            /** 
             * How much space there is between the mugshot and the text, in a unit 
             * decided by the active wrapper. 
             * */
            get MugshotPadding(): number;
            set MugshotPadding(value);

            /** For the message box sides, in a wrapper-decided unit. */
            get SidePadding(): number;
            set SidePadding(value);

            /** 
             * Multiplier for how much bigger than usual that bolded or italicised letters
             * are treated as being. 1.10 = 110% bigger, 1.34 = 134% bigger, etc.
             */
            get BoldItalicWidthMod(): number;
            set BoldItalicWidthMod(value);
            
        }

        let Params: CoreWrapParams;

        namespace WrapRules
        {
            /**
             * Encapsulates algorithms that ensure that text follows a certain rule, like
             * making sure each line follows a word count minimum.
             */
            interface IWrapRule<TInputOutput>
            {
                /**
                 * Returns a copy of the input with this rule applied.
                 */
                AppliedTo(input: TInputOutput): TInputOutput;

            }

            /** 
             * Contains default implementations of wrap rules. Best inherit from this and 
             * override the hooks for your own custom rules.
             */
            abstract class WrapRule<TInputOutput> implements IWrapRule<TInputOutput> 
            {
                AppliedTo(input: TInputOutput): TInputOutput;

                /** 
                 * Override this to dictate whether this rule can apply to the input. Just
                 * don't have it take into account invalidation tags.
                */
                protected CanApplyTo(input: TInputOutput): boolean;

                /** Override this to handle the actual rule-applying */
                protected abstract ProcessNormally(input: TInputOutput): TInputOutput;
            }

            /** 
             * WrapRule that works with and returns arrays of strings. Meant to do their thing to 
             * the results of the initial line-wrapping process.
             * */
            class LineWrapRule extends WrapRule<string[]> 
            {
                protected ProcessNormally(input: string[]): string[];
            }

            /** Default post-rule for enforcing a minimum-words-per-line rule */
            class WordPerLineMin extends LineWrapRule 
            {
                protected ProcessNormally(input: string[]): string[];
            }

            /** Default post-rule for having certain parenthesis-having text aligned with spaces when needed */
            class ParenthesisAlignment extends LineWrapRule 
            {
                protected ProcessNormally(input: string[]): string[]
            }

            /** 
             * WrapRule that works with and returns strings. Meant to do their thing to text
             * BEFORE it goes through the initial line-wrapping process.
             * */
            class StringWrapRule extends WrapRule<string> 
            {
                protected ProcessNormally(input: string): string;
            }

            /** 
             * Default pre-rule for removing all newlines from the input; the initial
             * line-wrapping process should decide how lines are split
             */
            class WithoutBaseNewlines extends StringWrapRule 
            {
                protected ProcessNormally(input: string): string;
            }

            /** 
             * Default pre-rule for removing trailing, leading, and consecutive spaces
             * from the input.
             */ 
            class WithoutExtraSpaces extends StringWrapRule 
            {
                protected ProcessNormally(input: string): string;
            }

            interface IWrapRuleApplier
            {
                /** Applies rules meant for the text before it gets wrapped into lines. */
                ApplyPreRulesTo(text: string): string;
                /** Applies rules means for the text after the initial line-wrapping. */
                ApplyPostRulesTo(lines: string[]): string[];

            }

            class WrapRuleApplier implements IWrapRuleApplier
            {
                protected preWrapRules: Set<StringWrapRule>;
                protected postWrapRules: Set<LineWrapRule>;

                ApplyPreRulesTo(text: string): string;

                /** Exists to cut down on boilerplate code */
                protected ApplyRules<TInput, TRuleType extends WrapRule<TInput>>(rules: Set<TRuleType>, 
                    input: TInput): TInput;
                
                ApplyPostRulesTo(lines: string[]): string[];

                RegisterPreRule(rule: StringWrapRule);

                RegisterPostRule(rule: LineWrapRule);

                RemovePreRule(rule: StringWrapRule);

                RemovePostRule(rule: LineWrapRule);
            
            }
        }

        /**
         * Sets the active wrapper that matches the passed wrap mode. 
         * Returns false if there is no wrapper registered with that mode,
         * true otherwise.
         * */
        function SetActiveWrapper(wrapMode: string): boolean;

        let ActiveWrapper: Readonly<WordWrapper>;

        function RegisterWrapper(wrapper: WordWrapper);

        let RegisteredWrappers: Readonly<WordWrapper[]>;

        /** Makes sure that the active wrapper matches the current wrap code set. */
        function UpdateActiveWrapper(): void;

        class UnderflowCascader
        {
            protected textMeasurer: Overflow.TextMeasurer;
            WithCascadingUnderflow(args: IUnderflowCascadeArgs);
        }

        interface IUnderflowCascadeArgs
        {
            textField: Bitmap;
            lines: string[];

            /** Index of the line to potentially have a word moved from it to the next */
            focusedLineIndex: number;
        }

        let activeYanflyNametag: string;

        let version: number;
    }
}