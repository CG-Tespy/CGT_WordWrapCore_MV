export let doubleSpaces: RegExp = / [^\S\r\n][^\S\r\n]+/gm;
// ^Had to do this weird double-negative so it wouldn't treat newlines
// as whitespace
export let newlines: RegExp = /\n+/gm;
export let notWhitespace: RegExp = /\S+/gm;
export let spaceAsSeparator: RegExp = / /gm;
export let yanflyNametag: RegExp = /^\\n<\S+>/gm;
export let basicNametag: RegExp = /^\S+:/gm;
export let bracketNametag: RegExp = /^\[\S+\]:/gm;
export let bracketNametagNoColon: RegExp = /^\[\S+\]/gm;
export let doubleQuotes: RegExp = /"/gm;

export let noWrapTag: RegExp = /<noWrap>\s?/gmi;
export let disableNametagScanTag: RegExp = /<disableNametagScan>\s?/gmi;
export let disableCascadingUnderflowTag: RegExp = /<disableCascadingUnderflow>\s?/gmi;

export let boldMarkers: RegExp = /\u001bMSGCORE\[1\]/gmi;
export let italicsMarkers: RegExp = /\u001bMSGCORE\[2\]/gmi;