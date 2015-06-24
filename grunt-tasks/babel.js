module.exports = function(grunt){
    'use strict';

    grunt.config('babel', {
        dist: {
            options: {
                modules: "common"
            },
            files: [{
                expand  : true,
                cwd     : 'src',
                src     : ['**/*.js'],
                dest    : 'dist'
            }]
        }
    });
};