/** 
 * Returns the appropriate wrapper spacing assuming that the input is a
 * valid WrapTarget enum value
 */
export function WrapperSpacingByString(input: string)
{
    let wrapTargetRaw = input.toLowerCase() as unknown;
    let wrapTarget = wrapTargetRaw as CGT.WWCore.WrapTarget;
    let allSpacings = CGT.WWCore.WrapperSpacing;
    let whatWeWant = allSpacings.get(wrapTarget);
    return whatWeWant;
}

/** Since MV 1.5.1 doesn't support the regular Object.values() func */
export function ValuesFromObject(obj: Object): unknown[]
{
    let result = [];
    for (let key in obj)
    {
        result.push(obj[key]);
    }

    return result;

}