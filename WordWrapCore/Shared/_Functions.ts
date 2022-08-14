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