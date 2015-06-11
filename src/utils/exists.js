// FORK OF: https://github.com/tjmehta/101/blob/v1.0.0/exists.js

/**
 * @module {function} 101/exists
 * @type {function}
 */

/**
 * Returns false for null and undefined, true for everything else.
 * @function module:101/exists
 * @param val {*} - value to be existance checked
 * @return {boolean} whether the value exists or not
 */
export default function exists (val) {
    return val !== undefined && val !== null;
}