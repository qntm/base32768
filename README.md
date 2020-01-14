# base32768

Base32768 is a binary encoding optimised for UTF-16-encoded text. This JavaScript module, `base32768`, is the first implementation of this encoding.

The efficiency chart speaks for itself. Efficiency ratings are averaged over long inputs. Higher is better.

<table>
	<thead>
		<tr>
			<th colspan="2" rowspan="2">Encoding</th>
			<th rowspan="2">Implementation</th>
			<th colspan="3">Efficiency</th>
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
			<td>Unary</td>
			<td><code><a href="https://github.com/ferno/base1">base1</a></code></td>
			<td style="text-align: right;">0%</td>
			<td style="text-align: right;">0%</td>
			<td style="text-align: right;">0%</td>
		</tr>
		<tr>
			<td>Binary</td>
			<td>everywhere</td>
			<td style="text-align: right;">13%</td>
			<td style="text-align: right;">6%</td>
			<td style="text-align: right;">3%</td>
		</tr>
		<tr>
			<td>Hexadecimal</td>
			<td>everywhere</td>
			<td style="text-align: right;">50%</td>
			<td style="text-align: right;">25%</td>
			<td style="text-align: right;">13%</td>
		</tr>
		<tr>
			<td>Base64</td>
			<td>everywhere</td>
			<td style="text-align: right;">75%</td>
			<td style="text-align: right;">38%</td>
			<td style="text-align: right;">19%</td>
		</tr>
		<tr>
			<td>Base85</td>
			<td>everywhere</td>
			<td style="text-align: right;">80%</td>
			<td style="text-align: right;">40%</td>
			<td style="text-align: right;">20%</td>
		</tr>
		<tr>
			<td rowspan="3">BMP&#x2011;constrained</td>
			<td>HexagramEncode</td>
			<td><code><a href="https://github.com/ferno/hexagram-encode">hexagram-encode</a></code></td>
			<td style="text-align: right;">25%</td>
			<td style="text-align: right;">38%</td>
			<td style="text-align: right;">19%</td>
		</tr>
		<tr>
			<td>BrailleEncode</td>
			<td><code><a href="https://github.com/ferno/braille-encode">braille-encode</a></code></td>
			<td style="text-align: right;">33%</td>
			<td style="text-align: right;">50%</td>
			<td style="text-align: right;">25%</td>
		</tr>
		<tr>
			<td>Base32768</td>
			<td><code><a href="https://github.com/ferno/base32768">base32768</a></code></td>
			<td style="text-align: right;">63%</td>
			<td style="text-align: right;"><strong>94%</strong></td>
			<td style="text-align: right;">47%</td>
		</tr>
		<tr>
			<td rowspan="2">Full Unicode</td>
			<td>Base65536</td>
			<td><code><a href="https://github.com/ferno/base65536">base65536</a></code></td>
			<td style="text-align: right;">56%</td>
			<td style="text-align: right;">64%</td>
			<td style="text-align: right;">50%</td>
		</tr>
		<tr>
			<td>Base131072</td>
			<td><code><a href="https://github.com/ferno/base131072">base131072</a></code> (prototype)</td>
			<td style="text-align: right;">53%+</td>
			<td style="text-align: right;">53%+</td>
			<td style="text-align: right;"><strong>53%</strong></td>
		</tr>
	</tbody>
</table>

Base32768 uses only ["safe" Unicode code points](https://qntm.org/safe) - no unassigned code points, no whitespace, no control characters, etc..

## Installation

```bash
npm install base32768
```

## Usage

```js
import { encode, decode } from 'base32768'

const ascii = 'some ASCII text'
const uint8Array = Uint8Array.from(ascii, chr => chr.charCodeAt(0))
const str = encode(uint8Array)
console.log(str)
// '怗膹䩈㭴䂊䫁輪黔'

const uint8Array2 = decode(str)
const ascii2 = String.fromCharCode(...uint8Array2)
console.log(ascii2)
// 'some ASCII text'
```

### In the browser

Load this file in the browser to gain access to a `base32768` global.

```html
<script src="./node_modules/base32768/dist/iife/base32768.js"></script>
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
