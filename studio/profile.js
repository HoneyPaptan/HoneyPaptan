(function (root) {
  const CONFIG = {
    handle: 'HoneyPaptan',
    name: 'Honey Paptan',
    role: 'Full-stack AI developer',
    about: ['Builds software on top of LLMs.', 'Voice, agents and workflow automation.'],
    stack: 'Go · TypeScript · React · Next.js · LLM agents',
    elsewhere: 'honeypaptan.vercel.app · x.com/hpaptan7',
    prompt: 'Try "turn this blog post into a podcast"',
    boot: [
      ['hp v0.0.9', 'resuming session for honey'],
      ['✓ journal replayed', '412 steps'],
      ['✓ context loaded', 'go · ts · react'],
      ['✓ tools ready', 'shell · git · browser'],
      ['✓ agents online', '3 running'],
      ['→ rendering profile', ''],
    ],
    question: "who's honey?",
    agent: 'claude',
    tools: [['Read', 'ui-file-text', 'me/about.md'], ['Fetch', 'ui-globe', 'github.com/HoneyPaptan'], ['Search', 'ui-search', 'stack across 121 repos']],
    chips: ['Go', 'TypeScript', 'React', 'Next.js', 'LLM agents'],
    threads: [
      ['voicegraph', 'claude', 'run'],
      ['podcastify', 'codex', '2h'],
      ['hp-harness', 'opencode', 'run'],
      ['vision-guidance', 'claude', '1d'],
      ['coffee-anatomy', 'cursor', '3d'],
    ],
    home: 'https://honeypaptan.vercel.app',
    accent: '#f5b83d',
    links: [
      ['honeypaptan.vercel.app', 'https://honeypaptan.vercel.app', 'avatar'],
      ['@hpaptan7', 'https://x.com/hpaptan7', 'x'],
      ['LinkedIn', 'https://www.linkedin.com/in/honey-paptan', 'linkedin'],
      ['GitHub', 'https://github.com/HoneyPaptan', 'github-icon'],
    ],
    tiles: [
      { id: 'voicegraph', size: 'big', name: 'VoiceGraph', desc: 'Say it, and it becomes a workflow', right: { star: '10' }, sub: 'voicegraph.vercel.app', href: 'https://github.com/HoneyPaptan/voicegraph' },
      { id: 'podcastify', size: 'big', name: 'Podcastify', desc: 'Any blog post, as a podcast', right: { star: '8' }, sub: 'podcastify-red.vercel.app', href: 'https://github.com/HoneyPaptan/podcastify' },
      { id: 'harness', size: 'small', name: 'hp', desc: 'A coding agent that never dies', right: { label: 'new' }, href: 'https://github.com/HoneyPaptan/hp-harness' },
      { id: 'vision', size: 'small', name: 'Vision Guidance', desc: 'Agents that watch video live', right: { star: '5' }, href: 'https://github.com/HoneyPaptan/Vision-guidance' },
      { id: 'coffee', size: 'small', name: 'coffee anatomy', desc: 'An espresso machine, explained', right: { label: 'new' }, href: 'https://github.com/HoneyPaptan/coffee-anatomy' },
      { id: 'site', size: 'small', name: 'Portfolio', desc: 'Work, writing and links', right: { label: 'site' }, href: 'https://honeypaptan.vercel.app' },
    ],
    working: [
      ['hp', 'https://github.com/HoneyPaptan/hp-harness', 'a coding agent harness that resumes from its journal after any crash'],
      ['coffee anatomy', 'https://github.com/HoneyPaptan/coffee-anatomy', 'an interactive teardown of an espresso machine'],
      ['VoiceGraph', 'https://github.com/HoneyPaptan/voicegraph', 'more spoken triggers and integrations for voice-built workflows'],
    ],
  };

  const MONO = "PM,'Geist Mono','GeistMono NF','JetBrains Mono',ui-monospace,Menlo,Consolas,monospace";
  const SANS = "PS,Geist,Inter,ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif";
  const INK = '#0e0e0e', SOFT = '#a3a3a3', DIM = '#6b6b6b', LINE = '#2c2c2c';
  const SIZES = { big: { w: 423, h: 192, plate: 58 }, small: { w: 211, h: 140, plate: 54 } };

  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const fx = (n) => +n.toFixed(2);
  const t = (x, y, s, fill, size, extra = '') => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}"${extra}>${esc(s)}</text>`;
  const reduced = '@media (prefers-reduced-motion:reduce){*{animation:none!important}}';

  const RAMP = '.,-~:;=!*#$@';
  const tone = (ch) => ('.,-~'.includes(ch) ? 'd' : ':;=!'.includes(ch) ? 'm' : 'h');

  function rotate([x, y, z], a, b) {
    const ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
    const x1 = x * cb + z * sb, z1 = -x * sb + z * cb;
    return [x1, y * ca - z1 * sa, y * sa + z1 * ca];
  }

  function torusSurface() {
    const R1 = 0.42, R2 = 1, pts = [];
    for (let i = 0; i < 90; i++) for (let j = 0; j < 220; j++) {
      const th = (2 * Math.PI * i) / 90, ph = (2 * Math.PI * j) / 220;
      const ct = Math.cos(th), st = Math.sin(th), cp = Math.cos(ph), sp = Math.sin(ph);
      pts.push([[(R2 + R1 * ct) * cp, R1 * st, (R2 + R1 * ct) * sp], [ct * cp, st, ct * sp]]);
    }
    return pts;
  }

  function prismFrames({ cols, rows, size, frames }) {
    const pts = torusSurface();
    const K2 = 5, S = (rows * size * 0.95 * K2) / 2.9, cw = size * 0.6;
    const L = [-0.55, 0.3, -0.78], ll = Math.hypot(...L), light = L.map((c) => c / ll);
    const out = [];
    for (let f = 0; f < frames; f++) {
      const th = (2 * Math.PI * f) / frames;
      const a = 1.0 + 0.35 * Math.sin(th), b = th;
      const zb = new Float32Array(cols * rows), buf = Array(cols * rows).fill(' ');
      for (const [p, n] of pts) {
        const [x, y, z] = rotate(p, a, b), nn = rotate(n, a, b);
        const ooz = 1 / (z + K2), c = Math.round(cols / 2 + (S * x * ooz) / cw), r = Math.round(rows / 2 - (S * y * ooz) / size);
        if (c < 0 || c >= cols || r < 0 || r >= rows) continue;
        const i = r * cols + c;
        if (ooz <= zb[i]) continue;
        zb[i] = ooz;
        const lum = nn[0] * light[0] + nn[1] * light[1] + nn[2] * light[2];
        buf[i] = lum <= 0.05 ? '.' : RAMP[Math.min(RAMP.length - 1, Math.floor(lum ** 1.4 * RAMP.length))];
      }
      out.push([...Array(rows)].map((_, r) => buf.slice(r * cols, (r + 1) * cols).join('')));
    }
    return out;
  }

  function frameSvg(lines, size, delay) {
    const cw = size * 0.6;
    let body = '';
    lines.forEach((line, r) => {
      const start = line.search(/\S/);
      if (start < 0) return;
      const s = line.slice(start).replace(/\s+$/, '');
      let runs = '', cur = '', curTone = '';
      for (const ch of s) {
        const tn = ch === ' ' ? curTone : tone(ch);
        if (tn !== curTone && cur) { runs += `<tspan class="${curTone}">${esc(cur)}</tspan>`; cur = ''; }
        curTone = tn; cur += ch;
      }
      if (cur) runs += `<tspan class="${curTone}">${esc(cur)}</tspan>`;
      body += `<tspan x="${fx(start * cw)}" y="${fx((r + 1) * size)}">${runs}</tspan>`;
    });
    return `<text class="f" font-size="${size}" style="animation-delay:${delay}s">${body}</text>`;
  }

  function hero(cfg = CONFIG, { fontCss = '' } = {}) {
    const W = 846, H = 378, L = 5, R = 841, A = cfg.accent;
    const BOX = { x: 24, y: 50, w: 798, h: 244 }, DIV = 330;
    const ART = { cols: 40, rows: 18, size: 9.4, frames: 48, loop: 6 };
    const frames = prismFrames(ART);
    const dt = ART.loop / ART.frames;
    const art = frames.map((lines, i) => frameSvg(lines, ART.size, fx(-(ART.loop - i * dt)))).join('');
    const artW = ART.cols * ART.size * 0.6, artH = ART.rows * ART.size;
    const cx = W / 2, cy = (H + 20) / 2, big = 1.7;
    const leftMid = BOX.x + (DIV - BOX.x) / 2;
    const slot = `translate(${fx(leftMid - artW / 2)}px,${fx(BOX.y + 44)}px) scale(1)`;
    const centre = `translate(${fx(cx - (artW * big) / 2)}px,${fx(cy - (artH * big) / 2)}px) scale(${big})`;
    const tiny = `translate(${fx(cx - (artW * 0.1) / 2)}px,${fx(cy - (artH * 0.1) / 2)}px) scale(.1)`;
    const show = (at, extra = '') => ` class="in${extra}" style="animation-delay:${at}s"`;

    const boot = cfg.boot.map(([k, v], i) => {
      const y = 70 + i * 22, at = 0.25 + i * 0.3;
      const ok = k.startsWith('✓') ? A : k.startsWith('→') ? '#ededed' : DIM;
      return `<g${show(at)}>${t(32, y, k, ok, 13)}${t(250, y, v, DIM, 13)}</g>`;
    }).join('');
    const barY = 70 + cfg.boot.length * 22 - 8;
    const bar = `<g${show(0.25 + cfg.boot.length * 0.3)}><rect x="32" y="${barY}" width="300" height="6" rx="3" fill="${LINE}"/><rect x="32" y="${barY}" width="300" height="6" rx="3" fill="${A}" class="bar"/></g>`;

    const dots = [0, 1, 2].map((i) => `<circle cx="${L + 20 + i * 18}" cy="15" r="5.5" fill="#3a3a3a"/>`).join('');
    const titlebar = `<path d="M${L} 12a12 12 0 0 1 12-12h${R - L - 24}a12 12 0 0 1 12 12v18H${L}z" fill="#161616"/>${dots}${t(W / 2, 19.5, `~/${cfg.handle}`, DIM, 12, ' text-anchor="middle"')}`;

    const labelW = cfg.handle.length * 13 * 0.6 + 14;
    const panel = `<rect x="${BOX.x}" y="${BOX.y}" width="${BOX.w}" height="${BOX.h}" rx="8" fill="none" stroke="#3a3a3a" stroke-width="1.2" pathLength="1" class="draw"/>
<g${show(3.45)}><rect x="${BOX.x + 14}" y="${BOX.y - 8}" width="${labelW}" height="16" fill="#0c0c0c"/>${t(BOX.x + 21, BOX.y + 4.5, cfg.handle, A, 13)}</g>
<path d="M${DIV} ${BOX.y + 22}V${BOX.y + BOX.h - 22}" stroke="#3a3a3a" stroke-width="1.2"${show(3.5, ' grow')} />`;

    const left = `<g${show(3.85)}>${t(leftMid, BOX.y + 30, cfg.name, '#ededed', 14.5, ' text-anchor="middle" font-weight="700"')}</g>
<g${show(3.95)}>${t(leftMid, BOX.y + BOX.h - 18, cfg.role, DIM, 12.5, ' text-anchor="middle"')}</g>`;

    const RX = DIV + 24;
    const rows = [['About', 'h'], ...cfg.about.map((s) => [s, 'b']), [null, 'rule'], ['Stack', 'h'], [cfg.stack, 'b'], [null, 'gap'], ['Elsewhere', 'h'], [cfg.elsewhere, 'b']];
    let y = BOX.y + 34, right = '';
    rows.forEach(([s, kind], i) => {
      const at = fx(3.9 + i * 0.055);
      if (kind === 'rule') { right += `<path d="M${RX} ${y - 6}H${BOX.x + BOX.w - 24}" stroke="#3a3a3a"${show(at, ' wide')}/>`; y += 22; return; }
      if (kind === 'gap') { y += 8; return; }
      right += `<g${show(at)}>${t(RX, y, s, kind === 'h' ? '#ededed' : SOFT, 13, kind === 'h' ? ' font-weight="700"' : '')}</g>`;
      y += kind === 'h' ? 22 : 20;
    });

    const PY = BOX.y + BOX.h + 12, PH = 38;
    const prompt = `<g${show(4.4)}><rect x="${BOX.x}" y="${PY}" width="${BOX.w}" height="${PH}" rx="6" fill="none" stroke="#575757" stroke-width="1.2"/>
${t(BOX.x + 14, PY + 24, '>', A, 13.5)}<rect x="${BOX.x + 32}" y="${PY + 12}" width="8.1" height="16" fill="#ededed" class="blink"/>
${t(BOX.x + 44, PY + 24, cfg.prompt, DIM, 13.5)}</g>`;

    const css = `${fontCss}
text{font-family:${MONO};font-weight:500;white-space:pre}
.d{fill:#4a4a4a}.m{fill:#9b9b9b}.h{fill:${A}}
.in{opacity:0;animation:in .3s cubic-bezier(.2,.8,.2,1) both}
@keyframes in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
.grow{transform-box:fill-box;transform-origin:center;animation-name:grow}@keyframes grow{from{opacity:0;transform:scaleY(0)}to{opacity:1;transform:none}}
.wide{transform-box:fill-box;transform-origin:left;animation-name:wide}@keyframes wide{from{opacity:0;transform:scaleX(0)}to{opacity:1;transform:none}}
.bar{transform-box:fill-box;transform-origin:left;animation:bar .9s cubic-bezier(.65,0,.35,1) ${0.35 + cfg.boot.length * 0.3}s both}@keyframes bar{from{transform:scaleX(0)}to{transform:none}}
.boot{animation:out .3s ease-in 2.75s both}@keyframes out{to{opacity:0;transform:translateY(-6px)}}
.draw{stroke-dasharray:1;animation:draw .8s cubic-bezier(.65,0,.35,1) 3s both}@keyframes draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
.knot{transform-origin:0 0;animation:knot 1.5s 2.7s both}
@keyframes knot{0%{opacity:0;transform:${tiny};animation-timing-function:cubic-bezier(.16,1,.3,1)}25%{opacity:1;transform:${centre}}55%{opacity:1;transform:${centre};animation-timing-function:cubic-bezier(.7,0,.25,1)}100%{opacity:1;transform:${slot}}}
.f{opacity:0;animation:fr ${ART.loop}s step-end infinite}
@keyframes fr{0%{opacity:1}${fx(100 / ART.frames)}%{opacity:0}100%{opacity:0}}
.blink{animation:blink 1.05s steps(1) infinite}@keyframes blink{50%{opacity:0}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}.boot{display:none}.f{opacity:0}.f:first-child{opacity:1}}`;

    const label = `${cfg.name}. ${cfg.role}. ${cfg.about.join(' ')} Stack: ${cfg.stack}.`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}">
<title>${esc(cfg.name)}</title>
<defs><clipPath id="win"><rect x="${L}" y="0" width="${R - L}" height="${H - 4}" rx="12"/></clipPath></defs>
<style>${css.replace(/\n/g, '')}</style>
<rect x="${L}" y="0" width="${R - L}" height="${H - 4}" rx="12" fill="#0c0c0c"/>
<g clip-path="url(#win)">
<g class="boot">${boot}${bar}</g>
${panel}
<g class="knot" style="transform:${slot}">${art}</g>
${titlebar}${left}${right}${prompt}
</g>
</svg>`;
  }

  const star = (cx, cy, r, fill) => {
    const p = [...Array(10)].map((_, i) => {
      const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r;
      return `${fx(cx + Math.cos(a) * rr)},${fx(cy + Math.sin(a) * rr)}`;
    });
    return `<polygon points="${p.join(' ')}" fill="${fill}"/>`;
  };

  const ART = {
    voicegraph(w, h, A) {
      const bars = [...Array(11)].map((_, i) => {
        const bh = 14 + ((i * 37) % 5) * 9;
        return `<rect x="${18 + i * 8}" y="${65 - bh / 2}" width="4" height="${bh}" rx="2" fill="${A}" class="vb" style="animation-delay:${-(i * 0.13).toFixed(2)}s"/>`;
      }).join('');
      const nodes = [['parse', 132, 26], ['plan', 230, 26], ['gmail', 328, 26], ['sheets', 230, 84], ['slack', 328, 84]];
      const box = ([n, x, y]) => `<rect x="${x}" y="${y}" width="72" height="24" rx="7" fill="#161616" stroke="#333"/>${t(x + 36, y + 16, n, '#d4d4d4', 11, ` text-anchor="middle" font-family="${esc(MONO)}"`)}`;
      const edges = ['M108 38H132', 'M204 38H230', 'M302 38H328', 'M266 50V84', 'M302 96H328'];
      const lines = edges.map((d) => `<path d="${d}" stroke="#3a3a3a" stroke-width="1.2" fill="none"/>`).join('');
      const pulses = edges.map((d, i) => `<circle r="2.6" fill="${A}"><animateMotion dur="2.4s" begin="${(i * 0.35).toFixed(2)}s" repeatCount="indefinite" path="${d}"/></circle>`).join('');
      return { css: `.vb{transform-box:fill-box;transform-origin:center;animation:vb 1.1s ease-in-out infinite alternate}@keyframes vb{from{transform:scaleY(.35)}to{transform:scaleY(1)}}`, svg: bars + lines + nodes.map(box).join('') + pulses };
    },
    podcastify(w, h, A) {
      const card = `<rect x="16" y="16" width="118" height="${h - 32}" rx="8" fill="#161616" stroke="#2a2a2a"/><rect x="28" y="28" width="70" height="8" rx="4" fill="#3d3d3d"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="28" y="${46 + i * 10}" width="${[94, 86, 92, 60, 88, 72][i]}" height="4" rx="2" fill="#2c2c2c"/>`).join('')}`;
      const arrow = `<path d="M146 ${h / 2}h22m-6-5 6 5-6 5" stroke="#555" stroke-width="1.4" fill="none"/>`;
      const n = 44, x0 = 182, bw = 3, gap = 2.4, mid = h / 2 + 8;
      const hs = [...Array(n)].map((_, i) => 6 + Math.abs(Math.sin(i * 0.7) * 22 + Math.sin(i * 1.9) * 12));
      const wave = (fill) => hs.map((bh, i) => `<rect x="${fx(x0 + i * (bw + gap))}" y="${fx(mid - bh / 2)}" width="${bw}" height="${fx(bh)}" rx="1.5" fill="${fill}"/>`).join('');
      const span = n * (bw + gap);
      const langs = ['EN', 'HI', 'ES', 'FR', 'DE'];
      const chips = langs.map((l, i) => `<g class="lang" style="animation-delay:${i * 1.2}s"><rect x="${182 + i * 40}" y="14" width="34" height="18" rx="9" fill="${A}"/></g><text x="${199 + i * 40}" y="27" font-size="10.5" text-anchor="middle" fill="#cfcfcf" font-family="${esc(MONO)}" class="lt" style="animation-delay:${i * 1.2}s">${l}</text>`).join('');
      const chipBg = langs.map((_, i) => `<rect x="${182 + i * 40}" y="14" width="34" height="18" rx="9" fill="none" stroke="#333"/>`).join('');
      const play = `<clipPath id="pw"><rect x="${x0}" y="0" width="0" height="${h}"><animate attributeName="width" dur="6s" values="0;${span};${span}" keyTimes="0;.85;1" repeatCount="indefinite"/></rect></clipPath>`;
      return {
        css: `.lang{opacity:0;animation:lang 6s step-end infinite}@keyframes lang{0%{opacity:1}20%{opacity:0}100%{opacity:0}}.lt{animation:lt 6s step-end infinite}@keyframes lt{0%{fill:#0e0e0e}20%{fill:#cfcfcf}100%{fill:#cfcfcf}}`,
        svg: `${card}${arrow}${chipBg}${chips}<defs>${play}</defs>${wave('#333')}<g clip-path="url(#pw)">${wave(A)}</g>`,
      };
    },
    harness(w, h, A) {
      const lines = [['$ hp run "fix flaky test"', '#d4d4d4'], ['step 41  rate limit, wait 38s', SOFT], ['→ resumed after reboot', A], ['step 42  tests green', SOFT]];
      const body = lines.map(([s, c], i) => `<g class="ln" style="animation-delay:${(i * 0.9).toFixed(1)}s">${t(12, 22 + i * 15, s, c, 10, ` font-family="${esc(MONO)}"`)}</g>`).join('');
      return { css: `.ln{opacity:0;animation:ln 6s infinite}@keyframes ln{0%{opacity:0}4%{opacity:1}85%{opacity:1}95%{opacity:0}100%{opacity:0}}.cur{animation:cur 1s steps(1) infinite}@keyframes cur{50%{opacity:0}}`, svg: `${body}<rect x="12" y="${22 + 4 * 15 - 9}" width="6" height="11" fill="#d4d4d4" class="cur"/>` };
    },
    vision(w, h, A) {
      const box = (x, y, bw, bh, label, d) => {
        const c = 7, s = `stroke="${A}" stroke-width="1.6" fill="none"`;
        return `<g class="det" style="animation-delay:${d}s"><path d="M${x} ${y + c}V${y}H${x + c}M${x + bw - c} ${y}H${x + bw}V${y + c}M${x + bw} ${y + bh - c}V${y + bh}H${x + bw - c}M${x + c} ${y + bh}H${x}V${y + bh - c}" ${s}/><rect x="${x}" y="${y - 13}" width="${label.length * 5.6 + 8}" height="11" rx="2" fill="${A}"/>${t(x + 4, y - 4.5, label, '#111', 8.5, ` font-family="${esc(MONO)}"`)}</g>`;
      };
      const scene = `<rect width="${w}" height="${h}" fill="#141414"/><circle cx="62" cy="40" r="11" fill="#2a2a2a"/><path d="M40 ${h}c0-26 10-38 22-38s22 12 22 38z" fill="#2a2a2a"/><rect x="128" y="44" width="46" height="34" rx="4" fill="#232323"/>`;
      return {
        css: `.det{opacity:0;animation:det 4s infinite}@keyframes det{0%{opacity:0}10%{opacity:1}80%{opacity:1}92%{opacity:0}100%{opacity:0}}.scan{animation:scan 4s linear infinite}@keyframes scan{from{transform:translateY(0)}to{transform:translateY(${h}px)}}`,
        svg: `${scene}${box(36, 24, 52, h - 24, 'person 0.97', 0.3)}${box(122, 38, 58, 46, 'laptop 0.91', 0.9)}<rect width="${w}" height="1.5" fill="${A}" opacity=".5" class="scan"/>`,
      };
    },
    coffee(w, h, A) {
      const iso = (x, y, z) => [fx(100 + (x - z) * 0.866), fx(30 + (x + z) * 0.5 - y)];
      const face = (pts, fill) => `<polygon points="${pts.map((p) => iso(...p).join(',')).join(' ')}" fill="${fill}" stroke="#0e0e0e" stroke-width=".8"/>`;
      const bx = 34, by = 46, bz = 34;
      const body = face([[0, by, 0], [bx, by, 0], [bx, by, bz], [0, by, bz]], '#3a3a3a') + face([[0, by, bz], [bx, by, bz], [bx, 0, bz], [0, 0, bz]], '#2a2a2a') + face([[bx, by, 0], [bx, by, bz], [bx, 0, bz], [bx, 0, 0]], '#202020');
      const [gx, gy] = iso(bx * 0.55, 18, bz + 6);
      const head = `<rect x="${gx - 8}" y="${gy - 4}" width="16" height="7" rx="2" fill="#4a4a4a"/>`;
      const [cx, cy] = iso(bx * 0.55, -2, bz + 8);
      const cup = `<path d="M${cx - 7} ${cy - 6}h14l-2 10h-10z" fill="#e8e8e8"/><path d="M${cx + 7} ${cy - 3}a3 3 0 0 1 0 5" stroke="#e8e8e8" stroke-width="1.6" fill="none"/>`;
      const steam = [0, 1, 2].map((i) => `<path d="M${cx - 3 + i * 3} ${cy - 9}c-3-4 3-6 0-10" stroke="${A}" stroke-width="1.2" fill="none" stroke-linecap="round" class="st" style="animation-delay:${i * 0.5}s"/>`).join('');
      return { css: `.st{opacity:0;animation:st 1.6s ease-out infinite}@keyframes st{0%{opacity:0;transform:translateY(2px)}30%{opacity:.9}100%{opacity:0;transform:translateY(-8px)}}`, svg: body + head + cup + steam };
    },
    site(w, h, A) {
      const wx = 14, wy = 12, ww = w - 28, wh = h + 20;
      const win = `<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" rx="8" fill="#161616" stroke="#2a2a2a"/>${[0, 1, 2].map((i) => `<circle cx="${26 + i * 9}" cy="22" r="2.6" fill="#3a3a3a"/>`).join('')}`;
      const lines = `<rect x="28" y="38" width="96" height="11" rx="3" fill="#e8e8e8"/><rect x="28" y="55" width="62" height="11" rx="3" fill="${A}"/><rect x="28" y="74" width="130" height="4" rx="2" fill="#333"/><rect x="28" y="83" width="110" height="4" rx="2" fill="#333"/>`;
      const shine = `<defs><clipPath id="sw"><rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" rx="8"/></clipPath><linearGradient id="shine" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".09"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><g clip-path="url(#sw)"><rect x="0" y="${wy - 20}" width="70" height="${wh + 40}" fill="url(#shine)" class="sh"/></g>`;
      return { css: `.sh{animation:sh 3.2s cubic-bezier(.45,0,.25,1) infinite}@keyframes sh{0%{transform:translateX(-110px) skewX(-16deg)}60%{transform:translateX(${w + 40}px) skewX(-16deg)}100%{transform:translateX(${w + 40}px) skewX(-16deg)}}`, svg: `${win}${lines}${shine}` };
    },
  };

  function tile(item, cfg = CONFIG, { fontCss = '' } = {}) {
    const { w, h, plate } = SIZES[item.size], big = item.size === 'big', A = cfg.accent;
    const gx = 5, tw = w - gx * 2, th = h - 4, ih = th - plate;
    const nameSize = big ? 21 : 16.5, descSize = big ? 13.5 : 12.5, pad = big ? 16 : 13;
    const y1 = ih + (big ? 25 : 22), y2 = ih + (big ? 44 : 40), rx = tw - pad;
    const draw = ART[item.id] ? ART[item.id](tw, ih, A) : { css: '', svg: '' };
    let side = '';
    if (item.right?.star) {
      const sw = textWidth(item.right.star, nameSize - 3, 600);
      side += t(rx, y1 - 0.5, item.right.star, '#fff', nameSize - 3, ' text-anchor="end" font-weight="600"') + star(rx - sw - 9, y1 - 5.5, 5.6, '#fff');
    } else if (item.right?.label) {
      side += t(rx, y1 - 0.5, item.right.label, SOFT, descSize, ' text-anchor="end"');
    }
    if (item.sub) side += t(rx, y2, item.sub, SOFT, descSize, ' text-anchor="end"');
    const title = `${item.name}, ${item.desc}.${item.right?.star ? ` ${item.right.star} stars.` : ''}`;
    const css = `${fontCss}text{font-family:${SANS};font-weight:500}${draw.css}${reduced}`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}">
<title>${esc(title)}</title><defs><clipPath id="c"><rect width="${tw}" height="${th}" rx="14"/></clipPath><clipPath id="art"><rect width="${tw}" height="${ih}"/></clipPath></defs>
<style>${css}</style>
<g transform="translate(${gx} 0)" clip-path="url(#c)"><rect width="${tw}" height="${th}" fill="${INK}"/><g clip-path="url(#art)">${draw.svg}</g>
${t(pad, y1, item.name, '#fff', nameSize, ' font-weight="600" letter-spacing="-.2"')}${t(pad, y2, item.desc, SOFT, descSize)}${side}</g>
</svg>`;
  }

  const ICONS = root.ProfileIcons || (typeof require !== 'undefined' ? require('./icons.js') : {});
  const Z = { bg: '#060606', low: '#0E0E10', surf: '#131316', high: '#1A1A1E', highest: '#222227', fg: '#E8E8EA', muted: '#A9A9AE', faint: '#6B6B72', rule: '#1E1E22', chip: '#1C1C20' };
  const AGENTS = { claude: ['claude-code', 'Claude Code'], codex: ['openai', 'Codex'], opencode: ['opencode-icon', 'OpenCode'], cursor: ['cursor', 'Cursor'] };

  const METRICS = root.ProfileMetrics || (typeof require !== 'undefined' ? require('./metrics.js') : {});
  const guess = (ch) => (ch === '@' ? 0.92 : "il.,'|!:;".includes(ch) ? 0.26 : ch === ' ' ? 0.28 : 'fjrt'.includes(ch) ? 0.36 : 'mwMW'.includes(ch) ? 0.86 : /[A-Z]/.test(ch) ? 0.66 : /[0-9]/.test(ch) ? 0.58 : 0.53);

  function textWidth(s, size, weight = 400, family = 'sans') {
    const table = METRICS[`${family}-${weight}`] || {};
    let w = 0;
    for (const ch of s) w += table[ch] ?? guess(ch);
    return w * size;
  }

  function icon(name, x, y, w, h, color) {
    const ic = ICONS[name];
    if (!ic) return '';
    if (ic.image) {
      const id = `av${Math.round(x)}${Math.round(y)}`, r = w / 2;
      return `<clipPath id="${id}"><circle cx="${fx(x + r)}" cy="${fx(y + r)}" r="${fx(r)}"/></clipPath><image href="${ic.image}" x="${fx(x)}" y="${fx(y)}" width="${w}" height="${h}" clip-path="url(#${id})"/><circle cx="${fx(x + r)}" cy="${fx(y + r)}" r="${fx(r - 0.5)}" fill="none" stroke="${Z.rule}"/>`;
    }
    const paint = color || ic.ink ? ` fill="${color || Z.fg}" color="${color || Z.fg}"` : '';
    return `<svg x="${fx(x)}" y="${fx(y)}" width="${w}" height="${h}" viewBox="${ic.viewBox}"><g${paint}>${ic.inner}</g></svg>`;
  }

  function orb(cx, cy, r, extra = '') {
    return `<g${extra}><circle cx="${cx}" cy="${cy}" r="${fx(r * 2)}" fill="url(#halo)" class="breathe" style="transform-origin:${cx}px ${cy}px"/><g class="spin" style="transform-origin:${cx}px ${cy}px"><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#core)"/><circle cx="${fx(cx - r * 0.35)}" cy="${fx(cy - r * 0.35)}" r="${fx(r * 0.38)}" fill="#FFF6DD" opacity=".9"/></g></g>`;
  }

  function workbench(cfg = CONFIG, { fontCss = '' } = {}) {
    const W = 846, H = 340, A = cfg.accent, RAIL = 216, BAR = 48, MX = 256, MR = 806;
    const q = cfg.question, [agentIcon, agentName] = AGENTS[cfg.agent || 'claude'];
    const show = (at) => ` class="in" style="animation-delay:${fx(at)}s"`;
    const hide = (at) => ` class="gone" style="animation-delay:${fx(at)}s"`;
    const span = (from, to, body) => `<g${show(from)}><g${hide(to)}>${body}</g></g>`;
    const sans = (x, y, s, fill, size, extra = '') => t(fx(x), fx(y), s, fill, size, extra);
    const mono = (x, y, s, fill, size, extra = '') => t(fx(x), fx(y), s, fill, size, ` font-family="${esc(MONO)}"${extra}`);
    const T = { ui: 0.15, type: 1.0, per: 0.085, sent: 0, think: 0, tools: 0, answer: 0 };
    T.sent = T.type + q.length * T.per + 0.25;
    T.think = T.sent + 0.3;
    T.tools = T.think + 1.0;
    T.collapse = T.tools + cfg.tools.length * 0.3 + 0.8;
    T.answer = T.collapse + 0.25;
    const worked = Math.max(1, Math.round(T.collapse - T.sent));

    const frame = `<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="14" fill="${Z.bg}" stroke="${Z.rule}"/>`;

    const rail = [`<path d="M14 .5H${RAIL}V${H - 0.5}H14a13.5 13.5 0 0 1-13.5-13.5V14A13.5 13.5 0 0 1 14 .5z" fill="${Z.low}"/><path d="M${RAIL} 0V${H}" stroke="${Z.rule}"/>`];
    rail.push(icon('github-icon', 18, 16, 16, 16, Z.fg), sans(42, 29, cfg.handle, Z.fg, 13, ' font-weight="600"'));
    rail.push(sans(18, 74, 'Threads', Z.faint, 11, ' font-weight="600"'));
    rail.push(`<rect x="8" y="82" width="${RAIL - 16}" height="32" rx="8" fill="${Z.high}"/>${icon(agentIcon, 16, 92, 18, 12)}`);
    rail.push(span(T.ui, T.sent, sans(42, 102.5, 'New thread', Z.muted, 12.5)), `<g${show(T.sent)}>${sans(42, 102.5, q, Z.fg, 12.5)}</g>`);
    rail.push(sans(18, 142, 'Projects', Z.faint, 11, ' font-weight="600"'));
    cfg.threads.forEach(([name, agent, state], i) => {
      const y = 150 + i * 32, [ic] = AGENTS[agent];
      const right = state === 'run' ? orb(RAIL - 22, y + 16, 3.6) : sans(RAIL - 16, y + 20.5, state, Z.faint, 11, ' text-anchor="end"');
      rail.push(`<g${show(T.ui + 0.05 + i * 0.05)}>${icon(ic, 16, y + 9, 18, 14)}${sans(42, y + 20.5, name, Z.fg, 12.5)}${right}</g>`);
    });

    const pillW = textWidth(agentName, 11.5) + 44;
    const bar = `<path d="M${RAIL} ${BAR}H${W}" stroke="${Z.rule}"/>${span(T.ui, T.sent, sans(MX, 29, 'New thread', Z.muted, 13.5, ' font-weight="600"'))}<g${show(T.sent)}>${sans(MX, 29, q, Z.fg, 13.5, ' font-weight="600"')}</g>
<rect x="${fx(MR - pillW)}" y="11" width="${fx(pillW)}" height="26" rx="8" fill="${Z.surf}" stroke="${Z.rule}"/>${icon(agentIcon, MR - pillW + 10, 18, 20, 12)}${sans(MR - pillW + 36, 28, agentName, Z.muted, 11.5)}`;

    const qw = textWidth(q, 13.5) + 32;
    const bubble = `<g${show(T.sent + 0.05)}><rect x="${fx(MR - qw)}" y="68" width="${fx(qw)}" height="34" rx="12" fill="${Z.high}"/>${sans(MR - qw + 16, 89.5, q, Z.fg, 13.5)}</g>`;

    const thinking = span(T.think, T.tools, `${orb(MX + 6, 124, 5)}${sans(MX + 20, 128.5, 'Thinking', 'url(#shim)', 12.5)}`)
      + span(T.tools, T.collapse, `${icon('ui-chevron-right', MX, 117, 13, 13, Z.faint)}${sans(MX + 18, 128.5, 'Thought for 1s', Z.faint, 12.5)}`)
      + `<g${show(T.collapse + 0.1)}>${icon('ui-chevron-right', MX, 117, 13, 13, Z.faint)}${sans(MX + 18, 128.5, `Worked for ${worked}s`, Z.faint, 12.5)}</g>`;

    const tools = cfg.tools.map(([verb, glyph, arg], i) => {
      const y = 142 + i * 34, w = 400, at = T.tools + i * 0.3, done = at + 0.55;
      const lx = MX + 32, ax = lx + textWidth(verb, 12, 600) + 10;
      const running = span(at, done, `${orb(MX + w - 70, y + 14, 3.4)}${sans(MX + w - 12, y + 18, 'Running', Z.faint, 11, ' text-anchor="end"')}`);
      return `<g${hide(T.collapse)}><g${show(at)}><rect x="${MX}" y="${y}" width="${w}" height="28" rx="8" fill="${Z.low}" stroke="${Z.rule}"/>${icon(glyph, MX + 11, y + 7.5, 13, 13, Z.muted)}${sans(lx, y + 18, verb, Z.fg, 12, ' font-weight="600"')}${mono(ax, y + 18, arg, Z.muted, 11.5)}</g>${running}</g>`;
    }).join('');

    const ay = 170;
    const words = cfg.about.join(' ').split(' ');
    const streamEnd = T.answer + 0.2 + words.length * 0.05;
    let cx = MX;
    const chips = cfg.chips.map((c, i) => {
      const w = textWidth(c, 11.5) + 18, x = cx;
      cx += w + 4;
      return `<g${show(streamEnd + 0.1 + i * 0.05)}><rect x="${fx(x)}" y="${ay + 38}" width="${fx(w)}" height="22" rx="8" fill="${Z.chip}"/>${sans(x + w / 2, ay + 53, c, Z.fg, 11.5, ' text-anchor="middle"')}</g>`;
    }).join('');
    const answer = `<g${show(T.answer)}><text x="${MX}" y="${ay}" font-size="17" font-weight="600" fill="#fff">${esc(cfg.name)}<tspan dx="10" font-size="13" font-weight="400" fill="${Z.muted}">${esc(cfg.role)}</tspan></text></g>
<text x="${MX}" y="${ay + 23}" font-size="13.5" fill="${Z.muted}">${words.map((w, i) => `<tspan class="ty" style="animation-delay:${fx(T.answer + 0.2 + i * 0.05)}s">${esc(w)} </tspan>`).join('')}</text>${chips}`;

    const CY = H - 58, tx = MX + 40;
    let typed = '', carX = [0], acc = 0;
    [...q].forEach((ch, i) => {
      typed += `<tspan class="ty" style="animation-delay:${fx(T.type + i * T.per)}s">${esc(ch)}</tspan>`;
      acc += textWidth(ch, 13.5);
      carX.push(fx(acc));
    });
    const kf = carX.map((x, i) => `${fx((i / q.length) * 100)}%{transform:translateX(${x}px)}`).join('');
    const placeholder = 'Ask anything, @ to add files, / for commands';
    const composer = `<g${show(T.ui + 0.1)}><rect x="${MX - 8}" y="${CY}" width="${MR - MX + 16}" height="44" rx="12" fill="${Z.surf}" stroke="${Z.rule}"/>
${icon('ui-plus', MX + 4, CY + 14, 16, 16, Z.muted)}
<rect x="${fx(MR - 104)}" y="${CY + 10}" width="58" height="24" rx="8" fill="${Z.high}"/>${sans(MR - 75, CY + 26, 'Opus 5.5', Z.muted, 11, ' text-anchor="middle"')}
<g class="press" style="animation-delay:${fx(T.sent - 0.12)}s;transform-origin:${MR - 22}px ${CY + 22}px"><rect x="${MR - 37}" y="${CY + 7}" width="30" height="30" rx="8" fill="${A}"/>${icon('ui-arrow-up', MR - 30, CY + 14, 16, 16, '#2A1A00')}</g></g>
${span(T.ui + 0.1, T.type, sans(tx, CY + 27, placeholder, Z.faint, 13.5))}
<g${hide(T.sent)}><text x="${tx}" y="${CY + 27}" font-size="13.5" fill="${Z.fg}">${typed}</text></g>
${span(T.ui + 0.1, T.sent, `<rect x="${tx - 1}" y="${CY + 14}" width="1.6" height="17" fill="${A}" class="car"/>`)}
<g${show(T.sent)}>${sans(tx, CY + 27, placeholder, Z.faint, 13.5)}<rect x="${tx - 1}" y="${CY + 14}" width="1.6" height="17" fill="${A}" class="blink"/></g>`;

    const css = `${fontCss}
text{font-family:${SANS};font-weight:400;white-space:pre}
.in{opacity:0;animation:in .35s cubic-bezier(.2,.8,.2,1) both}
@keyframes in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
.gone{animation:gone .18s ease-in both}@keyframes gone{from{opacity:1}to{opacity:0}}
.ty{fill-opacity:0;animation:ty .01s linear both}@keyframes ty{to{fill-opacity:1}}
.car{animation:car ${fx(q.length * T.per)}s step-end ${T.type}s both}@keyframes car{${kf}}
.press{animation:press .24s ease-out both}@keyframes press{50%{transform:scale(.86)}}
.spin{animation:spin 1.1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
.breathe{animation:breathe 1.6s ease-in-out infinite}@keyframes breathe{50%{transform:scale(.7);opacity:.55}}
.blink{animation:blink 1.05s steps(1) infinite}@keyframes blink{50%{opacity:0}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}.gone{display:none}.ty{fill-opacity:1}}`;

    const label = `${cfg.name}, ${cfg.role}. ${cfg.about.join(' ')} Stack: ${cfg.stack}.`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}">
<title>${esc(cfg.name)}</title>
<defs><radialGradient id="core" cx=".38" cy=".35" r=".75"><stop offset="0" stop-color="#FFE7AE"/><stop offset=".55" stop-color="${A}"/><stop offset="1" stop-color="#B9771A"/></radialGradient>
<radialGradient id="halo"><stop offset="0" stop-color="${A}" stop-opacity=".45"/><stop offset="1" stop-color="${A}" stop-opacity="0"/></radialGradient>
<linearGradient id="shim" gradientUnits="userSpaceOnUse" x1="${MX - 40}" x2="${MX + 40}" y1="0" y2="0"><stop offset="0" stop-color="${Z.faint}"/><stop offset=".5" stop-color="${Z.fg}"/><stop offset="1" stop-color="${Z.faint}"/><animateTransform attributeName="gradientTransform" type="translate" from="0 0" to="110 0" dur="1.1s" repeatCount="indefinite"/></linearGradient></defs>
<style>${css.replace(/\n/g, '')}</style>
${frame}${rail.join('')}${bar}${bubble}${thinking}${tools}${answer}${composer}
</svg>`;
  }

  function linkChip([label, , glyph], { fontCss = '' } = {}) {
    const w = Math.ceil(textWidth(label, 13, 500) + (glyph === 'avatar' ? 54 : 52)), h = 40;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">
<title>${esc(label)}</title><style>${fontCss}text{font-family:${SANS};font-weight:500}</style>
<rect x="4.5" y="4.5" width="${w - 9}" height="${h - 9}" rx="8" fill="${Z.surf}" stroke="${Z.rule}"/>${glyph === 'avatar' ? icon(glyph, 12, 10, 20, 20) : icon(glyph, 15, 13, 14, 14, glyph.startsWith('ui-') ? Z.muted : '')}${t(glyph === 'avatar' ? 39 : 37, 24.5, label, Z.fg, 13)}
</svg>`;
  }

  const chipFile = (link) => `link-${link[2].replace(/^ui-|-icon$/g, '')}.svg`;

  function readme(cfg = CONFIG, path = (f) => `assets/profile/${f}`) {
    const chips = cfg.links.map((l) => `<a href="${l[1]}"><img src="${path(chipFile(l))}" height="40" alt="${esc(l[0])}"></a>`).join('');
    const tiles = cfg.tiles.map((it) => `<a href="${it.href}"><img src="${path(`tile-${it.id}.svg`)}" width="${it.size === 'big' ? '50%' : '25%'}" alt="${esc(`${it.name}: ${it.desc}.`)}"></a>`).join('');
    const working = cfg.working.map(([name, href, what]) => `- [${name}](${href}): ${what}`).join('\n');
    return `<a href="${cfg.home}"><img src="${path('hero.svg')}" width="100%" alt="${esc(`${cfg.name}, ${cfg.role}. ${cfg.about.join(' ')} Stack: ${cfg.stack}.`)}"></a>

<p align="center">${chips}</p>

<p align="center">${tiles}</p>

### Currently working on

${working}
`;
  }

  const api = { CONFIG, SIZES, hero, workbench, tile, linkChip, chipFile, readme, prismFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Profile = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
