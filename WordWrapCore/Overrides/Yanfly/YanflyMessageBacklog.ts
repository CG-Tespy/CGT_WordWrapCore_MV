export function ApplyYanflyMsgBacklogOverrides()
{
    if (!YanflyMessageBacklogIsThere())
        return null;

    OverrideAddIndividualLines();
    AddNewMemberFunctions();
}

function YanflyMessageBacklogIsThere()
{
    let messageBacklogName = "YEP_X_MessageBacklog";
    let messageBacklogParams = PluginManager.parameters(messageBacklogName);
    let itIsThere = Object.keys(messageBacklogParams).length > 0;
    return itIsThere;
}

function OverrideAddIndividualLines()
{
    let oldVersion = Window_MessageBacklog.prototype.addIndividualLines;

    function NewAddIndividualLines(this: Window_MessageBacklog, text: string)
    {
        let wrappedText = this.WrapText(text);
        oldVersion.call(this, wrappedText);
    }

    Window_MessageBacklog.prototype.addIndividualLines = NewAddIndividualLines;
    
}

function WrapText(this: Window_MessageBacklog, text: string): string
{
    let WrapTarget = CGT.WWCore.WrapTarget;
    var activeWrapper = CGT.WWCore.ActiveWrappers.get(WrapTarget.MessageBacklog);
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