/** Tests for Base32768, ensure strings survive round trips, etc. */

var base32768 = require('./../index.js')
var fs = require('fs')
var glob = require('glob')

var forms = ['NFC', 'NFD', 'NFKC', 'NFKD']

var arrayBuffersEqual = (expected, actual) => {
  expected = new Uint8Array(expected)
  actual = new Uint8Array(actual)

  const match = true
  if (actual.length !== expected.length) {
    match = false
  }
  for (var i = 0; i < expected.byteLength && i < actual.byteLength; i++) {
    var expectedByte = expected[i]
    var actualByte = actual[i]
    if (actualByte !== expectedByte) {
      match = false
    }
  }

  if (!match) {
    console.error('Expected binary', expected)
    console.error('Actual binary', actual)
    throw Error('Comparison failure')
  }
}

glob('./test/pairs/**/*.bin', function (err, files) {
  if (err) {
    throw Error(err)
  }
  files.forEach(function (fileName) {
    var caseName = fileName.substring(0, fileName.length - '.bin'.length)
    console.log(caseName)
    var binary = new Uint8Array(fs.readFileSync(caseName + '.bin')).buffer
    var text = fs.readFileSync(caseName + '.txt', 'utf8')
    if (base32768.encode(binary) !== text) {
      console.error('Input binary', binary)
      console.error('Expected text', text)
      console.error('Actual text', base32768.encode(binary))
      throw Error('Encode error')
    }
    arrayBuffersEqual(binary, base32768.decode(text))
    forms.forEach(function (form) {
      if (text.normalize(form) !== text) {
        throw new Error('String failed to survive ' + form + ' normalization! ' + text)
      }
    })
  })

  glob('./test/bad/**/*.txt', function (err, files) {
    if (err) {
      throw Error(err)
    }
    files.forEach(function (fileName) {
      var caseName = fileName.substring(0, fileName.length - '.txt'.length)
      console.log(caseName)
      var text = fs.readFileSync(caseName + '.txt', 'utf8')
      var threw
      try {
        base32768.decode(text)
        threw = false
      } catch (e) {
        threw = true
      }
      if (!threw) {
        throw new Error('String should have failed to decode!' + text)
      }
    })
  })
})
