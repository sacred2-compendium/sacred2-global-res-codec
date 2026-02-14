import { describe, it } from 'node:test';
import assert from 'node:assert';
import buildFrequencyMap from '../src/core/huffman/build-frequency-map.js';
import buildHuffmanTree from '../src/core/huffman/build-tree.js';
import buildHuffmanTableAndCodebook from '../src/core/huffman/build-table-and-codebook.js';
import huffmanEncode from '../src/core/huffman/encode.js';
import validateData from '../src/core/binary-encode/validate-data.js';
import binaryEncode from '../src/core/binary-encode/binary-encode.js';
import binaryDecode from '../src/core/binary-decode/binary-decode.js';
import huffmanDecode from '../src/core/huffman/decode.js';

function performEncode (pairs) {
  const hashList = [];

  const frequencyMap = buildFrequencyMap(pairs);
  const rootNode = buildHuffmanTree(frequencyMap);
  const { table, codebook } = buildHuffmanTableAndCodebook(rootNode);
  const { descriptorTable, compressedData } = huffmanEncode(codebook, pairs);

  validateData(hashList, descriptorTable, table);

  return binaryEncode(hashList, descriptorTable, table, compressedData);
}

function performDecode (arrayBuffer) {
  const result = binaryDecode(arrayBuffer);

  return result.descriptorTable.map((entry) => {
    return {
      hash: entry.hash,
      text: huffmanDecode(result.huffmanTable, result.compressedData, entry.offset, entry.length),
    };
  });
}

function assertInputAndOutputMatch (inputFactoryFn) {
  const arrayBuffer = performEncode(inputFactoryFn());
  const pairs = performDecode(arrayBuffer);

  assert.deepStrictEqual(pairs, inputFactoryFn());
}

describe('encode and decode', () => {
  it('can handle zero pairs', () => {
    assertInputAndOutputMatch(() => []);
  });

  it('can handle one pair (English)', () => {
    assertInputAndOutputMatch(() => [
      {
        hash: 1234,
        text: 'Hello, World!',
      },
    ]);
  });

  it('can handle one pair (Bulgarian)', () => {
    assertInputAndOutputMatch(() => [
      {
        hash: 1234,
        text: 'Здравей, свят!',
      },
    ]);
  });

  it('can handle one pair (Chinese)', () => {
    assertInputAndOutputMatch(() => [
      {
        hash: 1234,
        text: '你好，世界！',
      },
    ]);
  });

  it('can handle multiple pairs', () => {
    assertInputAndOutputMatch(() => [
      {
        hash: 1,
        text: 'Hello, World!',
      },
      {
        hash: 2,
        text: 'Здравей, свят!',
      },
      {
        hash: 3,
        text: '你好，世界！',
      },
    ]);
  });

  it('can handle one pair containing zero characters', () => {
    assertInputAndOutputMatch(() => [
      {
        hash: 1234,
        text: '',
      },
    ]);
  });

  it('can handle one pair containing a single character', () => {
    assertInputAndOutputMatch(() => [
      {
        hash: 1234,
        text: 'G',
      },
    ]);
  });

  it('can handle one pair containing a repeating character', () => {
    assertInputAndOutputMatch(() => [
      {
        hash: 1234,
        text: 'YYYYYYYY',
      },
    ]);
  });
});
