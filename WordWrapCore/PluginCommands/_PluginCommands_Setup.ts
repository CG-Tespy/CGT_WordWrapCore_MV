import { SetActiveWrapper } from './SetActiveWrapper';
import { SetLineMinCharCount } from './SetLineMinCharCount';
import { pluginCommandPrefix } from '../Shared/_Strings';
import { SetParenthesisAlignment } from './SetParenthesisAlignment';

let commands = 
[
    SetActiveWrapper,
    SetLineMinCharCount,
    SetParenthesisAlignment,
];

let Register = CGT.Core.PluginCommands.Register;

for (const commandFunc of commands)
{
    let commandName = pluginCommandPrefix + commandFunc.name;
    Register(commandName, commandFunc);
}