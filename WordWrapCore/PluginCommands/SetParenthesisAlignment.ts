export function SetParenthesisAlignment(args: string[])
{
    let newAlignment = args[0] === 'true';
    CGT.WWCore.Params.ParenthesesAlignment = newAlignment;
}
