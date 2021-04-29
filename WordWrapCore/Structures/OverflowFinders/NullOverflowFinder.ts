import { OverflowFinder } from './OverflowFinder';
import { IOverflowFindArgs } from './IOverflowFindArgs';

export class NullOverflowFinder extends OverflowFinder
{
    Find(args: IOverflowFindArgs): boolean { return false; }

}