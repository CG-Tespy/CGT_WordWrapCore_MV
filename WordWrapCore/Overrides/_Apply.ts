import { CoreWrapParams } from '../Structures/CoreWrapParams';
import { ApplyYanflyScriptOverrides } from './Yanfly/_YanflyScriptOverrides';
import { ApplyBuiltInWindowOverrides } from './BuiltInWindows/_BuiltInWindowOverrides';

export function ApplyOverrides(coreParams: CoreWrapParams)
{
    ApplyBuiltInWindowOverrides(coreParams);
    ApplyYanflyScriptOverrides();
}
