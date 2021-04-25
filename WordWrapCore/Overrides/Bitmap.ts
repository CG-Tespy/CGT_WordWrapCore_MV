import { emptyString } from '../Shared/_Strings';
import { CoreWrapParams } from '../Structures/CoreWrapParams';

var oldMeasureTextWidth = Bitmap.prototype.measureTextWidth;

export function ApplyBitmapOverrides(coreParams: CoreWrapParams)
{
    OverrideMeasureTextWidth(coreParams);
}

function OverrideMeasureTextWidth(coreParams: CoreWrapParams)
{
    var oldMeasureTextWidth = Bitmap.prototype.measureTextWidth;

    function NewMeasureTextWidth(text: string)
    {
        let trimmed: string = WithoutEmptyText(text);
        let boldText = GetBoldedTextFrom(trimmed);
        let normalText = GetNormalTextFrom(trimmed);

        let boldTextWidth = oldMeasureTextWidth.call(this, boldText);
        let normalTextWidth = oldMeasureTextWidth.call(this, normalText);

        return boldTextWidth + normalTextWidth;
    }

    function WithoutEmptyText(text: string): string
    {
        for (const pattern of coreParams.EmptyText)
        {
            text = text.replace(pattern, emptyString);
        }

        return text;
    }

    function GetBoldedTextFrom(text: string)
    {
        let withBoldMarkers: string[] = text.match(boldedTextRegex);
        let allWithBoldMarkers = withBoldMarkers.join(emptyString);
        let withoutBoldMarkers = allWithBoldMarkers.replace(boldMarker, emptyString);

        return withoutBoldMarkers;

    }

    let boldedTextRegex: RegExp = /MSGCORE\[1\][A-Za-z \?\!\(\)\[\]<>:]+MSGCORE\[1\]/gm;
    let boldMarker = /MSGCORE\[1\]/;
    
    function GetNormalTextFrom(text: string)
    {

    }


    Bitmap.prototype.measureTextWidth = NewMeasureTextWidth;
}



function HaveWidthlessTextIgnored(coreParams: CoreWrapParams)
{
    function NewMeasureTextWidth(text: string)
    {
        let trimmed: string = WithoutWidthlessText(text);
        return oldMeasureTextWidth.call(this, trimmed);
    }

    function WithoutWidthlessText(text: string): string
    {
        for (const pattern of coreParams.EmptyText)
        {
            text = text.replace(pattern, emptyString);
        }

        return text;
    }
    
    Bitmap.prototype.measureTextWidth = NewMeasureTextWidth;
}

