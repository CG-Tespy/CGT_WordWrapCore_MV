import { IWordWrapArgs } from '../../Structures/WordWrappers/WordWrapArgs/IWordWrapArgs';
let oldSetText = Window_Help.prototype.setText;

// This is for the window that shows descs of items and such
export function ApplyWindowHelpOverrides()
{
    let defaultWordWrapArgs: IWordWrapArgs = 
    {
        textField: null,
        rawTextToWrap: "",
        widthOffset: 0,
    };
    
    Window_Help.prototype.wordWrapArgs = Object.assign({}, defaultWordWrapArgs);
    Window_Help.prototype.setText = NewSetText;
}

function NewSetText(this: Window_Help, text: string)
{
    text += ""; // In case a number or something else is passed
    ApplyDescWrapping.call(this, text);
    this.refresh();
}

function ApplyDescWrapping(this: Window_Help, text: string)
{
    UpdateWrapArgs.call(this, text);
    let WrapTarget = CGT.WWCore.WrapTarget;
    let wordWrapper = CGT.WWCore.ActiveWrappers.get(WrapTarget.Descs);
    let wrappedText = wordWrapper.Wrap(this.wordWrapArgs);
    this._text = wrappedText;
}

function UpdateWrapArgs(this: Window_Help, text: string)
{
    this.wordWrapArgs.textField = this.contents;
    this.wordWrapArgs.rawTextToWrap = text;
}