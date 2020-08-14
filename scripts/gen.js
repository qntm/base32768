import safeCodePoint from 'safe-code-point'

const BITS_PER_CHAR = 15 // Base32768 is a 15-bit encoding
const BITS_PER_BYTE = 8
const rangeSize = 5 // i.e 2^5 = 32

const safeRange = function (min, max) {
  for (let codePoint = min; codePoint < max; codePoint++) {
    if (!safeCodePoint(codePoint, '9.0')) {
      return false
    }
  }
  return true
}

const getAllSafeRanges = rangeSize => {
  const allSafeRanges = []
  for (let codePoint = 0; codePoint < (1 << 16) + (1 << 20); codePoint += rangeSize) {
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
