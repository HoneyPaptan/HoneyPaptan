const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const P = require('./profile.js');

const HERE = __dirname;
const ROOT = path.join(HERE, '..');
const OUT = path.join(ROOT, 'assets', 'profile');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'profile-fonts-'));
const FAMILY = { sans: 'PS', mono: 'PM' };
const MARK = '/*FONTS*/';

const decode = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');

function usedText(svg) {
  const chunks = svg.match(/<text\b[^>]*>[\s\S]*?<\/text>/g) || [];
  return decode(chunks.map((c) => c.replace(/<[^>]+>/g, '')).join(''));
}

function subset(face, text) {
  const txt = path.join(TMP, `${face}.txt`);
  const woff = path.join(TMP, `${face}.woff2`);
  fs.writeFileSync(txt, [...new Set(text)].join(''));
  execFileSync('pyftsubset', [path.join(HERE, 'fonts', `${face}.woff2`), `--text-file=${txt}`, '--flavor=woff2', `--output-file=${woff}`], { stdio: ['ignore', 'ignore', 'ignore'] });
  return fs.readFileSync(woff).toString('base64');
}

function embed(svg, faces) {
  const text = usedText(svg);
  const css = faces.map((face) => {
    const [family, weight] = face.split('-');
    return `@font-face{font-family:${FAMILY[family]};font-weight:${weight};src:url(data:font/woff2;base64,${subset(face, text)}) format('woff2')}`;
  }).join('');
  return svg.replace(MARK, css);
}

const written = new Set();
function write(name, svg) {
  const clean = svg.replace(/\n/g, '');
  fs.writeFileSync(path.join(OUT, name), clean);
  written.add(name);
  console.log(name.padEnd(24), `${(Buffer.byteLength(clean) / 1024).toFixed(1)} KB`);
}

fs.mkdirSync(OUT, { recursive: true });
const opts = { fontCss: MARK };
write('hero.svg', embed(P.workbench(P.CONFIG, opts), ['sans-400', 'sans-600', 'mono-400']));
for (const it of P.CONFIG.tiles) write(`tile-${it.id}.svg`, embed(P.tile(it, P.CONFIG, opts), ['sans-500', 'sans-600', 'mono-500']));
for (const link of P.CONFIG.links) write(P.chipFile(link), embed(P.linkChip(link, opts), ['sans-500']));

for (const f of fs.readdirSync(OUT)) if (!written.has(f)) fs.rmSync(path.join(OUT, f));
fs.writeFileSync(path.join(ROOT, 'README.md'), P.readme(P.CONFIG));
fs.rmSync(TMP, { recursive: true, force: true });
console.log('README.md written');
