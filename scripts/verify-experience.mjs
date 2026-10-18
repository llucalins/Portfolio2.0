import assert from 'node:assert/strict';
import { chromium, devices } from 'playwright';
import { selectedWork } from '../src/data/selectedWork.js';

const browser = await chromium.launch();
try {
  for (const mobile of [false, true]) {
    for (const language of ['pt', 'en']) {
      const context = await browser.newContext(mobile ? devices['iPhone 13'] : { viewport: { width: 1440, height: 1000 } });
      await context.addInitScript((lang) => localStorage.setItem('language', lang), language);
      // Exercise graceful API failure without depending on rate limits or network access.
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
      assert.equal(await page.locator('.experience-employment').count(), 3);
      assert.match(await page.locator('.experience-employment').first().innerText(), /Anderson Rios Consultoria/);
      assert.equal(await page.locator('#freelance-experience-title + .freelance-experience').count(), 1);
      assert.equal(await page.locator('[aria-labelledby="freelance-experience-title"] [data-project-id]').count(), 0);
      assert.equal(await page.locator('[aria-labelledby="complementary-work-title"] [data-project-id]').count(), selectedWork.length);
      assert.equal(await page.locator('.experience-employment a').count(), 0);
      assert.ok((await page.locator('[data-project-id="sistema-agendamento"]').innerText()).includes(language === 'pt' ? 'planejados' : 'planned'));
      await page.getByRole('status').filter({ hasText: language === 'pt' ? 'GitHub' : 'GitHub' }).waitFor();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
      for (const link of await page.locator('.experience-project-links a').all()) assert.match(await link.getAttribute('href'), /^https:\/\//);
      if (language === 'pt') {
        await page.screenshot({ path: `/tmp/experience-${mobile ? 'mobile' : 'desktop'}.png` });
        await page.locator('#complementary-work-title').scrollIntoViewIfNeeded();
        await page.screenshot({ path: `/tmp/experience-projects-${mobile ? 'mobile' : 'desktop'}.png` });
      }
      await page.goto('http://127.0.0.1:3001/resume');
      await page.waitForFunction(() => document.querySelectorAll('.resume-certificates li').length === 17);
      assert.equal(await page.locator('.resume-entry').count(), 3);
      assert.equal(await page.locator('.resume-project').count(), selectedWork.length);
      assert.equal(await page.locator('.resume-primary .freelance-experience').count(), 1);
      assert.equal(await page.locator('[aria-labelledby="resume-freelance-title"] [data-project-id]').count(), 0);
      assert.deepEqual(errors, []);
      console.log(`${mobile ? 'mobile' : 'desktop'}/${language}: SEO, company/freelance separation, 6 complementary projects, GitHub fallback, responsive layout and complete resume OK`);
      await context.close();
    }
  }
  // Also exercise the successful GitHub response path.
  const context = await browser.newContext();
  await context.route('https://api.github.com/repos/**', (route) => route.fulfill({ json: { language: 'JavaScript', stargazers_count: 0, forks_count: 0 } }));
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3001/work');
  await page.locator('.experience-repository-fact').first().waitFor();
  assert.equal(await page.locator('.experience-repository-fact').count(), selectedWork.filter((project) => project.repository).length);
  console.log('GitHub success path OK');
  await context.close();
} finally { await browser.close(); }
