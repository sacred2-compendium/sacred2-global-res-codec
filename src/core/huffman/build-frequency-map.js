function processText (map, text) {
  for (const character of text) {
    if (character in map) {
      map[character] += 1;
    } else {
      map[character] = 1;
    }
  }
}

export default function (pairs) {
  const map = Object.create(null);
  for (const pair of pairs) processText(map, pair.text);
  return map;
}
