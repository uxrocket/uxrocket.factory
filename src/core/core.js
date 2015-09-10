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
    var uxrPlugin = function() {
    };

    $.extend(uxrPlugin.prototype, {
        init           : function(el, options, selector) {
            this.options = $.extend(true, {}, this.defaults, options);

            this.el = el;
            this.$el = $(el);
            this.selector = selector;
            this._instance = i;

            this.utils = new window.uxrPluginUtils({});

            return this;
        },
        defaults       : {
            onReady: false
        },
        register       : function() {

        },
        addClasses     : function() {
            this.$el.addClass(this.utils.getClassname('ready'));
        },
        removeClasses  : function() {
            this.$el.removeClass(this.utils.getClassname('ready'));
        },
        unBindUIActions: function() {
            this.$el.off('.' + slug);
        },
        update         : function(options) {

        },
        destroy        : function() {

        },

        cleanUp: function() {
            // remove wrapper
            $('.' + this.utils.getClassname('wrap') + '-' + this._instance).remove();
        }
    });

    window.uxrPlugin = uxrPlugin;
}));