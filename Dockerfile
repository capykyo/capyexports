# Stage 1: Build Astro static site (base path /capyexports/ for demo stack)
FROM crpi-5nqoro6hoopis4cp.cn-beijing.personal.cr.aliyuncs.com/capyexports/base-node:latest AS builder
WORKDIR /app

USER root
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate && pnpm install
COPY . .
ENV CI=1
RUN pnpm run build
# Serve zh as default at root (no redirect)
RUN cp /app/dist/zh/index.html /app/dist/index.html

# Stage 2: Serve dist with base-node (listen 0.0.0.0:3000 for Nginx upstream)
FROM crpi-5nqoro6hoopis4cp.cn-beijing.personal.cr.aliyuncs.com/capyexports/base-node:latest AS runner
WORKDIR /app

USER root
RUN echo '{"name":"capyexports-serve","version":"0.0.0","private":true,"dependencies":{"serve":"^14.2.4"}}' > package.json
RUN npm install --omit=dev && chown -R node:node /app
COPY --from=builder /app/dist ./dist
RUN chown -R node:node /app

USER node
EXPOSE 3000
CMD ["npx", "serve", "dist", "-l", "0.0.0.0:3000"]
