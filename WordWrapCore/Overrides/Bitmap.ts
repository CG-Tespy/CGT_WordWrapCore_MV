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
        // By the end of this, we want the normal text to be just that: the
        // normal text without bolding or italicising. 
        let normalText: string = WithoutEmptyText(text);

        // We want the bold and italics markers each treated as whatever
        // substitute the user set, to lessen the chance of said markers
        // causing overflow
        normalText = normalText.replace(boldMarkers, coreParams.BoldItalicSubstitute);
        normalText = normalText.replace(italicsMarkers, coreParams.BoldItalicSubstitute);

        /*
        let boldTextStrings: string[] = GetBoldedTextFrom(normalText);
        normalText = RemoveArrElemsFromString(boldTextStrings, normalText);

        let italicsTextStrings: string[] = GetItalicisedTextFrom(normalText);
        normalText = RemoveArrElemsFromString(italicsTextStrings, normalText);

        // We don't want the bold and italics markers to skew the results
        let allBoldText = boldTextStrings.join("");
        allBoldText.replace(boldMarkers, emptyString);

        let allItalicsText = italicsTextStrings.join("");
        allItalicsText.replace(italicsMarkers, emptyString);

        // NOW normalText should actually only have the normal text
        let normalTextWidth = oldMeasureTextWidth.call(this, normalText);
        let boldTextWidth = oldMeasureTextWidth.call(this, allBoldText);
        boldTextWidth *= coreParams.BoldItalicWidthModifier;
        let italicsTextWidth = oldMeasureTextWidth.call(this, allItalicsText);
        italicsTextWidth *= coreParams.BoldItalicWidthModifier;
        */

        return oldMeasureTextWidth.call(this, normalText);
    }

    function WithoutEmptyText(text: string): string
    {
        for (const pattern of coreParams.EmptyText)
        {
            text = text.replace(pattern, emptyString);
        }

        return text;
    }

    /** Includes the bold markers */
    function GetBoldedTextFrom(text: string): string[]
    {
        let withBoldMarkers: string[] = text.match(boldedTextRegex) || [""];
        return withBoldMarkers;
    }

    let boldedTextRegex: RegExp = /MSGCORE\[1\](.*)MSGCORE\[1\]/gm;
    let boldMarkers: RegExp = /\u001bMSGCORE\[1\]/gm;

    function RemoveArrElemsFromString(elemsToRemove: string[], toRemoveFrom: string)
    {
        let result: string = toRemoveFrom;

        for (const currentElem of elemsToRemove)
        {
            result = result.replace(currentElem, emptyString);
        }

        return result;
    }

    /** Includes the italics markers */
    function GetItalicisedTextFrom(text: string): string[]
    {
        let withItalicsMarkers = text.match(italicsTextRegex) || [""];
        return withItalicsMarkers;
    }

    let italicsTextRegex: RegExp = /MSGCORE\[2\](.*)MSGCORE\[2\]/gm;
    let italicsMarkers: RegExp = /\u001bMSGCORE\[2\]/gm;

    Bitmap.prototype.measureTextWidth = NewMeasureTextWidth;
}
