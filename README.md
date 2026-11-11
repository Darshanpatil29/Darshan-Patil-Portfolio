# Darshan Patil — Portfolio

A static portfolio site: HTML, CSS and JavaScript, with a Three.js 3D stepwell in the hero.
## What's in the folder

| Path | What it is |
|---|---|
| `index.html` | The page. The Three.js stepwell script is inline at the bottom. |
| `css/site.css` | All styles. Colours are at the top under `:root`. |
| `js/site.js` | Menu, rotating title, scroll reveals, logo fallbacks, contact mandala. |
| `assets/` | Your photo and link-preview image (see `assets/README.md`). |
| `favicon.svg` | Browser tab icon. |
| `404.html` | Shown by GitHub Pages for missing pages. |
| `.nojekyll` | Tells GitHub Pages to serve files as they are. |

Three.js, the fonts and the skill logos load from public CDNs (jsDelivr and Google Fonts), so nothing needs installing.

## Preview locally

Opening `index.html` straight from disk mostly works, but some browsers block parts of it. A local server is more reliable:

```bash
python -m http.server 5510
```

Then open http://localhost:5510.
