import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const required = ['React', 'Next.js', 'TypeScript', 'PostgreSQL', 'Spring Boot', 'GitHub'];
let failed = false;
for (const language of ['pt-br', 'en']) {
  const pdf = new URL(`../public/resumes/lucas-virginio-${language}.pdf`, import.meta.url);
  readFileSync(pdf); // Assert generation produced the file.
  const extracted = execFileSync('pdftotext', ['-layout', pdf.pathname, '-'], { encoding: 'utf8' });
  const missing = required.filter(term => !extracted.includes(term));
  const privateChars = [...extracted].filter(c => c.codePointAt(0) >= 0xe000 && c.codePointAt(0) <= 0xf8ff);
  const replacement = [...extracted].filter(c => c === '\uFFFD');
  console.log(`${language}: ${extracted.length} chars, ${privateChars.length} private-use, ${replacement.length} replacement, missing: ${missing.join(', ') || 'none'}`);
  if (missing.length || privateChars.length || replacement.length) failed = true;
}
if (failed) process.exit(1);
console.log('PASS: ATS-critical terms extract correctly in both PDFs.');
