import fs from 'node:fs/promises';
import buildFrequencyMap from '../../../core/huffman/build-frequency-map.js';
import buildHuffmanTree from '../../../core/huffman/build-tree.js';
import buildHuffmanTableAndCodebook from '../../../core/huffman/build-table-and-codebook.js';
import huffmanEncode from '../../../core/huffman/encode.js';
import validateData from '../../../core/binary-encode/validate-data.js';
import binaryEncode from '../../../core/binary-encode/binary-encode.js';

async function writeToFile (file, arrayBuffer) {
  const nodeBuffer = Buffer.from(arrayBuffer);
  await fs.writeFile(file, nodeBuffer);
}

export default async function ({hashesInput, pairsInput, output, hashesFormat, pairsFormat}) {
  const hashesText = await fs.readFile(hashesInput, 'utf8');
  const pairsText = await fs.readFile(pairsInput, 'utf8');

  const hashes = JSON.parse(hashesText);
  const pairs = JSON.parse(pairsText);

  hashes.sort((a, b) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      throw new Error(`Detected a duplicated hash in hash list: ${a}`);
    }
  });
  pairs.sort((a, b) => {
    if (a.hash < b.hash) {
      return -1;
    } else if (a.hash > b.hash) {
      return 1;
    } else {
      throw new Error(`Detected a duplicated hash in hash-text pairs list: ${a.hash}`);
    }
  });

  const frequencyMap = buildFrequencyMap(pairs);
  const rootNode = buildHuffmanTree(frequencyMap);
  const { table: huffmanTable, codebook: huffmanCodebook } = buildHuffmanTableAndCodebook(rootNode);
  const result = huffmanEncode(huffmanCodebook, pairs);

  validateData(hashes, result.descriptorTable, huffmanTable);

  const arrayBuffer = binaryEncode(
    hashes,
    result.descriptorTable,
    huffmanTable,
    result.compressedData,
  );

  await writeToFile(output, arrayBuffer);
}
