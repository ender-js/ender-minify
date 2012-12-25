/*!
 * ENDER - The open module JavaScript framework
 *
 * Copyright (c) 2011-2012 @ded, @fat, @rvagg and other contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const childProcess      = require('child_process')
    , path              = require('path')
    , extend            = require('util')._extend
    , closureJar        = 'closure_r2180.jar'
    , jarPath           = path.resolve(__dirname, '../support/' + closureJar)
    , javaCmd           = 'java'
    , javaArgs          = [
                              '-jar'
                            , '{jarPath}'
                            , '--compilation_level'
                            , '{level}'
                            , '{externs}'
                          ]
    , levels            = {
                              whitespace : 'WHITESPACE_ONLY'
                            , simple     : 'SIMPLE_OPTIMIZATIONS'
                            , advanced   : 'ADVANCED_OPTIMIZATIONS'
                          }
    , reMultiComments   = /\/\*!([\s\S]*?)\*\//g
    , token             = 'Ender: preserved comment block'
    , reTokens          = RegExp('(\\/*\\n*\\s*)?' + token, 'g')

var minify = function (source, options, callback) {
      var stdout    = ''
        , stderr    = ''
        , comments  = []
        , level     = levels[levels.hasOwnProperty(options.level) ? options.level : 'simple']
        , externs   = options.externs
                        ? options.externs.map(function (p) { return '--externs=' + p }).join(' ')
                        : ''
        , args      = javaArgs.map(function (a) {
                        return a
                          .replace('{jarPath}', jarPath)
                          .replace('{externs}', externs)
                          .replace('{level}', level)
                          .replace(/\s+/g, ' ')
                      }).filter(function (a) { return a })
        , child     = childProcess.spawn(javaCmd, args)

      source = source.replace(reMultiComments, function(full, comment) {
        comments.push(comment)
        return '/** @preserve ' + token + '*/'
      })

      child.stdout.on('data', function (data) {
        stdout += data.toString('utf-8')
      })
      child.stderr.on('data', function (data) {
        stderr += data.toString('utf-8')
      })

      child.on('exit', function (code, signal) {
        var err
        if (code !== 0) {
          err = new Error('Child process exited on signal: ' + signal)
          err.stderr = stderr
          return callback(err)
        }
        stdout = stdout.replace(reTokens, function() {
          return '\n' + comments.shift().replace(/(^[\n\s]+)|([\n\s]+$)/g, '')
        })
        callback(null, stdout)
      })

      child.stdin.write(source, 'utf-8')
      child.stdin.end()
    }

module.exports = minify
extend(module.exports, {
    levels  : Object.keys(levels)
  , jarPath : jarPath
})