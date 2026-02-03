import createBufferReader from './create-buffer-reader.js';

export default function (buffer) {
  const reader = createBufferReader(buffer);
  const version1 = reader.getString8(4);
  const version2 = reader.getUint32();

  if (version1 === 'L10C' && (version2 === 257 || version2 === 258)) {
    const count1 = reader.getUint32();
    const count2 = reader.getUint32();

    const hashList = [];
    for (let i = 0; i < count1; i++) {
      const hash = reader.getUint32();
      hashList.push(hash);
    }

    const descriptorTable = [];
    for (let i = 0; i < count2; i++) {
      const hash = reader.getUint32();
      const offset = reader.getUint32();
      const length = reader.getUint32();
      descriptorTable.push({
        hash,
        offset,
        length,
      });
    }

    const count3 = reader.getUint32();

    const huffmanTable = [];
    for (let i = 0; i < count3; i++) {
      const indexOfLeftNode = reader.getUint16();
      const indexOfRightNode = reader.getUint16();
      const character = reader.getString16(1);
      reader.getUint16();// Unused. For padding/alignment?
      huffmanTable.push({
        indexOfLeftNode,
        indexOfRightNode,
        character,
      });
    }

    const compressedDataSize = reader.getLastIndex() - reader.getCurrentIndex();
    const compressedData = reader.getCompressedData(compressedDataSize);

    return {
      version1,
      version2,
      hashList,
      descriptorTable,
      huffmanTable,
      compressedData,
    };
  } else {
    throw new Error(`Binary format version ${version1} ${version2} is not supported!`);
  }
}
