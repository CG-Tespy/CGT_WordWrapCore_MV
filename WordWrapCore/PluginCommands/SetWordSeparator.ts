import { emptyString } from '../Shared/_Strings';

export function SetWordSeparator(args: string[])
{
    // The separator input is expected to be within a 
    // pair of single or double quotes, so...

    let baseInput = args.join(" "); 
    // ^Need to join since setting the separator to a space will lead to the args
    // array having multiple elements
    let newSeparator = baseInput.replace(singleOrDoubleQuotes, emptyString);
    CGT.WWCore.Params.WordSeparator = newSeparator;
}

let singleOrDoubleQuotes = /'|"/g;