export function SetMugshotWidth(args: string[])
{
    let newWidth = Number(args[0]);
    CGT.WWCore.Params.MugshotWidth = newWidth;
}