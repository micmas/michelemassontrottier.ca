// "Dernière mise à jour" : date du dernier commit qui a modifié le fichier source de la page
// (au besoin, le champ `updated:` du front matter a priorité). Calculé au moment du build.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

export function lastUpdated(file?: string, override?: Date): Date | undefined {
  if (override) return override;
  if (!file) return undefined;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    if (out) return new Date(out);
  } catch { /* git indisponible */ }
  try { return fs.statSync(file).mtime; } catch { return undefined; }
}

export function formatDate(d: Date, lang: 'fr' | 'en') {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-CA' : 'fr-CA', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Toronto' }).format(d);
}
export function isoDate(d: Date) {
  return new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'America/Toronto' }).format(d);
}
