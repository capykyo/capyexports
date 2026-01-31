# Capyexports

Minimalist portfolio site built with Astro. Supports i18n (zh / en / ja), works showcase, resume, and a 3D Capybara hero. Deployed to GitHub Pages.

## Tech Stack

- **[Astro](https://astro.build)** — Static site, file-based routing
- **Tailwind CSS** — Styling (design tokens in `tailwind.config.mjs`)
- **Content Collections** — Works and resume from `src/content/`
- **i18n** — Locales: `zh` (default), `en`, `ja`; prefix routing (`/zh/`, `/en/`, `/ja/`)
- **Three.js + Draco** — 3D model in hero (GLB with Draco compression)

## Project Structure

```
├── public/                 # Static assets (favicon, Draco libs, GLB models)
├── src/
│   ├── components/         # Header, Footer, WorkCard, Model3D, LanguageSwitcher
│   ├── content/            # Content Collections
│   │   ├── config.ts       # Schema for works & resume
│   │   ├── works/{zh,en,ja}/*.md
│   │   └── resume/{zh,en,ja}/*.md
│   ├── i18n/               # Locales, translations, utils
│   ├── pages/
│   │   ├── index.astro     # Root → redirect to default locale
│   │   └── [locale]/       # index, resume, works/[slug]
│   ├── styles/global.css
│   └── utils/              # getUrl, Draco loader, loadDracoModel
├── astro.config.mjs        # base: /capyexports/ in CI, / locally
└── .github/workflows/deploy.yml  # Build & deploy to GitHub Pages
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Dev server at `http://localhost:4321` |
| `pnpm build` | Production build → `./dist` |
| `pnpm preview` | Preview production build locally |
| `pnpm lint` | ESLint + Stylelint |
| `pnpm lint:fix` | Lint with auto-fix |

## Local Development

- **Root path:** Dev uses `base: '/'`. Site is at `http://localhost:4321/`.
- **GitHub Pages path:** CI sets `base: '/capyexports/'`. Production URL: `https://<user>.github.io/capyexports/`.

## Adding Content

- **Works:** Add Markdown under `src/content/works/<lang>/` (e.g. `works/zh/my-work.md`). Fields: `title`, `description`, `image`, `tags`, `lang`, etc. (see `src/content/config.ts`).
- **Resume:** Edit `src/content/resume/<lang>/resume.md` per locale.

## Design

- Container: `max-w-[800px]`, `px-6`
- Background: `#202023`; cards: `#1e1e1e`; borders: `#2d2d2d`
- Cards: `rounded-2xl`, image `aspect-[16/10]` or `aspect-[4/3]`, hover scale
- Typography: Inter, section titles with `border-b-4 border-white/10`
- Hero: 3D Capybara in `max-w-[500px]` `aspect-[4/3]` container

## Deploy

Push to `main` or `master`; GitHub Actions builds and deploys to GitHub Pages. Build runs `pnpm install` and `pnpm run build`, then uploads `./dist` as the Pages artifact.

## License

Private / Unlicense — use as you like.
