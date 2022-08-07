import { CoreWrapParams, WrapParamsFactory } from '../Structures/CoreWrapParams';
import { corePluginName } from '../Shared/_Strings';
import { convertParameters } from 'fenix-tools';
import { IBaseCoreWrapParams } from '../Structures/IBaseCoreWrapParams';

let baseParams: object = PluginManager.parameters(corePluginName);
let parsedParams: IBaseCoreWrapParams = convertParameters(baseParams);

// convertParameters for some reason renders arrays as objects with the indexes as 
// keys, and the array elements as the corresponding values. We need to fix that here...
parsedParams.EmptyText = Object.values(parsedParams.EmptyText);
parsedParams.NametagFormats = Object.values(parsedParams.NametagFormats);
parsedParams.LineBreakMarkers = Object.values(parsedParams.LineBreakMarkers);

export let pluginParams: CoreWrapParams = WrapParamsFactory.FromConvertedParams(parsedParams);