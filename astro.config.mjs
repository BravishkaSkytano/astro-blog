import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import markdown from "./astro/markdown/config.mjs";

import websiteConfig from './website.config.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://aitorllj93.github.io',
  base: websiteConfig.base,
  i18n: {
    defaultLocale: websiteConfig.defaultLanguage,
    locales: [websiteConfig.defaultLanguage],
  },
  markdown,
  integrations: [],
  vite: {
    plugins: [tailwindcss()],
  },
});