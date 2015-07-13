module.exports = function(grunt){
    'use strict';

    grunt.config('gitclone', {
      domtastic: {
        options: {
          repository: 'https://github.com/webpro/DOMtastic.git',
          branch    : 'master',
          directory : 'src/vendors/domtastic'
        }
      }
    });
};
