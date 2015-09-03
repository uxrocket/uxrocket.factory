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
    var uxrPlugins = [];

    var uxrFactory = function(name, defaults) {
        this._build(name, defaults);

        this._register(name);
    };

    $.extend(uxrFactory.prototype, {
        _register: function(name){
            $.fn['uxr' + name] = $['uxr' + name] = function(options){
                console.log(options);

                return this.each(function(){
                    $.data(this, 'uxr' + name, options);
                });
            };
        },
        _build: function(name, defaults){

        }
    });

    window.uxrFactory = uxrFactory;
}));