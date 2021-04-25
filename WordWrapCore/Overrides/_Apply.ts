import { CoreWrapParams } from '../Structures/CoreWrapParams';
import { ApplyWindowMessageOverrides } from './Window_Message';
import { ApplyBitmapOverrides } from './Bitmap';

export function ApplyOverrides(coreParams: CoreWrapParams)
{
    ApplyWindowMessageOverrides(coreParams);
    ApplyBitmapOverrides(coreParams);
}


