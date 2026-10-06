import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Public pages in both languages (members-only pages and the thank-you pages are left out)
export const GET: APIRoute = async ({ site }) => {
  const skip = new Set(['merci', 'thanks']);
  const fr = (await getCollection('pages')).filter((p) => !skip.has(p.id)).map((p) => (p.id === 'index' ? '/' : `/${p.id}/`));
  const en = (await getCollection('pagesEn')).filter((p) => !skip.has(p.id)).map((p) => (p.id === 'index' ? '/en/' : `/en/${p.id}/`));
  const urls = [...fr, ...en].map((u) => `  <url><loc>${new URL(u, site)}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
