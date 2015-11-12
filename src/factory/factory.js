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
        factory(jQuery, window);
    }
}(function($, window) {
    var UXRocket = function(){};

    window.UXRocket = window.uxr = $.uxrocket = UXRocket;

    console.warn('UX Rocket Factory is in alpha for now. Currently utils module is available');
}));