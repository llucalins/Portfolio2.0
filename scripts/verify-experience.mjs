import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium, devices } from 'playwright';
import { professionalProfile } from '../src/data/professionalProfile.js';
import { selectedWork } from '../src/data/selectedWork.js';
import { groupWork } from '../src/data/workExperience.js';
import { pt } from '../src/translations/pt.js';
import { en } from '../src/translations/en.js';

// Explicit expectations guard commercial classification independently of the data.
const organizations = ['vmais-comunicacao', 'memorial-monte-sinai'];
const authored = ['sistema-agendamento', 'info-dbeta'];
const other = ['grow-ai', 'painel-semanal', 'agente-ia-escolar', 'mr-roobot-ai-office'];
const sorted = (values) => [...values].sort();
const groups = groupWork();
assert.deepEqual(sorted(groups.freelance.map((project) => project.id)), sorted(organizations));
assert.deepEqual(sorted(groups.independent.map((project) => project.id)), sorted(authored));
assert.deepEqual(sorted(groups.unclassified.map((project) => project.id)), sorted(other));
assert.equal(new Set(selectedWork.map((project) => project.id)).size, selectedWork.length);
assert.equal(selectedWork.find((project) => project.id === 'info-dbeta').demoUrl, 'https://info-d-beta.vercel.app');
assert.equal(selectedWork.find((project) => project.id === 'memorial-monte-sinai').demoUrl, 'https://d24we0nttwbgey.cloudfront.net');
for (const id of organizations) assert.equal(selectedWork.find((project) => project.id === id).repositoryUrl, undefined, 'Do not invent a public organizational repository');
assert.equal(pt.profile.title, 'Desenvolvedor Full Stack | TypeScript e Integração de IA');
assert.equal(en.profile.title, 'Full Stack Developer | TypeScript & AI Integration');
assert.deepEqual(professionalProfile.experiences.map((experience) => experience.id), ['anderson-rios', 'esperanca-instructor', 'esperanca-administrative']);
assert.deepEqual([pt.about.experiences.andersonRios.period, pt.about.experiences.instructor.period, pt.about.experiences.administrative.period], ['mai/2025 — dez/2025', 'mar/2023 — ago/2025', 'jan/2021 — mar/2023']);
assert.deepEqual([en.about.experiences.andersonRios.period, en.about.experiences.instructor.period, en.about.experiences.administrative.period], ['May 2025 — Dec 2025', 'Mar 2023 — Aug 2025', 'Jan 2021 — Mar 2023']);
assert.equal(professionalProfile.skillCategories.length, 4);
const skillKeys = professionalProfile.skillCategories.flatMap((category) => category.skillKeys);
assert.equal(new Set(skillKeys).size, skillKeys.length, 'A skill must appear in only one category');
for (const skill of ['amazonS3', 'cloudfront', 'awsIam', 'awsCli', 'openaiApis', 'reactNative']) assert.ok(skillKeys.includes(skill), `Missing skill: ${skill}`);
for (const [categoryId, expected] of [['frontend', ['typescript', 'react', 'nextjs', 'reactNative']], ['backend', ['nodejs', 'restApis', 'openaiApis']], ['data', ['postgresql', 'amazonS3', 'cloudfront', 'awsIam']], ['engineering', ['git', 'docker', 'awsCli', 'automatedTests', 'deployAutomation']]]) {
  const category = professionalProfile.skillCategories.find((item) => item.id === categoryId);
  for (const key of expected) assert.ok(category.skillKeys.includes(key), `${key} belongs to ${categoryId}`);
}
const internalStatus = /em desenvolvimento(?! de software)|in development|dados sintéticos|synthetic data|demonstração local|local demonstration|homologa|aprovação|approval|apresentação ao cliente|being presented to the client|sem (?:link|URL|repositório)|no confirmed public|sem implantação|production acceptance|negociação|pending approval/i;
for (const project of selectedWork) {
  assert.equal(Object.hasOwn(project, 'scope'), false, `Remove the migrated scope field: ${project.id}`);
  assert.equal(Object.hasOwn(project, 'category'), false, `Do not leave unused project category fields: ${project.id}`);
  for (const language of ['pt', 'en']) {
    const description = project.description[language];
    assert.doesNotMatch(description, internalStatus, `${project.id}/${language}: project copy contains internal status`);
    const words = description.trim().split(/\s+/).length;
    assert.ok(words >= 35 && words <= 65, `${project.id}/${language}: expected a short technical paragraph, got ${words} words`);
  }
}
for (const copy of [pt, en]) for (const category of professionalProfile.skillCategories) {
  assert.ok(copy.skills[category.titleKey.split('.').pop()]);
  for (const key of category.skillKeys) assert.equal(typeof copy.skills[key], 'string');
}
await mkdir('/tmp/portfolio-organization-review', { recursive: true });

// Compare rendered structure and computed styles, not just source class names.
async function verifyVisualContract(page, route) {
  await page.evaluate(() => document.fonts.ready);
  const selector = route === 'work' ? '.experience-employment' : '.resume-shell .resume-entry';
  const entries = await page.locator(selector).evaluateAll((nodes, route) => {
    const styles = (node, pseudo) => {
      const css = getComputedStyle(node, pseudo);
      return Object.fromEntries(['fontFamily', 'fontSize', 'fontWeight', 'color', 'lineHeight', 'paddingTop', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginBottom', 'borderBottomWidth', 'borderBottomStyle', 'borderBottomColor', 'listStyleType', 'listStylePosition'].map((key) => [key, css[key]]));
    };
    return nodes.map((node) => {
      const list = node.querySelector('ul');
      const heading = node.querySelector('h3');
      const role = node.querySelector(route === 'work' ? '.experience-role' : '.resume-entry-heading div > p');
      const period = node.querySelector(route === 'work' ? '.experience-period' : 'time');
      return {
        id: node.dataset.experienceId,
        count: list?.children.length || 0,
        redundantParagraphs: node.querySelectorAll(route === 'work' ? '.experience-employment-body > p' : ':scope > p').length,
        signature: list ? {
          card: styles(node), heading: styles(heading), role: styles(role), period: styles(period),
          list: styles(list), item: styles(list.firstElementChild), marker: styles(list.firstElementChild, '::marker'),
          contentWidth: list.getBoundingClientRect().width,
          headingInset: heading.getBoundingClientRect().left - node.getBoundingClientRect().left
        } : null,
        items: list ? [...list.children].map((item) => ({ tag: item.tagName, style: styles(item), marker: styles(item, '::marker') })) : []
      };
    });
  }, route);
  assert.deepEqual(entries.map((entry) => entry.count), [4, 2, 1], `${route}: all experiences must use responsibility lists`);
  for (const entry of entries) {
    assert.equal(entry.redundantParagraphs, 0, `${route}/${entry.id}: duplicated responsibility paragraph`);
    assert.deepEqual(entry.signature, entries[0].signature, `${route}/${entry.id}: inconsistent experience styling`);
    assert.equal(entry.signature.list.listStyleType, 'disc');
    assert.equal(entry.signature.list.listStylePosition, 'outside');
    for (const [index, item] of entry.items.entries()) {
      assert.equal(item.tag, 'LI');
      assert.equal(item.style.fontSize, entry.signature.item.fontSize);
      assert.equal(item.style.lineHeight, entry.signature.item.lineHeight);
      assert.equal(item.style.marginTop, index === 0 ? '0px' : entries[0].items[1].style.marginTop, `${route}: responsibility item spacing must be uniform`);
      assert.deepEqual(item.marker, entry.signature.marker);
    }
  }
  const projects = await page.locator(route === 'work' ? '.experience-project' : '.resume-shell .resume-project').evaluateAll((nodes, route) => nodes.map((node) => {
    const heading = node.querySelector(route === 'work' ? '.experience-project-heading :is(h3,h4)' : ':is(h3,h4)');
    const css = getComputedStyle(heading);
    return { blocks: route === 'work' ? [...node.querySelector('.experience-project-body').children].filter((child) => !child.matches('.experience-project-links, .experience-repository-fact')).map((child) => child.tagName) : [...node.children].filter((child) => child.tagName !== 'A').map((child) => /^H[34]$/.test(child.tagName) ? 'HEADING' : child.tagName), title: [css.fontSize, css.fontWeight, css.lineHeight, css.color] };
  }), route);
  assert.equal(projects.length, selectedWork.length);
  for (const project of projects) {
    assert.deepEqual(project, projects[0], `${route}: projects must share one editorial structure and title style`);
    assert.deepEqual(project.blocks, route === 'work' ? ['P', 'DL'] : ['HEADING', 'P', 'P']);
  }
  for (const project of selectedWork) {
    const card = page.locator(`${route === 'work' ? '.experience-page' : '.resume-shell'} [data-project-id="${project.id}"]`);
    assert.equal(await card.locator(route === 'work' ? '.experience-project-description' : '.resume-project-description').innerText(), project.description[await page.locator('html').getAttribute('lang') === 'en' ? 'en' : 'pt']);
    assert.equal(await card.locator(route === 'work' ? '.experience-project-stack dd' : '.resume-project-stack').count(), 1);
    assert.doesNotMatch(await card.innerText(), internalStatus);
  }
  if (route === 'resume') {
    const categories = await page.locator('.resume-skill-group').evaluateAll((nodes) => nodes.map((node) => {
      const props = (element) => { const css = getComputedStyle(element); return [css.fontSize, css.fontWeight, css.lineHeight, css.marginTop, css.paddingTop, css.paddingBottom, css.borderBottom]; };
      return [props(node), props(node.querySelector('h3')), props(node.querySelector('p'))];
    }));
    assert.equal(categories.length, 4);
    for (const category of categories) assert.deepEqual(category, categories[0], 'Skill groups must share spacing and typography');
  }
}

const browser = await chromium.launch();
try {
  for (const mobile of [false, true]) for (const language of ['pt', 'en']) {
    const copy = language === 'pt' ? pt : en;
    const context = await browser.newContext(mobile ? devices['iPhone 13'] : { viewport: { width: 1440, height: 1000 } });
    await context.addInitScript((lang) => localStorage.setItem('language', lang), language);
    await context.route('https://api.github.com/repos/**', (route) => route.fulfill({ status: 503, body: '{}' }));
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('http://127.0.0.1:3001/work');
    const title = language === 'pt' ? 'Experiência' : 'Experience';
    assert.equal(await page.locator('h1').innerText(), title);
    assert.ok((await page.title()).startsWith(title));
    assert.equal(new URL(await page.locator('link[rel="canonical"]').getAttribute('href')).pathname, '/work');
    assert.ok((await page.locator('meta[name="description"]').getAttribute('content')).includes(language === 'pt' ? 'freelancer' : 'freelance'));
    assert.equal(await page.locator('.experience-section > h2').count(), 3, 'Professional / independent / other are the three main sections');
    assert.equal(await page.locator('.experience-employment').count(), 3);
    await verifyVisualContract(page, 'work');
    assert.match(await page.locator('.experience-employment').first().innerText(), /Anderson Rios Consultoria/);
    assert.equal(await page.locator('.experience-employment a').count(), 0);
    assert.equal(await page.locator('.independent-intro').count(), 1);
    for (const [heading, ids] of [['organization-work-title', organizations], ['authored-work-title', authored], ['complementary-work-title', other]]) {
      assert.deepEqual(sorted(await page.locator(`[aria-labelledby="${heading}"] [data-project-id]`).evaluateAll((nodes) => nodes.map((node) => node.dataset.projectId))), sorted(ids));
    }
    for (const project of selectedWork) {
      const card = page.locator(`[data-project-id="${project.id}"]`);
      assert.equal(await card.count(), 1, `Project missing or duplicated: ${project.id}`);
      for (const url of [project.demoUrl, project.repositoryUrl].filter(Boolean)) {
        const link = card.locator(`a[href="${url}"]`);
        assert.equal(await link.count(), 1);
        assert.equal(await link.getAttribute('target'), '_blank');
        assert.match(await link.getAttribute('rel'), /noopener/);
      }
      assert.equal(await card.locator('a').count(), [project.demoUrl, project.repositoryUrl].filter(Boolean).length);
      assert.equal(await card.locator('.experience-project-links').count(), project.demoUrl || project.repositoryUrl ? 1 : 0, 'Do not leave empty link rows in projects');
    }
    const memorial = page.locator('[data-project-id="memorial-monte-sinai"]');
    assert.ok((await memorial.innerText()).includes(language === 'pt' ? 'exportação estática' : 'static export'));
    assert.ok((await memorial.innerText()).includes('WhatsApp'));
    for (const technology of ['Next.js 16', 'React 19', 'TypeScript', 'Amazon S3', 'Amazon CloudFront', 'AWS IAM', 'AWS CLI']) assert.ok((await memorial.innerText()).includes(technology));
    assert.doesNotMatch(await memorial.innerText(), /contrato assinado|signed contract|domínio oficial|official domain|\b(?:backend|PostgreSQL|IA|AI)\b/i);
    const scheduling = await page.locator('[data-project-id="sistema-agendamento"]').innerText();
    assert.ok(scheduling.includes(language === 'pt' ? 'regras de negócio' : 'business rules'));
    assert.ok(scheduling.includes(language === 'pt' ? 'confirmação de reservas' : 'booking confirmation'));
    assert.doesNotMatch(scheduling, /módulos planejados|modules planned/);
    assert.equal(await page.locator('a[href*="github.com/llucalins/VmaisHomePage"], a[href*="github.com/llucalins/Info.DBeta"]').count(), 0);
    await page.getByRole('status').filter({ hasText: 'GitHub' }).waitFor();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    const prefix = `/tmp/portfolio-organization-review/work-${language}-${mobile ? 'mobile' : 'desktop'}`;
    await page.screenshot({ style: '.header, .skip-link { visibility: hidden; }', path: `${prefix}.png` });
    await page.locator('[aria-labelledby="independent-activity-title"]').screenshot({ style: '.header, .skip-link { visibility: hidden; }', path: `${prefix}-independent.png` });

    await page.goto('http://127.0.0.1:3001/resume');
    await page.waitForFunction(() => document.querySelectorAll('.resume-certificates li').length === 17);
    assert.equal(await page.locator('.resume-entry').count(), 3);
    await verifyVisualContract(page, 'resume');
    assert.equal(await page.locator('.resume-project').count(), selectedWork.length);
    assert.equal(await page.locator('.resume-role').innerText(), copy.profile.title);
    for (const [heading, ids] of [['resume-organizations-title', organizations], ['resume-authored-title', authored], ['resume-projects-title', other]]) {
      assert.deepEqual(sorted(await page.locator(`[aria-labelledby="${heading}"] [data-project-id]`).evaluateAll((nodes) => nodes.map((node) => node.dataset.projectId))), sorted(ids));
    }
    for (const project of selectedWork) assert.equal(await page.locator(`.resume-shell [data-project-id="${project.id}"]`).count(), 1);
    assert.equal(await page.locator('.resume-shell [data-project-id="memorial-monte-sinai"] a').getAttribute('href'), 'https://d24we0nttwbgey.cloudfront.net');
    assert.deepEqual(await page.locator('.resume-skill-group h3').allTextContents(), professionalProfile.skillCategories.map((category) => copy.skills[category.titleKey.split('.').pop()]));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.locator('[aria-labelledby="resume-independent-title"]').screenshot({ style: '.header, .skip-link { visibility: hidden; }', path: `/tmp/portfolio-organization-review/resume-${language}-${mobile ? 'mobile' : 'desktop'}-independent.png` });

    await page.locator('.resume-sidebar [aria-labelledby="resume-technologies-title"]').screenshot({ style: '.header, .skip-link { visibility: hidden; }', path: `/tmp/portfolio-organization-review/skills-${language}-${mobile ? 'mobile' : 'desktop'}.png` });
    await page.goto('http://127.0.0.1:3001/');
    assert.equal(await page.locator('.hero-role').innerText(), copy.profile.title);
    for (const key of professionalProfile.heroStackKeys) assert.ok((await page.locator('.hero-stack').innerText()).includes(copy.skills[key]));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    assert.deepEqual(errors, []);
    console.log(`${mobile ? 'mobile' : 'desktop'}/${language}: classification, three main sections, unique projects, technical descriptions, links, shared skills, title, SEO, GitHub fallback and responsive layout OK`);
    await context.close();
  }
  const context = await browser.newContext();
  await context.route('https://api.github.com/repos/**', (route) => route.fulfill({ json: { language: 'JavaScript', stargazers_count: 0, forks_count: 0 } }));
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3001/work');
  await page.locator('.experience-repository-fact').first().waitFor();
  assert.equal(await page.locator('.experience-repository-fact').count(), selectedWork.filter((project) => project.repository).length);
  for (const language of ['pt', 'en']) {
    await page.evaluate((lang) => localStorage.setItem('language', lang), language);
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const route of ['work', 'resume']) {
        await page.goto(`http://127.0.0.1:3001/${route}`);
        await page.locator(route === 'resume' ? '.resume-skill-group' : '.experience-project').first().waitFor();
        await verifyVisualContract(page, route);
        const overflow = await page.locator(route === 'resume' ? '.resume-shell' : '.experience-page').evaluate((root) => [...root.querySelectorAll('h2,h3,h4,p,dd,a')].filter((node) => { const box = node.getBoundingClientRect(); return box.width && (box.left < -1 || box.right > innerWidth + 1); }).map((node) => node.textContent));
        assert.deepEqual(overflow, [], `${route}/${language}/${width}px has overflowing content`);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        if (width === 320) await page.locator(route === 'resume' ? '[aria-labelledby="resume-technologies-title"]' : '[aria-labelledby="organization-work-title"]').screenshot({ style: '.header, .skip-link { visibility: hidden; }', path: `/tmp/portfolio-organization-review/${route}-${language}-320.png` });
      }
    }
  }
  console.log('PT/EN widths 320, 390, 768, 1024 and 1440px: uniform visual contract and no content overflow');
  console.log('GitHub success path OK');
  await context.close();
} finally { await browser.close(); }
