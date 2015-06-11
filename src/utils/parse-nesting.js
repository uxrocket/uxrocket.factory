// FORK OF: https://github.com/uxrocket/uxrocket.utils/blob/0.2.0/src/uxrocket.utils.js#L791

/**
 * @module __.parseNesting
 * @type {function}
 */

/**
 * Going to parse given dot orienting nesting and return finded value.
 *
 * @param {string} nestingExpression
 * @param {object} [context=root]
 * @returns {*}
 *
 * @example
 *
 * window.stuff = {
 *      nested: {
 *          deep: {
 *              wow: 'such'
 *          }
 *      }
 * }
 *
 * __.parseNesting('stuff.nested.deep.wow');
 * //=> 'such'
 *
 * __.parseNesting('nested.deep.wow', stuff);
 * //=> 'such'
 */
export default function parseNesting(nestingExpression, context){
    /* If context not provided, take root as context (root is window in browser) */
    context || (context = window || global);

    /* Dig into nesting. */
    return Array.prototype.reduce.call(nestingExpression.split('.'), function(parent, child){
        return (parent && parent[child] ? parent[child] : undefined);
    }, context);
}