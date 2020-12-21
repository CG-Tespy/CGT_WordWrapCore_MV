export function SetActiveWrapper(args: string[]): void
{
    let wrapCode = args[0];
    CGT.WWCore.SetActiveWrapper(wrapCode);
}
