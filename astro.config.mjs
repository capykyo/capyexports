/* eslint-env node */
/* eslint-disable no-undef */
// @ts-check
/// <reference types="node" />
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Set base path for GitHub Pages deployment
// Use /capyexports/ in CI (GitHub Actions), root path for local development
const base = typeof process !== 'undefined' && process.env?.CI ? '/capyexports/' : '/';

// https://astro.build/config
export default defineConfig({
  base,
  output: 'static',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en', 'ja'],
    routing: {
      prefixDefaultLocale: true, // 所有语言都使用前缀，包括默认语言
    },
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
