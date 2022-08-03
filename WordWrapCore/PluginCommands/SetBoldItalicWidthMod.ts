export function SetBoldItalicWidthMod(args: string[])
{
    let newMod = Number(args[0]);
    CGT.WWCore.Params.BoldItalicPadding = 1 + (newMod / 100.0);
}