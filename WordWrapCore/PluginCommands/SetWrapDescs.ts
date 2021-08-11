export function SetWrapDescs(args: string[])
{
    let newSetting = args[0].toLowerCase() === 'true';
    CGT.WWCore.Params.WrapDescs = newSetting;
}