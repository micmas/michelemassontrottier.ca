#!/usr/bin/env node
// After `npm run members`: saves the private members content to its own (private) GitHub backup.
// Does nothing if members-src/ is not a git clone of the backup.
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', 'members-src');
const run = (cmd) => execSync(cmd, { cwd: dir, stdio: 'pipe' }).toString().trim();

if (!fs.existsSync(path.join(dir, '.git'))) {
  console.log('Backup skipped: members-src/ is not linked to the private backup.');
  process.exit(0);
}
try {
  run('git add -A');
  if (!run('git status --porcelain')) { console.log('Backup: already up to date.'); process.exit(0); }
  run(`git commit -m "Update members content (${new Date().toISOString().slice(0, 10)})"`);
  run('git push');
  console.log('✓ Private backup updated.');
} catch (e) {
  console.error('! Backup not pushed (no internet?). Run `npm run backup` later.\n' + (e.stderr?.toString() || e.message));
}
