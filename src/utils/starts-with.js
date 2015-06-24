// FORK OF: https://github.com/uxrocket/uxrocket.utils/blob/0.2.0/src/uxrocket.utils.js#L260

/**
 * @module __.startsWith
 * @type {function}
 */

/**
 * Checks if string starts with given string target.
 *
 * @param string
 * @param target
 * @returns {boolean}
 *
 * @example
 *
 * __.startsWith('atv', 'at');
 * //=> true
 *
 * __.startsWith('at', 'at');
 * //=> true
 *
 * __.startsWith('cat', 'at');
 * //=> false
 */
export default function startsWith(string, target){
    return string.substr(0, target.length) === target;
}