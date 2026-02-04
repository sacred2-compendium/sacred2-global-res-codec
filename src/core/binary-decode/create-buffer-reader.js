export default function (buffer) {
  const textDecoder8 = new TextDecoder();// UTF-8
  const textDecoder16 = new TextDecoder('utf-16le');// UTF-16 LE

  let index = 0;
  const view = new DataView(buffer, 0);

  return {
    getCurrentIndex: function () {
      return index;
    },
    getByteLength: function () {
      return view.byteLength;
    },
    getUint16: function () {
      const value = view.getUint16(index, true);
      index += 2;
      return value;
    },
    getUint32: function () {
      const value = view.getUint32(index, true);
      index += 4;
      return value;
    },
    getString8: function (length) {
      const view = new DataView(buffer, index, length);
      index += length;
      return textDecoder8.decode(view);
    },
    getString16: function (length) {
      length *= 2;
      const view = new DataView(buffer, index, length);
      index += length;
      return textDecoder16.decode(view);
    },
    getCompressedData: function (length) {
      const data = buffer.slice(index, index + length);
      index += length;
      return data;
    },
  };
}
