module.exports = function(grunt){
    'use strict';

    grunt.config('watch', {
        scripts: {
            files: ['src/**/*.js'],
            tasks: ['default']
        }
    });
};