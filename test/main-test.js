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

var buster = require('bustermove')
  , assert = require('referee').assert
  , refute = require('referee').refute
  , main   = require('../lib/main')

  , testSource = '(function foo (bar) { alert("b" + "a" + "n" + "g"); });'
  , expected   = {
                      uglify  : '(function(t){alert("bang")})'
                    , closure : '(function(){alert("bang")});'
                  }

  , runTest    = function (minifier, done) {
      main(minifier, testSource, {}, function (err, actual) {
        refute(err)
        assert.match(actual, expected[minifier])
        done()
      })
    }

buster.testCase('Main', {
    'test minifier list': function () {
      assert.equals(main.minifiers, [ 'uglify', 'closure' ])
    }

  , 'test closure levels': function () {
      assert.equals(main.closureLevels, [ 'whitespace', 'simple', 'advanced' ])
    }

  , 'test uglify': function (done) {
      runTest('uglify', done)
    }

  , 'test closure': function (done) {
      this.timeout = 2500
      runTest('closure', done)
    }
})