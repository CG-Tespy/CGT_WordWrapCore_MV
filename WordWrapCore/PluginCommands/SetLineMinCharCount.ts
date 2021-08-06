export function SetLineMinCharCount(args: string[]): void
{
    let newMin: number = Number(args[0]);
    CGT.WWCore.Params.LineMinCharCount = newMin;
}
