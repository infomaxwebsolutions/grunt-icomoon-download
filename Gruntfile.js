'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    'icomoon-download': {
      options: {
        link: 'https://i.icomoon.io/public/123456/myFoobarProject/style.css',
        clean: true,
        fontsPath: 'dist/fonts/icomoon',
        fontsRelativePath: '../fonts/icomoon',
        styleFile: 'dist/styles/icomoon.less'
      },
      'default': {
      }
    },
  });

  grunt.loadTasks('tasks');
  grunt.registerTask('default', ['icomoon-download']);
};
