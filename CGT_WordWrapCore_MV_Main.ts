/*:
* @plugindesc Needed for the CGT word-wrapping plugins, holding information they can use.
* @author CG-Tespy – https://github.com/CG-Tespy
* @help This is version 2.01.03 of this plugin. Tested with RMMV versions 
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
* @param Wrapper
* @default null
* @desc Which word wrap plugin to use. Look at the appropriate User Guides for more info. Default: null
* 
* @param NametagFormats
* @type string[]
* @default ["^.+:", "^\\[.+\\]:", "^\\n<.+>+"]
* @desc Formats that nametags in your game follow, as regex strings.
* 
* @param LineBreakMarkers
* @type string[]
* @default ["<br>", "<br2>", "<line-break>"]
* @desc You put these in the text where you want to guarantee a line break.
* 
* @param EmptyText
* @type string[]
* @default ["\u001bC\\[[0-9]+\\]", "\u001b\\$", "\u001b\\."]
* @desc Regexes that define text that should NOT be treated as taking up space in the textbox.
* 
* @param SpecialRules
* 
* @param LineMinCharCount
* @parent SpecialRules
* @type number
* @default 10
* @min 0
* @desc Minimum amount of characters a line can hold. Default: 10
* 
* @param ParenthesisAlignment
* @parent SpecialRules
* @type boolean
* @default true
* @desc Whether or not this aligns text based on parentheses. Default: true
* 
* @param WordSeparator
* @parent SpecialRules
* @type string
* @default " "
* @desc What a wrapper should look for to tell words apart. Default: " "
* 
* @param WrapDescs
* @parent SpecialRules
* @type boolean
* @default false
* @desc Whether or not the wrapper should be applied to descs.
* 
* @param Spacing
* 
* @param MugshotWidth
* @parent Spacing
* @type number
* @default 144
* @desc How wide mugshots are treated as being, in a wrapper-decided unit. Default: 144
* 
* @param MugshotPadding
* @parent Spacing
* @type number
* @default 25
* @desc The space between the mugshot and the text, in a wrapper-decided unit. Default: 25
* 
* @param SidePadding
* @parent Spacing
* @type number
* @default 3
* @min -999
* @desc For the message box sides, in a wrapper-decided unit. Default: 3
* 
* @param BoldItalicWidthMod
* @type number
* @default 15
* @min 0
* @desc How much wider-than-usual bold or italicised letters are treated as, in percentage terms. Default: 15
* 
*/

/*:es
* @plugindesc Requisito para los plugins ajustelíneas CGT, teniendo información que pueden usar.
* @author CG-Tespy – https://github.com/CG-Tespy
* @help Este es la versión 2.01.03 de este plugin. Lo probé con versiones RMMV 1.5.1 
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
* @param Wrapper
* @text Ajustelíneas
* @default null
* @desc Cual plugin ajustelíneas a usar. Ve el apropriado Guia de Usuario para más info. Por defecto: null
*
* @param NametagFormats
* @text FormatosDeGafete
* @type string[]
* @default ["^.+:", "^\\[.+\\]:", "^\\n<.+>+"]
* @desc Los formatos de gafetes que tu juego usa, como texto regex.
* 
* @param LineBreakMarkers
* @text SenalesDeSaltalíneas
* @type string[]
* @default ["<br>", "<br2>", "<line-break>"]
* @desc Pones estos en el texto dónde quieres garantizar una saltalíneas.
* 
* @param EmptyText
* @text TextoVacío
* @type string[]
* @default ["\u001bC\\[[0-9]+\\]", "\u001b\\$", "\u001b\\."]
* @desc Los regexes que destacan texto que NO debe ser tratado como texto que usa espacio en la caja.
* 
* @param SpecialRules
* @text ReglasEspeciales
* 
* @param LineMinCharCount
* @text CarácterTotalMinPorCadaLínea
* @parent SpecialRules
* @type number
* @default 10
* @min 0
* @desc El número mínimo de carácteres una línea puede tener. Por defecto: 10
* 
* @param ParenthesisAlignment
* @text AlineaciónDeParéntesis
* @parent SpecialRules
* @type boolean
* @default true
* @desc Si o no esta se alinea el texto basado en los paréntesis. Por defecto: true
* 
* @param WordSeparator
* @text SeparadorDePalabras
* @parent SpecialRules
* @type string
* @default " "
* @desc Que un ajustelíneas busca para diferenciar las palabras. Por defecto: " "
* 
* @param WrapDescs
* @text AjusteLosDescripciones
* @parent SpecialRules
* @type boolean
* @default false
* @desc Si o no el ajustelíneas se aplica a los descripciones. Por defecto: false
* 
* @param Spacing
* @text El Espaciado
* 
* @param MugshotWidth
* @text AnchoDeFotoRostro
* @parent Spacing
* @type number
* @default 144
* @desc Cómo ancho los fotos rostros se tratan de ser, en una unidad decidido por el ajustelíneas. Por defecto: 144
* 
* @param MugshotPadding
* @text GuataDeFotoRostro
* @parent Spacing
* @type number
* @default 25
* @desc El espacio entre el foto rostro y el texto, en una unidad decidido por el ajustelíneas. Por defecto: 25
* 
* @param SidePadding
* @text GuataDeLosLados
* @parent Spacing
* @type number
* @default 3
* @min -999
* @desc Para los lados del cuadro de dialogo, en una unidad decidido por el ajustelíneas. Por defecto: 3
* 
* @param BoldItalicWidthMod
* @text ModAnchuraDeNegritasYItálicas
* @type number
* @default 15
* @min 0
* @desc Cómo mas ancho que usual el texto negrito o italic es, en términos de porcentajes. Por defecto: 15
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