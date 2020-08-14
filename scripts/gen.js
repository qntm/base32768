// The purpose of this module is to generate 32,896 "safe"
// <https://qntm.org/safe> Unicode code points suitable for use in the Base32768
// encoding. It makes use of the package `safe-code-point`
// <https://github.com/qntm/safe-code-point>.

// This program was run once, with the successful results immediately
// transplanted into `base32768` for use. It is kept here for historical reasons
// and to ensure reproducibility.

import safeCodePoint from 'safe-code-point'

const BITS_PER_CHAR = 15 // Base32768 is a 15-bit encoding
const BITS_PER_BYTE = 8

// Rather than generate thousands and thousands of arbitrary safe code points,
// we generates 2**10 plus 2**2 contiguous, aligned blocks of 2**5 code points.
// This means the final 5 bits of the code point can be interpreted directly as
// bits in the original binary, and the lookup tables to decode the remaining 10
// or 2 bits are relatively small.
const rangeSize = 5

const safeRange = function (min, max) {
  for (let codePoint = min; codePoint < max; codePoint++) {
    // Note the use of Unicode 9.0, which was current at the time
    if (!safeCodePoint(codePoint, '9.0')) {
      return false
    }
  }
  return true
}

const getAllSafeRanges = rangeSize => {
  const allSafeRanges = []
  // Base32768 is optimised for UTF-16, so all characters are chosen from the
  // Basic Multilingual Plane, so that their UTF-16 encoding is exactly two
  // bytes.
  for (let codePoint = 0; codePoint < 1 << 16; codePoint += rangeSize) {
    if (safeRange(codePoint, codePoint + rangeSize)) {
      allSafeRanges.push(codePoint)
    }
  }
  return allSafeRanges
}

const allSafeRanges = getAllSafeRanges(1 << rangeSize)

const repertoireSizes = []
for (let i = BITS_PER_CHAR; i >= 0; i -= BITS_PER_BYTE) {
  repertoireSizes.unshift(i - rangeSize)
}

export const repertoireOffsets = repertoireSizes
  .map(x => 1 << x)
  .map((x, i, arr) => x + (i === 0 ? 0 : arr[i - 1])) // cumulative sum
  .map((offset, i, arr) => allSafeRanges
    .slice(i === 0 ? 0 : arr[i - 1], arr[i])
    .map(x => String.fromCodePoint(x))
    .join('')
  )
  .reverse()
