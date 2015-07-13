module.exports = function(grunt){
    'use strict';

    grunt.config('clean', {
        dist_before: ['dist/**/*'],
        dist_after : ['dist/**/*', '!dist/plugins/**']
    });
};
