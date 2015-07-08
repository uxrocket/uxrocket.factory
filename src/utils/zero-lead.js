/**
 * @module __.zeroLead
 * @type {function}
 */

/**
 * Add zero-lead to number.
 *
 * @param {number} number
 * @returns {string} zero lead number.
 *
 * @example
 *
 * zeroLead(1);
 * //=> '01'
 */
export default function zeroLead(number){
  var s = '0'+num;
  return s.substring(s.length-2);
  //return ('0'+num).substring(-2); // doesn't work on IE
}
