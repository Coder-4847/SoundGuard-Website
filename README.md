# SoundGuard website

A scroll-driven marketing site for SoundGuard, the classroom noise monitor built by students at GEMS Modern Academy.
Vite + vanilla JS, GSAP + ScrollTrigger, Lenis smooth scrolling. No framework, no CDN, no external font requests.

## Edit the content

Everything you will want to change is in **`src/content.js`**:

| What | Key |
| --- | --- |
| Price (number) and currency | `price`, `currency` |
| "Get SoundGuard" link (button in nav, hero, price, footer) | `contactHref` |
| Headlines, descriptions, FAQ, feature cards | `hero`, `problem`, `how`, `features`, `faq`, ... |
| Team names and roles | `team.members` |
| Page title / description (shared previews) | `site` |

The page is rendered from this file at build time, so all text is real HTML (readable without JavaScript).
Set `contactHref` to something real, for example `mailto:you@school.example?subject=SoundGuard` or a form link.

## Add images (optional)

Drop `concept.jpg` and/or `prototype.jpg` into **`public/assets/`**. They appear automatically in the
"Built by students" section inside a rounded frame. If the files are not there, nothing is shown (no placeholders).
To use different file names or alt text, edit `team.images` in `src/content.js`.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs to dist/
npm run preview   # serves the production build
```

Asset paths are relative (`base: './'`), so the build works from any sub-path such as `https://<user>.github.io/<repo>/`.

## Deploy to GitHub Pages

1. Push this repository to GitHub (default branch `main`).
2. **One time only:** go to **Settings > Pages > Build and deployment > Source** and choose **GitHub Actions**.
3. Every push to `main` (or a manual run of the "Deploy to GitHub Pages" workflow) builds and publishes the site.

## Structure

```
index.html            page shell (head, meta, favicon)
vite.config.js        renders the body from src/content.js
src/content.js        all editable copy, price, contact link, team
src/render.js         section markup
src/svg.js            device, laptop, remote, gauge and icon illustrations
src/style.css         one stylesheet, design tokens first
src/main.js           entry: smooth scroll, nav, scenes
src/scenes/*.js       hero, problem, how it works, control, price, faq, reveals
src/demo.js           the interactive simulation
```
