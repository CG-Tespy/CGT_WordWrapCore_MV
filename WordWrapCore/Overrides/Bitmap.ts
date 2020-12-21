// Altering the measureTextWidth so it doesn't count color codes,
// and it handles \V correctly
var oldMeasureTextWidth = Bitmap.prototype.measureTextWidth;
var colorCodeRegex = /C\[[0-9]+\]/gm;
var varCodeRegex = /V\[[0-9]+\]/gm;

/**
 * 
 * @param {string} text 
 */
function NewMeasureTextWidth(text)
{
    text = text.replace(colorCodeRegex, "");
    text = text.replace(varCodeRegex, GetVariableValue);
    return oldMeasureTextWidth.call(this, text);
}

/**
 * @param {string} varTag 
 */
function GetVariableValue(varTag)
{
    var varIndex = parseInt(varTag.match(/[0-9]+/)[0]);
    return $gameVariables[varIndex] + "";
}

Bitmap.prototype.measureTextWidth = NewMeasureTextWidth;