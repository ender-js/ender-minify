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


var buster = require('buster')
  , assert = buster.assert
  , closure = require('../lib/closure')

buster.testCase('Closure', {
    'setUp': function () {
        this.timeout = 10000
      }

  , 'test basic minification': function (done) {
      var original = 'function foobar () { var biglongvar = \'str\'; return biglongvar + \'str\'; }\n\n'
        , expected = 'function foobar(){return"strstr"};\n'

      closure.minify(original, {}, function (err, actual) {
        refute(err)
        assert.equals(actual, expected)
        done()
      })
    }

  , 'test minification syntax error': function (done) {
      closure.minify('this is not javascript!', {}, function (err, output) {
        refute(output)
        assert(err)
        assert(err instanceof Error)
        assert(err.stderr)
        assert.isString(err.message)
        done()
      })
    }

  , 'test minifier ignores copyright comment blocks': function (done) {
      var original =
              '/*!\n'
            + ' * this is a copyright block\n'
            + ' */\n'
            + '!function foobar () { var biglongvar = \'str\'; return biglongvar + \'str\'; }();\n\n'
            + '/*!\n'
            + ' * this is another copyright block\n'
            + ' */\n\n'
            + '!function foobar2 () { var biglongvar = \'str\'; return biglongvar + \'str\'; }();'
         , expected =
              '/*\n* this is a copyright block\n* this is another copyright block*/\n!function(){return"strstr"}();!function(){return"strstr"}();\n'

      closure.minify(original, {}, function (err, actual) {
        refute(err)
        assert.equals(actual, expected)
        done()
      })
    }
})