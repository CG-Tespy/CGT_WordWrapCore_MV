import { singleSpace } from '../../Shared/_Strings';
import { CoreWrapParams } from '../../Structures/CoreWrapParams';
import { IWordWrapArgs } from '../../Structures/WordWrappers/WordWrapArgs/IWordWrapArgs';

export function ApplyWindowMessageOverrides(coreParams: CoreWrapParams)
{
    OverrideConvertEscapeCharacters();
    OverrideOpen();
}

function OverrideConvertEscapeCharacters()
{
    let oldVersion = Window_Message.prototype.convertEscapeCharacters;
    Window_Message.prototype.convertEscapeCharacters = NewConvertEscapeCharacters;
    
    function NewConvertEscapeCharacters(text: string): string
    {
        CGT.WWCore.currentMessageIsBubble = IsMessageBubble(text);
        text = ControlCharCleanup(text);
        return oldVersion.call(this, text);
    }
    
    function ControlCharCleanup(text: string): string
    {
        // Gets rid of certain control chars that can mess up the wrapping. Note that
        // this should happen before any text gets wrapped.
        var problemControlChars = /\\>|\\</gm;
        return text.replace(problemControlChars, singleSpace);
    }

    function IsMessageBubble(message: string): boolean
    {
        let itIsGalvBubble = galvBubbleTag.test(message);
        return itIsGalvBubble;
    }

    let galvBubbleTag: RegExp = /pop\[([-a]*\d*)+(,[0-9]+)*\]/;

}

function OverrideOpen()
{
    let oldOpen = Window_Message.prototype.open;

    function NewOpen(this: Window_Message): void
    {
        if (ShouldApplyWrappedText.call(this))
        {
            ApplyWrappedText.call(this);
            UpdateGalvGlobals.call(this);
        }
        oldOpen.call(this);
    }

    function ShouldApplyWrappedText()
    {
        let textStateIsThere = this._textState != null; 
        // ^It sometimes is null when this func is called, so...
        // when that's the case, we should NOT touch it

        return textStateIsThere;
    }

    function ApplyWrappedText(this: Window_Message): void
    {
        let wrapTarget = DecideOnWrapTarget();
        var wrapperToUse: WordWrapper = DecideWrapperToUse(wrapTarget);

        var wrapArgs: IWordWrapArgs = GetInfoForWrapper.call(this, wrapTarget);
        var wrappedText = wrapperToUse.Wrap(wrapArgs);

        this._textState.text = wrappedText;
    }

    type WordWrapper = CGT.WWCore.WordWrapper;
    function DecideWrapperToUse(wrapTarget: CGT.WWCore.WrapTarget): WordWrapper
    {
        let activeWrappers = CGT.WWCore.ActiveWrappers;
        var theOneToUse: WordWrapper = activeWrappers.get(wrapTarget);
        return theOneToUse;
    }

    function DecideOnWrapTarget() : CGT.WWCore.WrapTarget
    {
        let WrapTarget = CGT.WWCore.WrapTarget;
        let decidedOn: CGT.WWCore.WrapTarget;

        if (CGT.WWCore.currentMessageIsBubble)
            decidedOn = WrapTarget.Bubble;
        else
            decidedOn = WrapTarget.MessageBox;
        
        return decidedOn;
    }

    function GetInfoForWrapper(this: Window_Message, wrapTarget: CGT.WWCore.WrapTarget): IWordWrapArgs
    {
        let wrapArgs: IWordWrapArgs = null;
        let spacing: IWrapperSpacing = null;
        let wrapperSpacing = CGT.WWCore.WrapperSpacing;

        spacing = wrapperSpacing.get(wrapTarget);

        let rawText = this._textState.text + "";
        let textField = this.contents;

        wrapArgs = 
        {
            textField: textField,
            rawTextToWrap: rawText,
            spacing: spacing,
            ignoreYanflyNamebox: false,
        };

        return wrapArgs;
    }

    type IWrapperSpacing = CGT.WWCore.IWrapperSpacing;

    function UpdateGalvGlobals(this: Window_Message)
    {
        let textForMessageStyles = "";
        let showingBubble = this.pTarget != null;
        
        if (showingBubble)
            textForMessageStyles = this._textState.text;

        CGT.WWCore.textForGalvMessageStyles = textForMessageStyles;
    }
    Window_Message.prototype.open = NewOpen;
}
