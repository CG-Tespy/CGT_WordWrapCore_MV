import { WrapperSpacingByString } from "../Shared/_Functions";

export function SetMugshotWidth(args: string[])
{
    let newWidth = Number(args[0]);
    let wrapTargetRaw = args[1];
    let spacingToChange = WrapperSpacingByString(wrapTargetRaw);
    spacingToChange.MugshotWidth = newWidth;
}