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

var uglifyParser  = require('uglify-js').parser
  , uglifyMangler = require('uglify-js').uglify

  , minify = function (source, options, callback) {
      var comments        = []
        , token           = '"Ender: preserved comment block"'
        , reTokens        = RegExp(token + ',?', 'g') // we add a comma because uglify does too
        , reMultiComments = /\/\*![\s\S]*?\*\//g

      source = source.replace(reMultiComments, function(comment) {
        comments.push(comment)
        return token
      })

      try {
        source =
          uglifyMangler.gen_code(
            uglifyMangler.ast_squeeze(
              uglifyMangler.ast_mangle(
                uglifyParser.parse(source), { mangle: true })))

        source = source.replace(reTokens, function(s, i) {
          return (i ? '\n' : '') + comments.shift() + '\n'
        })
      } catch (ex) {
        var err = new Error()
        err.cause = ex
        return callback(err)
      }

      callback(null, source)
    }

module.exports.minify = minify