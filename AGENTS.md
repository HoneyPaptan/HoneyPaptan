# HoneyPaptan profile

GitHub profile README for HoneyPaptan. `README.md` and everything in `assets/profile/` are generated; never edit them by hand.

## Layout

- `studio/profile.js`: all content (`CONFIG`) and the SVG generators (workbench hero, project tiles, link chips, README markup). Runs in Node and in the browser.
- `studio/canvas.html`: open it in a browser to preview every hero, tile and README variant on a pan and zoom canvas.
- `studio/icons/`: source logos and glyphs (CC0 logos, Lucide glyphs, the GitHub avatar), bundled into `studio/icons.js`.
- `studio/fonts/`: Geist and Geist Mono Latin subsets (SIL OFL 1.1, `OFL.txt`); their advance widths live in `studio/metrics.js`.

## Build

Needs Node and Python fontTools with brotli (`pyftsubset`).

```
node studio/make-icons.cjs      # after changing studio/icons/
python3 studio/make-metrics.py  # after changing studio/fonts/
node studio/build.cjs           # writes assets/profile/*.svg and README.md
```

## Rules

- GitHub renders these SVGs as images: no external fonts or images inside them (everything is embedded), and nothing inside an SVG is clickable. Links live on the `<a>` around each image in `README.md`.
- Text widths come from `studio/metrics.js`; only use characters the Geist subsets contain.
- Animations must respect `prefers-reduced-motion` and settle on a readable final frame.
- No code comments.
