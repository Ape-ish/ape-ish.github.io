# Curtis Whipple — Portfolio / Resume

A static **Next.js (App Router) + Tailwind CSS** site, built for free hosting on **GitHub Pages**.

- Card-based layout with soft elevation and a faint network-grid watermark
- IBM Plex Sans + IBM Plex Mono typography, deep-teal accent
- Fully responsive; exported as static HTML (no server required)

---

## 1. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 2. Build the static site

```bash
npm run build
```

The exported site is written to the **`out/`** folder (configured via `output: "export"` in `next.config.mjs`).

---

## 3. Deploy to GitHub Pages

### Set the base path first (important)

Open **`next.config.mjs`** and set `repo`:

- **Project page** — site lives at `https://<user>.github.io/<repo>/`
  → set `const repo = "/<repo>";` (e.g. `"/portfolio"`)
- **User/org page** (`https://<user>.github.io/`) **or a custom domain** (e.g. `cwhipple.me`)
  → leave `const repo = "";`

### Option A — Automatic (recommended)

1. Create a new GitHub repo and push this folder to the `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes on every push to `main`.

### Option B — Manual

```bash
npm run build
# then publish the ./out folder to the gh-pages branch, e.g.:
npx gh-pages -d out --dotfiles
```

> `public/.nojekyll` is included so GitHub Pages serves the `_next/` assets correctly.

### Custom domain (cwhipple.me)

1. Keep `repo = ""` in `next.config.mjs`.
2. Add a file `public/CNAME` containing a single line: `cwhipple.me`.
3. Point your DNS to GitHub Pages and set the custom domain under **Settings → Pages**.

---

## Editing content

All copy lives in the section components under **`components/`**:

| Section | File |
|---|---|
| Header / contact | `components/Masthead.jsx` |
| Profile | `app/page.jsx` |
| Technical Skills | `components/Skills.jsx` |
| Experience | `components/Experience.jsx` |
| Education | `components/Education.jsx` |
| Certifications | `components/Certifications.jsx` |
| Projects | `components/Projects.jsx` |

Styling/design tokens are in `app/globals.css` and `tailwind.config.js`.

Contact links (LinkedIn, GitHub) and the Projects repositories are wired to live
URLs. Update them in `components/Masthead.jsx` and `components/Projects.jsx` as
your profile evolves.
