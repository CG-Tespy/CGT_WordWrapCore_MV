import { ITextMeasurer } from './ITextMeasurer';

/**
 * Measures text based on the space they take up in pixels on screen
 */ 
 export class SpacialTextMeasurer implements ITextMeasurer
 {
     /** 
      * The text this is at least treated as having measured before, used as context
      * for future measurement attempts.
      * */
     get History(): string[] { return this.history.slice(); }
     private history: string[] = [];
 
     MeasureFor(text: string): number
     {
         throw "Not yet implemented!";
     }
 }