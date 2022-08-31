import { CoreWrapParams } from '../Structures/CoreWrapParams';
import { ApplyYanflyScriptOverrides } from './Yanfly/_YanflyScriptOverrides';
import { ApplyBuiltInWindowOverrides } from './BuiltInWindows/_BuiltInWindowOverrides';
import { ApplyGalvScriptOverrides } from './Galv/_GalvScriptOverrides';

export function ApplyOverrides(coreParams: CoreWrapParams)
{
    ApplyBuiltInWindowOverrides(coreParams);
    ApplyYanflyScriptOverrides();
    ApplyGalvScriptOverrides();
}
