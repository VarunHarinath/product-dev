import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';

const requiredFiles = [
  'dist/index.html',
  'dist/styles.css',
  'dist/script.js',
  'dist/assets/steel-frame-hero.png'
];

await Promise.all(requiredFiles.map((file) => access(file, constants.R_OK)));

const html = await readFile('dist/index.html', 'utf8');
const localReferences = [...html.matchAll(/(?:href|src)="(?!https?:|data:|#)([^"?]+)[^"]*"/g)]
  .map((match) => `dist/${match[1].replace(/^\//, '')}`);

await Promise.all(localReferences.map((file) => access(file, constants.R_OK)));
console.log(`Static build verified: ${requiredFiles.length} entry files and ${localReferences.length} local references.`);
