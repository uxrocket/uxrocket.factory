(function(window, document, $){
    "use strict";

    // Constants
    var PLUGIN_STORE    = {},
        TEMPLATE_CACHE  = {};

    /**
     * Core constructor.
     * @param {object} pluginOptions
     * @constructor
     */
    function PluginCore(pluginOptions){
        // Null values.
        this.fetchedData = null;

        // Set info.
        this.pluginOptions = pluginOptions;
    }

    /* Default core plugin options. */
    PluginCore.prototype.options = {
        event_names: {
            ready           : "ready",
            beforeDestroyed : "beforeDestroyed",
            afterDestroyed  : "afterDestroyed",
            sourceFetched   : "sourceFetched"
        },
        ajax: {
            method  : "GET",
            dataType: "JSON",
            async   : true
        }
    };

    /**
     * Extend default options with given set.
     * @param {object} options
     */
    PluginCore.prototype.extendOptions = function(options){
        $.extend(true, this.options, options);
    };

    /**
     * Attach id to plugin, and register with that id.
     */
    PluginCore.prototype.attachId = function(){
        var store = PLUGIN_STORE[this.pluginOptions.slug];
        this.id = store.length;
        store[store.length] = this;
    };

    /**
     * Execute given command.
     * @param {array} params
     */
    PluginCore.prototype.executeCommand = function(params){
        // Get function
        var _function = this[params[0]];

        // Execute function with given params if function exist.
        if(typeof _function === "function") _function.apply(this, params.slice(1));
    };

    /**
     * Destroy plugin.
     * This is a core level function.
     */
    PluginCore.prototype._destroy = function(){
        // Trigger before destroyed event.
        this.trigger("beforeDestroyed");

        // Trigger instance level destroy.
        if (typeof this.destroy === "function") this.destroy();

        // Trigger after destroyed event.
        this.trigger("afterDestroyed");
    };

    /**
     * Trigger an event.
     * @param {string} eventSlug
     */
    PluginCore.prototype.trigger = function(eventSlug){
        // Get event name.
        var eventName               = this.options.event_names[eventSlug],
            capitalizedEventName    = eventName[0].toUpperCase() + eventName.substr(1),
            withOnPrefix            = "on"+capitalizedEventName,
            coreLevel               = "_"+withOnPrefix;

        // Trigger event on core prototype level.
        var coreProtoypeHandler = this[coreLevel];
        if (typeof coreProtoypeHandler === "function") coreProtoypeHandler.call(this);

        // Trigger event on prototype level.
        var protoypeHandler = this[withOnPrefix];
        if (typeof protoypeHandler === "function") protoypeHandler.call(this);

        // Trigger event on options level.
        var optionsHandler = this.options[withOnPrefix];
        if (typeof optionsHandler === "function") optionsHandler.call(this);

        // Trigger event on element if element exist.
        // Slug will be used as prefix for event name and event name will be capitalized.
        // For example: if slug is "plugin" and event is "ready", "pluginReady" will be triggered.
        if(this.options.$el) this.options.$el.trigger(this.pluginOptions.slug + capitalizedEventName, this);
    };

    /**
     * Handlebars Render
     * @param {string} templateString
     * @param {object} templateData
     */
    PluginCore.prototype.handlebarsRender = function(templateString, templateData){
        // Compile and cache template if didnt before.
        if(!TEMPLATE_CACHE[templateString]){
            TEMPLATE_CACHE[templateString] = Handlebars.compile(templateString);
        }

        // Return rendered template.
        return TEMPLATE_CACHE[templateString](templateData);
    };

    /**
     * Detect source type and get data from source.
     */
    PluginCore.prototype.fetchSource = function(){
        // Collect variables
        var _this  = this,
            dataSource,
            source = this.options.source;

        // RegExp tests.
        var isFunctionCall = /(.*)\((.*)\)/;

        // Trigger for fetch completion.
        function triggerFetchCompletion(fetchedData){
            _this.fetchedData = fetchedData;
            _this.trigger("sourceFetched");
        }

        // Try fetch as function call.
        if(isFunctionCall.test(source)){
            // Evaluate function.
            __.evaluateFunctionCall(source, function(fetchedData){
                triggerFetchCompletion(fetchedData);
            }, {async: true});
            return;
        }

        // Try fetch as nested object.
        dataSource = __.parseNesting(source);
        if(dataSource) {
            // If source is function Run asynchronously and get data from function.
            if(typeof dataSource === "function"){
                __.runAsync(function(){
                    triggerFetchCompletion(dataSource())
                });
            }
            // If not function, simply assign
            else{
                triggerFetchCompletion(dataSource);
            }
            return;
        }

        // Try fetch as ajax call.
        if(__.isUrl(source)){
            $.ajax($.extend(this.options.ajax, {
                url     : source,
                success : triggerFetchCompletion
            }));
            return;
        }

        // Try fetch from DOM object.
        dataSource = $(source);
        if(dataSource.length){
            triggerFetchCompletion(dataSource.html());
            return;
        }

        // Use as is.
        triggerFetchCompletion(source);
    };

    /**
     * Actual factory.
     * @param {constructor} pluginConstructor
     * @param {object} pluginOptions
     * @returns {Function}
     */
    function Factory(pluginConstructor, pluginOptions){

        // Plugin wrapper.
        function UXRocketPlugin(instanceOptions, fromJqueryPlugin){
            if (typeof instanceOptions === "undefined") instanceOptions = {};

            // Init core constructor.
            PluginCore.call(this, pluginOptions);

            // Extend options and attach id.
            this.extendOptions(instanceOptions);
            this.attachId();

            // Init plugin constructor.
            pluginConstructor.call(this);

            // Trigger ready plugin if factory not create from jquery.
            if(!fromJqueryPlugin) this.trigger("ready");
        }

        // Extend all prototypes.
        $.extend(true, UXRocketPlugin.prototype, PluginCore.prototype, pluginConstructor.prototype);

        // Correct constructor.
        UXRocketPlugin.prototype.constructor = UXRocketPlugin;

        // Return an function which expect options to create plugin instance.
        return function(instanceOptions, fromJqueryPlugin){
            return new UXRocketPlugin(instanceOptions, fromJqueryPlugin);
        }
    }

    /**
     * Register jQuery Plugin
     * @param {function} factory
     * @param {object} pluginOptions
     */
    function RegisterPlugin(factory, pluginOptions){
        // Get slug.
        var slug = pluginOptions.slug;

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
                    var options = $.extend(true, _options, __.collectAttributes(element, "data"), $el.data());

                    // Register element under options.
                    options.$el = $el;

                    // Create plugin.
                    createdPlugin = factory(options, true);

                    // Register plugin to data.
                    $el.data(slug, createdPlugin);

                    // Trigger ready event.
                    createdPlugin.trigger("ready");
                }else{
                    // Execute command if plugin already created and first argument is string.
                    if(typeof args[0] === "string") createdPlugin.executeCommand(Array.prototype.slice.call(args));
                }
            });
        };

        // Register version info.
        jQueryPlugin.version = pluginOptions.version;

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

    // Factory for plugin.
    window.UXRocketFactory = {
        /**
         * Create a plugin that based on factory.
         * @param {constructor} pluginConstructor
         * @param {object} pluginOptions
         * @returns {constructor}
         */
        create: function(pluginConstructor, pluginOptions){
            // Check data.
            if (!pluginOptions.slug || !pluginOptions.name || !pluginOptions.version)
                throw new ReferenceError("Please provide name, slug and version info for plugin.");

            // Create store record.
            PLUGIN_STORE[pluginOptions.slug] = [];

            // Prepare factory.
            var factory = Factory(pluginConstructor, pluginOptions);

            // Register plugin as a jQuery plugin.
            RegisterPlugin(factory, pluginOptions);

            // Return created factory.
            return factory;
        },

        /**
         * Get element from plugin store with given slug and id.
         * @param {string} slug
         * @param {number} id
         */
        get: function(slug, id){
            return this.getAll(slug)[id];
        },

        /**
         * Get all elements from plugin store with given slug.
         * @param {string} slug
         */
        getAll: function(slug){
            return PLUGIN_STORE[slug];
        },

        /**
         * Destroy plugin with given slug and id.
         * @param {string} slug
         * @param {number} id
         */
        destroy: function(slug, id){
            this.get(slug, id)._destroy();
        },

        /**
         * Destroy all plugins with given slug.
         * @param {string} slug
         */
        destroyAll: function(slug){
            $.each(this.getAll(slug), function(i, plugin){
                plugin._destroy();
            })
        }
    };

}(window, document, jQuery));