import { OverflowFinder } from './OverflowFinder';
import { IOverflowFindArgs } from './IOverflowFindArgs';

export class NullOverflowFinder extends OverflowFinder
{
    Find(args: IOverflowFindArgs): boolean { return false; }

    protected GetWrapWidth(args: IOverflowFindArgs)
    {
        // Dummy implementation; this finder only exists to fulfill Wrapper requirements
        return 666;
    }

}