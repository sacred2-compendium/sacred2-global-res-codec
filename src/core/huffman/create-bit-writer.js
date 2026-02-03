function buildByte (bitArray) {
  let byte = 0;
  for (let i = 7; i > -1; i--) {
    byte = (byte << 1) | bitArray[i];
  }
  return byte;
}

function padToAlignment (length, alignment) {
  const remainder = length % alignment;
  return remainder > 0 ? length + 4 - remainder : length;
}

export default function () {
  const byteArray = [];
  const bitArray = new Uint8Array(8);
  let bitPosition = 0;

  function pushByte () {
    const byte = buildByte(bitArray);
    byteArray.push(byte);
    bitPosition = 0;
  }

  function pushBit (bit) {
    bitArray[bitPosition] = bit;
    bitPosition += 1;
    if (bitPosition === 8) pushByte();
  }

  return {
    getOffset: function () {
      return (byteArray.length << 3) + bitPosition;
    },
    pushBits: function (bitArray) {
      for (const bit of bitArray) pushBit(bit);
    },
    buildArrayBuffer: function () {
      if (bitPosition > 0) {
        bitArray.fill(0, bitPosition);
        pushByte();
      }

      const length = padToAlignment(byteArray.length, 4);
      const result = new Uint8Array(length);
      result.set(byteArray);
      return result.buffer;
    },
  };
}
