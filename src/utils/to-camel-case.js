// FORK OF: https://github.com/uxrocket/uxrocket.utils/blob/0.2.0/src/uxrocket.utils.js#L731

/**
 * @module __.toCamelCase
 * @type {function}
 */

import replaceString from "./replace-string";
import toLowerCase from "./to-lower-case";
import toUpperCase from "./to-upper-case";

/**
 * Converts given underscore seperated string to camel case.
 *
 * @param {string} string
 * @returns {string} camelCased string.
 *
 * @example
 *
 * toCamelCase('data-source');
 * //=> 'dataSource'
 */
export default function toCamelCase(string){
    return replaceString(toLowerCase(string), '-(.)', function(match, firstLetter){
        return toUpperCase(firstLetter);
    }, {regexp: true});
}