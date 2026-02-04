import utf16LeEncode from './utf16-le-encode.js';

export default function (buffer) {
  const textEncoder8 = new TextEncoder();// UTF-8

  let index = 0;
  const view = new DataView(buffer, 0);

  function copyBytes (byteArray) {
    new Uint8Array(buffer, index).set(byteArray);
    index += byteArray.byteLength;
  }

  return {
    setUint8: function (value) {
      view.setUint8(index, value);
      index += 1;
    },
    setUint16: function (value) {
      view.setUint16(index, value, true);
      index += 2;
    },
    setUint32: function (value) {
      view.setUint32(index, value, true);
      index += 4;
    },
    setString8: function (value) {
      const byteArray = textEncoder8.encode(value);
      copyBytes(byteArray);
    },
    setString16: function (value) {
      const byteArray = utf16LeEncode(value);
      copyBytes(byteArray);
    },
    setCompressedData: function (arrayBuffer) {
      const byteArray = new Uint8Array(arrayBuffer);
      copyBytes(byteArray);
    },
  };
}
