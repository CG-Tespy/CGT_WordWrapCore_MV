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
                Find(args: IOverflowFindArgs): boolean 

                /** 
                 * Override this to decide on how much horizontal space this finder
                 * treats any given textbox as having.
                 */
                protected abstract GetWrapWidth(args: IOverflowFindArgs): number;

                /** Call this after you finish a full wrapping session. */
                Refresh();
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
                Find(args: IOverflowFindArgs): boolean;
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
            abstract class TextMeasurer implements ITextMeasurer
            {
                get History(): string;
                
                protected abstract GetDefaultWidthOf(text: string, textField: Bitmap): number;

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
            static get WrapCode(): string;
            get WrapCode(): string;

            Wrap(args: IWordWrapArgs): string;
            get NametagFormats(): RegExp[];

            get OverflowFinder(): OverflowFinding.IOverflowFinder;
            set OverflowFinder(value);

            constructor(overflowFinder?: OverflowFinding.IOverflowFinder);
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
            get EmptyText(): string[];


            // ~~~Special Rules~~~

             /**
             * How many words this makes sure each line has, when the text
             * besides the nametag has enough.
             */
            get LineMinWordCount(): number;
            set LineMinWordCount(value);

            /** 
             * Whether or not this aligns parentheses a certain way.
             */
            get ParenthesesAlignment(): boolean;
            set ParenthesesAlignment(value);

            /** What the wrapper should look for to tell words apart. */
            get WordSeparator(): string;

            /** Whether or not the output should include the WordSeparator. */
            get SeparateWithSeparator(): boolean;

            get WrapDescs(): boolean;

            /** How wide mugshots are treated as being, in a unit decided by the active wrapper. */
            get MugshotWidth(): number;

            /** 
             * How much space there is between the mugshot and the text, in a unit 
             * decided by the active wrapper. 
             * */
            get MugshotPadding(): number;

            /** 
             * For the message box sides, helping prevent overflow while making sure the 
             * wrapping isn't too tight. Also in a unit decided by the active wrapper.
             *  */
            get SidePadding(): number;
            
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
    }
}