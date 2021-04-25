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
            Wrap(textField: Bitmap, text: string): string;
            OverflowFinder: IOverflowFinder;
        }
      
        /**
         * What WordWrappers use to see when overflow would happen. 
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
         * What WordWrappers use to see when overflow would happen.
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
         * Encapsulates an algorithm for doing word-wrapping. 
         * You're supposed to inherit from this class and override the hooks;
         * we're using the Template Method pattern here.
         * */
        class WordWrapper implements IWordWrapper
        {
            Wrap(textField: Bitmap, text: string): string;
            get NametagFormats(): RegExp[];

            // These are the hooks you may want to override
            /**
             * For when you need to make any alterations to the text before wrapping it.
             * @param text 
             */
            protected PreparedForWrapping(text: string): string

            /**
             * Wraps the (nametagless) text into a string array holding the lines.
             * @param text 
             */
            protected AsWrappedLines(textField: Bitmap, text: string): string[]

            /**
             * Used to help decide where newlines should go to prevent overflow
             */
            protected WouldCauseOverflow(currentWord: string, currentLine: string): boolean

            get OverflowFinder(): IOverflowFinder;
            set OverflowFinder(value);

            /** A unique code for this particular wrapper class. */
            get WrapCode(): string;

            constructor(overflowFinder?: IOverflowFinder);
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