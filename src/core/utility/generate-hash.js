// ASCII characters only!
export default function (lokaId) {
  if (lokaId === null) return 0;

  lokaId = lokaId.toUpperCase();
  let hash = 0;

  for (const character of lokaId) {
    const utfCodePoint = character.codePointAt(0);

    if (utfCodePoint > 127) throw new Error(`Non-ASCII character detected: ${character}`);

    hash = Math.imul(hash, 0x71) >>> 0;
    hash = (hash + utfCodePoint) >>> 0;
    hash = (hash % 0xfffffffb) >>> 0;
  }

  return hash;
}
