import { WrapperSpacingByString } from "../Shared/_Functions";

export function SetBoldItalicPadding(args: string[])
{
    let newPadding = Number(args[0]);
    let wrapTargetRaw = args[1];
    let spacingToChange = WrapperSpacingByString(wrapTargetRaw);
    spacingToChange.BoldItalicPadding = newPadding;
}