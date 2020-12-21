export function SetSplitWordsBetweenLines(args: string[])
{
    let shouldSplit = args[0] === 'true';
    CGT.WWCore.Params.SplitWordsBetweenLines = shouldSplit;
}