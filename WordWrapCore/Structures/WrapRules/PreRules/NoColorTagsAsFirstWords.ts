import { StringWrapRule } from "./StringWrapRule";

export class NoColorTagsAsFirstWords extends StringWrapRule
{
    protected ProcessNormally(input: string): string {
        input = input.replace(this.colorTagAsFirstWord, this.colorTagAttachedToNextWord);
        return input;
    }

    protected colorTagAsFirstWord: RegExp = /^(|\\)(C\[\d+\])\s+/gmi;
    protected colorTagAttachedToNextWord = "$1$2";
}