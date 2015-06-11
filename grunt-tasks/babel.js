module.exports = function(grunt){
    'use strict';

    grunt.config('babel', {
        options: {
            //sourceMap: true,
            modules: "common"
        },
        dist: {
            files: [{
                expand  : true,
                cwd     : 'src',
                src     : ['**/*.js'],
                dest    : 'dist'
            }]
        }
    });
};