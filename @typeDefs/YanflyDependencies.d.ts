declare namespace Yanfly
{
    namespace Param
    {
        let FaceWidth: number;
    }

    namespace Message
    {
        let version: number;
    }

    namespace MsgBacklog
    {
        let version: number;
    }
}


declare class Window_MessageBacklog extends Window_Command
{
    convertMessageText(text: string): string;
    WrapText(text: string): string;
}

declare class Window_NameBox extends Window_Base
{
    refresh(text: string, position: any);
    _text: string;
    UpdateWWCoreNametagText();
    ClearNameText();
}