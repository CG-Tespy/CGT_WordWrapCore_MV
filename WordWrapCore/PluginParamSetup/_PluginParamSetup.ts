import { CoreWrapParams, WrapParamsFactory } from '../Structures/CoreWrapParams';
import { corePluginName } from '../Shared/_Strings';

let baseParams: object = PluginManager.parameters(corePluginName);

export let pluginParams: CoreWrapParams = WrapParamsFactory.FromBaseParams(baseParams);