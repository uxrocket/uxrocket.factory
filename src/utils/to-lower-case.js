// FORK OF: https://github.com/uxrocket/uxrocket.utils/blob/0.2.0/src/uxrocket.utils.js#L643

/**
 * @module __.toLowerCase
 * @type {function}
 */

import replaceString from "./replace-string";
import languagesCharMap from "./languages-char-map"

/**
 * Convert letters to lower case, and perform language based conversion if specified.
 *
 * @param {string} string
 * @param {object} [options]
 * @returns {string} lowerized string
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
 * toLowerCase('Information Technologies');
 * //=> 'information technologies'
 *
 * toLowerCase('Isınma Sorunu');
 * //=> 'isınma sorunu'
 *
 * toLowerCase('Isınma Sorunu', {language: 'turkish'});
 * //=> 'ısınma sorunu'
 */
export default function toLowerCase(string, options){
    /* Extend options */
    options = extend({
        language: null
    }, options || {});

    /* If language specified first perform replace, then lowerize cases. */
    if(options.language){
        var map = languagesCharMap[options.language];
        return replaceString(string, map.upperCase, map.lowerCase).toLocaleLowerCase();
    }

    /* If there isnt language, simply lower case string. */
    return string.toLowerCase();
}