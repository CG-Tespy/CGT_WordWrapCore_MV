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
            OverflowFinder: OverflowFinding.IOverflowFinder;
        }

        namespace OverflowFinding
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
                FindFor(text: string, line: string): boolean;
            }

            /**
             * What WordWrappers use to see when overflow would happen on a physical basis.
             * Must be subclassed.
             */
            class SpacialOverflowFinder implements ISpacialOverflowFinder
            {
                constructor(textField?: Bitmap);
                get TextField(): Bitmap;
                set TextField(value);
                FindFor(text: string, line: string): boolean;
            }

            /**
             * Takes the space inside a message box (usually within a Bitmap)
             * into account when finding overflow.
             */
            interface ISpacialOverflowFinder extends IOverflowFinder
            {
                TextField: Bitmap;
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
            class TextMeasurer implements ITextMeasurer
            {
                get History(): string[];
            
                MeasureFor(text: string): number;
                RegisterInHistory(text: string);
                ClearHistory();
            }
        }

        /** 
         * Encapsulates an algorithm for doing word-wrapping. 
         * You're supposed to inherit from this class and override the hooks;
         * we're using the Template Method pattern here.
         * */
        class WordWrapper implements IWordWrapper
        {
            /** A unique code for this particular wrapper class. */
            get WrapCode(): string;

            Wrap(args: IWordWrapArgs): string;
            get NametagFormats(): RegExp[];

            /**
             * Wraps the (nametagless) text into a string array holding the lines.
             * @param text 
             */
            protected AsWrappedLines(textField: Bitmap, text: string): string[]

            get OverflowFinder(): OverflowFinding.IOverflowFinder;
            set OverflowFinder(value);

            constructor(overflowFinder?: OverflowFinding.IOverflowFinder);
        }

        /** Context for word-wrappers to do their thing. */
        interface IWordWrapArgs
        {
            textField: Bitmap;
            textToWrap: string;
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
            get NametagFormats(): RegExp[];

            /** 
             * Whether or not this aligns parentheses a certain way.
             */
            get ParenthesesAlignment(): boolean;
            set ParenthesesAlignment(value);

            /**
             * How many words this makes sure each line has, when the text
             * besides the nametag has enough.
             */
            get LineMinWordCount(): number;
            set LineMinWordCount(value);

            /** 
             * You'll want this to be set to true if your game's text is all in Japanese,
             * or some other language that doesn't use English spaces.
             */
            get SplitWordsBetweenLines(): boolean;
            set SplitWordsBetweenLines(value);
            
            /** 
             * You put these in the text where you want to guarantee a line break.
             */
            get LineBreakMarkers(): string[];


        }

        let Params: CoreWrapParams;

        interface ILineWrapper
        {
            WrapIntoLines(textField: Bitmap, nametaglessText: string): string[];
        }

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

                /** Override this to dictate whether this rule can apply to the input. */
                protected CanApplyTo(input: TInputOutput): boolean;

                /** Override this to handle the actual rule-applying */
                protected ProcessInput(input: TInputOutput): TInputOutput;
            }

            /** 
             * WrapRule that works with and returns arrays of strings. Meant to do their thing to 
             * the results of the initial line-wrapping process.
             * */
            class LineWrapRule extends WrapRule<string[]> {}

            /** Default post-rule for enforcing a minimum-words-per-line rule */
            class WordPerLineMin extends LineWrapRule {}

            /** Default post-rule for having certain parenthesis-having text aligned with spaces when needed */
            class ParenthesisAlignment extends LineWrapRule {}

            /** 
             * WrapRule that works with and returns strings. Meant to do their thing to text
             * BEFORE it goes through the initial line-wrapping process.
             * */
            class StringWrapRule extends WrapRule<string> {}

            /** 
             * Default pre-rule for removing all newlines from the input; the initial
             * line-wrapping process should decide how lines are split
             */
            class WithoutBaseNewlines extends StringWrapRule {}

            /** 
             * Default pre-rule for removing trailing, leading, and consecutive spaces
             * from the input.
             */ 
            class WithoutExtraSpaces extends StringWrapRule {}

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
    }
}