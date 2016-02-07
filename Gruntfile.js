module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      bower: [ 'www/res/js/build' ],
    },

    bower: { // copy files to res
      dev: {
        dest: 'www/res',
        css_dest: 'www/res/css',
        js_dest: 'www/res/js',
        options: {
          packageSpecific: {
            phaser: {
              files: [
                'build/phaser.min.js'
              ]
            }
          }
        }
      }
    }, // bower

  });

  grunt.registerTask('default', ['bower']);

};
