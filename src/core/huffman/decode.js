import createBitReader from './create-bit-reader.js';

export default function (huffmanTable, compressedData, bitOffset, expectedLength) {
  const bitReader = createBitReader(compressedData, bitOffset);
  const result = [];

  while (result.length < expectedLength) {
    let huffmanIndex = 0;
    while (true) {
      const huffmanEntry = huffmanTable[huffmanIndex];
      if (huffmanEntry.character === '\0') {
        if (bitReader.isNextBitZero()) {
          huffmanIndex = huffmanEntry.indexOfLeftNode;
        } else {
          huffmanIndex = huffmanEntry.indexOfRightNode;
        }
      } else {
        result.push(huffmanEntry.character);
        break;
      }
    }
  }

  return result.join('');
}
