# Capyexports — Project Guide for Claude

## Project Overview

Capyexports is a minimalist multilingual portfolio/resume static site. It features a 3D interactive capybara hero, content collections for works and resume, and supports three locales: Chinese (default), English, and Japanese.

## Tech Stack

- **Framework:** Astro 5.x (static site generator, file-based routing)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3.x + `@tailwindcss/typography`
- **3D:** Three.js + `@splinetool/runtime`, Draco-compressed GLB models
- **Content:** Astro Content Collections (markdown)
- **Package Manager:** pnpm
- **Icons:** Material Symbols Outlined (Google Fonts)
- **Font:** Inter (Google Fonts)

## Commands

```bash
pnpm dev          # Dev server at http://localhost:4321
pnpm build        # Production build → ./dist
pnpm preview      # Preview production build
pnpm lint         # ESLint + Stylelint check
pnpm lint:fix     # Auto-fix linting issues
```

## Project Structure

```
src/
├── components/       # Astro components (Header, Footer, WorkCard, Model3D, LanguageSwitcher)
├── content/
│   ├── config.ts     # Collection schemas
│   ├── works/{zh,en,ja}/*.md   # Portfolio entries per locale
│   └── resume/{zh,en,ja}/resume.md
├── i18n/
│   ├── translations.ts   # All UI strings for zh/en/ja
│   └── utils.ts          # getLocaleFromPath, getLocalizedPath, etc.
├── pages/
│   ├── index.astro        # Root redirect to default locale (zh)
│   └── [locale]/
│       ├── index.astro    # Works gallery
│       ├── resume.astro   # Resume page
│       └── works/[slug].astro
├── styles/global.css      # Global styles + View Transitions
└── utils/
    ├── index.ts            # getUrl() - BASE_URL-aware URL helper
    ├── dracoLoader.ts      # Draco decoder init
    └── loadDracoModel.ts   # GLB loader with Draco support
public/
├── draco/            # Draco WASM decoders
└── models/           # Draco-compressed GLB files
```

## i18n

- **Supported locales:** `zh` (default), `en`, `ja`
- **Routing:** Prefix-based — all locales use path prefixes (`/zh/`, `/en/`, `/ja/`)
- **UI strings:** `src/i18n/translations.ts` — type-safe `TranslationKey` union
- **Content:** separate `.md` files under `works/{locale}/` and `resume/{locale}/`
- **URL paths:** always use `getUrl()` from `src/utils/index.ts` to respect `BASE_URL`

## Content Collections

### Works (`src/content/works/{locale}/*.md`)

Frontmatter fields:
- `title`, `description` (required)
- `image`, `tags`, `date`, `link`, `lang`
- `website`, `platform`, `stack`, `blogpost` (optional)

### Resume (`src/content/resume/{locale}/resume.md`)

Frontmatter fields:
- `title`, `name` (required)
- `email`, `phone`, `location`, `website`
- `github`, `linkedin`, `xiaohongshu`
- `lang`

## Deployment

### GitHub Pages (primary)

- Workflow: `.github/workflows/deploy.yml`
- Triggers on push to `main`/`master`
- Builds with `CI=1` (sets `base: '/capyexports/'`)
- Post-build: copies `dist/zh/index.html` → `dist/index.html` for default locale

### Docker + Aliyun ACR (secondary)

- Workflow: `.github/workflows/docker-acr.yml`
- Multi-stage build; serves via `serve` on port 3000
- Requires repo secrets: `ACR_USERNAME`, `ACR_PASSWORD`, `ACR_NAMESPACE`

## Key Conventions

### URL Construction

Always use `getUrl(path)` from `src/utils/index.ts` for internal links — it prepends `import.meta.env.BASE_URL` automatically (required for GitHub Pages subdirectory hosting).

### Dark Theme Colors

Custom Tailwind colors defined in `tailwind.config.mjs`:
- `background-dark: #202023`
- `card-dark: #1e1e1e`
- `border-dark: #2d2d2d`

### 3D Model

- Component: `src/components/Model3D.astro`
- Models in `public/models/*.glb` (Draco-compressed)
- Decoders in `public/draco/`
- Handles View Transitions: reinitializes on page navigation

### Adding New Content

1. Add `.md` file to `src/content/works/{locale}/`
2. Ensure `lang` field matches the locale directory
3. Add translations if new UI keys are needed in `src/i18n/translations.ts`
4. If adding a new locale, update `astro.config.mjs` and all three content directories

## Linting

- ESLint: flat config (`eslint.config.mjs`) with Astro + TypeScript rules
- Stylelint: standard + tailwindcss (`.stylelintrc.json`)
- TypeScript: strict mode, target ES2020, bundler module resolution
- Run `pnpm lint` before committing; `pnpm lint:fix` for auto-fixable issues
