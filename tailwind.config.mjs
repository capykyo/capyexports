/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ink: '#0e0e0f',
        'ink-2': '#141416',
        'ink-3': '#1c1c1f',
        'ink-4': '#252529',
        'ink-5': '#2f2f35',
        cream: '#e8e0d0',
        'cream-2': '#c8bfae',
        'cream-3': '#a09588',
        ember: '#c8622a',
        'ember-2': '#e07840',
        jade: '#4a7c59',
        'jade-2': '#5f9970',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Sora"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.2em',
        widest3: '0.3em',
      },
      borderWidth: {
        px: '1px',
      },
    },
  },
  plugins: [typography],
};
