'use strict';

const url = require('url'),
  path = require("path"),
  download = require('download'),
  tmp = require('temporary');

let urlWithOutFile = function (link) {
  let parsedUrl = url.parse(link);
  let path = parsedUrl.pathname.split("/");
  // remove the last part
  path.pop();
  // rebuild the url
  return parsedUrl.protocol + '//' + parsedUrl.hostname + path.join('/');
};

module.exports = function (grunt) {
  grunt.registerMultiTask('icomoon-download', 'Downloads the icon font by a given icomoon development link', function () {
    const done = this.async();
    let options = this.options({
      clean: false,
      fontsPath: '',
      fontsRelativePath: 'fonts',
      styleFile: '',
    });

    grunt.log.writeln('Download icon font from ' + options.link);

    if (!options.link || options.link.length === 0) {
      grunt.fail.fatal('missing link option.')
    }

    let urlPart = urlWithOutFile(options.link);
    let tmpDir = (new tmp.Dir()).path;
    download(options.link, tmpDir).then(() => {
      let style = grunt.file.read(path.join(tmpDir, 'style.css'));

      let regex = new RegExp(/url\(\'(.*)\?.*\'\)/g);
      let fontFiles = [];
      let match = '';
      while (match = regex.exec(style)){
        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
        fontFiles.push(match[1]);
      }

      Promise.all(
        [...new Set(fontFiles)]
        .map(x => download(x, tmpDir))).then(() => {
        // copy style file and replace font path
        let style = grunt.file.read(path.join(tmpDir, 'style.css'));
        grunt.file.write(options.styleFile, style.replace(new RegExp(urlPart, 'g'), options.fontsRelativePath));

        // copy font files
        if (options.clean && grunt.file.exists(options.fontsPath)){
          grunt.file.delete(options.fontsPath);
        }

        fontFiles.forEach((file) => {
          let fileName = url.parse(file).pathname.split("/").pop();
          grunt.file.copy(path.join(tmpDir, fileName), path.join(options.fontsPath, fileName));
        });

        done();
      });
    });
  });
};
