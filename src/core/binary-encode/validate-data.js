import utf16LeEncode from './utf16-le-encode.js';

const MAX_UINT32 = 0xFFFFFFFF;// 4294967295
const MAX_UINT16 = 0xFFFF;// 65535

function validateTableLength (table, tableName) {
  if (table.length > MAX_UINT32) throw new Error(`${tableName} contains too many entries!\n  Maximum allowed: ${MAX_UINT32}\n  Actual: ${table.length}`);
}

function validateTableElementLength (tableName, index, columnName, value, max) {
  if (value > max) throw new Error(`${tableName}, index ${index}: ${columnName} is too large!\n  Maximum allowed: ${max}\n  Actual: ${value}`);
}

export default function (hashList, descriptorTable, huffmanTable) {
  validateTableLength(hashList, 'Hash list');
  validateTableLength(descriptorTable, 'Descriptor table');
  validateTableLength(huffmanTable, 'Huffman table');

  for (let i = 0; i < hashList.length; i++) {
    const entry = hashList[i];
    validateTableElementLength('Hash list', i, 'Hash', entry, MAX_UINT32);
  }

  for (let i = 0; i < descriptorTable.length; i++) {
    const entry = descriptorTable[i];
    validateTableElementLength('Descriptor table', i, 'Hash', entry.hash, MAX_UINT32);
    validateTableElementLength('Descriptor table', i, 'Offset', entry.offset, MAX_UINT32);
    validateTableElementLength('Descriptor table', i, 'Length', entry.length, MAX_UINT32);
  }

  for (let i = 0; i < huffmanTable.length; i++) {
    const entry = huffmanTable[i];
    validateTableElementLength('Huffman table', i, 'Index of left node', entry.indexOfLeftNode, MAX_UINT16);
    validateTableElementLength('Huffman table', i, 'Index of right node', entry.indexOfRightNode, MAX_UINT16);
    const bytes = utf16LeEncode(entry.character);
    if (bytes.length > 2) throw new Error(`Huffman table, index ${i}: The character "${entry.character}" cannot be represented with just 2 bytes!\n  Maximum allowed: 2\n  Actual: ${bytes.length} (${bytes.join(', ')})`);
  }
}
