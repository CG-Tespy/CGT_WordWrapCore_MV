/*:
@plugindesc Needed for the CGT word-wrapping plugins, holding information they can use.
@author CG-Tespy – https://github.com/CG-Tespy
@help This is version 2.01.01 of this plugin. Tested with RMMV versions 1.5.1 and 1.6.2.

Needs the CGT CoreEngine 1.01.11+ to work. Make sure this is below that in the Plugin Manager.

Please make sure to credit me (and any of this plugin's contributing coders)
if you're using this plugin in your game (include the names and webpage links).

If you want to edit this plugin, you may be better off editing and 
building the source: https://github.com/CG-Tespy/CGT_WordWrapCore_MV

@param Wrapper
@default null
@desc Which word wrap plugin to use. Look at the appropriate User Guides for more info. default: null

@param NametagFormats
@type string[]
@default ["^[a-zA-Z \\d\-\\?\\!\\(\\)\\[\\]<>\\/]+:", "^\\[[a-zA-Z \\d\-\\?\\!\\(\\)\\[\\]<>\\/]]+:", "^\\n<[a-zA-Z \\d\-\\?\\!\\(\\)\\[\\]<>\\/]+"]
@desc Formats that nametags in your game follow, as regex strings.

@param LineBreakMarkers
@type string[]
@default ["<br>", "<br2>", "<line-break>"]
@desc You put these in the text where you want to guarantee a line break.

@param EmptyText
@type string[]
@default ["\u001bC\\[[0-9]+\\]", "\\$", ".\u001b"]
@desc Regexes that define text that should NOT be treated as taking up space in the textbox.

@param SpecialRules

@param LineMinWordCount
@parent SpecialRules
@type number
@default 3
@desc Minimum amount of words a line can hold. Default: 3

@param ParenthesisAlignment
@parent SpecialRules
@type boolean
@default true
@desc Whether or not this aligns text based on parentheses. Default: true

@param WordSeparator
@parent SpecialRules
@type string
@default " "
@desc What a wrapper should look for to tell words apart. Default: " "

@param SeparateWithSeparator
@parent SpecialRules
@type boolean
@default true
@desc Whether or not the WordSeparator should be in the output. Default: true

@param WrapDescs
@parent SpecialRules
@type boolean
@default false
@desc Whether or not the wrapper should be applied to descs.

@param Spacing

@param MugshotWidth
@parent Spacing
@type number
@default 144
@desc How wide mugshots are treated as being, in a wrapper-decided unit. Default: 144

@param MugshotPadding
@parent Spacing
@type number
@default 25
@desc The space between the mugshot and the text, in a wrapper-decided unit. Default: 25

@param SidePadding
@parent Spacing
@type number
@default 3
@desc For the message box sides, in a wrapper-decided unit. Default: 3

@param BoldItalicWidthMod
@type number
@default 15
@min 0
@desc How much wider-than-usual bold or italicised letters are treated as, in percentage terms. Default: 15



*/

import { WWCore } from './WordWrapCore/_Setup';

let plugin = 
{
    WWCore: WWCore
};

//@ts-ignore
window.CGT = window.CGT || {};

Object.assign(window.CGT, plugin);