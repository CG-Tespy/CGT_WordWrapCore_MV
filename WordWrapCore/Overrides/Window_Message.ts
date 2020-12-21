import { singleSpace } from '../Shared/_Strings';

Window_Message.prototype.startMessage = NewStartMessage;

function NewStartMessage(this: Window_Message): void
{
    // @ts-ignore
    this._textState = {};
    this._textState.index = 0;
    this._textState.text = this.convertEscapeCharacters($gameMessage.allText());

    type WordWrapper = CGT.WWCore.WordWrapper;
    var activeWrapper: Readonly<WordWrapper> = CGT.WWCore.ActiveWrapper;
    
    var rawText = this._textState.text;
    var wrappedText = activeWrapper.Wrap(this.contents, rawText);
    this._textState.text = wrappedText;

    this.newPage(this._textState);
    this.updatePlacement();
    this.updateBackground();
    this.open();
}

let oldConvertEscapeCharacters = Window_Message.prototype.convertEscapeCharacters;
Window_Message.prototype.convertEscapeCharacters = NewConvertEscapeCharacters;

function NewConvertEscapeCharacters(text: string): string
{
    text = ControlCharCleanup(text);
    return oldConvertEscapeCharacters.call(this, text);
}

function ControlCharCleanup(text: string): string
{
    // Gets rid of certain control chars that can mess up the wrapping
    var problemControlChars = /\\>|\\</gm;
    return text.replace(problemControlChars, singleSpace);
}
