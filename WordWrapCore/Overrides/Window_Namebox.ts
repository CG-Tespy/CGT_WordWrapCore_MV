export function ApplyWindowNameBoxOverrides()
{
    let yanflyNamespaceIsThere = window.Yanfly != null;
    let messageCoreIsThere = yanflyNamespaceIsThere && window.Yanfly.Message != null;

    if (!messageCoreIsThere)
        return;

    OverrideNameBoxRefresh();
    OverrideNameBoxDeactivate();
    OverrideNameBoxClose();
}

function OverrideNameBoxRefresh()
{
    var oldNameBoxRefresh = Window_NameBox.prototype.refresh;

    function NewRefreshNameBox(text: string, position)
    {
        var oldResult = oldNameBoxRefresh.call(this, text, position);

        CGT.WWCore.activeYanflyNametag = this._text;
        return oldResult;
    }

    Window_NameBox.prototype.refresh = NewRefreshNameBox;
}

function OverrideNameBoxDeactivate()
{
    let oldNameBoxDeactivate = Window_NameBox.prototype.deactivate;

    function NewNameBoxDeactivate()
    {
        oldNameBoxDeactivate.call(this);
        this._text = ""; 
        // So we know when the namebox is showing anything. After all, even when invisible, the namebox 
        // keeps the text it was displaying before
    }

    Window_NameBox.prototype.deactivate = NewNameBoxDeactivate;

}

function OverrideNameBoxClose()
{
    let oldNameBoxClose = Window_NameBox.prototype.close;

    function NewNameBoxClose()
    {
        oldNameBoxClose.call(this);
        this._text = "";
    }

    Window_NameBox.prototype.close = NewNameBoxClose;
}