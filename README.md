# Ender Minify [![Build Status](https://secure.travis-ci.org/ender-js/ender-minify.png)](http://travis-ci.org/ender-js/ender-minify)

Bundled minifier utilities for Node, designed primarily for use with the [Ender CLI](https://github.com/ender-js/Ender/).

## About Ender

For more information check out [http://ender.jit.su](http://ender.jit.su)

## API

### enderMinify() ([UglifyJS](https://github.com/mishoo/UglifyJS))

```js
var fs = require('fs')
var em = require('ender-minify')
var options = {} // no options for UglifyJS at the moment

fs.readFile('source.js', 'utf-8', function (err, source) {
  if (err) throw err

  em('uglify', source, options, function (err, minifiedSource) {
    if (err) throw err

    fs.writeFile('source.min.js', minifiedSource, 'utf-8')
  })
})
```

### enderMinify() ([Closure Compiler](http://closure-compiler.googlecode.com/))

```js
var fs = require('fs')
var em = require('ender-minify')
var options = {
  level: 'simple',                 // can be 'whitespace', 'simple' or 'advanced'
  externs: [ 'foo.js', 'bar.js' ]  // passed as --externs
}

fs.readFile('source.js', 'utf-8', function (err, source) {
  if (err) throw err

  em('closure', source, options, function (err, minifiedSource) {
    if (err) throw err

    fs.writeFile('source.min.js', minifiedSource, 'utf-8')
  })
})
```

### YUICompressor coming soon...

-----------------------------

### enderMinify.minifiers

A list of minifiers available as an array.

-----------------------------

### enderMinify.closureLevels

An object with mappings of the Closure Compiler compression levels, from nice-key to verbose-Closure-key.

i.e.:

```js
{
    whitespace : 'WHITESPACE_ONLY'
  , simple     : 'SIMPLE_OPTIMIZATIONS'
  , advanced   : 'ADVANCED_OPTIMIZATIONS'
}
```

-----------------------------

### enderMinify.closureJar

The absolute path name to the *closure.jar* file used to run Closure Compiler within this package. Useful if you wanted to call it directly.

-----------------------------

## Contributing

Contributions are more than welcome! Just fork and submit a GitHub pull request! If you have changes that need to be synchronized across the various Ender CLI repositories then please make that clear in your pull requests.

### Tests

Ender Minify uses [Buster](http://busterjs.org) for unit testing. You'll get it (and a bazillion unnecessary dependencies) when you `npm install` in your cloned local repository. Simply run `npm test` to run the test suite.

## Licence

*Ender Minify* is Copyright (c) 2012 [@rvagg](https://github.com/rvagg), [@ded](https://github.com/ded), [@fat](https://github.com/fat) and other contributors. It is licenced under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.