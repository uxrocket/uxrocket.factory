module.exports = function(grunt){
    'use strict';

    grunt.config('browserify', {
        dist: {
            files: [{
                expand  : true,
                cwd     : 'dist/plugins',
                src     : ['**/*.*.js'],
                dest    : 'dist/plugins'
            }]
        }
    });
};