# base32768

Base32768 is a binary encoding optimised for UTF-16-encoded text. The efficiency chart speaks for itself.

| Encoding | Implementation | UTF-8 | UTF-16 | UTF-32 |
| -------- | -------------- | ----- | ------ | ------ |
| Base85 | everywhere | 80% | 40% | 20% |
| Base64 | everywhere | 75% | 37% | 18% |
| Hexadecimal | everywhere | 50% | 25% | 13% |
| Base32768 | [`base32768`](https://github.com/ferno/base32768) | 63% | 94% | 47% |
| Base65536 | [`base65536`](https://github.com/ferno/base65536) | 56% | 64% | 50% |
| BrailleEncode | [`braille-encode`](https://github.com/ferno/braille-encode) | 33% | 50% | 25% |
| HexagramEncode | [`hexagram-encode`](https://github.com/ferno/hexagram-encode) | 25% | 38% | 19% |
| Base1 | [`base1`](https://github.com/ferno/base1) | 0% | 0% | 0% |
| Base1048576 | hypothetical/impossible | 64% | 65% | 63% |

Efficiency ratings are averaged over long inputs. Higher is better.

## Installation

```bash
npm install base32768
```

## Usage

```js
var base32768 = require("base32768");

var buf = new Buffer("d41d8cd98f00b204e9800998ecf842", "hex"); // 15 bytes

var str = base32768.encode(buf); 
console.log(str); // "迎裶垠⢀䳬Ɇ垙鸂", 8 code points

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
