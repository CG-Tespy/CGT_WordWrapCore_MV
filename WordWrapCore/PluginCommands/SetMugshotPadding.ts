import { WrapperSpacingByString } from "../Shared/_Functions";

export function SetMugshotPadding(args: string[])
{
    let newPadding = Number(args[0]);
    let wrapTargetRaw = args[1];
    let spacingToChange = WrapperSpacingByString(wrapTargetRaw);
    spacingToChange.MugshotPadding = newPadding;
}