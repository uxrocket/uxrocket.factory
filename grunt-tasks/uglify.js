module.exports = function(grunt){
    'use strict';

    grunt.config('uglify', {
        options: {
            mangle   : true
        },

        factory: {
            files: {
                'dist/factory.js' : ['dist/factory.js']
            }
        }
    });
};