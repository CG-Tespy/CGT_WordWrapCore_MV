import { ITextMeasurer } from './ITextMeasurer';

let ArrayEx = CGT.Core.Extensions.ArrayEx;

// TODO: Have this class set up to work with bolded and italicised text

/**
 * Measures text based on the space they take up in pixels on screen, with
 * a history to inform its decisions when needed.
 */ 
export class TextMeasurer implements ITextMeasurer
{

    protected history: string = "";
    protected tempHistory: string = "";


    MeasureFor(text: string, textField: Bitmap): number
    {
        text += ""; // In case a non-string is passed
        
        // Go through each letter, judging the width based on whether it was
        // bolded or italicised
        this.tempHistory = this.history;

        let totalWidth: number = this.GetBaseWidth(text, textField);
        totalWidth -= this.MarkerWidths(text, textField);

        return totalWidth;
    }

    protected GetBaseWidth(text: string, textField: Bitmap)
    {
        let totalWidth = 0;

        for (const letter of text)
        {  
            let widthToAdd = textField.measureTextWidth(letter);

            if (this.LetterIsBoldOrItalic())
                widthToAdd *= TextMeasurer.boldItalicWidthMod;

            totalWidth += widthToAdd;
            this.tempHistory += letter; 
            // ^The letter var can be part of a marker; we need that in the temp history
            // to help see if later letters in the text should be treated as bigger
        }

        return totalWidth;
    }
    
    
    protected LetterIsBoldOrItalic(): boolean
    {
        return this.MarkerCountIsOdd();
    }

    protected MarkerCountIsOdd(): boolean
    {
        // If the marker count for either bold or italics in the history is odd, then
        // we are now dealing with bold or italicised text.
        let boldMarkersFound = this.tempHistory.match(TextMeasurer.boldMarkers) || [];
        let italicsMarkersFound = this.tempHistory.match(TextMeasurer.italicsMarkers) || [];

        let boldMarkerCount = boldMarkersFound.length;
        let italicsMarkerCount = italicsMarkersFound.length;

        let oddBoldMarkers = boldMarkerCount % 2 != 0;
        let oddItalicsMarkers = italicsMarkerCount % 2 != 0;

        return oddBoldMarkers || oddItalicsMarkers;
    }

    protected static boldMarkers: RegExp = /\u001bMSGCORE\[1\]/gm;
    protected static italicsMarkers: RegExp = /\u001bMSGCORE\[2\]/gm;

    protected static boldItalicWidthMod: number = 1.2;

    /** How much space all the markers take up */
    protected MarkerWidths(text: string, textField: Bitmap): number
    {
        // The markers themselves add a lot of width; we need to find out ho
        let boldMarkers = text.match(TextMeasurer.boldMarkers) || [""];
        let italicsMarkers = text.match(TextMeasurer.italicsMarkers) || [""];

        let firstBoldMarker = boldMarkers[0];
        let firstItalicsMarker = italicsMarkers[0];

        let totalBoldWidth = textField.measureTextWidth(firstBoldMarker) * boldMarkers.length;
        let totalItalicWidth = textField.measureTextWidth(firstItalicsMarker) * italicsMarkers.length;
        // ^ Raise these widths to account for the even-numbered markers taking up more space than
        // usual
        
        
        totalBoldWidth += Math.floor(boldMarkers.length / 2) * TextMeasurer.boldItalicWidthMod;
        // ^ Every second marker is treated as even wider than usual


        let totalWidth = totalBoldWidth + totalItalicWidth;

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