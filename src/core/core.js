/**
 * @author Bilal Cinarli
 */

'use strict';

(function(factory) {
    if(typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if(typeof exports === 'object' && typeof require === 'function') {
        // Browserify
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery, window, document);
    }
}(function($, window, document) {

    var defaults = {},
        events = {};

    var uxrFactoryCore = function(el, options, selector) {

    };

    $.extend(uxrFactoryCore.prototype, {
        init: function() {

        },

        _build: function() {

        }
    });

    window.uxrFactoryCore = uxrFactoryCore;
}));