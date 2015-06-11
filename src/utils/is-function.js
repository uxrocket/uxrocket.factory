// FORK OF: https://github.com/tjmehta/101/blob/v1.0.0/is-function.js

/**
 * @module 101/is-function
 */

/**
 * Functional version of val typeof 'function'
 * @function module:101/is-function
 * @param {*} val - value checked to be a function
 * @return {boolean} Whether the value is a function or not
 */
export default function isFunction (v) {
    return typeof v === 'function';
}