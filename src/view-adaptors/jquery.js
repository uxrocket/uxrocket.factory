"use strict";

// Import dependencies.
import View from "../core/view";
import collectAttributes from "../utils/collect-attributes"

/**
 *  jQuery Adaptor
 */
class JqueryAdaptor extends View {
    constructor(){
        super();
    }

    executeCommand(params){
        // Get function
        var _function = this[params[0]];

        // Execute function with given params if function exist.
        if(typeof _function === "function") _function.apply(this, params.slice(1));
    }

    register(slug, plugin, registerOptions){
        // Create jQuery plugin controller.
        var jQueryPlugin = function(_options){
            if (typeof _options === "undefined") _options = {};

            // Keep original arguments for execute commands.
            var args = arguments;

            // Process every element.
            return this.each(function(index, element){
                var $el, createdPlugin;

                // Get jQuery wrapped element.
                $el = $(element);

                // Try to get initialized plugin from element.
                createdPlugin = $el.data(slug);

                // Check existence of plugin.
                // If plugin doesnt exist.
                if(typeof createdPlugin === "undefined"){
                    // Collect options from attributes
                    var options = $.extend(true, _options, collectAttributes(element, "data"), $el.data());

                    // Register element under options.
                    options.$el = $el;

                    // Create plugin.
                    createdPlugin = new plugin(options);

                    // Register plugin to data.
                    $el.data(slug, createdPlugin);

                    // Trigger ready event.
                    createdPlugin.eventEmitter.emit("ready");
                }else{
                    // Execute command if plugin already created and first argument is string.
                    if(typeof args[0] === "string") createdPlugin.executeCommand(Array.prototype.slice.call(args));
                }
            });
        };

        // Register version info.
        jQueryPlugin.version = registerOptions.version;

        // Register plugin to jQuery.
        function register($){
            $.fn[slug] = jQueryPlugin;
        }

        // Register plugin with UMD orientation.
        if (typeof define === 'function' && define.amd) {
            // AMD. Register as an anonymous module.
            define(['jquery'], register);
        } else {
            // Browser globals
            register(jQuery);
        }
    }
}

export default JqueryAdaptor;
