// Renderiza cada cena de cenas.html em build/cenas/<id>.png (1920x1080).
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { readFileSync, mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const linha = JSON.parse(readFileSync('build/linha_do_tempo.json', 'utf8'));
mkdirSync('build/cenas', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
for (const c of linha.cenas) {
  await page.goto(pathToFileURL('cenas.html').href + '?c=' + c.cena, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `build/cenas/${c.cena}.png` });
  console.log(c.cena);
}
await browser.close();
