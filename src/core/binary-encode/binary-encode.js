import createBufferWriter from './create-buffer-writer.js';

export default function (hashList, descriptorTable, huffmanTable, compressedData) {
  const bufferSize = 16 + (hashList.length * 4) + (descriptorTable.length * 12) + 4 + (huffmanTable.length * 8) + compressedData.byteLength;

  const buffer = new ArrayBuffer(bufferSize);

  const writer = createBufferWriter(buffer);
  writer.setString8('L10C');
  writer.setUint32(258);
  writer.setUint32(hashList.length);
  writer.setUint32(descriptorTable.length);

  for (const entry of hashList) writer.setUint32(entry);

  for (const entry of descriptorTable) {
    writer.setUint32(entry.hash);
    writer.setUint32(entry.offset);
    writer.setUint32(entry.length);
  }

  writer.setUint32(huffmanTable.length);

  for (const entry of huffmanTable) {
    writer.setUint16(entry.indexOfLeftNode);
    writer.setUint16(entry.indexOfRightNode);
    writer.setString16(entry.character);
    writer.setUint16(0);// Unused. For padding/alignment?
  }

  writer.setCompressedData(compressedData);

  return buffer;
}
