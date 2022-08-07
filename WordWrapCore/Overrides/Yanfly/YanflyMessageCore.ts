export function ApplyYanflyMessageCoreOverrides()
{
    if (!YanflyMessageCoreIsAvailable())
        return;

    ApplyWindowNameBoxOverrides();
}

function YanflyMessageCoreIsAvailable(): boolean
{
    let messageCoreName = "YEP_MessageCore";
    let messageCoreParams = PluginManager.parameters(messageCoreName);
    let messageCoreIsThere = Object.keys(messageCoreParams).length > 0;
    return messageCoreIsThere;
}

export function ApplyWindowNameBoxOverrides()
{
    OverrideNameBoxRefresh();
    OverrideNameBoxDeactivate();
    OverrideNameBoxClose();

    AddNewNameboxFunctions();
}

function OverrideNameBoxRefresh()
{
    var oldNameBoxRefresh = Window_NameBox.prototype.refresh;

    function NewRefreshNameBox(this: Window_NameBox, text: string, position: any)
    {
        var oldResult = oldNameBoxRefresh.call(this, text, position);
        this.UpdateWWCoreNametagText();
        return oldResult;
    }

    Window_NameBox.prototype.refresh = NewRefreshNameBox;
}

function UpdateWWCoreNametagText(this: Window_NameBox)
{
    CGT.WWCore.Yanfly.activeNametagText = this._text;
}

function OverrideNameBoxDeactivate()
{
    let oldNameBoxDeactivate = Window_NameBox.prototype.deactivate;

    function NewNameBoxDeactivate(this: Window_NameBox)
    {
        oldNameBoxDeactivate.call(this);
        this.ClearNameText();
        this.UpdateWWCoreNametagText();
    }

    Window_NameBox.prototype.deactivate = NewNameBoxDeactivate;

}

function ClearNameText(this: Window_NameBox)
{
    this._text = "";
}

function OverrideNameBoxClose()
{
    let oldNameBoxClose = Window_NameBox.prototype.close;

    function NewNameBoxClose(this: Window_NameBox)
    {
        oldNameBoxClose.call(this);
        this.ClearNameText();
        this.UpdateWWCoreNametagText();
    }

    Window_NameBox.prototype.close = NewNameBoxClose;
}

function AddNewNameboxFunctions()
{
    Window_NameBox.prototype.UpdateWWCoreNametagText = UpdateWWCoreNametagText;
    Window_NameBox.prototype.ClearNameText = ClearNameText;
}