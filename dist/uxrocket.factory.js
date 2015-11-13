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
    var i = 1;

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
                var func = new Function('return ' + fn);
                func();
            }
        }
    };

    uxrPluginUtils.prototype.getStringVariable = function(str) {
        var val;
        // check if it is chained
        if(str.indexOf('.') > -1) {
            var chain    = str.split('.'),
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
            re    = /([ !"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~])/g;

        return is_ID ? '#' + selector.substring(1).replace(re, '\\$1') : selector;
    };

    uxrPluginUtils.prototype.uxrException = function(message) {
        this.name    = 'UXRocket';
        this.slug    = 'Generic';
        this.message = message;

        this.toString = function() {
            return this.name + ' (' + this.slug + '): ' + this.message;
        };
    };

    uxrPluginUtils.prototype.position = function(el, target) {
        var boundries = el.getBoundingClientRect(),
            top       = boundries.top + boundries.height,
            left      = boundries.left,
            width     = boundries.width;

        return target.css({top: top, left: left, minWidth: width});
    };

    /**
     * Simple template engine
     * Supports parameter replacement, loops, simple conditionals
     */
    uxrPluginUtils.template = {
        _expressions: {
            variable: /\{\{([a-zA-Z0-9_\.\-]+)\}\}/g,
            ifelse:   /{{#if ([a-zA-Z0-9\.]+)([\!\=><]{1,2})?(("|')?([a-zA-Z0-9_"']+)("|')?)?}}([^]+?){{\/if}}/g,
            loop:     /{{#each ([a-zA-Z0-9_\-]+)}}([^]+?){{\/each}}/g
        },

        _transform: function(data) {
            return Array.isArray(data) ? data : [data];
        },

        _matchAll: function(string, search) {
            var matches = [];
            string.replace(search, function() {
                var arr    = ([]).slice.call(arguments, 0);
                var extras = arr.splice(-2);
                arr.index  = extras[0];
                arr.input  = extras[1];
                matches.push(arr);
            });
            return matches.length ? matches : null;
        },

        _conditional: function(operator, lhs, rhs, data) {
            var condition = false;

            if(!data) { data = {}; }

            if(data.hasOwnProperty(lhs) && this._operator.hasOwnProperty(operator)) {
                condition = this._operator[operator](data[lhs], rhs);
            }

            return condition;
        },

        _operator: {
            'undefined': function(lhs) { return lhs !== false; },
            '==':        function(lhs, rhs) { return lhs === rhs; },
            '!=':        function(lhs, rhs) { return lhs !== rhs; },
            '>':         function(lhs, rhs) { return lhs > rhs; },
            '>=':        function(lhs, rhs) { return lhs >= rhs; },
            '<':         function(lhs, rhs) { return lhs < rhs; },
            '<=':        function(lhs, rhs) { return lhs <= rhs; }
        },

        _replace: function(string, search, prefix) {
            var prefix = prefix ? prefix + '.' : '';

            Object.keys(search).forEach(function(key) {
                if(typeof search[key] !== 'object') {
                    string = string.replace(new RegExp('{{' + prefix + key + '}}', 'g'), search[key]) + '\n';
                }
            });

            return string;
        },

        unmatched: function(rendered) {
            return rendered.replace(this._expressions.variable);
        },

        conditions: function(rendered, data, original) {
            var _this         = this,
                hasConditions = this._matchAll(rendered, this._expressions.ifelse);

            if(hasConditions) {
                hasConditions.map(function(condition) {
                    var _ifelse = condition[7].split('{{#else}}'),
                        lhs     = condition[1],
                        output  = '';

                    if(original) {
                        lhs = lhs.replace(original + '.', '');
                    }

                    if(_this._conditional(condition[2], lhs, condition[5], data)) {
                        output = _ifelse[0];
                    }
                    else if(typeof _ifelse[1] !== 'undefined') {
                        output = _ifelse[1];
                    }

                    rendered = rendered.replace(condition[0], output);
                });
            }

            return rendered;
        },

        loops: function(rendered, data) {
            var _this    = this,
                hasLoops = this._matchAll(rendered, this._expressions.loop);

            if(hasLoops) {
                hasLoops.map(function(loop) {
                    if(data.hasOwnProperty(loop[1])) {
                        var loopData      = _this._transform(data[loop[1]]),
                            _renderedLoop = '\n';

                        loopData.map(function(row) {
                            var _row = _this._replace(loop[2], row, loop[1]);
                            _renderedLoop += _this.conditions(_row, row, loop[1]);
                        });

                        rendered = rendered.replace(loop[0], _renderedLoop);
                    }
                });
            }

            return rendered;
        }
    };

    uxrPluginUtils.prototype.render = function(template, data) {
        var _rendered = template,
            params    = uxrPluginUtils.template._transform(data);

        // first iteration strings/numbers etc.
        params.map(function(obj) {
            _rendered = uxrPluginUtils.template._replace(_rendered, obj);
        });

        // second iteration each loops
        _rendered = uxrPluginUtils.template.loops(_rendered, data);

        // last iteration for conditions
        _rendered = uxrPluginUtils.template.conditions(_rendered, data);

        // remove all unmatched
        _rendered = uxrPluginUtils.template.unmatched(_rendered);

        return _rendered;
    };

    uxrPluginUtils.version = '0.1.0';

    window.uxrPluginUtils = uxrPluginUtils;
}));
//# sourceMappingURL=uxrocket.factory.js.map