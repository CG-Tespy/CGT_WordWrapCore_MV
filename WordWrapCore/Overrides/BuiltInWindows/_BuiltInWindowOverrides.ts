import { CoreWrapParams } from '../../Structures/CoreWrapParams';
import { ApplyWindowMessageOverrides } from './Window_Message';
import { ApplyWindowHelpOverrides } from './Window_Help';


/** For overriding the base functionality of MV's Window classes */ 
export function ApplyBuiltInWindowOverrides(coreParams: CoreWrapParams)
{
    ApplyWindowMessageOverrides(coreParams);
    ApplyWindowHelpOverrides();
}