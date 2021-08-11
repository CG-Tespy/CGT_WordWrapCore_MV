export function SetMugshotPadding(args: string[])
{
    let newPadding = Number(args[0]);
    CGT.WWCore.Params.MugshotPadding = newPadding;
}