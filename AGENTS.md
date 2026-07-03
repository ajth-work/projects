# Repository Guidelines

## Project Structure & Module Organization

This repository is a project portfolio. The active app is the BinoCart static web prototype in `Personal Projects/Barcode Scanner/`.

- `index.html` is the scan/home page.
- `list.html`, `history.html`, `saved.html`, `receipts.html`, and `profile.html` are separate app views.
- `app.js` contains scanner, lookup, profile, saved-product, list, and receipt prototype logic.
- `pages.js` contains shared page behaviors for non-scan pages.
- `styles.css` contains the app-wide responsive styling.
- `assets/brand/` contains BinoCart logos, icons, mascot images, brand-system references, raw screenshots, and a `manifest.csv` asset index.

There is no build system or package manager metadata at this stage; the app is served directly as static files.

## Build, Test, and Development Commands

Run the app locally from the BinoCart folder:

```powershell
cd "Personal Projects/Barcode Scanner"
python -m http.server 4173
```

Open `http://127.0.0.1:4173/`. Use GitHub Pages for mobile camera testing because browser camera permissions generally require HTTPS.

Run automated checks from the same folder:

```powershell
npm test
```

Useful repository checks:

```powershell
git status --short
rg "BinoCart"
```

## Coding Style & Naming Conventions

Use plain HTML, CSS, and JavaScript. Keep indentation consistent with nearby files, typically two spaces in HTML/CSS/JS blocks. Prefer descriptive camelCase names for JavaScript variables and functions, and kebab-case for CSS classes and asset filenames, such as `bino-thinking.png` or `logo-primary-horizontal.png`.

Keep UI copy concise and customer-facing. BinoCart recommendations should feel transparent, objective, and confidence-building.

## Testing Guidelines

Automated tests use Node's built-in `node:test` runner under `tests/`. Add tests for static page wiring, brand asset contracts, and localStorage workflows when changing shared behavior. For scanner-related changes, still manually verify the camera path where supported. For profile, list, saved, archive, and receipt changes, test browser localStorage persistence by refreshing the page.

## Commit & Pull Request Guidelines

Recent commits use short imperative summaries, for example `Add receipt memory prototype` and `Organize BinoCart brand assets`. Follow that style: concise, present-tense, and scoped to the change.

Pull requests should include a short description, affected pages, manual test notes, and screenshots for visual/UI changes. If brand assets change, mention whether files are raw references, generated PNG placeholders, or production-ready exports.

## Agent-Specific Instructions

Do not commit `.codex-remote-attachments/`. Preserve raw brand screenshots under `assets/brand/reference/raw/`; place usable app assets in the appropriate `assets/brand/` subfolder and update `manifest.csv` when adding generated assets.
