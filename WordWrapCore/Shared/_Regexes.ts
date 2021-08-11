export let doubleSpaces: RegExp = /\s\s+/gm;
export let newlines: RegExp = /\n+/gm;
export let notWhitespace: RegExp = /\S+/gm;
export let spaceAsSeparator: RegExp = / /gm;
export let yanflyNametag: RegExp = /^\\n<\S+>/gm;
export let basicNametag: RegExp = /^\S+:/gm;
export let bracketNametag: RegExp = /^\[\S+\]:/gm;
export let bracketNametagNoColon: RegExp = /^\[\S+\]/gm;
export let doubleQuotes: RegExp = /"/gm;

export let noWrapTag: RegExp = / <noWrap>|<noWrap>/gmi;