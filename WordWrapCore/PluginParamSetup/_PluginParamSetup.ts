import { CoreWrapParams, WrapParamsFactory } from '../Structures/CoreWrapParams';
import { corePluginName } from '../Shared/_Strings';
import { convertParameters } from 'fenix-tools';
import { IBaseCoreWrapParams } from '../Structures/IBaseCoreWrapParams';
import { ValuesFromObject } from '../Shared/_Functions';
import { IRegexEntry } from '../Structures/IRegexEntry';

let baseParams: object = PluginManager.parameters(corePluginName);
let parsedParams: IBaseCoreWrapParams = convertParameters(baseParams);

// convertParameters for some reason renders arrays as objects with the indexes as 
// keys, and the array elements as the corresponding values. We need to fix that here...
parsedParams.EmptyText = ValuesFromObject(parsedParams.EmptyText) as IRegexEntry[];
parsedParams.NametagFormats = ValuesFromObject(parsedParams.NametagFormats) as IRegexEntry[];
parsedParams.LineBreakMarkers = ValuesFromObject(parsedParams.LineBreakMarkers) as string[];

export let pluginParams: CoreWrapParams = WrapParamsFactory.FromConvertedParams(parsedParams);