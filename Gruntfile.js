module.exports = function(grunt){
    "use strict";

    // File folders.
    var filePaths = [
        "gruntfile.js",
        "src/**/*.js",
        "test/**/*.js",
        "grunt-tasks/**/*.js"
    ];

    // Init config.
    grunt.initConfig({
        pkg         : grunt.file.readJSON("package.json"),
        filePaths   : filePaths
    });

    // Load all packages.
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // Load all tasks.
    grunt.loadTasks("grunt-tasks");

    // Register tasks.
    grunt.registerTask("default", ["babel", "browserify", "uglify", "clean"]);
};