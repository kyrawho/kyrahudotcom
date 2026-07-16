# kyrawho.github.io

Personal website for Kyra Hu. Plain HTML, CSS, and JavaScript, with no framework and no build step. Deployed with GitHub Pages, ready to serve at the custom domain `kyrahu.com`.

---

## File structure

```
kyrawho.github.io/
├── index.html                     # Home (hero, positioning, quick links)
├── experience.html                # Timeline of roles + education + skills
├── projects.html                  # Project cards
├── blog.html                      # v2 stub (coming soon, not linked in nav)
├── assets/
│   ├── css/styles.css             # All styling. Design tokens are at the top in :root.
│   ├── js/
│   │   ├── content.js             # >>> EDIT THIS to change site content <<<
│   │   └── main.js                # Renders content.js onto the pages (rarely edited)
│   ├── resume/Kyra-Hu-Resume.pdf  # The downloadable résumé
│   └── img/favicon.svg            # Site icon
├── projects/
│   └── _project-template.html     # v2 stub for per-project deep-dive pages
├── CNAME                          # Custom domain (kyrahu.com)
├── .nojekyll                      # Tells Pages to serve files as-is
└── README.md                      # This file
```

---

## How to edit content

**Almost everything you will want to change lives in one file: `assets/js/content.js`.**

Open it and edit the text inside the quotes. It holds:

- **`profile`** — your name, one-line positioning, intro paragraph, location, email, LinkedIn, X, and the résumé path.
- **`experience`** — the timeline. Each role is a block with `company`, `title`, `dates`, and a one-line `summary`. On-page shows the one-liner only; the full bullets stay in the PDF so you never keep two copies in sync. To reorder, move whole `{ ... }` blocks. Newest first.
- **`education`** — school and degrees.
- **`skills`** — grouped skill chips.
- **`projects`** — the project cards. Each has `title`, `tagline`, `description`, `link`, and `cta` (the button label). Options: add `wip: true` for a "Work in progress" tag, or `access: true` for a private project (shows a "Request access" button pointing at LinkedIn instead of a live link, and never prints a password).

Save the file and refresh the browser. No build, no commands.

To change **colors or fonts**, edit the `:root` block at the top of `assets/css/styles.css` (the navy is `#163E64`, sampled from the résumé).

To preview locally, just open `index.html` in a browser, or run a tiny static server from this folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## How to swap the résumé PDF

1. Save your new PDF as `assets/resume/Kyra-Hu-Resume.pdf` (same name = nothing else to change).
2. If you use a different filename, update the `resume:` path in `assets/js/content.js` **and** the four `href="assets/resume/..."` links (they carry a `data-resume` attribute, so they are easy to find).
3. Keep it a **résumé-only** PDF (no cover letter) since this is the public download.
4. Commit and push (see deploy below).

---

## How to deploy (GitHub Pages)

This repo is a **GitHub user site**: because it is named `kyrawho.github.io`, GitHub Pages serves it at the root of that domain automatically.

First-time setup:

1. Create a public repo named exactly `kyrawho.github.io` under the `kyrawho` account.
2. From this folder:
   ```bash
   git init
   git add -A
   git commit -m "Personal website v1"
   git branch -M main
   git remote add origin https://github.com/kyrawho/kyrawho.github.io.git
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, Branch **main**, folder **/ (root)**. Save.
4. Wait a minute, then visit `https://kyrawho.github.io`.

Everyday updates after that:

```bash
git add -A
git commit -m "Update content"
git push
```

Pages redeploys automatically within a minute or two.

---

## How to enable the custom domain (kyrahu.com)

The `CNAME` file in this repo already contains `kyrahu.com`, so most of the work is done. When you own the domain and are ready to switch:

1. **At your DNS provider**, add these records for `kyrahu.com`:

   **Apex domain** (kyrahu.com) — four `A` records pointing at GitHub Pages:
   ```
   A   @   185.199.108.153
   A   @   185.199.109.153
   A   @   185.199.110.153
   A   @   185.199.111.153
   ```
   (Optional, recommended) also add `AAAA` records for IPv6:
   ```
   AAAA  @  2606:50c0:8000::153
   AAAA  @  2606:50c0:8001::153
   AAAA  @  2606:50c0:8002::153
   AAAA  @  2606:50c0:8003::153
   ```

   **www subdomain** — a `CNAME` record so `www.kyrahu.com` works too:
   ```
   CNAME   www   kyrawho.github.io.
   ```

2. In the repo: **Settings → Pages → Custom domain**, confirm it shows `kyrahu.com`, and tick **Enforce HTTPS** once the certificate is issued (can take up to 24 hours).

3. DNS can take a little while to propagate. Once it does, `https://kyrahu.com` serves this site.

> All asset paths in the site are **relative**, so nothing breaks when the domain switches.

---

## v2 (scaffolded, not built)

- **Blog** — `blog.html` is a placeholder. To launch it, add a nav link and either store one HTML file per post under a `blog/` folder, or add a `posts` array to `content.js` and render it in `main.js` (mirror how projects work). Instructions are in the comment at the top of `blog.html`.
- **Per-project deep dives** — `projects/_project-template.html` is a starter for a detailed write-up of one project. Copy it to a real name (for example `projects/heardle.html`), fill it in, and point that project's `link` in `content.js` at the new page. Instructions are in the comment at the top of the template.

---

## Notes

- The existing project sites (heardle, jack-road, meghnas-world, prixel) are **separate repos** and are only linked to from here. This repo does not touch them.
- Meghna's World is password protected on purpose. The site never prints the password. It shows a "Request access" button that links to LinkedIn.
