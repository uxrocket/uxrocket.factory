// FORK OF: https://github.com/uxrocket/uxrocket.utils/blob/0.2.0/src/uxrocket.utils.js#L260

/**
 * @module __.collectAttributess
 * @type {function}
 */

import clone from './clone';
import startsWith from './starts-with';
import toCamelCase from './to-camel-case';

/**
 * Collects attributes from element whichs starts with given prefix. (default prefix is data-)
 *
 * Important: The attributes which contains underscore '_' going to accept as new namespace. And values after underscore
 * will nested under this namespace. For disabling it set options.underscoreNesting = false; Check examples for more info.
 *
 * @param {HTMLElement} element
 * @param {string} prefix
 * @param {object} [options]
 * @returns {object} collected attributes
 *
 * @options
 *
 *
 * @examples
 *
 *
 */
export default function collectAttributes(element, prefix, options){
    /* Extend options */
    options = clone({
        underscoreNesting: true
    }, options || {});

    /* Hold attributes */
    var attributes = {};

    /* Collect attributes */
    Array.prototype.forEach.call(element.attributes, function(attribute){
        /* Get node info */
        var nodeName = attribute.name,
            nodeValue = attribute.value;

        /* Skip if prefix provided but attribute doesnt start with it. */
        if(prefix && !startsWith(nodeName, prefix)) return;

        /* Underscore nesting mode. */
        if(options.underscoreNesting){
            /* Keep previous namespace */
            var previousNamespace = attributes;

            /* Split with underscore and process the list */
            each(nodeName.split('_'), function(nestingName, index, collection){
                /* Remove prefix and convert to camel case */
                if(prefix) nestingName = nestingName.replace(prefix + '-', '');

                /* Convert underscore-seperated name to camelCase */
                nestingName = toCamelCase(nestingName);

                /* If there is another values */
                if(index < collection.length - 1){
                    /* Create name space if doesnt exist */
                    if(!previousNamespace[nestingName]) previousNamespace[nestingName] = {};

                    /* Change previous name space. */
                    previousNamespace = previousNamespace[nestingName];
                }
                /* If this is the last value. */
                else{
                    previousNamespace[nestingName] = nodeValue;
                }
            });
        }
        /* Simple mode */
        else{
            attributes[toCamelCase(nodeName.replace(prefix + '-', ''))] = nodeValue;
        }
    });
    /* Return attributes object. */
    return attributes;
}