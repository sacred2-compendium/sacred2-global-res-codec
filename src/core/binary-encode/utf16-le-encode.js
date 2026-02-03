// UTF-16 LE with surrogate pairs
export default function (value) {
  const arrayBuffer = new ArrayBuffer(value.length * 2);
  const codeUnits = new Uint16Array(arrayBuffer);
  for (let i = 0; i < value.length; i++) {
    codeUnits[i] = value.charCodeAt(i);
  }
  return new Uint8Array(arrayBuffer);
}
