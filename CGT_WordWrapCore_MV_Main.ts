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
* @default {"MugshotWidth":"144","MugshotPadding":"25","SidePadding":"8","BoldItalicPadding":"15"}
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
* @default {"MugshotWidth":"144","MugshotPadding":"25","SidePadding":"5","BoldItalicPadding":"15"}
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
* @default {"MugshotWidth":"10","MugshotPadding":"1","SidePadding":"5","BoldItalicPadding":"3"}
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
* @default {"MugshotWidth":"10","MugshotPadding":"1","SidePadding":"2","BoldItalicPadding":"3"}
*
* @param NametagFormats
* @type struct<RegexEntry>[]
* @desc Tells the algorithm what counts as a nametag.
* @default ["{\"Name\":\"AnyColored\",\"RegexAsString\":\"^(\\u001b|\\\\\\\\)c\\\\[\\\\d+\\\\][^\\\\n]+(\\u001b|\\\\\\\\)c\\\\[\\\\d+\\\\]\",\"Enabled\":\"true\",\"Notes\":\"\\\"This catches any (non-newline) colored text starting from \\\\nthe beginning and ending with a color tag. If any newlines \\\\nare before the ending tag, then this format won't catch\\\\nanything in whatever text the wrapper is working with.\\\\n\\\\nThis is mainly for Yanfly Nametags as shown in the message\\\\nlog, due to how Yanfly's scripts handle those in different\\\\nsituations.\\\"\"}","{\"Name\":\"Normal\",\"RegexAsString\":\"^[^\\\\n]+:((\\u001b|\\\\\\\\)c\\\\[\\\\d+\\\\])?\",\"Enabled\":\"true\",\"Notes\":\"\\\"This catches any (non-newline) text starting from the \\\\nbeginning and ending with a colon. If any newlines \\\\nare before the colon, then this format won't catch\\\\nanything in whatever text the wrapper is working with.\\\\n\\\\nWorks with colored text, too.\\\"\"}","{\"Name\":\"SquareBrackets\",\"RegexAsString\":\"^\\\\\\\\[[^\\\\n]+\\\\\\\\]((\\u001b|\\\\\\\\)c\\\\[\\\\d+\\\\])?\",\"Enabled\":\"true\",\"Notes\":\"\\\"This catches any (non-newline) text starting from the \\\\nbeginning with an opening square bracket, and ending with \\\\na closing square bracket. If any newlines are before that\\\\nsecond one, then this format won't catch anything in \\\\nwhatever text the wrapper is working with.\\\\n\\\\nWorks with colored text, too.\\\"\"}"]
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
* @desc Whether or not this aligns text based on parentheses. Default: On
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
* @desc Whether any line in a given input's allowed to be wider than the first. Default: Off
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

/*~struct~WrapperSpacing:es
 * @param MugshotWidth
 * @text AnchoDeFotoRostro
 * @type number
 * @min -999999
 * @default 144
 * @desc Qué tan ancho los fotos rostros se tratan de ser.
 * 
 * @param MugshotPadding
 * @text GuataDeFotoRostro
 * @type number
 * @min -999999
 * @default 25
 * @desc El espaciado entre el foto rostro (cuando existe) y el texto.
 * 
 * @param SidePadding
 * @text GuataDeLosLados
 * @type number
 * @min -999999
 * @default 5
 * @desc Para los lados del caja de mensaje.
 * 
 * @param BoldItalicPadding
 * @text GuataDeNegritasYItalicas
 * @type number
 * @min -999999
 * @default 15
 * @desc Cuánta guata se aplica cuando hay texto negrito o de italicas.
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
 * @desc Whether or not the algorithm will consider this entry. Default: On
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
 * @desc Si o no el algoritmo considerará este formato. Por defecto: true
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
* @param DesignatedWrappers
* @text AjustelíneasDesignados
* @desc Aquí, decides cuales ajustelíneas se asignan a partes diferentes del IU.
*
* @param MessageWrapper
* @text CajasDeMensajes
* @parent DesignatedWrappers
* @type string
* @default null
* @desc Para cajas de mensajes normales. Por defecto: null
*
* @param MessageSpacing
* @text Espaciado
* @parent MessageWrapper
* @type struct<WrapperSpacing>
* @default {"MugshotWidth":"144","MugshotPadding":"25","SidePadding":"5","BoldItalicPadding":"15"}
*
* @param DescWrapper
* @text Descripciones
* @parent DesignatedWrappers
* @type string
* @default null
* @desc Para ventanas que enseñan descripciónes para objetos y cosas así. Por defecto: null
*
* @param DescSpacing
* @text Espaciado
* @parent DescWrapper
* @type struct<WrapperSpacing>
* @default {"MugshotWidth":"144","MugshotPadding":"25","SidePadding":"5","BoldItalicPadding":"15"}
*
* @param MessageBacklogWrapper
* @text RegistrosDeMensajes
* @parent DesignatedWrappers
* @type string
* @default null
* @desc Por defecto: null
*
* @param BacklogSpacing
* @text Espaciado
* @parent MessageBacklogWrapper
* @type struct<WrapperSpacing>
* @default {"MugshotWidth":"10","MugshotPadding":"1","SidePadding":"8","BoldItalicPadding":"3"}
*
* @param BubbleWrapper
* @text BurbujasDeMensajes
* @parent DesignatedWrappers
* @type string
* @default null
* @desc Para burbujas de mensajes como los del MessageStyles plugin de Galv. Por defecto: null
*
* @param BubbleSpacing
* @text Espaciado
* @parent BubbleWrapper
* @type struct<WrapperSpacing>
* @default {"MugshotWidth":"10","MugshotPadding":"1","SidePadding":"2","BoldItalicPadding":"3"}
*
* @param NametagFormats
* @text FormatosDeGafete
* @type struct<RegexEntry>[]
* @desc Avise al algorítmo que se vale como gafete.
* @default ["{\"Name\":\"TodosDeColor\",\"RegexAsString\":\"^(\\u001b|\\\\\\\\)c\\\\[\\\\d+\\\\][^\\\\n]+(\\u001b|\\\\\\\\)c\\\\[\\\\d+\\\\]\",\"Enabled\":\"true\",\"Notes\":\"\\\"Este detecta cualquier texto colorado (no nueva línea)\\\\nempezando por el principio y terminando con un etiqueta\\\\nde color. Si unas nuevas líneas son antes del \\\\netiqueta terminante, pues este formato no detectará\\\\nnada en cualquier texto el ajustelíneas estaba \\\\ntrabajando con.\\\\n\\\\nEste es principalmente para los gafetes Yanfly como\\\\nse enseñan en el registro de mensajes. Es debido a\\\\ncomo los plugins de Yanfly los usan en situaciones\\\\ndiferentes.\\\"\"}","{\"Name\":\"Normal\",\"RegexAsString\":\"^[^\\\\n]+:((\\u001b|\\\\\\\\)c\\\\[\\\\d+\\\\])?\",\"Enabled\":\"true\",\"Notes\":\"\\\"Este detecta el texto (no nueva línea) empezando en el\\\\nprincipio y termina con los dos puntos. Si algunas\\\\nnueva líneas son antes de los dos puntos, pues este\\\\nformato no detectará nada en cualquier texto el\\\\najustelíneas estaba trabajando con.\\\\n\\\\nFunciona con el texto colorado tambien.\\\"\"}","{\"Name\":\"SquareBrackets\",\"RegexAsString\":\"^\\\\\\\\[[^\\\\n]+\\\\\\\\]((\\u001b|\\\\\\\\)c\\\\[\\\\d+\\\\])?\",\"Enabled\":\"true\",\"Notes\":\"\\\"Este detecta cualquier texto (no nueva línea)\\\\nempezando del principio con un corchete inicial,\\\\ny terminando con un corchete final. Si alguna nueva\\\\nlínea estaba antes del corchete final, pues este formato\\\\nno detectará nada en cualquier texto el ajustelíneas\\\\nestaba trabajando con.\\\\n\\\\nFunciona con el texto colorado tambien.\\\"\"}"]
* 
* @param EmptyText
* @text TextoVacío
* @type struct<RegexEntry>[]
* @default ["{\"Name\":\"Text-ColoringCode\",\"RegexAsString\":\"\\\\s?(\\u001b|\\\\\\\\)C\\\\[\\\\d+\\\\]\\\\s?\",\"Enabled\":\"true\",\"Notes\":\"\\\"\\\"\"}","{\"Name\":\"GoldWindowCode\",\"RegexAsString\":\"\\u001b\\\\$\",\"Enabled\":\"true\",\"Notes\":\"\"}","{\"Name\":\"DotPause\",\"RegexAsString\":\"\\u001b\\\\.\",\"Enabled\":\"true\",\"Notes\":\"\\\"For the code that applies a slight pause in text.\\\"\"}","{\"Name\":\"BoldTextMarker\",\"RegexAsString\":\"\\u001bMSGCORE\\\\[1\\\\]\",\"Enabled\":\"true\",\"Notes\":\"\"}","{\"Name\":\"ItalicTextMarker\",\"RegexAsString\":\"\\u001bMSGCORE\\\\[2\\\\]\",\"Enabled\":\"true\",\"Notes\":\"\"}","{\"Name\":\"One-SecondWaitMarker\",\"RegexAsString\":\"\\u001b|\",\"Enabled\":\"true\",\"Notes\":\"\"}","{\"Name\":\"AutoscrollMarker\",\"RegexAsString\":\"\\u001b^\",\"Enabled\":\"true\",\"Notes\":\"\"}"]
* 
* @param LineBreakMarkers
* @text SeñalesDeSaltalíneas
* @type string[]
* @default ["<br>", "<br2>", "<line-break>"]
* @desc Pon estos en el texto dónde quieres garantizar una salta de línea.
* 
* @param RememberResults
* @text RecuerdaResultos
* @type boolean
* @default true
* @desc Si o no esto llevará un registro y siempre da las salidas para las mismas entradas.
* 
* @param ForAesthetics
* @text PorEstéticos
*
* @param LineMinCharCount
* @text MinDeLíneasTotalDeCará
* @parent ForAesthetics
* @type number
* @default 10
* @min 0
* @desc Minimo de carácteres que una línea puede tener. Por defecto: 10
* 
* @param ParenthesisAlignment
* @text AlineaciónDeParéntesis
* @parent ForAesthetics
* @type boolean
* @default true
* @desc Si o no esto alinea el texto basado en paréntesis. Por defecto: true
* 
* @param WordSeparator
* @text SeparadorDePalabras
* @parent ForAesthetics
* @type string
* @default " "
* @desc Que un ajustelíneas debe buscar para diferenciar las palabras. Por defecto: " "
*
* @param CascadingUnderflow
* @text NegadesbordamientoCascadando
* @parent ForAesthetics
* @type boolean
* @default false
* @desc Si o no una línea en cualquier entrada puede ser más ancho que la primera. Por defecto: OFF
* 
* @param CULenience
* @text IndulgenciaDeNC
* @parent CascadingUnderflow
* @type number
* @min -999999
* @default 5
* @desc Cuántos unidades más ancho que la primera línea que las posteriores se permiten ser. Por defecto: 5
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