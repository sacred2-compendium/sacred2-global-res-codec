import createBitWriter from './create-bit-writer.js';

export default function (huffmanCodebook, pairs) {
  const bitWriter = createBitWriter();

  const descriptorTable = pairs.map((pair) => {
    const offset = bitWriter.getOffset();

    let length = 0;

    for (const character of pair.text) {
      const bitArray = huffmanCodebook[character];
      bitWriter.pushBits(bitArray);
      length += 1;
    }

    return {
      hash: pair.hash,
      offset,
      length,
    };
  });

  return {
    descriptorTable,
    compressedData: bitWriter.buildArrayBuffer(),
  };
}
