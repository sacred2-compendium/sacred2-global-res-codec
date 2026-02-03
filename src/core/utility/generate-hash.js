// ASCII characters only!
export default function (lokaId) {
  if (lokaId === null) return 0;

  lokaId = lokaId.toUpperCase();
  const array = new Uint32Array(1);
  array[0] = 0;

  for (const character of lokaId) {
    const utfCodePoint = character.codePointAt(0);

    if (utfCodePoint > 127) throw new Error(`Non-ASCII character detected: ${character}`);

    array[0] *= 0x71;
    array[0] += utfCodePoint;
    array[0] %= 0xfffffffb;
  }

  return array[0];
}
