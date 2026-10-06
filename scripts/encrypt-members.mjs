#!/usr/bin/env node
// Encrypts the members-only pages and their files before they are published.
// Run with:  npm run members   (see the private maintenance notes)
import fs from 'node:fs';
import path from 'node:path';
import { webcrypto as crypto, createHash, randomBytes } from 'node:crypto';
import { marked } from 'marked';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SRC = path.join(ROOT, 'members-src');
const OUT_PAGES = path.join(ROOT, 'src/content/members');
const OUT_FILES = path.join(ROOT, 'public/m');
const ITERATIONS = 600_000;

const MIME = { pdf: 'application/pdf', doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  zip: 'application/zip', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif', webp: 'image/webp', mp3: 'audio/mpeg', mp4: 'video/mp4' };
const mime = (n) => MIME[n.split('.').pop().toLowerCase()] ?? 'application/octet-stream';
const b64 = (u8) => Buffer.from(u8).toString('base64');
const unb64 = (s) => new Uint8Array(Buffer.from(s, 'base64'));
const sha = (buf) => createHash('sha256').update(buf).digest('hex');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function parseFrontMatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  const data = {};
  if (m) for (const line of m[1].split('\n')) {
    const i = line.indexOf(':'); if (i < 0) continue;
    let v = line.slice(i + 1).trim();
    try { v = JSON.parse(v); } catch { v = v.replace(/^['"]|['"]$/g, ''); }
    data[line.slice(0, i).trim()] = v;
  }
  return { data, body: m ? text.slice(m[0].length) : text };
}

async function deriveKey(password, salt) {
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: ITERATIONS }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}
async function encrypt(key, bytes) {
  const iv = randomBytes(12);
  return { iv, ct: new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, bytes)) };
}
async function tryDecrypt(key, page) {
  try { return JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(page.iv) }, key, unb64(page.data)))); }
  catch { return null; }
}

if (!fs.existsSync(SRC)) { console.error('No members-src/ folder found.'); process.exit(1); }
const pwFile = path.join(SRC, 'passwords.local.json');
const passwords = fs.existsSync(pwFile) ? JSON.parse(fs.readFileSync(pwFile, 'utf8')) : {};
fs.mkdirSync(OUT_PAGES, { recursive: true });

const existing = Object.fromEntries(fs.readdirSync(OUT_PAGES).filter((f) => f.endsWith('.json'))
  .map((f) => [f.slice(0, -5), JSON.parse(fs.readFileSync(path.join(OUT_PAGES, f), 'utf8'))]));
const sectionKeys = {};      // section -> { key, salt }
const usedBins = {};         // section -> Set(id)
const slugs = [];

for (const file of fs.readdirSync(SRC).filter((f) => f.endsWith('.md')).sort()) {
  const slug = file.slice(0, -3);
  slugs.push(slug);
  const { data, body } = parseFrontMatter(fs.readFileSync(path.join(SRC, file), 'utf8'));
  const section = data.section || slug;
  const password = process.env[`MEMBERS_PW_${section.toUpperCase().replace(/[^A-Z0-9]/g, '_')}`] || passwords[section];
  if (!password) { console.error(`✗ ${slug}: no password for section "${section}" in members-src/passwords.local.json`); process.exit(1); }

  // Reuse the section's salt when the password is unchanged, so visitors stay logged in
  // and unchanged files are not re-encrypted.
  let old = null;
  if (!sectionKeys[section]) {
    for (const prev of Object.values(existing).filter((p) => p.section === section)) {
      const salt = unb64(prev.kdf.salt);
      const key = await deriveKey(password, salt);
      if (await tryDecrypt(key, prev)) { sectionKeys[section] = { key, salt }; break; }
    }
    if (!sectionKeys[section]) {
      const salt = randomBytes(16);
      sectionKeys[section] = { key: await deriveKey(password, salt), salt };
      console.log(`  (new key for section "${section}")`);
    }
  }
  const { key, salt } = sectionKeys[section];
  if (existing[slug]) old = await tryDecrypt(key, existing[slug]);
  const oldFiles = old?.files ?? {};

  let html = await marked.parse(body, { gfm: true });
  const files = {};
  const outDir = path.join(OUT_FILES, section);
  fs.mkdirSync(outDir, { recursive: true });
  usedBins[section] ??= new Set();

  const refs = new Set([...html.matchAll(/(?:href|src)="files\/([^"]+)"/g)].map((m) => decodeURIComponent(m[1])));
  for (const name of refs) {
    const p = path.join(SRC, 'files', slug, name);
    if (!fs.existsSync(p)) { console.warn(`  ! ${slug}: missing file members-src/files/${slug}/${name}`); continue; }
    const buf = fs.readFileSync(p);
    const hash = sha(buf);
    let id = oldFiles[name]?.sha === hash && fs.existsSync(path.join(outDir, `${oldFiles[name].id}.bin`)) ? oldFiles[name].id : null;
    if (!id) {
      id = randomBytes(12).toString('hex');
      const { iv, ct } = await encrypt(key, buf);
      fs.writeFileSync(path.join(outDir, `${id}.bin`), Buffer.concat([iv, Buffer.from(ct)]));
      console.log(`  + encrypted ${name}`);
    }
    files[name] = { id, sha: hash };
    usedBins[section].add(id);
  }

  html = html.replace(/href="files\/([^"]+)"/g, (_, n) => {
    const name = decodeURIComponent(n); const f = files[name];
    return f ? `href="#" data-enc="/m/${section}/${f.id}.bin" data-name="${esc(name)}" data-type="${mime(name)}"` : 'href="#"';
  }).replace(/src="files\/([^"]+)"/g, (_, n) => {
    const name = decodeURIComponent(n); const f = files[name];
    return f ? `src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" data-enc-src="/m/${section}/${f.id}.bin" data-type="${mime(name)}"` : '';
  });

  const { iv, ct } = await encrypt(key, new TextEncoder().encode(JSON.stringify({ html, files })));
  const out = { slug, title: data.title || slug, section, kdf: { name: 'PBKDF2', hash: 'SHA-256', iterations: ITERATIONS, salt: b64(salt) }, iv: b64(iv), data: b64(ct) };
  fs.writeFileSync(path.join(OUT_PAGES, `${slug}.json`), JSON.stringify(out, null, 2) + '\n');
  console.log(`✓ ${slug}  [section: ${section}, ${Object.keys(files).length} files]`);
}

// Remove pages/files that no longer exist in members-src
for (const slug of Object.keys(existing)) if (!slugs.includes(slug)) { fs.rmSync(path.join(OUT_PAGES, `${slug}.json`)); console.log(`− removed page ${slug}`); }
if (fs.existsSync(OUT_FILES)) for (const section of fs.readdirSync(OUT_FILES)) {
  for (const f of fs.readdirSync(path.join(OUT_FILES, section))) {
    if (!usedBins[section]?.has(f.replace(/\.bin$/, ''))) fs.rmSync(path.join(OUT_FILES, section, f));
  }
  if (!fs.readdirSync(path.join(OUT_FILES, section)).length) fs.rmdirSync(path.join(OUT_FILES, section));
}
console.log('Done. Commit src/content/members/ and public/m/, then push.');
