import { ITextMeasurer } from './ITextMeasurer';
import { emptyString } from '../../../Shared/_Strings';

let ArrayEx = CGT.Core.Extensions.ArrayEx;

/**
 * Measures text while using a history to help keep track of what's
 * bolded or italicised.
 */ 
export abstract class TextMeasurer implements ITextMeasurer
{
    protected history: string = emptyString;
    protected tempHistory: string = emptyString;

    MeasureFor(text: string, textField: Bitmap): number
    {
        text += emptyString; // In case a non-string is passed
        
        this.tempHistory = this.history;

        let baseWidth: number = this.GetBaseWidth(text, textField);
        let markerWidths = this.AllMarkerWidths(text, textField);
        let totalWidth = baseWidth - markerWidths;

        return totalWidth;
    }

    protected GetBaseWidth(text: string, textField: Bitmap)
    {
        text = this.WithoutColorMarkers(text);
        let totalWidth = 0;

        for (const letter of text)
        {  
            let widthToAdd: number = this.GetDefaultWidthOf(letter, textField);

            if (this.LetterIsBoldOrItalic())
                widthToAdd *= this.BoldItalicWidthMod;

            totalWidth += widthToAdd;
            this.tempHistory += letter; 
            // ^The letter var can be part of a marker; we need that in the temp history
            // to help see if later letters in the text should be treated as bigger
        }

        return totalWidth;
    }

    protected WithoutColorMarkers(text: string)
    {
        text = text.replace(TextMeasurer.colorMarkers, emptyString);
        return text;
    }

    // Override this to use the units your measurer uses
    protected abstract GetDefaultWidthOf(text: string, textField: Bitmap): number;
    
    protected LetterIsBoldOrItalic(): boolean
    {
        // If the marker count for either bold or italics in the history is odd, then
        // the next letter to add will be bolded or italicised
        let boldMarkersFound = this.tempHistory.match(TextMeasurer.boldMarkers) || [];
        let italicsMarkersFound = this.tempHistory.match(TextMeasurer.italicsMarkers) || [];

        let boldMarkerCount = boldMarkersFound.length;
        let italicsMarkerCount = italicsMarkersFound.length;

        let oddBoldMarkers = boldMarkerCount >= 1 && (boldMarkerCount % 2 != 0);
        let oddItalicsMarkers = italicsMarkerCount >= 1 && (italicsMarkerCount % 2 != 0);

        return oddBoldMarkers || oddItalicsMarkers;
    }

    protected static boldMarkers: RegExp = /\u001bMSGCORE\[1\]/gm;
    protected static italicsMarkers: RegExp = /\u001bMSGCORE\[2\]/gm;
    protected static colorMarkers: RegExp = /\u001bC\[\d+\]/gm;

    protected get BoldItalicWidthMod(): number 
    {
        return CGT.WWCore.Params.BoldItalicWidthMod;
    }

    /** How much space all the markers take up */
    protected AllMarkerWidths(text: string, textField: Bitmap): number
    {
        let combinedBoldWidth = this.MarkerWidth(TextMeasurer.boldMarkers, text, textField);
        let combinedItalicWidth = this.MarkerWidth(TextMeasurer.italicsMarkers, text, textField);
        
        let totalWidth = combinedBoldWidth + combinedItalicWidth;

        return totalWidth;
    }

    protected MarkerWidth(marker: RegExp, text: string, textField: Bitmap): number
    {
        let allMarkersFound: string[] = text.match(marker) || [""];

        let firstMarker: string = allMarkersFound[0];
        let baseWidth: number = this.GetDefaultWidthOf(firstMarker, textField);
        let raisedWidth: number = baseWidth * this.BoldItalicWidthMod;
        let totalWidth = (allMarkersFound.length * raisedWidth);

        return totalWidth;
    }

    RegisterInHistory(text: string)
    {
        this.history += text;
    }

    ClearHistory()
    {
        this.history = "";
    }

}