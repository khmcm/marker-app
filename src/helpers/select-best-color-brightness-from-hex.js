/**
 * @description Converts a hex code color to its luminance value
 * @param {string} hex The hex code to be converted
 */
function selectBestColorBrightnessFromHex(hex) {
    if(typeof hex !== 'string') {
        throw new Error('Input must be string. Got ' + typeof hex);
    }
    
    if(!hex.match(/#?[a-fA-F0-9]{6}/)) {
        throw new Error(`Invalid color format, "${hex}"`);
    }

    //Remove the '#' at the beginning of the
    //hex code if it exists.
    if(hex[0] === '#') {
        hex = hex.substring(1);
    }

    /** @type {number} */
    const r = parseInt(hex.substring(0,2), 16);

    /** @type {number} */
    const g = parseInt(hex.substring(2,4), 16);

    /** @type {number} */
    const b = parseInt(hex.substring(4,6), 16);

    /** @type {number} */
    const luminance = (299 * r + 587 * g + 114 * b)/1000;

    if(luminance >= 127) {
        return '000000';
    } else {
        return 'ffffff';
    }
}


export default selectBestColorBrightnessFromHex;