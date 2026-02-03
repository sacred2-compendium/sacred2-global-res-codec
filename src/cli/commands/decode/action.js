import fs from 'node:fs/promises';
import binaryDecode from '../../../core/binary-decode/binary-decode.js';
import huffmanDecode from '../../../core/huffman/decode.js';

async function readFromFile (file) {
  const nodeBuffer = await fs.readFile(file);

  // Node.js Buffer -> ArrayBuffer
  return nodeBuffer.buffer.slice(
    nodeBuffer.byteOffset,
    nodeBuffer.byteOffset + nodeBuffer.byteLength,
  );
}

async function writeToFile (file, data) {
  await fs.writeFile(file, data, 'utf-8');
}

export default async function ({input, hashesOutput, pairsOutput, hashesFormat, pairsFormat, jsonIndent}) {
  const arrayBuffer = await readFromFile(input);

  const result = binaryDecode(arrayBuffer);

  const pairs = result.descriptorTable.map((entry) => {
    return {
      hash: entry.hash,
      text: huffmanDecode(result.huffmanTable, result.compressedData, entry.offset, entry.length),
    };
  });

  jsonIndent = parseInt(jsonIndent, 10);
  const hashesJson = JSON.stringify(result.hashList, null, jsonIndent);
  const pairsJson = JSON.stringify(pairs, null, jsonIndent);

  await writeToFile(hashesOutput, hashesJson);
  await writeToFile(pairsOutput, pairsJson);
}
