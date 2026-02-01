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

## Docker 部署（演示栈接入）

本仓库可按 [demo-app 约定](.cursor/rules/demo-apps-howto.mdc) 构建为镜像，接入「网关 + 私有网络」演示栈：由 Nginx 统一入口反向代理，本应用不对外暴露端口，仅在内网提供静态站点。

### 构建与运行

```bash
docker build -t capyexports .
docker run --rm -p 3000:3000 capyexports
```

访问 `http://localhost:3000/capyexports/`（本地直连容器时需带 base path，因构建时使用 `base: '/capyexports/'`）。

### 集成方配置（供演示栈使用）

| 项目 | 说明 | 本仓库取值 |
|------|------|------------|
| **建议服务名** | Compose 服务名，即 Nginx 内网解析主机名 | `capyexports` |
| **监听端口** | 容器内应用监听端口 | `3000` |
| **建议路径前缀** | Nginx location 路径 | `/capyexports/` |

集成方将据此在演示栈中：

- 在 `docker-compose.yml` 中增加本仓库的 build 与服务（仅 `expose: 3000`，不 `ports`，接入 `demo-net`，memory 512M，logging max-size 20m）。
- 在 `nginx/conf.d/demos.conf` 增加 `upstream`：`server capyexports:3000`。
- 在 `nginx/conf.d/default.conf` 增加 `location /capyexports/`，`proxy_pass` 到该 upstream，并带标准头（Host、X-Real-IP、X-Forwarded-For、X-Forwarded-Proto）。

部署后通过 `http://<服务器IP>:8811/capyexports/` 访问。

### Dockerfile 约定摘要

- **FROM**：Aliyun ACR 北京个人版 `capyexports/base-node:latest`（见 [use-base-node-image](.cursor/rules/use-base-node-image.mdc)）。
- **多阶段**：Stage 1 使用 pnpm 构建 Astro（`CI=1` 启用 `base: '/capyexports/'`）；Stage 2 基于 base-node，仅拷贝 `dist/` 并用 `serve` 提供静态服务。
- **运行**：最终以 `USER node` 运行，监听 `0.0.0.0:3000`。

## License

Private / Unlicense — use as you like.
