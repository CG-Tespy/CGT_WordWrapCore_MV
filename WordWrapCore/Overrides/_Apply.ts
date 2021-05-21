import { CoreWrapParams } from '../Structures/CoreWrapParams';
import { ApplyWindowMessageOverrides } from './Window_Message';
import { ApplyWindowHelpOverrides } from './Window_Help';


export function ApplyOverrides(coreParams: CoreWrapParams)
{
    ApplyWindowMessageOverrides(coreParams);
    ApplyWindowHelpOverrides();
}


