import { singleSpace } from '../../Shared/_Strings';
import { CoreWrapParams } from '../../Structures/CoreWrapParams';
import { IWordWrapArgs } from '../../Structures/WordWrappers/WordWrapArgs/IWordWrapArgs';

export function ApplyWindowMessageOverrides(coreParams: CoreWrapParams)
{
    OverrideOpen();
    OverrideConvertEscapeCharacters();
}

function OverrideOpen()
{
    let oldOpen = Window_Message.prototype.open;

    function NewOpen(this: Window_Message): void
    {
        ApplyWrappedText.call(this);
        oldOpen.call(this);
    }

    function ApplyWrappedText(this: Window_Message): void
    {
        let textStateIsThere = this._textState != null; 
        // ^It sometimes is null when this func is called, so...

        if (!textStateIsThere)
            return; // We need to stop here to avoid a crash

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
            widthOffset: 0,
        };

        return wrapArgs;
    }

    Window_Message.prototype.open = NewOpen;
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
