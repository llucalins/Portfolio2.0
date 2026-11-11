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
    const copy = language === 'pt' ? pt : en;
    const t = (key) => key.split('.').reduce((value, part) => value[part], copy);
    const document = page.locator('.resume-print-document');
    const experienceHeadings = await document.locator('.document-entry').evaluateAll((entries) => entries.map((entry) => entry.closest('section').querySelector('h2').textContent));
    assert.deepEqual(experienceHeadings, Array(3).fill(copy.resumePdf.experienceHeading), 'Only institutional employment belongs to professional experience');
    assert.deepEqual(await document.locator('.document-independent [data-project-id]').evaluateAll((nodes) => nodes.map((node) => node.dataset.projectId)), ['vmais-comunicacao', 'memorial-monte-sinai']);
    assert.deepEqual(await document.locator('.document-projects [data-project-id]').evaluateAll((nodes) => nodes.map((node) => node.dataset.projectId)), ['sistema-agendamento', 'info-dbeta', 'mr-roobot-ai-office']);
    assert.equal(await document.locator('.document-independent .document-period').count(), 0, 'Do not invent an activity period');
    assert.equal(await document.locator('[data-project-id="memorial-monte-sinai"] h3 a').getAttribute('href'), 'https://d24we0nttwbgey.cloudfront.net');
    assert.ok((await document.locator('[data-project-id="memorial-monte-sinai"]').innerText()).includes('AWS CLI'));
    assert.equal(await document.locator('.document-projects .document-entry').count(), 0, 'Projects must remain separate from employment');
    assert.equal(await document.locator('[data-project-id]').count(), 5);
    for (const id of ['vmais-comunicacao', 'memorial-monte-sinai', 'sistema-agendamento', 'info-dbeta', 'mr-roobot-ai-office']) assert.equal(await document.locator(`[data-project-id="${id}"]`).count(), 1, `Duplicated PDF project: ${id}`);
    assert.deepEqual(await document.locator('.document-skills li strong').allTextContents(), [...professionalProfile.skillCategories.map((category) => `${t(category.titleKey)}:`), `${t('resumePage.languages')}:`]);
    const responsibilityLists = await document.locator('.document-entry').evaluateAll((entries) => entries.map((entry) => {
      const list = entry.querySelector(':scope > ul');
      const css = getComputedStyle(list);
      const item = getComputedStyle(list.firstElementChild);
      const marker = getComputedStyle(list.firstElementChild, '::marker');
      return {
        count: list.children.length,
        redundantParagraphs: entry.querySelectorAll(':scope > p:not(.document-position):not(.document-period)').length,
        style: [css.paddingLeft, css.marginTop, css.listStyleType, css.listStylePosition, item.fontSize, item.lineHeight, marker.content, marker.fontSize, marker.fontFamily]
      };
    }));
    assert.deepEqual(responsibilityLists.map((list) => list.count), [4, 2, 1], 'All PDF experiences must use semantic responsibility lists');
    for (const list of responsibilityLists) {
      assert.equal(list.redundantParagraphs, 0);
      assert.deepEqual(list.style, responsibilityLists[0].style, 'PDF responsibility markers, indentation and typography must be uniform');
    }
    const projectStructures = await document.locator('.document-project').evaluateAll((projects) => projects.map((project) => [...project.children].map((child) => child.tagName)));
    for (const structure of projectStructures) assert.deepEqual(structure, ['H3', 'P', 'P'], 'PDF projects share title, description and technology structure');
    const projectDescriptions = await document.locator('.document-project > p:not(.document-stack)').allTextContents();
    for (const description of projectDescriptions) {
      assert.doesNotMatch(description, /em desenvolvimento(?! de software)|in development|dados sintéticos|synthetic data|demonstração local|local demonstration|homologa|apresentação ao cliente|being presented to the client|aprovação|approval/i);
    }
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
    assert.ok(normalizedText.includes(normalize(t(professionalProfile.independent.pdfDescriptionKey))));
    const professionalText = normalizedText.split(t('experience.independentActivity').toUpperCase())[0];
    const independentText = normalizedText.split(t('experience.independentActivity').toUpperCase())[1].split(t('resumePdf.projectHeading').toUpperCase())[0];
    const projectText = normalizedText.split(t('resumePdf.projectHeading').toUpperCase())[1].split(t('resumePdf.educationHeading').toUpperCase())[0];
    for (const category of professionalProfile.skillCategories) {
      assert.ok(normalizedText.includes(normalize(t(category.titleKey))), `Missing skill category: ${category.id}`);
      for (const key of category.skillKeys) assert.ok(normalizedText.includes(normalize(t(`skills.${key}`))), `Missing PDF skill: ${key}`);
    }
    for (const project of selectedWork) {
      const title = typeof project.title === 'string' ? project.title : project.title[language];
      const included = project.engagement === 'freelance' || professionalProfile.resume.projectIds.includes(project.id);
      assert.equal(normalizedText.includes(title), included, `Wrong PDF project selection: ${title}`);
      assert.ok(!professionalText.includes(title), `Project incorrectly presented as employment: ${title}`);
      if (included) {
        assert.equal(normalizedText.split(title).length - 1, 1, `Duplicated PDF title: ${title}`);
        assert.ok((project.engagement === 'freelance' ? independentText : projectText).includes(title), `Wrong PDF section: ${title}`);
        assert.ok(normalizedText.includes(normalize(t(project.resume.contributionKey))));
        for (const technology of project.resume.technologies) {
          assert.ok(project.stack.includes(technology), `Technology missing in factual project stack: ${technology}`);
          assert.ok(normalizedText.includes(technology));
        }
      }
    }
    assert.equal(selectedWork.find((project) => project.id === 'mr-roobot-ai-office').repositoryUrl, undefined);
    for (const project of selectedWork.filter((item) => item.resume)) {
      const summary = t(project.resume.contributionKey);
      assert.ok(summary.split(/\s+/).length < project.description[language].split(/\s+/).length, `PDF summary must be shorter than web copy: ${project.id}`);
    }
    assert.ok(normalizedText.includes(language === 'pt' ? 'ferramentas de terceiros' : 'third-party tools'));
    assert.doesNotMatch(normalizedText, /Introdução ao Flutter|Introduction to Flutter/);
    assert.deepEqual(professionalProfile.resume.certificateFilenames, ['EABD3805.pdf', 'OPCYCM0Y.pdf', 'HCRDIGHK.pdf'], 'Only the Flutter course should be removed');
    assert.ok(normalizedText.includes(normalize(t(professionalProfile.roleKey))), 'PDF positioning title missing');
    assert.doesNotMatch(normalizedText, /Disponibilidade e reservas em planejamento|Availability and bookings remain planned/);
    assert.doesNotMatch(normalizedText, /Web & Mobile/);
    const headings = [t('resumePdf.skillsHeading'), t('resumePdf.experienceHeading'), t('experience.independentActivity'), t('resumePdf.projectHeading'), t('resumePdf.educationHeading'), t('resumePdf.certificatesHeading')];
    let previous = -1;
    for (const heading of headings) { const index = text.replace(/\f/g, '\n').toLowerCase().indexOf(`\n${heading.toLowerCase()}\n`); assert.ok(index > previous, heading); previous = index; }
    assert.match(text, /Anderson Rios Consultoria/);
    const pdfInfo = execFileSync('pdfinfo', [expected], { encoding: 'utf8' });
    assert.match(pdfInfo, /Pages:\s+2\b/, 'Expected two A4 pages');
    assert.match(pdfInfo, /Page size:\s+59[45]\.[\d]+ x 841\.[\d]+ pts \(A4\)/);
    const fonts = execFileSync('pdffonts', [expected], { encoding: 'utf8' });
    assert.match(fonts, /Carlito-Regular/);
    assert.match(fonts, /Carlito-Bold/);
    const fontLayout = execFileSync('pdftohtml', ['-xml', '-zoom', '1', '-stdout', '-i', expected], { encoding: 'utf8' });
    const fontSizes = [...fontLayout.matchAll(/<fontspec[^>]* size="([\d.]+)"/g)].map((match) => Number(match[1]));
    assert.ok(fontSizes.length > 0 && fontSizes.every((size) => size >= 10), 'PDF text must remain at least 10 pt');
    assert.match(pdfInfo, /Tagged:\s+yes/);
    // The metadata title is fine; it must not be printed in the page content.
    assert.doesNotMatch(text, /Lucas Virginio — (Currículo|Resume)|localhost|127\.0\.0\.1|\d{1,2}:\d{2}/);
    const links = execFileSync('pdfinfo', ['-url', expected], { encoding: 'utf8' });
    const expectedLinks = [...professionalProfile.contacts, professionalProfile.portfolio].map((contact) => contact.href);
    for (const project of selectedWork.filter((project) => project.engagement === 'freelance' || professionalProfile.resume.projectIds.includes(project.id))) {
      const url = project.repositoryUrl || project.demoUrl;
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
      const headingLine = page.lines.find((line) => line.text === heading.toUpperCase());
      centered(headingLine, page.width);
      assert.ok(page.lines.some((line) => line.y1 > headingLine.y2), `Isolated section heading: ${heading}`);
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
    console.log(`${mode}/${language}: static download bytes match; PDF view and legacy redirect OK; no window.print; complete resume and 17 certificates; PDF facts and project classification verified; independent work and selected projects separated without duplication; text, links, centered headings, employment blocks, fonts and 20 mm margins OK`);
    await context.close();
  }
  }
} finally { await browser.close(); }
