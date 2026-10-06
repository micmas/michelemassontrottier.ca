import { getCollection } from 'astro:content';
import { getMembersPages } from './members';

// Builds the FR <-> EN page map from the `fr:` field of each English page.
export async function getAlternates() {
  const en = await getCollection('pagesEn');
  const frToEn: Record<string, string> = {};
  const enToFr: Record<string, string> = {};
  for (const p of en) {
    const enPath = p.id === 'index' ? '/en/' : `/en/${p.id}/`;
    const frPath = p.data.fr === 'index' ? '/' : `/${p.data.fr}/`;
    frToEn[frPath] = enPath;
    enToFr[enPath] = frPath;
  }
  // Members-only pages exist in French only: the English toggle leads to the course-materials page.
  for (const m of getMembersPages()) frToEn[`/${m.slug}/`] = '/en/continuing-education-resources/';
  return { frToEn, enToFr };
}
