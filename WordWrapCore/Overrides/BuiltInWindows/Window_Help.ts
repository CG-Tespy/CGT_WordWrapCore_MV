import { IWordWrapArgs } from '../../Structures/WordWrappers/WordWrapArgs/IWordWrapArgs';
let oldSetText = Window_Help.prototype.setText;

// This is for the window that shows descs of items and such
export function ApplyWindowHelpOverrides()
{
    let defaultWordWrapArgs: IWordWrapArgs = 
    {
        textField: null,
        rawTextToWrap: "",
    };
    
    Window_Help.prototype.wordWrapArgs = Object.assign({}, defaultWordWrapArgs);
    Window_Help.prototype.setText = NewSetText;
}

function NewSetText(this: Window_Help, text: string)
{
    text += ""; // In case a number or something else is passed

    if (CGT.WWCore.Params.WrapDescs)
    {
        ApplyDescWrapping.call(this, text);
        this.refresh();
    }
    else
    {
        oldSetText.call(this, text);
    }
}

function ApplyDescWrapping(this: Window_Help, text: string)
{
    UpdateWrapArgs.call(this, text);
    let wordWrapper = CGT.WWCore.ActiveWrapper;
    this._text = wordWrapper.Wrap(this.wordWrapArgs);
}

function UpdateWrapArgs(this: Window_Help, text: string)
{
    this.wordWrapArgs.textField = this.contents;
    this.wordWrapArgs.rawTextToWrap = text;
}