let commandName = "SetActiveWrapper";
function SetActiveWrapper(args: string[]): void
{
    let wrapCode = args[0];
    CGT.WWCore.SetActiveWrapper(wrapCode);
}

let Register = CGT.Core.PluginCommands.Register;
Register(commandName, SetActiveWrapper);