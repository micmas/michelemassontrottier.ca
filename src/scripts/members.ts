// Client-side unlock for members-only pages.
// The page HTML and its files are AES-256-GCM encrypted with a key derived from the
// section password (PBKDF2-SHA256). Nothing readable is published without the password.
import { enhance } from './enhance';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const withBase = (u: string) => (u.startsWith('/') && !u.startsWith('//') && BASE && !u.startsWith(BASE + '/') ? BASE + u : u);

type Payload = { section: string; kdf: { iterations: number; salt: string }; iv: string; data: string };

const b64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const storeKey = (section: string) => `mmt-members:${section}`;

async function deriveKey(password: string, p: Payload) {
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt: b64(p.kdf.salt), iterations: p.kdf.iterations },
    base, { name: 'AES-GCM', length: 256 }, true, ['decrypt'],
  );
}

async function decryptPage(key: CryptoKey, p: Payload): Promise<string> {
  const buf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(p.iv) }, key, b64(p.data));
  return JSON.parse(new TextDecoder().decode(buf)).html;
}

async function decryptFile(key: CryptoKey, url: string): Promise<ArrayBuffer> {
  const res = await fetch(withBase(url));
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const all = new Uint8Array(await res.arrayBuffer());
  return crypto.subtle.decrypt({ name: 'AES-GCM', iv: all.slice(0, 12) }, key, all.slice(12));
}

function getStored(section: string): string | null {
  try { return localStorage.getItem(storeKey(section)) ?? sessionStorage.getItem(storeKey(section)); } catch { return null; }
}
function setStored(section: string, raw: string, persist: boolean) {
  try { (persist ? localStorage : sessionStorage).setItem(storeKey(section), raw); } catch { /* private mode */ }
}
function clearStored(section: string) {
  try { localStorage.removeItem(storeKey(section)); sessionStorage.removeItem(storeKey(section)); } catch { /* ignore */ }
}

async function exportKey(key: CryptoKey) {
  const raw = new Uint8Array(await crypto.subtle.exportKey('raw', key));
  return btoa(String.fromCharCode(...raw));
}
async function importKey(raw: string) {
  return crypto.subtle.importKey('raw', b64(raw), { name: 'AES-GCM' }, false, ['decrypt']);
}

function show(root: HTMLElement, html: string, key: CryptoKey, p: Payload) {
  root.innerHTML = `<div class="members-bar"><span>Accès membres</span><button type="button" id="members-lock">Verrouiller</button></div><div class="prose">${html}</div>`;
  root.querySelector('#members-lock')!.addEventListener('click', () => { clearStored(p.section); location.reload(); });
  root.querySelectorAll<HTMLElement>('[href^="/"], [src^="/"]').forEach((el) => {
    for (const at of ['href', 'src']) { const v = el.getAttribute(at); if (v) el.setAttribute(at, withBase(v)); }
  });
  enhance(root);
  // images
  root.querySelectorAll<HTMLImageElement>('img[data-enc-src]').forEach(async (img) => {
    try {
      const buf = await decryptFile(key, img.dataset.encSrc!);
      img.src = URL.createObjectURL(new Blob([buf], { type: img.dataset.type || 'image/jpeg' }));
    } catch { img.alt = 'Image non disponible'; }
  });
  // file links
  root.querySelectorAll<HTMLAnchorElement>('a[data-enc]').forEach((a) => {
    a.addEventListener('click', async (ev) => {
      ev.preventDefault();
      const isPdf = (a.dataset.type || '').includes('pdf');
      const win = isPdf ? window.open('', '_blank') : null;
      a.classList.add('loading');
      try {
        const buf = await decryptFile(key, a.dataset.enc!);
        const url = URL.createObjectURL(new Blob([buf], { type: a.dataset.type || 'application/octet-stream' }));
        if (win) { win.location.href = url; }
        else {
          const dl = document.createElement('a');
          dl.href = url; dl.download = a.dataset.name || 'fichier';
          document.body.append(dl); dl.click(); dl.remove();
        }
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
      } catch (e) {
        win?.close();
        alert('Le fichier n’a pas pu être ouvert. Réessayez ou contactez-moi.');
      } finally { a.classList.remove('loading'); }
    });
  });
}

export async function initMembers() {
  const root = document.getElementById('members-root')!;
  const p: Payload = JSON.parse(document.getElementById('members-payload')!.textContent!);
  const form = document.getElementById('unlock-form') as HTMLFormElement;
  const err = document.getElementById('unlock-error')!;

  const stored = getStored(p.section);
  if (stored) {
    try {
      const key = await importKey(stored);
      show(root, await decryptPage(key, p), key, p);
      return;
    } catch { clearStored(p.section); }
  }

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    err.textContent = 'Vérification…';
    const pw = (document.getElementById('pw') as HTMLInputElement).value;
    const remember = (document.getElementById('remember') as HTMLInputElement).checked;
    try {
      const key = await deriveKey(pw, p);
      const html = await decryptPage(key, p);
      setStored(p.section, await exportKey(key), remember);
      show(root, html, key, p);
    } catch {
      err.textContent = 'Mot de passe incorrect.';
    }
  });
}
