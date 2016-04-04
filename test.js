/** Tests for base32768, ensure strings survive round trips, etc. */

var base32768 = require("./index.js");
var path = require("path");
var fs = require("fs");

// Empty buffers
var e = base32768.encode(new Buffer([]));
if(e !== "") {
	console.log(e.charCodeAt(0));
	console.log(e.charCodeAt(1));
	throw new Error();
}
if(!base32768.decode("").equals(new Buffer([]))) {
	throw new Error();
}

// Zeroes
var str0 = String.fromCharCode(384) + String.fromCharCode(42726);
if(base32768.encode(new Buffer([0])) !== str0) {
	console.log(base32768.encode(new Buffer([0])).charCodeAt(0));
	console.log(base32768.encode(new Buffer([0])).charCodeAt(1));
	throw new Error();
}
if(!base32768.decode(str0).equals(new Buffer([0]))) {
	throw new Error();
}

var str00 = String.fromCharCode(384) + String.fromCharCode(384) + String.fromCharCode(42733);
var e00 = base32768.encode(new Buffer([0, 0]));
if(e00 !== str00) {
	console.log(e00);
	console.log(e00.charCodeAt(0));
	console.log(e00.charCodeAt(1));
	throw new Error();
}
if(!base32768.decode(str00).equals(new Buffer([0, 0]))) {
	throw new Error();
}

var forms = ["NFC", "NFD", "NFKC", "NFKD"];

// Exhaustively try all single-byte buffers
for(var b = 0; b < 256; b++) {
	var buf1 = new Buffer([b]);
	var str1 = base32768.encode(buf1);
	forms.forEach(function(form) {
		if(str1.normalize(form) !== str1) {
			throw new Error("String failed to survive normalization! " + str1);
		}
	});
	var buf2 = base32768.decode(str1);
	if(!buf1.equals(buf2)) {
		throw new Error("Bad buffer round trip! " + String(b));
	}
}

// Exhaustively try all two-byte buffers (takes a moment or two)
for(var b1 = 0; b1 < 256; b1++) {
	for(var b2 = 0; b2 < 256; b2++) {
		var buf1 = new Buffer([b1, b2]);
		var str1 = base32768.encode(buf1);
		forms.forEach(function(form) {
			if(str1.normalize(form) !== str1) {
				throw new Error("String failed to survive normalization! " + str1);
			}
		});
		var buf2 = base32768.decode(str1);
		if(!buf1.equals(buf2)) {
			console.log(buf1);
			console.log(str1, str1.length, str1.charCodeAt(0), str1.charCodeAt(1), str1.charCodeAt(2));
			console.log(buf2);
			throw new Error("Bad buffer round trip!");
		}
	}
}

// Binary files, maybe?
var sampleFilesDir = "sample-files";
fs.readdirSync(sampleFilesDir).forEach(function(sampleFile) {
	var buf1 = fs.readFileSync(path.join(sampleFilesDir, sampleFile));
	var str1 = base32768.encode(buf1);
	forms.forEach(function(form) {
		if(str1.normalize(form) !== str1) {
			throw new Error("String failed to survive normalization! " + str1);
		}
	});
	var buf2 = base32768.decode(str1);
	if(!buf1.equals(buf2)) {
		console.log(buf1);
		console.log(buf2);
		throw new Error("Buffers differ!");
	}
});

// Force encoding error
try {
	var badstr = String.fromCharCode(384) + String.fromCharCode(42726) + String.fromCharCode(42726);
	base32768.decode(badstr);
} catch(e) {
	console.log(true);
}

console.log("OK");
