import { WrapperSpacingByString } from "../Shared/_Functions";
import { WrapTarget } from "../Structures/WordWrappers/WrapTarget";

export function SetSidePadding(args: string[])
{
    let newPadding = Number(args[0]);
    let wrapTargetRaw = args[1];
    let spacingToChange = WrapperSpacingByString(wrapTargetRaw);
    spacingToChange.SidePadding = newPadding;
}

