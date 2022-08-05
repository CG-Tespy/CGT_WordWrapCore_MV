export let doubleSpaces: RegExp = /\s\s+/gm;
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

export let boldMarkers: RegExp = /\u001bMSGCORE\[1\]/gmi;
export let italicsMarkers: RegExp = /\u001bMSGCORE\[2\]/gmi;