// @ts-check
import { defineConfig } from 'astro/config';

// On GitHub Pages without a custom domain the site lives under /<repo-name>/.
// The deploy workflow passes that prefix in PAGES_BASE; with the custom domain it is empty.
const base = process.env.PAGES_BASE || '/';

export default defineConfig({
  site: 'https://michelemassontrottier.ca',
  base,
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
