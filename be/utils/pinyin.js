const toneMap = {
  a: ['ā', 'á', 'ǎ', 'à'],
  e: ['ē', 'é', 'ě', 'è'],
  i: ['ī', 'í', 'ǐ', 'ì'],
  o: ['ō', 'ó', 'ǒ', 'ò'],
  u: ['ū', 'ú', 'ǔ', 'ù'],
  ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
};

function applyTone(final, tone) {
  if (!tone || tone === 5) return final;

  const index = tone - 1;

  if (final.includes('a')) return final.replace('a', toneMap.a[index] || 'a');
  if (final.includes('o')) return final.replace('o', toneMap.o[index] || 'o');
  if (final.includes('e')) return final.replace('e', toneMap.e[index] || 'e');

  for (let v of ['i', 'u', 'ü']) {
    if (final.includes(v)) {
      return final.replace(v, toneMap[v][index] || v);
    }
  }

  return final;
}
function buildPinyin(initial, final, tone) {
  if (!final) return '';

  const tonedFinal = applyTone(final, Number(tone));

  return `${initial || ''}${tonedFinal}`;
}

module.exports = { buildPinyin };
