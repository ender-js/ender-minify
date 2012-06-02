# ender-minify

Bundled minifier utilities for Node, designed primarily for use with the Ender CLI.


## [UglifyJS](https://github.com/mishoo/UglifyJS)

```
var fs = require('fs')
var em = require('ender-minify')
var options = {} // no options for UglifyJS at the moment

fs.readFile('source.js', 'utf-8', function (err, source) {
  if (err) throw err

  em.minify('uglify', source, options, function (err, minifiedSource) {
    if (err) throw err

    fs.writeFile('source.min.js', minifiedSource, 'utf-8')
  })
})
```

## [Closure Compiler](http://closure-compiler.googlecode.com/)

```
var fs = require('fs')
var em = require('ender-minify')
var options = {
  level: 'simple',                 // can be 'whitespace', 'simple' or 'advanced'
  externs: [ 'foo.js', 'bar.js' ]  // passed as --externs
}

fs.readFile('source.js', 'utf-8', function (err, source) {
  if (err) throw err

  em.minify('closure', source, options, function (err, minifiedSource) {
    if (err) throw err

    fs.writeFile('source.min.js', minifiedSource, 'utf-8')
  })
})
```

## YUICompressor coming soon...