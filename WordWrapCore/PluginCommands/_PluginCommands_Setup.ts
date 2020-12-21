import { SetActiveWrapper } from './SetActiveWrapper';
import { SetLineMinWordCount } from './SetLineMinWordCount';
import { SetSplitWordsBetweenLines } from './SetSplitWordsBetweenLines';
import { pluginCommandPrefix } from '../Shared/_Strings';
import { SetParenthesisAlignment } from './SetParenthesisAlignment';

let commands = 
[
    SetActiveWrapper,
    SetLineMinWordCount,
    SetParenthesisAlignment,
    SetSplitWordsBetweenLines,
];

let Register = CGT.Core.PluginCommands.Register;

for (const commandFunc of commands)
{
    let commandName = pluginCommandPrefix + commandFunc.name;
    Register(commandName, commandFunc);
}