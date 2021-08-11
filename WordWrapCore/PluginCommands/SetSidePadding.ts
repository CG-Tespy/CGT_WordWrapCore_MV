export function SetSidePadding(args: string[])
{
    let newPadding = Number(args[0]);
    CGT.WWCore.Params.SidePadding = newPadding;
}