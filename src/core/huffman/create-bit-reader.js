function checkBit (integer, n) {
  return (integer & (1 << n)) === 0;
}

export default function (compressedData, bitOffset) {
  const byteArray = new Uint8Array(compressedData);
  let bytePosition = bitOffset >>> 3;
  let bitPosition = bitOffset % 8;

  function incrementBitPosition () {
    bitPosition += 1;
    if (bitPosition === 8) {
      bytePosition += 1;
      bitPosition = 0;
    }
  }

  return {
    isNextBitZero: function () {
      const byte = byteArray[bytePosition];
      const result = checkBit(byte, bitPosition);
      incrementBitPosition();
      return result;
    },
  };
}
