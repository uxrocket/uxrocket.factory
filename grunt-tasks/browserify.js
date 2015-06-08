module.exports = function(grunt){
    'use strict';

    grunt.config('browserify', {
        dist: {
            files: [{
                expand  : true,
                cwd     : 'dist',
                src     : ['**/*.js'],
                dest    : 'dist'
            }]
        }
    });
};