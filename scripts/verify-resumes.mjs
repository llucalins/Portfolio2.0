import { chromium, devices } from 'playwright';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { professionalProfile } from '../src/data/professionalProfile.js';
import { selectedWork } from '../src/data/selectedWork.js';
import { KNOWN_CERTIFICATES } from '../src/utils/autoDetector.js';
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
    assert.ok(normalizedText.includes(normalize(t(professionalProfile.roleKey))), 'PDF positioning title missing');
    assert.doesNotMatch(normalizedText, /Disponibilidade e reservas em planejamento|Availability and bookings remain planned/);
    assert.doesNotMatch(normalizedText, /Web & Mobile/);
    const headings = ['skillsHeading', 'experienceHeading', 'projectHeading', 'educationHeading', 'certificatesHeading'].map((key) => t(`resumePdf.${key}`));
    let previous = -1;
    for (const heading of headings) { const index = text.toLowerCase().indexOf(`\n${heading.toLowerCase()}\n`); assert.ok(index > previous, heading); previous = index; }
    assert.match(text, /Anderson Rios Consultoria/);
    const pdfInfo = execFileSync('pdfinfo', [expected], { encoding: 'utf8' });
    assert.match(pdfInfo, /Pages:\s+[23]\b/, 'Expected natural pagination across two or three pages');
    assert.match(pdfInfo, /Page size:\s+59[45]\.[\d]+ x 841\.[\d]+ pts \(A4\)/);
    const fonts = execFileSync('pdffonts', [expected], { encoding: 'utf8' });
    assert.match(fonts, /Carlito-Regular/);
    assert.match(fonts, /Carlito-Bold/);
    assert.match(pdfInfo, /Tagged:\s+yes/);
    // The metadata title is fine; it must not be printed in the page content.
    assert.doesNotMatch(text, /Lucas Virginio — (Currículo|Resume)|localhost|127\.0\.0\.1|\d{1,2}:\d{2}/);
    const links = execFileSync('pdfinfo', ['-url', expected], { encoding: 'utf8' });
    const expectedLinks = [...professionalProfile.contacts, professionalProfile.portfolio].map((contact) => contact.href);
    for (const project of selectedWork.filter((project) => project.engagement === 'freelance' || professionalProfile.resume.projectIds.includes(project.id))) {
      const url = project.repositoryUrl;
      if (url) expectedLinks.push(url);
    }
    for (const filename of professionalProfile.resume.certificateFilenames) {
      const certificate = KNOWN_CERTIFICATES[filename];
      assert.ok(normalizedText.includes(normalize(t(`projects.certificates.${certificate.titleKey}`))), `Certificate missing: ${filename}`);
      assert.ok(normalizedText.includes(`${certificate.issuer} - ${certificate.date} - ${t('resumePdf.certificate')}`));
      expectedLinks.push(new URL(`/certificates/${encodeURIComponent(filename)}`, professionalProfile.portfolio.href).href);
    }
    for (const url of expectedLinks) assert.ok(links.includes(url), `PDF link missing: ${url}`);
    assert.doesNotMatch(links, /github\.com\/llucalins\/(VmaisHomePage|Info\.DBeta)/, 'Private repository linked in PDF');
    // Reference: 20 mm A4 margins; allow 2 pt for font ascent metrics.
    const bounds = execFileSync('pdftotext', ['-bbox', expected, '-'], { encoding: 'utf8' });
    const words = [...bounds.matchAll(/<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)"/g)];
    assert.ok(words.length > 0, 'Missing selectable text');
    for (const word of words) {
      const [, x1, y1, x2, y2] = word.map(Number);
      assert.ok(x1 >= 54.5 && x2 <= 540 && y1 >= 54.5 && y2 <= 787, `Text outside margins: ${word[0]}`);
    }
    const layout = execFileSync('pdftotext', ['-bbox-layout', expected, '-'], { encoding: 'utf8' });
    const decode = (value) => value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    const pages = [...layout.matchAll(/<page width="([\d.]+)" height="([\d.]+)">([\s\S]*?)<\/page>/g)].map((match) => ({
      width: Number(match[1]),
      lines: [...match[3].matchAll(/<line xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([\s\S]*?)<\/line>/g)].map((line) => ({
        x1: Number(line[1]), y1: Number(line[2]), x2: Number(line[3]), y2: Number(line[4]),
        text: normalize([...line[5].matchAll(/<word[^>]*>([\s\S]*?)<\/word>/g)].map((word) => decode(word[1])).join(' '))
      }))
    }));
    const centered = (line, width) => assert.ok(Math.abs((line.x1 + line.x2) / 2 - width / 2) < 2, `Not centered: ${line.text}`);
    for (const heading of [professionalProfile.name, t(professionalProfile.roleKey)]) {
      const line = pages[0].lines.find((line) => line.text === heading);
      assert.ok(line, `Header must occupy one line: ${heading}`);
      centered(line, pages[0].width);
    }
    const contactLine = pages[0].lines.find((line) => line.text.includes('Lvirginio.dev@gmail.com'));
    assert.ok(contactLine && contactLine.text.includes('lucasvirginio.is-a.dev'), 'Contacts must occupy one line');
    centered(contactLine, pages[0].width);
    for (const heading of headings) {
      const page = pages.find((page) => page.lines.some((line) => line.text === heading.toUpperCase()));
      assert.ok(page, `Section heading missing: ${heading}`);
      centered(page.lines.find((line) => line.text === heading.toUpperCase()), page.width);
    }
    const employmentPages = [];
    for (const experience of professionalProfile.experiences) {
      let found;
      for (const [index, pdfPage] of pages.entries()) {
        const role = pdfPage.lines.find((line) => line.text === t(experience.titleKey));
        const period = pdfPage.lines.find((line) => line.text === t(experience.periodKey));
        const company = pdfPage.lines.find((line) => line.text === t(experience.companyKey) && role && role.y1 > line.y1 && role.y1 - line.y1 < 22);
        if (company && role && period && role.y1 > company.y1 && period.y1 > role.y1 && period.y1 - company.y1 < 40) {
          for (const line of [company, role, period]) assert.ok(Math.abs(line.x1 - 56.7) < 1.5, `Employment alignment: ${line.text}`);
          found = { page: index, period };
          break;
        }
      }
      assert.ok(found, `Company, role, period must occupy consecutive left-aligned lines: ${experience.id}`);
      employmentPages.push(found);
    }
    assert.ok(employmentPages.length === professionalProfile.experiences.length);
    console.log(`${mode}/${language}: static download bytes match; PDF view and legacy redirect OK; no window.print; complete resume and 17 certificates; PDF facts and project classification verified; freelancer present; text, links, centered headings, employment blocks, fonts and 20 mm margins OK`);
    await context.close();
  }
  }
} finally { await browser.close(); }
