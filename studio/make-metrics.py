import json
from pathlib import Path

from fontTools.ttLib import TTFont

HERE = Path(__file__).parent
out = {}
for f in sorted((HERE / "fonts").glob("*.woff2")):
    font = TTFont(f)
    upem = font["head"].unitsPerEm
    hmtx = font["hmtx"]
    out[f.stem] = {chr(c): round(hmtx[g][0] / upem, 4) for c, g in font.getBestCmap().items()}

js = (
    "(function (root) {\n"
    f"  const METRICS = {json.dumps(out, ensure_ascii=False, separators=(',', ':'))};\n"
    "  if (typeof module !== 'undefined' && module.exports) module.exports = METRICS;\n"
    "  else root.ProfileMetrics = METRICS;\n"
    "})(typeof globalThis !== 'undefined' ? globalThis : this);\n"
)
(HERE / "metrics.js").write_text(js)
print(", ".join(f"{k}: {len(v)} glyphs" for k, v in out.items()))
