// FORK OF: https://github.com/uxrocket/uxrocket.utils/blob/0.2.0/src/uxrocket.utils.js#L558

/**
 * @module __.replaceString
 * @type {function}
 */

/**
 * Replace string.
 * Supports arrays as replace map.
 *
 * @param {string} string
 * @param {string|object} replaceIt
 * @param {string|object|function} replaceWith
 * @param {object} [options]
 * @returns {string} replaced string
 */
export default function replaceString(string, replaceIt, replaceWith, options){
    /* Extend options */
    options = extend({
        regexp          : false,
        global          : true,
        caseSensitive   : true,
        multiline       : false
    }, options || {});

    /* Create regexp settings by options */
    var regexpSettings = '';
    if(options.global)
        regexpSettings += 'g';
    if(!options.caseSensitive)
        regexpSettings += 'i';
    if(options.multiline)
        regexpSettings += 'm';

    /* Replace if all items are string. */
    if(type(replaceIt) === 'string' && (type(replaceWith) === 'string' || type(replaceWith) === 'function')){
        /* Escape regexp by settings. */
        if(!options.regexp) replaceIt = regexpEscape(replaceIt);

        /* Return replaced string. */
        return string.replace(new RegExp(replaceIt, regexpSettings), replaceWith);
    }

    /* If replaceIt is an array. */
    if(type(replaceIt) === 'array' &&
        (type(replaceWith) === 'array' || type(replaceWith) === 'string' || type(replaceWith) === 'function')){

        /* Check if replace with is an array. */
        var replaceWithArray = (type(replaceWith) === 'array');

        /* Process replace list. */
        each(replaceIt, function(value, index){
            /* Escape regexp by settings. */
            if(!options.regexp) value = regexpEscape(value);

            /* If replaceWith is an array, find out counter item. */
            var replaceWithItem = replaceWithArray ? replaceWith[index] : replaceWith;

            /* Replace string. */
            string = string.replace(new RegExp(value, regexpSettings), replaceWithItem);
        });

        /* Return replaced string. */
        return string;
    }

    /* Return original string if nothing changed. */
    return string;
}