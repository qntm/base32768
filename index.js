/** Base32768 is a binary-to-text encoding optimised for UTF-16. */

// Base32768 uses 2^10 blocks of 2^5 characters each.
var n = 5;

var MAGIC_NUMBER_A = 15; // Base32768 is a 15-bit encoding
var MAGIC_NUMBER_B = 8;  // Reason for this number is unclear

var blockStartChars = "ƀɀɠʀҠԀڀڠݠހ߀ကႠᄀᄠᅀᆀᇠሀሠበዠጠᎠᏀᐠᑀᑠᒀᒠᓀᓠᔀᔠᕀᕠᖀᖠᗀᗠᘀᘠᙀᚠᛀកᠠᡀᢀᣀᦀ᧠ᨠᯀᰀᴀ⇠⋀⍀⍠⎀⎠⏀␀─┠╀╠▀■◀◠☀☠♀♠⚀⚠⛀⛠✀✠❀➀➠⠀⠠⡀⡠⢀⢠⣀⣠⤀⤠⥀⥠⦠⨠⩀⪀⪠⫠⬀⬠⭀ⰀⲀⲠⳀⴀⵀ⺠⻀㇀㐀㐠㑀㑠㒀㒠㓀㓠㔀㔠㕀㕠㖀㖠㗀㗠㘀㘠㙀㙠㚀㚠㛀㛠㜀㜠㝀㝠㞀㞠㟀㟠㠀㠠㡀㡠㢀㢠㣀㣠㤀㤠㥀㥠㦀㦠㧀㧠㨀㨠㩀㩠㪀㪠㫀㫠㬀㬠㭀㭠㮀㮠㯀㯠㰀㰠㱀㱠㲀㲠㳀㳠㴀㴠㵀㵠㶀㶠㷀㷠㸀㸠㹀㹠㺀㺠㻀㻠㼀㼠㽀㽠㾀㾠㿀㿠䀀䀠䁀䁠䂀䂠䃀䃠䄀䄠䅀䅠䆀䆠䇀䇠䈀䈠䉀䉠䊀䊠䋀䋠䌀䌠䍀䍠䎀䎠䏀䏠䐀䐠䑀䑠䒀䒠䓀䓠䔀䔠䕀䕠䖀䖠䗀䗠䘀䘠䙀䙠䚀䚠䛀䛠䜀䜠䝀䝠䞀䞠䟀䟠䠀䠠䡀䡠䢀䢠䣀䣠䤀䤠䥀䥠䦀䦠䧀䧠䨀䨠䩀䩠䪀䪠䫀䫠䬀䬠䭀䭠䮀䮠䯀䯠䰀䰠䱀䱠䲀䲠䳀䳠䴀䴠䵀䵠䶀䷀䷠一丠乀习亀亠什仠伀传佀你侀侠俀俠倀倠偀偠傀傠僀僠儀儠兀兠冀冠净几刀删剀剠劀加勀勠匀匠區占厀厠叀叠吀吠呀呠咀咠哀哠唀唠啀啠喀喠嗀嗠嘀嘠噀噠嚀嚠囀因圀圠址坠垀垠埀埠堀堠塀塠墀墠壀壠夀夠奀奠妀妠姀姠娀娠婀婠媀媠嫀嫠嬀嬠孀孠宀宠寀寠尀尠局屠岀岠峀峠崀崠嵀嵠嶀嶠巀巠帀帠幀幠庀庠廀廠开张彀彠往徠忀忠怀怠恀恠悀悠惀惠愀愠慀慠憀憠懀懠戀戠所扠技抠拀拠挀挠捀捠掀掠揀揠搀搠摀摠撀撠擀擠攀攠敀敠斀斠旀无昀映晀晠暀暠曀曠最朠杀杠枀枠柀柠栀栠桀桠梀梠检棠椀椠楀楠榀榠槀槠樀樠橀橠檀檠櫀櫠欀欠歀歠殀殠毀毠氀氠汀池沀沠泀泠洀洠浀浠涀涠淀淠渀渠湀湠満溠滀滠漀漠潀潠澀澠激濠瀀瀠灀灠炀炠烀烠焀焠煀煠熀熠燀燠爀爠牀牠犀犠狀狠猀猠獀獠玀玠珀珠琀琠瑀瑠璀璠瓀瓠甀甠畀畠疀疠痀痠瘀瘠癀癠皀皠盀盠眀眠着睠瞀瞠矀矠砀砠础硠碀碠磀磠礀礠祀祠禀禠秀秠稀稠穀穠窀窠竀章笀笠筀筠简箠節篠簀簠籀籠粀粠糀糠紀素絀絠綀綠緀締縀縠繀繠纀纠绀绠缀缠罀罠羀羠翀翠耀耠聀聠肀肠胀胠脀脠腀腠膀膠臀臠舀舠艀艠芀芠苀苠茀茠荀荠莀莠菀菠萀萠葀葠蒀蒠蓀蓠蔀蔠蕀蕠薀薠藀藠蘀蘠虀虠蚀蚠蛀蛠蜀蜠蝀蝠螀螠蟀蟠蠀蠠血衠袀袠裀裠褀褠襀襠覀覠觀觠言訠詀詠誀誠諀諠謀謠譀譠讀讠诀诠谀谠豀豠貀負賀賠贀贠赀赠趀趠跀跠踀踠蹀蹠躀躠軀軠輀輠轀轠辀辠迀迠退造遀遠邀邠郀郠鄀鄠酀酠醀醠釀釠鈀鈠鉀鉠銀銠鋀鋠錀錠鍀鍠鎀鎠鏀鏠鐀鐠鑀鑠钀钠铀铠销锠镀镠門閠闀闠阀阠陀陠隀隠雀雠需霠靀靠鞀鞠韀韠頀頠顀顠颀颠飀飠餀餠饀饠馀馠駀駠騀騠驀驠骀骠髀髠鬀鬠魀魠鮀鮠鯀鯠鰀鰠鱀鱠鲀鲠鳀鳠鴀鴠鵀鵠鶀鶠鷀鷠鸀鸠鹀鹠麀麠黀黠鼀鼠齀齠龀龠ꀀꀠꁀꁠꂀꂠꃀꃠꄀꄠꅀꅠꆀꆠꇀꇠꈀꈠꉀꉠꊀꊠꋀꋠꌀꌠꍀꍠꎀꎠꏀꏠꐀꐠꑀꑠ꒠ꔀꔠꕀꕠꖀꖠꗀꗠꙀꚠꛀ";

// 15 different padding characters indicate when extra bits should be ignored.
var padChar = "ꛟ";

var lookup_encode = {};
var lookup_decode = {};
blockStartChars.split("").forEach(function(chr, k) {
	var codePointBlockStart = chr.charCodeAt(0);
	var kBlockStart = k * (1 << n);
	lookup_encode[kBlockStart] = codePointBlockStart;
	lookup_decode[codePointBlockStart] = kBlockStart;
});
var pad_start = padChar.charCodeAt(0);

/** Generic bit-dicing method. Input an array of X-bit numbers. Dice them
around, returning an array of Y-bit numbers. Actual return value also includes
information about any incomplete Y-bit number which might be left over, and
how many bits it is missing. */
var bits_to_bits = function(input, x, y) {
	var output = [];
	var b = 0; // a Y-bit number under gradual construction
	var bc = y; // Number of bits needed to complete B. This value is from 1 to Y inclusive.
	input.forEach(function(a) {
		// A is an X-bit number which we are consuming.
		var ac = x; // Number of bits remaining to consume A.
		while(true) {
			var c = Math.min(ac, bc); // Number of bits to consume from A and add to B
			b = (b << c) + (a >> (ac - c)); // Shift B out by C bytes and insert the top C bytes of A
			a = a & ((1 << (ac - c)) - 1); // Cut off the top C bytes of A
			ac -= c;
			bc -= c;
			if(bc <= 0) {
				// B is complete.
				output.push(b);
				b = 0;
				bc += y;
			}
			if(ac <= 0) {
				// A has been fully consumed. NEXT!
				break;
			}
		}
	});
	return {
		// Array of Y-bit numbers.
		output: output,

		// The number of bits we need to consume to complete another Y-bit number.
		// This should be exactly Y. If not, the half-built Y-bit number is...
		bc: bc,

		// ...here. Otherwise, this is 0.
		b: b
	};
};

module.exports = {

	/** Encode a 15-bit number K as a 16-bit code point. The final N bits in
	both numbers are identical. */
	encode_k: function(k) {
		var offset = k & ((1 << n) - 1);
		var kBlockStart = k - offset;
		if(!(kBlockStart in lookup_encode)) {
			throw new Error("Can't encode " + String(k));
		}
		return lookup_encode[kBlockStart] + offset;
	},

	/** Turn a desired amount of padding (from 1 to 15 bits) into a code point. */
	pad_encode_p: function(p) {
		if(p < 1 || MAGIC_NUMBER_A < p) {
			throw new Error("Can't pad by " + String(p));
		}
		var codePoint = pad_start + p;
		return codePoint;
	},

	/** Main Base32768 encoding method */
	encode: function(buf) {
		var result = bits_to_bits([...buf.values()], MAGIC_NUMBER_B, MAGIC_NUMBER_A);

		var str = result.output.map(function(k) {
			return String.fromCharCode(this.encode_k(k));
		}.bind(this)).join("");

		// Don't forget the padding!
		if(result.bc !== MAGIC_NUMBER_A) {
			str += String.fromCharCode(this.encode_k(result.b << result.bc));
			str += String.fromCharCode(this.pad_encode_p(result.bc));
		}

		return str;
	},

	/** Decode a 16-bit code point to a 15-bit number K. The final N bits in
	both numbers are identical. */
	decode_c: function(codePoint) {
		var offset = codePoint & ((1 << n) - 1);
		var codePointBlockStart = codePoint - offset;
		if(!(codePointBlockStart in lookup_decode)) {
			throw new Error("Can't decode " + String(codePoint));
		}
		return lookup_decode[codePointBlockStart] + offset;
	},

	/** Turn a code point into the amount of padding desired (from 1 to 15 bits) */
	pad_decode_c: function(codePoint) {
		var p = codePoint - pad_start;
		if(p < 1 || MAGIC_NUMBER_A < p) {
			throw new Error("Can't determine padding amount for " + String(codePoint));
		}
		return p;
	},

	/** Main Base32768 decoding method */
	decode: function(str) {
		// Figure out how much padding is on the end by trying to extract a
		// padding character.
		var p = 0;
		if(str.length > 0) {
			try {
				p = this.pad_decode_c(str.charCodeAt(str.length - 1));
				str = str.substr(0, str.length - 1);
			} catch(e) {
				// Nope? OK
			}
		}

		var input = str.split("").map(function(chr) {
			return this.decode_c(chr.charCodeAt(0));
		}.bind(this));

		var result = bits_to_bits(input, MAGIC_NUMBER_A, MAGIC_NUMBER_B);

		// The padding character may say to ignore one entire byte of the result
		if(p > MAGIC_NUMBER_B) {
			if(result.output[result.output.length - 1] !== 0) {
				throw new Error("Padding bits must always be zeroes");
			}
			result.output.pop();
			p -= MAGIC_NUMBER_B;
		}

		if(p !== MAGIC_NUMBER_B - result.bc) {
			throw new Error("Padding character indicates " + String(p) + " bits of padding, but there are " + String(result.bc));
		}

		if(result.b !== 0) {
			throw new Error("Padding bits must always be zeroes");
		}

		return new Buffer(result.output);
	}
};
