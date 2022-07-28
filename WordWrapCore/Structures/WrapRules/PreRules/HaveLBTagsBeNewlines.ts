import { StringWrapRule } from './StringWrapRule';
import { singleNewline } from '../../../Shared/_Strings';

// This should make it so that it doesn't matter whether an LB tag is attached to any other text;
// newlines will be put wherever is appropriate
export class HaveLBTagsBeNewlines extends StringWrapRule
{
    ProcessNormally(text: string)
    {
        let toReplaceWith = this.WordSeparator + singleNewline + this.WordSeparator;
        // ^We surround the newlines with separators so they can be properly detected 
        // as their own things

        for (let i = 0; i < this.LineBreakTags.length; i++)
        {
            let currentTag = this.LineBreakTags[i];
            let allCurrentTagInstances = new RegExp(currentTag, "gmi");
            text = text.replace(allCurrentTagInstances, toReplaceWith);
        }

        return text;
    }

    protected get LineBreakTags() {return CGT.WWCore.Params.LineBreakMarkers; }

    protected get WordSeparator() { return CGT.WWCore.Params.WordSeparator; }

}