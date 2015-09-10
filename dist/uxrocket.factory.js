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
/**
 * @author Bilal Cinarli
 */

'use strict';

(function(factory) {
    if(typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.

    } else if(typeof exports === 'object' && typeof require === 'function') {
        // Browserify

    } else {
        // Browser globals
        factory(window);
    }
}(function(window) {
    var uxrPluginUtils = function(ins) {
        this.instance = ins;
    };

    uxrPluginUtils.prototype.callback = function(fn) {
        // if callback string is function call it directly
        if(typeof fn === 'function') {
            fn.apply(this);
        }

        // if callback defined via data-attribute, call it via new Function
        else {
            if(fn !== false) {
                var func = function() {
                    return fn;
                };
                func();
            }
        }
    };

    uxrPluginUtils.prototype.getStringVariable = function(str) {
        var val;
        // check if it is chained
        if(str.indexOf('.') > -1) {
            var chain = str.split('.'),
                chainVal = window[chain[0]];

            for(var i = 1; i < chain.length; i++) {
                chainVal = chainVal[chain[i]];
            }

            val = chainVal;
        }

        else {
            val = window[str];
        }

        return val;
    };

    uxrPluginUtils.prototype.getClassname = function(which) {
        return this.instance.ns.prefix + this.instance.ns.name + '-' + this.instance.ns.classes[which];
    };

    uxrPluginUtils.prototype.escapeSelector = function(selector) {
        var is_ID = selector.charAt(0) === '#',
            re = /([ !"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~])/g;

        return is_ID ? '#' + selector.substring(1).replace(re, '\\$1') : selector;
    };

    uxrPluginUtils.prototype.uxrException = function(message) {
        this.name = 'UXRocket';
        this.slug = 'Generic';
        this.message = message;

        this.toString = function() {
            return this.name + ' (' + this.slug + '): ' + this.message;
        }
    };

    uxrPluginUtils.version = '0.1.0';

    window.uxrPluginUtils = uxrPluginUtils;
}));
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

    window.UXRocket = $.uxrocket = UXRocket;

    console.warn('UX Rocket Factory is in alpha for now. Only Plugin utils module is available');
}));
//# sourceMappingURL=uxrocket.factory.js.map