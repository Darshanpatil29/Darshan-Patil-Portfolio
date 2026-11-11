# Darshan Patil — Portfolio

A static portfolio site: HTML, CSS and JavaScript, with a Three.js 3D stepwell in the hero.
No build step and no backend. Upload the folder as it is and it works.

## What's in the folder

| Path | What it is |
|---|---|
| `index.html` | The page. The Three.js stepwell script is inline at the bottom. |
| `css/site.css` | All styles. Colours are at the top under `:root`. |
| `js/site.js` | Menu, rotating title, scroll reveals, logo fallbacks, contact mandala. |
| `assets/` | Your résumé, photo and link-preview image (see `assets/README.md`). |
| `favicon.svg` | Browser tab icon. |
| `404.html` | Shown by GitHub Pages for missing pages. |
| `.nojekyll` | Tells GitHub Pages to serve files as they are. |

Three.js, the fonts and the skill logos load from public CDNs (jsDelivr and Google Fonts), so nothing needs installing.

## Before you publish

1. **Fill in the placeholders.** Search `index.html` for `class="ph"`. Each one has a dashed gold outline on the page.
2. **Add your files** to `assets/`: `Darshan-Patil-Resume.pdf`, `photo.jpg` and optionally `og-image.png` (1200 × 630).
3. **Update the links**: email, LinkedIn, GitHub and Trailhead in the Contact section, and the project "Source code" / "Live demo" links.
4. **Update the link-preview URLs** (`og:url`, `og:image`) near the top of `index.html` to your real site address.
5. **404 page:** if the repo is *not* named `<username>.github.io` and you have no custom domain, change `<base href="/">` in `404.html` to `<base href="/<repo-name>/">`.

## Publish on GitHub Pages

1. Create a repository on GitHub.
   - Named `<username>.github.io` → the site lives at `https://<username>.github.io/`
   - Any other name, e.g. `portfolio` → `https://<username>.github.io/portfolio/`
2. Copy everything in this folder into the repository and push to `main`.
   (`.gitignore` already leaves out the local `.claude/` folder.)
3. On GitHub: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main**, folder **/ (root)** → **Save**
4. The site is live in a minute or two. Every later push updates it.

### Custom domain (optional)

1. Buy a domain, e.g. `darshanpatil.dev`.
2. **Settings → Pages → Custom domain**: enter it and save. GitHub adds a `CNAME` file to the repo.
3. At your domain registrar, add the DNS records GitHub shows you:
   - `A` records for the root domain → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - or a `CNAME` for `www` → `<username>.github.io`
4. When the certificate is ready, tick **Enforce HTTPS**.

## Preview locally

Opening `index.html` straight from disk mostly works, but some browsers block parts of it. A local server is more reliable:

```bash
python -m http.server 5510
```

Then open http://localhost:5510.
