const toneMap = {
  a: ['ā', 'á', 'ǎ', 'à'],
  e: ['ē', 'é', 'ě', 'è'],
  i: ['ī', 'í', 'ǐ', 'ì'],
  o: ['ō', 'ó', 'ǒ', 'ò'],
  u: ['ū', 'ú', 'ǔ', 'ù'],
  ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
};

function applyTone(final, tone) {
  if (tone === 5) return final;

  if (final.includes('a')) return final.replace('a', toneMap.a[tone - 1]);
  if (final.includes('o')) return final.replace('o', toneMap.o[tone - 1]);
  if (final.includes('e')) return final.replace('e', toneMap.e[tone - 1]);

  for (let v of ['i', 'u', 'ü']) {
    if (final.includes(v)) {
      return final.replace(v, toneMap[v][tone - 1]);
    }
  }

  return final;
}

function buildPinyin(initial, final, tone) {
  return `${initial || ''}${applyTone(final, tone)}`;
}

module.exports = { buildPinyin };
