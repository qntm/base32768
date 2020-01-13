/** Tests for Base32768, ensure strings survive round trips, etc. */

/* eslint-env jest */

import fs from 'fs'
import glob from 'glob'

import base32768 from '../src/index'

const forms = ['NFC', 'NFD', 'NFKC', 'NFKD']

const expectArrayBuffersEqual = (expected, actual) => {
  expect([...new Uint8Array(expected)]).toEqual([...new Uint8Array(actual)])
}

describe('base32768', () => {
  describe('test data pairs', () => {
    const binFileNames = glob.sync('./test-data/pairs/**/*.bin')

    binFileNames.forEach(function (fileName) {
      const caseName = fileName.substring(0, fileName.length - '.bin'.length)
      it(caseName, () => {
        const binary = new Uint8Array(fs.readFileSync(caseName + '.bin')).buffer
        const text = fs.readFileSync(caseName + '.txt', 'utf8')
        expect(base32768.encode(binary)).toBe(text)
        expectArrayBuffersEqual(base32768.decode(text), binary)
        forms.forEach(function (form) {
          expect(text.normalize(form)).toBe(text)
        })
      })
    })
  })

  describe('failure cases', () => {
    const badFileNames = glob.sync('./test-data/bad/**/*.txt')

    badFileNames.forEach(function (fileName) {
      const caseName = fileName.substring(0, fileName.length - '.txt'.length)
      it(caseName, () => {
        const text = fs.readFileSync(caseName + '.txt', 'utf8')
        expect(() => base32768.decode(text)).toThrow()
      })
    })
  })

  describe('round trips at all lengths', () => {
    const fillUint8s = [
      0b00000000,
      0b00000001,
      0b01010101,
      0b10101010,
      0b11111111
    ]
    for (let length = 0; length < 256; length++) {
      fillUint8s.forEach(fillUint8 => {
        it(`every uint8 is ${fillUint8} to length ${length}`, () => {
          const uint8Array = new Uint8Array(length)
          for (let i = 0; i < length; i++) {
            uint8Array[i] = fillUint8
          }

          const actual = base32768.decode(base32768.encode(uint8Array.buffer))
          expectArrayBuffersEqual(uint8Array.buffer, actual)
        })
      })
    }
  })
})
