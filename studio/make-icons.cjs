const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'icons');
const out = {};
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.png'))) {
  out[f.replace(/\.png$/, '')] = { image: `data:image/png;base64,${fs.readFileSync(path.join(dir, f)).toString('base64')}` };
}
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.svg'))) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  const viewBox = src.match(/viewBox="([^"]+)"/)[1];
  const ink = /data-ic="ink"/.test(src);
  const inner = src.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/\s*\n\s*/g, '');
  const clean = ink ? inner.replace(/\s?fill="#[0-9a-f]{3,8}"/gi, '') : inner.replace(/\s?fill="#0{3,6}"/gi, '');
  out[f.replace(/\.svg$/, '')] = { viewBox, inner: clean, ink };
}
fs.writeFileSync(path.join(__dirname, 'icons.js'), `(function (root) {\n  const ICONS = ${JSON.stringify(out)};\n  if (typeof module !== 'undefined' && module.exports) module.exports = ICONS;\n  else root.ProfileIcons = ICONS;\n})(typeof globalThis !== 'undefined' ? globalThis : this);\n`);
console.log(Object.keys(out).join(' '));
