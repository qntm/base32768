/**
	Base32768 is a binary-to-text encoding optimised for UTF-16-encoded text.
	(e.g. Windows, Java, JavaScript)
*/

var bitsToBits = require("./lib/bits-to-bits.js");

var MAGIC_NUMBER_A = 15; // Base32768 is a 15-bit encoding
var MAGIC_NUMBER_B = 8;  // Bits in a byte

// Base32768 uses blocks of 32 characters.
var blockSize = 1 << 5;
var blockStartChars = {
	0: "ҠԀڀڠݠހ߀ကႠᄀᄠᅀᆀᇠሀሠበዠጠᎠᏀᐠᑀᑠᒀᒠᓀᓠᔀᔠᕀᕠᖀᖠᗀᗠᘀᘠᙀᚠᛀកᠠᡀᣀᦀ᧠ᨠᯀᰀᴀ⇠⋀⍀⍠⎀⎠⏀␀─┠╀╠▀■◀◠☀☠♀♠⚀⚠⛀⛠✀✠❀➀➠⠀⠠⡀⡠⢀⢠⣀⣠⤀⤠⥀⥠⦠⨠⩀⪀⪠⫠⬀⬠⭀ⰀⲀⲠⳀⴀⵀ⺠⻀㇀㐀㐠㑀㑠㒀㒠㓀㓠㔀㔠㕀㕠㖀㖠㗀㗠㘀㘠㙀㙠㚀㚠㛀㛠㜀㜠㝀㝠㞀㞠㟀㟠㠀㠠㡀㡠㢀㢠㣀㣠㤀㤠㥀㥠㦀㦠㧀㧠㨀㨠㩀㩠㪀㪠㫀㫠㬀㬠㭀㭠㮀㮠㯀㯠㰀㰠㱀㱠㲀㲠㳀㳠㴀㴠㵀㵠㶀㶠㷀㷠㸀㸠㹀㹠㺀㺠㻀㻠㼀㼠㽀㽠㾀㾠㿀㿠䀀䀠䁀䁠䂀䂠䃀䃠䄀䄠䅀䅠䆀䆠䇀䇠䈀䈠䉀䉠䊀䊠䋀䋠䌀䌠䍀䍠䎀䎠䏀䏠䐀䐠䑀䑠䒀䒠䓀䓠䔀䔠䕀䕠䖀䖠䗀䗠䘀䘠䙀䙠䚀䚠䛀䛠䜀䜠䝀䝠䞀䞠䟀䟠䠀䠠䡀䡠䢀䢠䣀䣠䤀䤠䥀䥠䦀䦠䧀䧠䨀䨠䩀䩠䪀䪠䫀䫠䬀䬠䭀䭠䮀䮠䯀䯠䰀䰠䱀䱠䲀䲠䳀䳠䴀䴠䵀䵠䶀䷀䷠一丠乀习亀亠什仠伀传佀你侀侠俀俠倀倠偀偠傀傠僀僠儀儠兀兠冀冠净几刀删剀剠劀加勀勠匀匠區占厀厠叀叠吀吠呀呠咀咠哀哠唀唠啀啠喀喠嗀嗠嘀嘠噀噠嚀嚠囀因圀圠址坠垀垠埀埠堀堠塀塠墀墠壀壠夀夠奀奠妀妠姀姠娀娠婀婠媀媠嫀嫠嬀嬠孀孠宀宠寀寠尀尠局屠岀岠峀峠崀崠嵀嵠嶀嶠巀巠帀帠幀幠庀庠廀廠开张彀彠往徠忀忠怀怠恀恠悀悠惀惠愀愠慀慠憀憠懀懠戀戠所扠技抠拀拠挀挠捀捠掀掠揀揠搀搠摀摠撀撠擀擠攀攠敀敠斀斠旀无昀映晀晠暀暠曀曠最朠杀杠枀枠柀柠栀栠桀桠梀梠检棠椀椠楀楠榀榠槀槠樀樠橀橠檀檠櫀櫠欀欠歀歠殀殠毀毠氀氠汀池沀沠泀泠洀洠浀浠涀涠淀淠渀渠湀湠満溠滀滠漀漠潀潠澀澠激濠瀀瀠灀灠炀炠烀烠焀焠煀煠熀熠燀燠爀爠牀牠犀犠狀狠猀猠獀獠玀玠珀珠琀琠瑀瑠璀璠瓀瓠甀甠畀畠疀疠痀痠瘀瘠癀癠皀皠盀盠眀眠着睠瞀瞠矀矠砀砠础硠碀碠磀磠礀礠祀祠禀禠秀秠稀稠穀穠窀窠竀章笀笠筀筠简箠節篠簀簠籀籠粀粠糀糠紀素絀絠綀綠緀締縀縠繀繠纀纠绀绠缀缠罀罠羀羠翀翠耀耠聀聠肀肠胀胠脀脠腀腠膀膠臀臠舀舠艀艠芀芠苀苠茀茠荀荠莀莠菀菠萀萠葀葠蒀蒠蓀蓠蔀蔠蕀蕠薀薠藀藠蘀蘠虀虠蚀蚠蛀蛠蜀蜠蝀蝠螀螠蟀蟠蠀蠠血衠袀袠裀裠褀褠襀襠覀覠觀觠言訠詀詠誀誠諀諠謀謠譀譠讀讠诀诠谀谠豀豠貀負賀賠贀贠赀赠趀趠跀跠踀踠蹀蹠躀躠軀軠輀輠轀轠辀辠迀迠退造遀遠邀邠郀郠鄀鄠酀酠醀醠釀釠鈀鈠鉀鉠銀銠鋀鋠錀錠鍀鍠鎀鎠鏀鏠鐀鐠鑀鑠钀钠铀铠销锠镀镠門閠闀闠阀阠陀陠隀隠雀雠需霠靀靠鞀鞠韀韠頀頠顀顠颀颠飀飠餀餠饀饠馀馠駀駠騀騠驀驠骀骠髀髠鬀鬠魀魠鮀鮠鯀鯠鰀鰠鱀鱠鲀鲠鳀鳠鴀鴠鵀鵠鶀鶠鷀鷠鸀鸠鹀鹠麀麠黀黠鼀鼠齀齠龀龠ꀀꀠꁀꁠꂀꂠꃀꃠꄀꄠꅀꅠꆀꆠꇀꇠꈀꈠꉀꉠꊀꊠꋀꋠꌀꌠꍀꍠꎀꎠꏀꏠꐀꐠꑀꑠ꒠ꔀꔠꕀꕠꖀꖠꗀꗠꙀꚠꛀ꜀꜠ꝀꞀꡀ", // length = 1 << 10
	1: "ƀɀɠʀ" // length = 1 << 2
};

var lookup_encode = {};
var lookup_decode = {};
Object.keys(blockStartChars).forEach(function(repertoire) {
	lookup_encode[repertoire] = {};
	lookup_decode[repertoire] = {};
	blockStartChars[repertoire].split("").forEach(function(chr, i) {
		var blockStartCodePoint = chr.charCodeAt(0);
		var blockStartK = blockSize * i;
		for(var offset = 0; offset < blockSize; offset++) {
			var codePoint = blockStartCodePoint + offset;
			var k = blockStartK + offset;
			lookup_encode[repertoire][k] = codePoint;
			lookup_decode[repertoire][codePoint] = k;
		}
	});
});

module.exports = {

	/**
		If `repertoire` is 0, encode a 15-bit number K to a 16-bit Unicode code
		point.
		If `repertoire` is 1, encode a 7-bit number K to a 16-bit Unicode code
		point chosen from the special repertoire.
	*/
	encode_pair: function(pair) {
		var k = pair.k;
		var repertoire = pair.repertoire;

		// Bounds check
		var numBits = MAGIC_NUMBER_A - repertoire * MAGIC_NUMBER_B;
		if(k < 0 || (1 << numBits) <= k) {
			throw new Error("Unrecognised `k`: " + String(k));
		}
		if(!(repertoire in lookup_encode)) {
			throw new Error("Unrecognised `repertoire`: " + String(repertoire));
		}
		if(!(k in lookup_encode[repertoire])) {
			throw new Error("Can't encode " + String(k));
		}

		return lookup_encode[repertoire][k];
	},

	/**
		Main Base32768 encoding method. Takes a Buffer as input and returns a
		String as output.
	*/
	encode: function(buf) {
		var values = [...buf.values()];
		var sizedBytes = values.map(byte => ({byte: byte, numBits: MAGIC_NUMBER_B}));
		var bits = bitsToBits.bytesToBits(sizedBytes);
		var resizedBytes = bitsToBits.bitsToBytes(bits, MAGIC_NUMBER_A);
		var ks = resizedBytes.map((sizedByte, i, arr) => {
			var byte = sizedByte.byte;
			var numBits = sizedByte.numBits; // Usually 15...

			// The final character requires special treatment.
			if(numBits !== MAGIC_NUMBER_A) {
				if(i !== arr.length - 1) {
					throw new Error("Incomplete byte found midway through stream");
				}

				// byte = bbbbbbbcccccccc, numBits = 15, padBits = 0
				// byte = bbbbbbcccccccc, numBits = 14, padBits = 1
				// byte = bbbbbcccccccc, numBits = 13, padBits = 2
				// byte = bbbbcccccccc, numBits = 12, padBits = 3
				// byte = bbbcccccccc, numBits = 11, padBits = 4
				// byte = bbcccccccc, numBits = 10, padBits = 5
				// byte = bcccccccc, numBits = 9, padBits = 6
				// byte = cccccccc, numBits = 8, padBits = 7
				// => Pad `byte` out to 15 bits using 1s, then encode as normal (repertoire 0)

				// byte = ccccccc, numBits = 7, padBits = 0
				// byte = cccccc, numBits = 6, padBits = 1
				// byte = ccccc, numBits = 5, padBits = 2
				// byte = cccc, numBits = 4, padBits = 3
				// byte = ccc, numBits = 3, padBits = 4
				// byte = cc, numBits = 2, padBits = 5
				// byte = c, numBits = 1, padBits = 6
				// => Pad `byte` out to 7 bits using 1s, then encode specially (repertoire 1)

				var padBits = (MAGIC_NUMBER_A - numBits) % MAGIC_NUMBER_B; // 0 to 7
				byte = (byte << padBits) + ((1 << padBits) - 1);
				numBits += padBits; // 15 or 7
			}

			var repertoire = (MAGIC_NUMBER_A - numBits) / MAGIC_NUMBER_B; // 0 or 1
			return {k: byte, repertoire: repertoire};
		});
		var codePoints = ks.map(this.encode_pair);
		var chars = codePoints.map(codePoint => String.fromCodePoint(codePoint));
		var str = chars.join("");
		return str;
	},

	/**
		Decode a 16-bit Unicode code point to a 15-bit number. If the code point is
		from the special repertoire, decode it to a 7-bit number. Also return
		the repertoire. So, return value is a pair: {k: k, repertoire: repertoire}
	*/
	decode_codePoint: function(codePoint) {
		for(var repertoire = 0; repertoire in lookup_decode; repertoire++) {
			if(codePoint in lookup_decode[repertoire]) {
				return {k: lookup_decode[repertoire][codePoint], repertoire: repertoire};
			}
		}
		throw new Error("Unrecognised `codePoint`: " + String(codePoint));
	},

	/**
		Main Base32768 decoding method. Note that this is step-for-step the reverse
		of the encoding method!
	*/
	decode: function(str) {
		var chars = [...str];
		var codePoints = chars.map(ch => ch.codePointAt(0)); // No special consideration required for supplementary planes
		var ks = codePoints.map(this.decode_codePoint);
		var resizedBytes = ks.map((pair, i, arr) => {
			// Check for padding characters in the middle.
			if(pair.repertoire !== 0 && i !== arr.length - 1) {
				throw new Error("Padding character found before end of input at position " + String(i));
			}
			var numBits = MAGIC_NUMBER_A - MAGIC_NUMBER_B * pair.repertoire; // 15 or 7
			return {byte: pair.k, numBits: numBits};
		});
		var bits = bitsToBits.bytesToBits(resizedBytes);
		var sizedBytes = bitsToBits.bitsToBytes(bits, MAGIC_NUMBER_B).filter((sizedByte, i, arr) => {
			if(sizedByte.numBits === MAGIC_NUMBER_B) {
				return true;
			}
			if(i !== arr.length - 1) {
				throw new Error("Incomplete byte found midway through stream");
			}
			// Final padding byte! Requires special consideration!
			// Remember how we always pad with 1s?
			if(sizedByte.byte !== ((1 << sizedByte.numBits) - 1)) {
				throw new Error("Padding mismatch");
			}
			return false;
		});
		var values = sizedBytes.map(sizedByte => sizedByte.byte);
		var buf = Buffer(values);
		return buf;
	}
};
