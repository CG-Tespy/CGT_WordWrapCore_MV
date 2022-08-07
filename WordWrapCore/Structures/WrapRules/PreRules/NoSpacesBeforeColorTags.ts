import { StringWrapRule } from './StringWrapRule';

// Otherwise, we might have color tags treated as empty spaces themselves
export class NoSpacesBeforeColorTags extends StringWrapRule
{
    protected ProcessNormally(input: string): string
    {
        input = input.replace(this.spacesBeforeColorTags, this.justTheColorTags);
        return input;
    }

    protected spacesBeforeColorTags: RegExp = /(\s+)(|\\)(C\[\d+\])/gmi;
    protected justTheColorTags: string = "$2$3";
}