import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resumeMarkup, resumeStyles, resumePdfPath } from '../src/data/resumeDocument.js';

const browser = await chromium.launch({ headless: true });
try {
  await mkdir(new URL('../public/resumes/', import.meta.url), { recursive: true });
  for (const language of ['pt', 'en']) {
    const page = await browser.newPage();
    await page.setContent(`<!doctype html><html lang="${language === 'pt' ? 'pt-BR' : 'en'}"><head><meta charset="utf-8"><title>Lucas Virginio — ${language === 'pt' ? 'Currículo' : 'Resume'}</title><style>body { margin: 0; }${resumeStyles}</style></head><body>${resumeMarkup(language)}</body></html>`);
    await page.evaluate(() => document.fonts.ready);
    const path = new URL(`../public${resumePdfPath(language)}`, import.meta.url).pathname;
    await page.pdf({ path, preferCSSPageSize: true, printBackground: true, tagged: true, displayHeaderFooter: false, headerTemplate: '<span></span>', footerTemplate: '<span></span>' });
    console.log(path);
    await page.close();
  }
} finally {
  await browser.close();
}
