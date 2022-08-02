/*:
* @plugindesc Needed for the CGT word-wrapping plugins, holding information they can use.
* @author CG-Tespy – https://github.com/CG-Tespy
* @help This is version 2.02.02 of this plugin. Tested with RMMV versions 
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
* @param Wrapper
* @default null
* @desc Which word wrap plugin to use. Look at the appropriate User Guides for more info. Default: null
* 
* @param NametagFormats
* @type struct<NametagFormat>[]
* @desc Tells the algorithm what counts as a nametag.
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
* @desc Whether or not the wrapper should be applied to descs. Default: false
*
* @param CascadingUnderflow
* @parent SpecialRules
* @type boolean
* @default false
* @desc If true, makes it so no line in a given input is wider than the first. Default: false
* 
* @param CULenience
* @parent CascadingUnderflow
* @type number
* @min -999999
* @default 5
* @desc How many units wider than the first line that later ones in its input are allowed to be. Default: 5
* 
* @param RememberResults
* @type boolean
* @default true
* @desc Whether or not this will keep track of and always return its original outputs for the same inputs.
*
* @param Spacing
* 
* @param MugshotWidth
* @parent Spacing
* @type number
* @default 144
* @desc How many units wide that mugshots are treated as being. Default: 144
* 
* @param MugshotPadding
* @parent Spacing
* @type number
* @default 25
* @min -999999
* @desc The space between the mugshot and the text (measured in units). Default: 25
* 
* @param SidePadding
* @parent Spacing
* @type number
* @default 3
* @min -999999
* @desc For the message box sides (measured in units). Default: 3
* 
* @param BoldItalicWidthMod
* @type number
* @default 15
* @min -999999
* @desc How much wider-than-usual bold or italicised letters are treated as, in percentage terms. Default: 15
* 
*/

/*~struct~NametagFormat:
 * @param Name
 * @type string
 * @default NewFormat
 * 
 * @param RegexAsString
 * @type string
 * 
 * @param Enabled
 * @type boolean
 * @default true
 * @desc Whether or not the algorithm will consider this format. Default: true
 * 
 * @param Notes
 * @type Note
 */

/*~struct~NametagFormat:es
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
* @help Este es la versión 2.02.02 de este plugin. Lo probé con versiones RMMV 1.5.1 
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
* @param Wrapper
* @text Ajustelíneas
* @default null
* @desc Cual plugin ajustelíneas a usar. Ve el apropriado Guia de Usuario para más info. Por defecto: null
*
* @param NametagFormats
* @text FormatosDeGafete
* @type struct<NametagFormat>[]
* @desc Avisa el algoritmo que se vale como gafete.
* 
* @param LineBreakMarkers
* @text SeñalesDeSaltalíneas
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
* @desc Si o no el texto se alineará basado en los paréntesis. Por defecto: true
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
* @desc Si o no el ajustelíneas se aplica a las descripciones. Por defecto: falso
*
* @param CascadingUnderflow
* @text TextoCascadando
* @parent SpecialRules
* @type boolean
* @default false
* @desc Si o no cualquiera línea ajustada puede ser más ancho que la primera ajustada por su entrada.
*
* @param CULenience
* @text IndulgenciaDeTC
* @parent CascadingUnderflow
* @type number
* @min -999999
* @default 5
* @desc Cuantas unidades más ancho que la primera línea que las posteriores en su entrada se permiten ser.
* 
* @param RememberResults
* @text RecuerdaResultados
* @type boolean
* @default true
* @desc Si o no esto llevara un registro de las salidas originales, regresandolas por las mismas
entradas.
*
* @param Spacing
* @text ElEspaciado
* 
* @param MugshotWidth
* @text AnchoDeFotoRostro
* @parent Spacing
* @type number
* @default 144
* @desc Cuánto ancho los fotos rostros se tratarán de ser (medido en unidades). Por defecto: 144
* 
* @param MugshotPadding
* @text GuataDeFotoRostro
* @parent Spacing
* @type number
* @default 25
* @desc El espacio entre el foto rostro y el texto (medido en unidades). Por defecto: 25
* 
* @param SidePadding
* @text GuataDeLosLados
* @parent Spacing
* @type number
* @default 3
* @min -999
* @desc Para los lados del cuadro de dialogo (medido en unidades). Por defecto: 3
* 
* @param BoldItalicWidthMod
* @text ModAnchuraDeNegritasYItálicas
* @type number
* @default 15
* @min 0
* @desc Cuánto mas ancho que usual el texto negrito o itálico se trata en términos de porcentajes. Por defecto: 15
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