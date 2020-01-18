# base32768

Base32768 is a binary encoding optimised for UTF-16-encoded text. This JavaScript module, `base32768`, is the first implementation of this encoding.

The efficiency chart speaks for itself. Efficiency ratings are averaged over long inputs. Higher is better.

<table>
  <thead>
    <tr>
      <th colspan="2" rowspan="2">Encoding</th>
      <th colspan="3">Efficiency</th>
      <th rowspan="2">Bytes per Tweet *</th>
    </tr>
    <tr>
      <th>UTF&#x2011;8</th>
      <th>UTF&#x2011;16</th>
      <th>UTF&#x2011;32</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="5">ASCII&#x2011;constrained</td>
      <td>Unary / <a href="https://github.com/ferno/base1">Base1</a></td>
      <td style="text-align: right;">0%</td>
      <td style="text-align: right;">0%</td>
      <td style="text-align: right;">0%</td>
      <td style="text-align: right;">1</td>
    </tr>
    <tr>
      <td>Binary</td>
      <td style="text-align: right;">13%</td>
      <td style="text-align: right;">6%</td>
      <td style="text-align: right;">3%</td>
      <td style="text-align: right;">35</td>
    </tr>
    <tr>
      <td>Hexadecimal</td>
      <td style="text-align: right;">50%</td>
      <td style="text-align: right;">25%</td>
      <td style="text-align: right;">13%</td>
      <td style="text-align: right;">140</td>
    </tr>
    <tr>
      <td>Base64</td>
      <td style="text-align: right;"><strong>75%</strong></td>
      <td style="text-align: right;">38%</td>
      <td style="text-align: right;">19%</td>
      <td style="text-align: right;">210</td>
    </tr>
    <tr>
      <td>Base85 †</td>
      <td style="text-align: right;">80%</td>
      <td style="text-align: right;">40%</td>
      <td style="text-align: right;">20%</td>
      <td style="text-align: right;">224</td>
    </tr>
    <tr>
      <td rowspan="4">BMP&#x2011;constrained</td>
      <td><a href="https://github.com/ferno/hexagram-encode">HexagramEncode</a></td>
      <td style="text-align: right;">25%</td>
      <td style="text-align: right;">38%</td>
      <td style="text-align: right;">19%</td>
      <td style="text-align: right;">105</td>
    </tr>
    <tr>
      <td><a href="https://github.com/ferno/braille-encode">BrailleEncode</a></td>
      <td style="text-align: right;">33%</td>
      <td style="text-align: right;">50%</td>
      <td style="text-align: right;">25%</td>
      <td style="text-align: right;">140</td>
    </tr>
    <tr>
      <td><a href="https://github.com/qntm/base2048">Base2048</a></td>
      <td style="text-align: right;">56%</td>
      <td style="text-align: right;">69%</td>
      <td style="text-align: right;">34%</td>
      <td style="text-align: right;"><strong>385</strong></td>
    </tr>
    <tr>
      <td><a href="https://github.com/ferno/base32768">Base32768</a></td>
      <td style="text-align: right;">63%</td>
      <td style="text-align: right;"><strong>94%</strong></td>
      <td style="text-align: right;">47%</td>
      <td style="text-align: right;">263</td>
    </tr>
    <tr>
      <td rowspan="3">Full Unicode</td>
      <td><a href="https://github.com/keith-turner/ecoji">Ecoji</a></td>
      <td style="text-align: right;">31%</td>
      <td style="text-align: right;">31%</td>
      <td style="text-align: right;">31%</td>
      <td style="text-align: right;">175</td>
    </tr>
    <tr>
      <td><a href="https://github.com/ferno/base65536">Base65536</a></td>
      <td style="text-align: right;">56%</td>
      <td style="text-align: right;">64%</td>
      <td style="text-align: right;"><strong>50%</strong></td>
      <td style="text-align: right;">280</td>
    </tr>
    <tr>
      <td><a href="https://github.com/ferno/base131072">Base131072</a> ‡</td>
      <td style="text-align: right;">53%+</td>
      <td style="text-align: right;">53%+</td>
      <td style="text-align: right;">53%</td>
      <td style="text-align: right;">297</td>
    </tr>
  </tbody>
</table>

\* New-style "long" Tweets, up to 280 Unicode characters give or take Twitter's complex "weighting" calculation.<br/>
† Base85 is listed for completeness but all variants use characters which are considered hazardous for general use in text: escape characters, brackets, punctuation *etc.*.<br/>
‡ Base131072 is a work in progress, not yet ready for general use.<br/>

Base32768 uses only ["safe" Unicode code points](https://qntm.org/safe) - no unassigned code points, no whitespace, no control characters, etc..

## Installation

```bash
npm install base32768
```

## Usage

```js
import { encode, decode } from 'base32768'

const uint8Array = new Uint8Array([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100])
const str = encode(uint8Array)
console.log(str)
// 6 code points, '媒腻㐤┖ꈳ埳'

const uint8Array2 = decode(str)
console.log(uint8Array2)
// [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]
```

### In the browser

Load this file in the browser to gain access to a `base32768` global.

```html
<script src="https://unpkg.com/base32768@2.0.0/dist/iife/base32768.js" crossorigin></script>
<script>
  console.log(base32768.decode('怗膹䩈㭴䂊䫁輪黔'))
</script>
```

## API

### base32768.encode(uint8Array)

Encodes an [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) and returns a Base32768 `String`. Note that every Node.js [`Buffer`](https://nodejs.org/docs/latest/api/buffer.html#buffer_buffers_and_typedarray) is a `Uint8Array`.

The string is suitable for passing safely through almost any "Unicode-clean" text-handling API. This string contains no special characters and is immune to Unicode normalization. Give or take some padding characters, the output string has 1 character per 15 bits of input.

All characters are chosen from the Basic Multilingual Plane. This means that when encoded as UTF-16, all characters occupy 16 bits. Thus, there are 16 bits of output UTF-16 text per 15 bits of input, an efficiency of 93.75%.

### base32768.decode(str)

Decodes a Base32768 `String` and returns an `Uint8Array` containing the original binary data. Note that a `Uint8Array` can be converted to a Node.js `Buffer` like so:

```js
const buffer = Buffer.from(uint8Array.buffer, uint8Array.byteOffset, uint8Array.byteLength)
```

## License

MIT
