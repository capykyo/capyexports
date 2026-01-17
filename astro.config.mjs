// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
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
