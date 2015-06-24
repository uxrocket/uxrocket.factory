// FORK OF: https://github.com/uxrocket/uxrocket.utils/blob/0.2.0/src/uxrocket.utils.js#L687

/**
 * @module __.toUpperCase
 * @type {function}
 */

import replaceString from "./replace-string";
import languagesCharMap from "./languages-char-map"

/**
 * Convert letters to upper case, and perform language based conversion if specified.
 *
 * @param {string} string
 * @param {object} [options]
 * @returns {string} upperized string
 *
 * @options
 *
 * > language
 *      Which language gonna used for language based conversion.
 *
 *      type    : string
 *      default : null
 *      values  : properties of languagesCharMap
 *
 * @examples
 *
 * toUpperCase('information technologies');
 * //=> 'INFORMATION TECHNOLOGIES'
 *
 * toUpperCase('istanbul');
 * //=> 'ISTANBUL'
 *
 * toUpperCase('istanbul', {language: 'turkish'});
 * //=> 'İSTANBUL'
 */
export default function toUpperCase(string, options){
    /* Extend options */
    options = extend({
        language: null
    }, options || {});

    /* If language specified first perform replace, then upperize cases. */
    if(options.language){
        var map = languagesCharMap[options.language];
        return replaceString(string, map.lowerCase, map.upperCase).toLocaleUpperCase();
    }

    /* If there isnt language, simply upper case string. */
    return string.toUpperCase();
}