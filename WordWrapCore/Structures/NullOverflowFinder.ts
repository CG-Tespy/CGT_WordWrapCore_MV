import { IOverflowFinder } from './IOverflowFinder';

export class NullOverflowFinder implements IOverflowFinder
{
    FindFor(word: string, line: string): boolean { return false; }
}