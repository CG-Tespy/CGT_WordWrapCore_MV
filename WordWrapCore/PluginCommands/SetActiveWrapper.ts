type WrapTarget = CGT.WWCore.WrapTarget;

export function SetActiveWrapper(args: string[]): void
{
    let wrapCode = args[0];
    let theTarget = (args[1].toLowerCase() as unknown) as WrapTarget;
    CGT.WWCore.SetActiveWrapper(theTarget, wrapCode);
}
