// Captura telas reais do app em produção com as contas de teste da banca.
// Só leitura: não se candidata, não muda status. Credenciais vêm do ambiente
// (TEST_STUDENT_EMAIL, TEST_STUDENT_PASSWORD, TEST_OFFERER_EMAIL, TEST_OFFERER_PASSWORD).
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { mkdirSync } from 'node:fs';

const BASE = process.env.ITERI_URL ?? 'https://iteri.com.br';
const OUT = process.argv[2] ?? 'build/app';
mkdirSync(OUT, { recursive: true });

async function entrar(page, email, senha) {
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', senha);
  await page.click('button[type="submit"]');
  await page.waitForURL(u => !u.pathname.startsWith('/login'), { timeout: 20000 });
  await page.waitForLoadState('networkidle');
}

async function foto(page, caminho, nome) {
  await page.goto(`${BASE}${caminho}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/${nome}.png` });
  console.log(nome, page.url());
}

const browser = await chromium.launch();
const ctx = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 };

const aluno = await (await browser.newContext(ctx)).newPage();
await entrar(aluno, process.env.TEST_STUDENT_EMAIL, process.env.TEST_STUDENT_PASSWORD);
await foto(aluno, '/student/feed', 'aluno_feed');
await foto(aluno, '/student/applications', 'aluno_candidaturas');
await foto(aluno, '/student/profile', 'aluno_perfil');
const link = await aluno.goto(`${BASE}/student/feed`, { waitUntil: 'networkidle' })
  .then(() => aluno.$$eval('a[href*="/opportunities/"]', as => as.map(a => a.getAttribute('href'))));
console.log('links', link.slice(0, 3));
if (link.length) await foto(aluno, link[0], 'aluno_vaga');

const prof = await (await browser.newContext(ctx)).newPage();
await entrar(prof, process.env.TEST_OFFERER_EMAIL, process.env.TEST_OFFERER_PASSWORD);
await foto(prof, '/offerer/dashboard', 'prof_painel');
await foto(prof, '/offerer/opportunities', 'prof_vagas');
const cand = await prof.$$eval('a[href*="/candidates"]', as => as.map(a => a.getAttribute('href')));
console.log('cand', cand.slice(0, 3));
if (cand.length) await foto(prof, cand[0], 'prof_candidatos');
await browser.close();
