/*:
* @plugindesc Needed for the CGT word-wrapping plugins, holding information they can use.
* @author CG-Tespy – https://github.com/CG-Tespy
* @help This is version 3.01.01 of this plugin. Tested with RMMV versions 
* 1.5.1 and 1.6.2.
* 
* Needs the CGT CoreEngine 1.01.11+ to work. Make sure this is below that 
* in the Plugin Manager.
* 
* Please make sure to credit me (and any of this plugin's contributing coders)
* if you're using this plugin in your game (include the names and webpage links).
* 
* If you want to edit this plugin, you may be better off editing and 
* building the source: https://github.com/CG-Tespy/CGT_WordWrapCore_MV
* 
* Other Contributors:
* LTN Games
*
* @param DesignatedWrappers
* @desc Here, you decide which wrappers are assigned to different parts of the UI.
*
* @param MessageWrapper
* @text MessageBoxes
* @parent DesignatedWrappers
* @type string
* @default null
* @desc For regular message boxes. Default: null
*
* @param MessageSpacing
* @text Spacing
* @parent MessageWrapper
* @type struct<WrapperSpacing>
*
* @param DescWrapper
* @text Descs
* @parent DesignatedWrappers
* @type string
* @default null
* @desc For the windows that show descs for items and such. Default: null
*
* @param DescSpacing
* @text Spacing
* @parent DescWrapper
* @type struct<WrapperSpacing>
*
* @param MessageBacklogWrapper
* @text MessageBacklog
* @parent DesignatedWrappers
* @type string
* @default null
* @desc For message backlogs. Default: null
*
* @param BacklogSpacing
* @text Spacing
* @parent MessageBacklogWrapper
* @type struct<WrapperSpacing>
*
* @param BubbleWrapper
* @text MessageBubbles
* @parent DesignatedWrappers
* @type string
* @default null
* @desc For message bubbles like the ones from Galv's MessageStyles plugin. Default: null
*
* @param BubbleSpacing
* @text Spacing
* @parent BubbleWrapper
* @type struct<WrapperSpacing>
*
* @param NametagFormats
* @type struct<RegexEntry>[]
* @desc Tells the algorithm what counts as a nametag.
* @default ["{\"Name\":\"Normal\",\"RegexAsString\":\"^[^\\\\n]+:((\\u001b|\\\\\\\\)c\\\\[\\\\d+\\\\])?\",\"Enabled\":\"true\",\"Notes\":\"\\\"This catches any (non-newline) text starting from the \\\\nbeginning and ending with a colon. If any newlines \\\\nare before the colon, then this format won't catch\\\\nanything in whatever text the wrapper is working with.\\\\n\\\\nWorks with colored text, too.\\\"\"}","{\"Name\":\"SquareBrackets\",\"RegexAsString\":\"^\\\\\\\\[[^\\\\n]+\\\\\\\\]((\\u001b|\\\\\\\\)c\\\\[\\\\d+\\\\])?\",\"Enabled\":\"true\",\"Notes\":\"\\\"This catches any (non-newline) text starting from the \\\\nbeginning with an opening square bracket, and ending with \\\\na closing square bracket. If any newlines are before that\\\\nsecond one, then this format won't catch anything in \\\\nwhatever text the wrapper is working with.\\\\n\\\\nWorks with colored text, too.\\\"\"}"]
* 
* @param EmptyText
* @type struct<RegexEntry>[]
* @default ["{\"Name\":\"Text-ColoringCode\",\"RegexAsString\":\"\\\\s?(\\u001b|\\\\\\\\)C\\\\[\\\\d+\\\\]\\\\s?\",\"Enabled\":\"true\",\"Notes\":\"\\\"\\\"\"}","{\"Name\":\"GoldWindowCode\",\"RegexAsString\":\"\\u001b\\\\$\",\"Enabled\":\"true\",\"Notes\":\"\"}","{\"Name\":\"DotPause\",\"RegexAsString\":\"\\u001b\\\\.\",\"Enabled\":\"true\",\"Notes\":\"\\\"For the code that applies a slight pause in text.\\\"\"}","{\"Name\":\"BoldTextMarker\",\"RegexAsString\":\"\\u001bMSGCORE\\\\[1\\\\]\",\"Enabled\":\"true\",\"Notes\":\"\"}","{\"Name\":\"ItalicTextMarker\",\"RegexAsString\":\"\\u001bMSGCORE\\\\[2\\\\]\",\"Enabled\":\"true\",\"Notes\":\"\"}","{\"Name\":\"One-SecondWaitMarker\",\"RegexAsString\":\"\\u001b|\",\"Enabled\":\"true\",\"Notes\":\"\"}","{\"Name\":\"AutoscrollMarker\",\"RegexAsString\":\"\\u001b^\",\"Enabled\":\"true\",\"Notes\":\"\"}"]
* 
* @param LineBreakMarkers
* @type string[]
* @default ["<br>", "<br2>", "<line-break>"]
* @desc You put these in the text where you want to guarantee a line break.
* 
* @param RememberResults
* @type boolean
* @default true
* @desc Whether or not this will keep track of and always return its original outputs for the same inputs.
* 
* @param ForAesthetics
* 
* @param LineMinCharCount
* @parent ForAesthetics
* @type number
* @default 10
* @min 0
* @desc Minimum amount of characters a line can hold. Default: 10
* 
* @param ParenthesisAlignment
* @parent ForAesthetics
* @type boolean
* @default true
* @desc Whether or not this aligns text based on parentheses. Default: true
* 
* @param WordSeparator
* @parent ForAesthetics
* @type string
* @default " "
* @desc What a wrapper should look for to tell words apart. Default: " "
*
* @param CascadingUnderflow
* @parent ForAesthetics
* @type boolean
* @default false
* @desc Whether any line in a given input's allowed to be wider than the first. Default: false
* 
* @param CULenience
* @parent CascadingUnderflow
* @type number
* @min -999999
* @default 5
* @desc How many units wider than the first line that later ones in its input are allowed to be. Default: 5
* 
*/

/*~struct~WrapperSpacing:
 * @param MugshotWidth
 * @type number
 * @min -999999
 * @default 144
 * @desc How wide mugshots are treated as being
 * 
 * @param MugshotPadding
 * @type number
 * @min -999999
 * @default 25
 * @desc The space between the mugshot (where applicable) and the text
 * 
 * @param SidePadding
 * @type number
 * @min -999999
 * @default 5
 * @desc For the message box sides
 * 
 * @param BoldItalicPadding
 * @type number
 * @min -999999
 * @default 15
 * @desc How much padding is applied when there's any bolded or italicized text in the input.
 */

/*~struct~RegexEntry:
 * @param Name
 * @type string
 * @default NewRegex
 * 
 * @param RegexAsString
 * @type string
 * 
 * @param Enabled
 * @type boolean
 * @default true
 * @desc Whether or not the algorithm will consider this entry. Default: true
 * 
 * @param Notes
 * @type Note
 */

/*~struct~RegexEntry:es
 * @param Name
 * @text Nombre
 * @type string
 * @default NuevoFormato
 * 
 * @param RegexAsString
 * @text RegexComoTexto
 * @type string
 * 
 * @param Enabled
 * @text Permitido
 * @type boolean
 * @default true
 * @desc Si i no el algoritmo considerará este formato. Por defecto: true
 * 
 * @param Notes
 * @text Notas
 * @type Note
 */

/*:es
* @plugindesc Requisito para los plugins ajustelíneas CGT, teniendo información que pueden usar.
* @author CG-Tespy – https://github.com/CG-Tespy
* @help Este es la versión 3.01.01 de este plugin. Lo probé con versiones RMMV 1.5.1 
* y 1.6.2.
* 
* Necesita el CGT CoreEngine 1.0.11+ para funcionar. Asegurate que este es abajo 
* de ese en el Gestor de Plugins.
* 
* Por favor acredita a mí y los otros programadores colaboradores de este plugin 
* si lo usas en tu juego. Incluye los nombres y (si disponible) los 
* enlaces de web.
* 
* Si quieres editar este plugin, tal vez será mejor si lo haces por el fuente:
* https://github.com/CG-Tespy/CGT_WordWrapCore_MV
* 
* Otros donantes:
* LTN Games
* 
    ~~~~~ADD STUFF HERE EVENTUALLY~~~~~
* 
*/

import { WWCore } from './WordWrapCore/_Setup';

let plugin = 
{
    WWCore: WWCore
};

//@ts-ignore
window.CGT = window.CGT || {};

Object.assign(window.CGT, plugin);