declare module "fenix-tools"
{
    
/**
 * Cleans the path by replacing two forward slashes with one.
 *
 * @function cleanPath
 * @since 1.0.0
 * @memberof module:File
 *
 * @param {string} path - The path you want to clean.
 * @return {string} The cleaned string.
 * @example
 * import { cleanPath } from 'fenix-tools'
 *
 * const badUrl = 'C://Path//to/something//'
 *
 * console.log(cleanPath(badUrl)) // => 'C:/Path/to/something/'
 */
function cleanPath (path: string): string
  
  /**
   * An async function which determines if the current computer has internet
   * access by pinging to a server. If no url is provided it checks
   * navigator.online
   *
   * @function hasWebAccess
   * @async
   * @since 1.0.0
   * @memberof module:File
   *
   * @param {string} [url] A url to a server
   *
   * @return {promise} A promise that resolves to true or false
   * @example
   * import { hasWebAccess } from 'fenix-tools'
   *
   * const canDownload = await hasWebAccess('http://google.com')
   * console.log(canDownload) // => returns true
   *
   * hasWebAccess('http://google.com')
   * .then('Web connection is live!)
   */
  function hasWebAccess (url: string): Promise<any>
  
  /**
   * An async function which downloads a file via node's http or https.
   *
   * @function downloadFile
   * @async
   * @since 1.0.0
   * @memberof module:File
   * @see {@link module:File.hasWebAccess|hasWebAccess}
   *
   * @param {object} config - A configuration object.
   * @param {string}  config.url - The url to the file you want to download
   * @param {number}  [config.port=443] - The port number to use
   * @param {object}  [config.agent=http.globalAgent] - How much gold the party starts with.
   *
   * @returns {Promise} - Returns a promise that resolves the file's data
   * from the url
   * @example
   * import {downloadFile, tryWriteFile} from 'fenix-tools'
   *
   * downloadFile({
   *  url: 'http://fenixenginemv.gitlab.io/img/fenix-logo-signature.png'
   * port: 80,
   * })
   * .then(data => {
   *   console.log(data) // => The downloaded file's data
   *   tryWriteFile('/', data) // => writes file to machine
   * })
   *
   */
  function downloadFile (config?: object): Promise<any>
  
  /**
   * Checks if file(s) exist on a local machine using node fs.
   *
   * @function localFileExists
   * @since 1.0.0
   * @memberof module:File
   *
   * @param {string|array} paths - A path or array of paths to check.
   *
   * @return {boolean} True if the file path or paths exist
   * @example
   * import {localFileExists} from 'fenix-tools'
   *
   * localFileExists('./img/pictures/myPicture.png') // => Returns true or false
   *
   */
  function localFileExists (paths?: string | Array<any>): boolean
  
  /**
   * @author       LTNGames <ltngamesdevelopment@gmail.com>
   * @copyright    2018 FeniX Engine
   * @license      {@link https://gitlab.com/FeniXEngineMV/fenix-utils/blob/master/LICENSE|MIT License}
   */
  
  /**
   * An async function for checking if a file exist on a server.
   *
   * @function webFileExists
   * @async
   * @since 1.0.0
   * @memberof module:File
   *
   * @param {string} url - The url to the file
   *
   * @returns {promise} Promise that resolves to true if the file exists.
   * @example
   * import { webFileExists } from 'fenix-tools'
   *
   * const file = 'http://example.com/file.png'
   *  const fileExists = await webFileExists(file)
   * console.log(fileExists)  // => returns true if file exists
   * // or
   * webFileExists(file)
   * .then(console.log('File exists!'))
   * .catch(console.log('Unable to get file))
   */
  function webFileExists (url: string): Promise<any>
  
  /**
   * Check if a file exists.
   *
   * @function fileExists
   * @since 1.0.0
   * @memberof module:File
   * @see {@link module:File.localFileExists|localFileExists}
   * @see {@link module:File.webFileExists|webFileExists}
   *
   * @param {string} path - The path to the file
   * @param {array} extensions -  the extension(s) of file you want to check
   *
   * @returns {Boolean} true if the file exists.
   * @example
   * import { fileExists } from 'fenix-tools'
   *
   * console.log(fileExists('./path/to/file')) // => returns true or false
   *
   */
  function fileExists (url: string): boolean
  
  /**
   * Load a file on the local machine.
   *
   * @function loadLocalFile
   * @since 1.0.0
   * @memberof module:File
   *
   * @param {string} path - Path to the file.
   * @param {string} [encoding='utf8'] - The type of file encoding
   *
   * @return {promise} A promise that resolves the data
   * @example
   * import {loadLocalFile} from 'fenix-tools'
   *
   * loadLocalFile('./img/pictures/character1.png)
   * .then(data => {
   *  // Local file loaded success
   *  console.log(data)  // => A parsed JSON object.
   * })
   *
   */
  function loadLocalFile (path: string, encoding?: string): Promise<any>
  
  /**
   * Loads a JSON file. and parses it Decides to use node or fetch based on platform.
   * If using nwjs it will use node else it falls back to fetch()
   *
   * @function loadJSON
   * @async
   * @since 1.0.0
   * @memberof module:File
   * @see {@link module:File.loadLocalFile|loadLocalFile}
   *
   * @param {any} path - The path to the JSON file.
   *
   * @returns {promise} promise - A promise that resolves the parsed JSON
   * @example
   * import {loadJSON} from 'fenix-tools'
   *
   * loadJSON('./data/highscores.json')
   * .then(data => {
   *   // success for parsing and loading JSON file
   *   console.log(data)  // => A parsed JSON object.
   * })
   *
   */
  function loadJSON (path: string): Promise<any>
  
  /**
   * Gets the location of the current game.exe, a full root project path.
   *
   * @function projectPath
   * @since 1.0.0
   * @memberof module:File
   *
   * @return {string} The current project root path
   * @example
   * import {projectPath} from 'fenix-tools'
   *
   * projectPath() // => 'C:/fullpath/to/project'
   *
   */
  function projectPath (): string
  
  /**
   * Attempts to write given data to a file.
   *
   * @function tryWriteFile
   * @since 1.0.0
   * @memberof module:File
   *
   * @param {string} filepath - Path to an existing or new file you want to write to
   * @param {string} data - The data you would like to write to the file
   * @param {string|object} [options='utf8'] - The options object or a string with the encoding
   *
   * @return {promise} A promise that resolves if successfully written to file
   * @example
   * import { tryWriteFile } from 'fenix-tools'
   *
   * tryWriteFile('path/to/file', 'Data to write to file', 'utf8')
   * .then(() => {
   *  // Success writing file to machine
   * })
   *
   */
  function tryWriteFile (filepath: string, data: string, options?: string | object): Promise<any>
  
  /**
   * Recursive method that will convert all string values in an object to a more
   * appropriate type.
   *
   * In MV there are a lot of objects filled with strings of different values, a lot
   * of times we need to convert each value manually, instead use this to quickly
   * deep parse each value from string to the correct type.
   *
   * @function convertParameters
   * @since 1.0.0
   * @memberof module:Utils
   *
   * @param {object} parameters - The string filled object you want converted
   *
   * @returns An object with it's string values converted
   * @example
   *
   * const myParams = { p1: '22', p2: 'true' }
   * convertParameters(myParams) // => { p1: 22, p2: true }
   *
   * const myParams = { p1: '{a: 1'1, c: '2'}', p2: '[{}, {}, {}]' }
   * convertParameters(myParams) // => { p1: {a: 1, c: 2}, p2: [{}, {}, {}] }
   *
   */
  function convertParameters (parameters: object): any
  
  /**
   * Extracts the canvas data and returns base64 data generated by PIXI renderer
   * You can use this data in combination with {@link module:File:tryWriteFile|tryWriteFile}
   * to save a screenshot of the entire canvas.
   *
   * @function extractCanvasImage
   * @since 1.0.0
   * @memberof module:Utils
   *
   * @param {number} [quality=0.1] - The quality of the image to produce
   *
   * @returns {string} returns the base64 data string.
   * @example
   * import {extractCanvasImage, tryWriteFile} from 'feni-tools'
   *
   * const canvasData = extractCanvasImage()
   *
   * // Now lets write the data to a file on the machine
   *
   * tryWriteFile(path/to/new/file, canvasData, 'base64')
   *   .then('Success writing screenshot')
   *
   *
   */
  function extractCanvasImage (quality?: number): string
  
  /**
   * Uses regex to recursively filter a string.
   *
   * @function filterText
   * @since 1.0.0
   * @memberof module:Utils
   *
   * @param {string} text - The text you would like to filter
   * @param {regex} regex - The regex pattern to use for filtering
   * @param {function} action - The callback function to evaluate
   *
   * @returns {array} An array of groups that match the evaluation
   * @example
   * import {filterText} from 'fenix-tools'
   *
   * const re = /pattern/g
   * const matches = filterText(text, re, (match) => {
   *  console.log(match) // => The full match group returned from regex
   *  // Perform an evaluation to store specific matches
   * })
   *
   */
  function filterText (text: string, regex: RegExp, action: Function): Array<any>
  
  /**
   * Retrieves meta values from an RPG Maker MV object that contains the meta property.
   * Will work with any object that contains a meta property, like $dataWeapons,
   * $dataItems, etc
   *
   * @function getMetaData
   * @since 1.0.0
   * @memberof module:Utils
   *
   * @param  {object} obj - The meta object you want to search through.
   * @param {string}  tag - The meta tag you want to search for.
   *
   * @returns {string} The value(s) of the notetag.
   * @example
   * import { getMetaData } from 'fenix-tools'
   *
   * // $dataActors[1].meta = {myTag: 'myTagValue'}
   *
   * const data = $dataActors[1]
   * const meta = getMetaData(data, 'myTag') // => 'myTagValue'
   *
   */
  function getMetaData (obj: object, tag: string): string
  
  /**
   * Finds and extracts a notetag from a multiline string of text and returns it's value
   *
   * @function getMultiLineTag
   * @since 1.0.0
   * @memberof module:Utils
   *
   * @param {string} text - The text to evaluate
   * @param {string} tag - The tag to search for in the text
   *
   * @returns {array} - An array of matches containing the values between the tags
   * @example
   * import { getMultiLineTag } from 'fenix-tools'
   *
   * // $dataWeapons[1].note = '<myTag> opt1: value, opt2: value </myTag>'
   *
   * const myNotes = getMultiLineTag($dataWeapons[1].note, 'myTag') // => ['opt1: value, opt2: value']
   *
   */
  function getMultiLineTag (text: string, tag: string): Array<any>
  
  /**
   * Finds and extracts a notetag from a string of text and returns it's values.
   * Not much different from using {@link module:Utils.getMetaData|getMetaData}, but
   * if you need more control over the string then use this method.
   *
   * @function getTag
   * @since 1.0.0
   * @memberof module:Utils
   *
   * @param {string} text - The text to be evaluated
   * @param {string} tag - The tag to search for in the text
   *
   * @returns {Array} - An array of parameters of the values within the tag <tag: value, value>
   * @example
   * import { getTag } from 'fenix-tools'
   *
   * // $dataActors[1].note = '<myTag: value, value2, value3>'
   *
   * const myTag = getTag($dataActors[1].note, 'myTag') // => 'value, value2, value3'
   *
   *
   */
  function getTag (text: string, tag: string): Array<any>
  
  /**
   * Converts hex values to rgb values
   *
   * @function hexToRgb
   * @since 1.0.0
   * @memberof module:Utils
   * @license Adapted from David on {@link https://stackoverflow.com/a/11508164/7019650|stackoverflow}
   *
   * @param {Number} hex - the hex value you want to convert
   *
   * @returns {String} A string representing the rgb value after conversion.
   * @example
   * import { hexToRgb } from 'fenix-tools'
   *
   * hexToRgb('42f48c') // => 66,244,140'
   *
   */
  function hexToRgb (hex: number): string
  
  /**
   * Scan all events on map and extract their comments. This can only be used when
   * the map data is available upon map load. It starts by looping through all events
   * in the current map and through each event page storing all comments.
   *
   * @function loadEventComments
   * @since 1.0.0
   * @memberof module:Utils
   *
   * @return {object} An object of all comments added together, sorted by eventId
   *
   * @example
   * const mapEventComments = loadEventComments()
   * // =>  *  // { 28: [param1, param2, param3] }
   *           // { 29: [param1, param2, param3] }
   *
   *
   */
  function loadEventComments (): object
  
  /**
   * Converts the tile position to the stage position
   *
   * @function tileCoords
   * @since 1.0.0
   * @memberof module:Utils
   *
   * @param  {number} x - the x tile position to convert.
   * @param  {number} y - the y tile position to convert.
   *
   * @returns {object} return and object with the new x and y positions
   * @example
   * import { tileCoords } from 'fenix-tools'
   *
   * const tileToCanvasPosition = tilePosition(7, 11) // => {x: 294, 460}
   *
   */
  function tileCoords (x: number, y: number): {x: number, y: number}
}