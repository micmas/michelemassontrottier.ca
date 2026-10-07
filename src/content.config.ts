import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const schema = z.object({
  title: z.string(),
  description: z.string().optional(),
  order: z.number().optional(),
  wide: z.boolean().optional(),
});

// French pages (default language, URLs at the root: /a-propos/)
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema,
});

// English pages (URLs under /en/: /en/about/). `fr` = slug of the matching French page.
const pagesEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages-en' }),
  schema: schema.extend({ fr: z.string() }),
});

export const collections = { pages, pagesEn };
