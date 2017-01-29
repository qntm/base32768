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


Base32768 uses only "safe" Unicode code points - no unassigned code points, no whitespace, no control characters, etc.. For details of how these code points were selected and why they are thought to be safe, see the sibling project [`base32768gen`](https://github.com/ferno/base32768gen).

## Installation

```bash
npm install base32768
```

## Usage

```js
var base32768 = require("base32768");

var buf = new Buffer("d41d8cd98f00b204e9800998ecf842", "hex"); // 15 bytes

var str = base32768.encode(buf); 
console.log(str); // "遮視塀⤠䶌Ԇ堹麢", 8 code points

var buf2 = base32768.decode(str);
console.log(buf.equals(buf2)); // true
```

## API

### base32768.encode(buf)

Encodes a [`Buffer`](https://nodejs.org/api/buffer.html#buffer_new_buffer_str_encoding) and returns a Base32768 `String`, suitable for passing safely through almost any "Unicode-clean" text-handling API. This string contains no special characters and is immune to Unicode normalization. Give or take some padding characters, the output string has 1 character per 15 bits of input.

All characters are chosen from the Basic Multilingual Plane. This means that when encoded as UTF-16, all characters occupy 16 bits. Thus, there are 16 bits of output UTF-16 text per 15 bits of input, an efficiency of 93.75%.

### base32768.decode(str)

Decodes a Base32768 `String` and returns a `Buffer` containing the original binary data.

## License

MIT
