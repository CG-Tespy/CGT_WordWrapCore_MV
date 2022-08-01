import { singleSpace } from '../Shared/_Strings';
import { CoreWrapParams } from '../Structures/CoreWrapParams';
import { IWordWrapArgs } from '../Structures/WordWrappers/WordWrapArgs/IWordWrapArgs';

export function ApplyWindowMessageOverrides(coreParams: CoreWrapParams)
{
    OverrideStartMessage();
    OverrideConvertEscapeCharacters();
}

function OverrideStartMessage()
{
    function NewStartMessage(this: Window_Message): void
    {
        InitTextState.call(this);
        ApplyWrappedText.call(this);
    
        this.newPage(this._textState);
        this.updatePlacement();
        this.updateBackground();
        this.open();
    }

    function InitTextState(this: Window_Message): void
    {
        // @ts-ignore
        this._textState = {};
        this._textState.index = 0;
        this._textState.text = this.convertEscapeCharacters($gameMessage.allText());
    }

    function ApplyWrappedText(this: Window_Message): void
    {
        type WordWrapper = CGT.WWCore.WordWrapper;
        var activeWrapper: Readonly<WordWrapper> = CGT.WWCore.ActiveWrapper;
        
        var wrapArgs: IWordWrapArgs = GetInfoForWrapper.call(this);
        var wrappedText = activeWrapper.Wrap(wrapArgs);

        this._textState.text = wrappedText;
    }

    function GetInfoForWrapper(this: Window_Message): IWordWrapArgs
    {
        let rawText = this._textState.text + "";
        let textField = this.contents;
        let wrapArgs: IWordWrapArgs = 
        {
            textField: textField,
            rawTextToWrap: rawText,
        };

        return wrapArgs;
    }

    Window_Message.prototype.startMessage = NewStartMessage;
}

function OverrideConvertEscapeCharacters()
{
    let oldConvertEscapeCharacters = Window_Message.prototype.convertEscapeCharacters;
    Window_Message.prototype.convertEscapeCharacters = NewConvertEscapeCharacters;
    
    function NewConvertEscapeCharacters(text: string): string
    {
        text = ControlCharCleanup(text);
        return oldConvertEscapeCharacters.call(this, text);
    }
    
    function ControlCharCleanup(text: string): string
    {
        // Gets rid of certain control chars that can mess up the wrapping. Note that
        // this should happen before any text gets wrapped.
        var problemControlChars = /\\>|\\</gm;
        return text.replace(problemControlChars, singleSpace);
    }
}
