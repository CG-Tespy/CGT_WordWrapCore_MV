import { ITextMeasurer } from './ITextMeasurer';

let ArrayEx = CGT.Core.Extensions.ArrayEx;

/**
 * Measures text based on the space they take up in pixels on screen, with
 * a history to inform its decisions.
 */ 
 export class TextMeasurer implements ITextMeasurer
 {
     get History(): string[] { return this.history.slice(); }
     private history: string[] = [];
 
     MeasureFor(text: string): number
     {
         throw "Not yet implemented!";
     }

     RegisterInHistory(text: string)
     {
        this.history.push(text);
     }

     ClearHistory()
     {
        ArrayEx.Clear(this.history);
     }
 }