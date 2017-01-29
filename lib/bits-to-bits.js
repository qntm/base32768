/**
	Generic bit-dicing methods.
*/
module.exports = {
	/**
		Input an array of {number, number_of_bits_in_number}. Output an array of
		bits.
	*/
	bytesToBits: function(sizedBytes) {
		var bits = [];
		sizedBytes.forEach(function(sizedByte) {
			var byte = sizedByte.byte;
			var numBits = sizedByte.numBits;

			if(byte !== Number(byte)) {
				throw new Error("Not an number: " + String(byte));
			}
			if(Math.floor(byte) !== byte) {
				throw new Error("Not an integer: " + String(byte));
			}
			if(byte < 0 || (1 << numBits) <= byte) {
				throw new Error("Integer out of range: " + String(byte));
			}

			// Take most significant bit first
			for(var i = numBits - 1; 0 <= i; i--) {
				var bit = (byte & (1 << i)) >> i;
				if(bit !== 0 && bit !== 1) {
					throw new Error("Not a bit: " + String(bit));
				}
				bits.push(bit === 1 ? true : false);
				byte -= bit << i;
			}
			
			if(byte !== 0) {
				throw new Error("Somehow did not consume all bits: " + String(byte));
			}
		});
		return bits;
	},
	
	/**
		Input an array of bits and a desired size. Output an array of {number,
		number_of_bits_in_number}. The latter will be the desired size except
		possibly for the final element in the array which will likely be smaller
		(but not zero)
	*/
	bitsToBytes: function(bits, size) {
		var sizedBytes = [];
		var byte = 0;
		var numBits = 0;
		bits.forEach(function(bit, n) {
			byte = (byte << 1) + (bit ? 1 : 0);
			numBits++;
			if(numBits === size || n === bits.length - 1) {
				sizedBytes.push({
					byte: byte,
					numBits: numBits
				});
				byte = 0;
				numBits = 0;
			}
		});
		return sizedBytes;
	}
};
