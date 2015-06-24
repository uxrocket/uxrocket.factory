module.exports = function(grunt){
    'use strict';

    grunt.config('clean', {
        dist: ['dist/**/*', '!dist/plugins/**']
    });
};