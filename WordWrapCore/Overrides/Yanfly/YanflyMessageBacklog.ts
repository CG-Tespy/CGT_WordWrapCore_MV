export function ApplyYanflyMsgBacklogOverrides()
{
    if (!YanflyMessageBacklogIsThere())
        return null;

    OverrideConvertMessageText();
    AddNewMemberFunctions();
}

function YanflyMessageBacklogIsThere()
{
    let namespaceIsThere = window.Yanfly != null;
    let backlogScriptIsThere = namespaceIsThere && window.Yanfly.MsgBacklog != null;

    return backlogScriptIsThere;
}

function OverrideConvertMessageText()
{
    let oldVersion = Window_MessageBacklog.prototype.convertMessageText;

    function NewConvertMessageText(this: Window_MessageBacklog, text: string)
    {
        let baseResult = oldVersion.call(this, text);
        let wrappedText = this.WrapText(baseResult);
        return wrappedText;
    }

    Window_MessageBacklog.prototype.convertMessageText = NewConvertMessageText;
    
}

function WrapText(this: Window_MessageBacklog, text: string): string
{
    var activeWrapper = CGT.WWCore.ActiveWrapper;
    var wrapArgs = 
    {
        textField: this.contents,
        rawTextToWrap: text,
        widthOffset: 0,
    };
    
    var wrappedText = activeWrapper.Wrap(wrapArgs);
    return wrappedText;
}

function AddNewMemberFunctions()
{
    Window_MessageBacklog.prototype.WrapText = WrapText;
}