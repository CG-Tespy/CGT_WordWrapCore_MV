import { CoreWrapParams, WrapParamsFactory } from '../Structures/CoreWrapParams';
import { corePluginName } from '../Shared/_Strings';
import { convertParameters } from 'fenix-tools';
import { IBaseCoreWrapParams } from '../Structures/IBaseCoreWrapParams';

let baseParams: object = PluginManager.parameters(corePluginName);
let parsedParams: IBaseCoreWrapParams = convertParameters(baseParams);


export let pluginParams: CoreWrapParams = WrapParamsFactory.FromConvertedParams(parsedParams);