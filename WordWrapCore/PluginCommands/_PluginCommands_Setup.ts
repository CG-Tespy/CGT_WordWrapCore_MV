
import { SetBoldItalicPadding } from './SetBoldItalicPadding';
import { SetLineMinCharCount } from './SetLineMinCharCount';
import { SetMugshotPadding } from './SetMugshotPadding';
import { SetParenthesisAlignment } from './SetParenthesisAlignment';

import { pluginCommandPrefix } from '../Shared/_Strings';
import { SetMugshotWidth } from './SetMugshotWidth';
import { SetSidePadding } from './SetSidePadding';
import { SetWordSeparator } from './SetWordSeparator';

let commands = 
[
    SetBoldItalicPadding,
    SetLineMinCharCount,

    SetMugshotPadding,
    SetMugshotWidth,
    
    SetParenthesisAlignment,
    SetSidePadding,
    SetWordSeparator,
];

let Register = CGT.Core.PluginCommands.Register;

for (const commandFunc of commands)
{
    let commandName = pluginCommandPrefix + commandFunc.name;
    Register(commandName, commandFunc);
}