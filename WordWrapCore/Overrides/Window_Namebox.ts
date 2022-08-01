export function ApplyWindowNameboxOverrides()
{
    let yanflyNamespaceIsThere = window.Yanfly != null;
    let messageCoreIsThere = yanflyNamespaceIsThere && window.Yanfly.Message != null;

    if (!messageCoreIsThere)
        return;

    OverrideNameboxRefresh();
    OverrideNameboxDeactivate();
}

function OverrideNameboxRefresh()
{
    // @ts-ignore
    var oldNameboxRefresh = Window_Namebox.prototype.refresh;

    function NewRefreshNamebox(text: string, position)
    {
        var oldResult = oldNameboxRefresh.call(this, text, position);

        CGT.WWCore.activeYanflyNametag = this._text;
        return oldResult;
    }

    // @ts-ignore
    Window_Namebox.prototype.refresh = NewRefreshNamebox;
}

function OverrideNameboxDeactivate()
{
    // @ts-ignore
    let oldNameboxDeactivate = Window_Namebox.prototype.deactivate;

    function NewNameboxDeactivate()
    {
        oldNameboxDeactivate.call(this);
        this._text = ""; 
        // So we know when the namebox is showing anything. After all, even when invisible, the namebox 
        // keeps the text it was displaying before
    }

}