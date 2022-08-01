import { CoreWrapParams } from '../Structures/CoreWrapParams';
import { ApplyWindowMessageOverrides } from './Window_Message';
import { ApplyWindowHelpOverrides } from './Window_Help';
import { ApplyWindowNameboxOverrides } from './Window_NameBox';


export function ApplyOverrides(coreParams: CoreWrapParams)
{
    ApplyWindowMessageOverrides(coreParams);
    ApplyWindowHelpOverrides();
    ApplyWindowNameboxOverrides();
}


