# grunt-icomoon-download

> Grunt task for automating icomoon download and generation

## Based On
This plugin inspired by [piotrkulpinski / grunt-icomoon-zip](https://github.com/piotrkulpinski/grunt-icomoon-zip).

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-icomoon-download --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-icomoon-download');
```

## The "icomoon-download" task

### Options

#### options.link
Type: `String`
Default value: `''`
Required: `yes`

A required string to the icomoon development css link. E.g. `https://i.icomoon.io/public/123456/myFoobarProject/style.css`

#### options.clear
Type: `Boolean`
Default value: `true`
Required: `no`

A true/false value to determine whether to delete the extracted icomoon sources or not.

#### options.fontsPath
Type: `String`
Default value: `''`
Required: `no`

Absolute path to your fonts folder where icomoon generated fonts will be copied.

#### options.fontsRelativePath
Type: `String`
Default value: `'fonts'`
Required: `no`

Relative path to your fonts folder. It should be relative to your icomoon styles file.

#### options.styleFile
Type: `String`
Default value: `''`
Required: `no`

Absolute path to your icomoon partial file (including filename). It can be a Sass partial or vanila CSS file.

### Usage Example

```js
grunt.initConfig({
  'icomoon-download': {
    options: {
      link: '',
      clean: true,
      fontsPath: 'dist/fonts/icomoon',
      fontsRelativePath: '../fonts/icomoon',
      styleFile: 'dist/styles/icomoon.less'
    },
    'default': {
    }
  },
});
```
