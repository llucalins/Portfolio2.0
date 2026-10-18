import { chromium, devices } from 'playwright';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { professionalProfile } from '../src/data/professionalProfile.js';
import { selectedWork } from '../src/data/selectedWork.js';
import { pt } from '../src/translations/pt.js';
import { en } from '../src/translations/en.js';
import { resumePdfPath } from '../src/data/resumeDocument.js';

const browser = await chromium.launch();
try {
  for (const mode of ['desktop', 'mobile']) {
  for (const language of ['pt', 'en']) {
    const context = await browser.newContext({ ...(mode === 'mobile' ? devices['iPhone 13'] : {}), acceptDownloads: true });
    const printCalls = [];
    await context.exposeBinding('recordResumePrint', () => printCalls.push('print'));
    await context.addInitScript(() => { window.print = () => window.recordResumePrint(); });
    await context.addInitScript((lang) => localStorage.setItem('language', lang), language);
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:3001/resume');
    await page.waitForFunction(() => document.querySelectorAll('.resume-certificates li').length === 17);
    assert.equal(await page.locator('.resume-certificates li').count(), 17);
    assert.equal(await page.locator('.resume-entry').count(), professionalProfile.experiences.length);
    assert.equal(await page.locator('.resume-project').count(), selectedWork.length);
    const downloadEvent = page.waitForEvent('download');
    await page.locator('.resume-download-btn').click();
    const download = await downloadEvent;
    const expected = `public${resumePdfPath(language)}`;
    assert.equal(download.suggestedFilename(), expected.split('/').pop());
    assert.deepEqual(await readFile(await download.path()), await readFile(expected));
    const pdfResponse = () => context.waitForEvent('response', {
      predicate: (response) => response.url() === `http://127.0.0.1:3001${resumePdfPath(language)}`
    });
    const viewLink = page.locator('.resume-pdf-link');
    assert.equal(await viewLink.getAttribute('href'), resumePdfPath(language));
    assert.equal(await viewLink.getAttribute('target'), '_blank');
    const viewResponseEvent = pdfResponse();
    await viewLink.click();
    const viewResponse = await viewResponseEvent;
    assert.equal(viewResponse.status(), 200);
    assert.match(viewResponse.headers()['content-type'], /application\/pdf/);
    assert.equal(new URL(page.url()).pathname, '/resume');
    const legacyResponseEvent = pdfResponse();
    await page.goto('http://127.0.0.1:3001/resume?print=1');
    const legacyResponse = await legacyResponseEvent;
    assert.equal(legacyResponse.status(), 200);
    // Headless/mobile Chromium may download PDFs instead of displaying its PDF viewer.
    assert.equal(legacyResponse.request().isNavigationRequest(), true);
    assert.equal(new URL(legacyResponse.url()).pathname, resumePdfPath(language));
    assert.deepEqual(printCalls, [], 'PDF flow called window.print');
    const text = execFileSync('pdftotext', [expected, '-'], { encoding: 'utf8' });
    const normalize = (value) => value.replace(/\s+/g, ' ').trim();
    const normalizedText = normalize(text);
    const copy = language === 'pt' ? pt : en;
    const t = (key) => key.split('.').reduce((value, part) => value[part], copy);
    await page.goto('http://127.0.0.1:3001/work');
    for (const experience of professionalProfile.experiences) {
      const webText = normalize(await page.locator(`[data-experience-id="${experience.id}"]`).innerText());
      for (const fact of [t(experience.companyKey), t(experience.titleKey), t(experience.periodKey)]) {
        assert.ok(normalizedText.includes(normalize(fact)), `PDF fact missing: ${fact}`);
        assert.ok(webText.includes(normalize(fact)), `Web experience differs: ${fact}`);
      }
      const pdfBulletsKey = professionalProfile.resume.experienceBullets[experience.id] || experience.resumeBulletsKey;
      const pdfFacts = pdfBulletsKey ? t(pdfBulletsKey) : [t(experience.descriptionKey)];
      for (const fact of pdfFacts) assert.ok(normalizedText.includes(normalize(fact)), `PDF responsibility missing: ${fact}`);
    }
    for (const fact of [t(professionalProfile.freelance.titleKey), t(professionalProfile.freelance.pdfDescriptionKey), ...t(professionalProfile.freelance.pdfBulletsKey)]) {
      assert.ok(normalizedText.includes(normalize(fact)), `Freelance responsibility missing: ${fact}`);
    }
    const projectHeading = t('resumePdf.projectHeading').toUpperCase();
    const experienceText = normalizedText.split(projectHeading)[0];
    for (const project of selectedWork) {
      const title = typeof project.title === 'string' ? project.title : project.title[language];
      const included = project.engagement === 'freelance' || professionalProfile.resume.projectIds.includes(project.id);
      assert.equal(normalizedText.includes(title), included, `Wrong PDF project selection: ${title}`);
      if (project.engagement !== 'freelance') assert.ok(!experienceText.includes(title), `Project classified as freelance without confirmation: ${title}`);
      if (included) {
        assert.ok(normalizedText.includes(normalize(t(project.resume.contributionKey))));
        for (const technology of project.resume.technologies) {
          assert.ok(project.stack.includes(technology), `Technology missing in factual project stack: ${technology}`);
          assert.ok(normalizedText.includes(technology));
        }
      }
    }
    assert.ok(normalizedText.includes(language === 'pt' ? 'Disponibilidade e reservas em planejamento.' : 'Availability and bookings remain planned.'));
    const headings = language === 'pt' ? ['Resumo profissional', 'Competências técnicas', 'Experiência profissional', 'Projetos selecionados', 'Formação e cursos relevantes'] : ['Professional summary', 'Technical skills', 'Professional experience', 'Selected projects', 'Education and relevant courses'];
    let previous = -1;
    for (const heading of headings) { const index = text.toLowerCase().indexOf(heading.toLowerCase()); assert.ok(index > previous, heading); previous = index; }
    assert.match(text, /Anderson Rios Consultoria/);
    const pdfInfo = execFileSync('pdfinfo', [expected], { encoding: 'utf8' });
    assert.match(pdfInfo, /Pages:\s+1\b/);
    assert.match(pdfInfo, /Tagged:\s+yes/);
    // The metadata title is fine; it must not be printed in the page content.
    assert.doesNotMatch(text, /Lucas Virginio — (Currículo|Resume)|localhost|127\.0\.0\.1|\d{1,2}:\d{2}/);
    const links = execFileSync('pdfinfo', ['-url', expected], { encoding: 'utf8' });
    const expectedLinks = [...professionalProfile.contacts, professionalProfile.portfolio].map((contact) => contact.href);
    for (const project of selectedWork.filter((project) => project.engagement === 'freelance' || professionalProfile.resume.projectIds.includes(project.id))) {
      const url = project.repositoryUrl;
      if (url) expectedLinks.push(url);
    }
    for (const url of expectedLinks) assert.ok(links.includes(url), `PDF link missing: ${url}`);
    // Check 13/16 mm content margins with 1.5 pt tolerance for font ascent metrics.
    const bounds = execFileSync('pdftotext', ['-bbox', expected, '-'], { encoding: 'utf8' });
    const words = [...bounds.matchAll(/<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)"/g)];
    assert.ok(words.length > 0, 'Missing selectable text');
    for (const word of words) {
      const [, x1, y1, x2, y2] = word.map(Number);
      assert.ok(x1 >= 44 && x2 <= 552 && y1 >= 35 && y2 <= 806, `Text outside margins: ${word[0]}`);
    }
    console.log(`${mode}/${language}: static download bytes match; PDF view and legacy redirect OK; no window.print; complete resume and 17 certificates; PDF facts and project classification verified; freelancer present; text, links and margins OK`);
    await context.close();
  }
  }
} finally { await browser.close(); }
