export function SetLineMinWordCount(args: string[]): void
{
    let newMin: number = Number(args[0]);
    CGT.WWCore.Params.LineMinWordCount = newMin;
}
