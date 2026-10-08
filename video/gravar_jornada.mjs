// Grava a jornada real em produção com as contas de teste da banca:
// professor publica uma vaga (rotulada como exemplo), aluno se candidata,
// professor aprova, aluno vê a aprovação. ESCREVE no banco de produção.
// Credenciais vêm do ambiente: TEST_STUDENT_EMAIL, TEST_STUDENT_PASSWORD,
// TEST_OFFERER_EMAIL, TEST_OFFERER_PASSWORD.
// Saída: build/jornada/<etapa>.webm e build/jornada/marcas.json (tempos de cada passo).
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { mkdirSync, writeFileSync, renameSync } from 'node:fs';

const BASE = process.env.ITERI_URL ?? 'https://iteri.com.br';
const OUT = 'build/jornada';
const TITULO = process.env.VAGA_TITULO ?? 'Monitoria de Cálculo I (exemplo)';
mkdirSync(OUT, { recursive: true });

const ETAPAS = (process.env.ETAPAS ?? 'prof_publica,aluno_candidata,prof_aprova,aluno_aprovado').split(',');
const browser = await chromium.launch({ slowMo: 120 });
const marcas = {};

async function sessao(nome, email, senha, passos) {
  if (!ETAPAS.includes(nome)) return;
  const ctx = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: OUT, size: { width: 1920, height: 1080 } },
  });
  const page = await ctx.newPage();
  const t0 = Date.now();
  marcas[nome] = [];
  const marca = (rotulo) => { marcas[nome].push({ rotulo, t: (Date.now() - t0) / 1000 }); console.log(nome, rotulo); };
  await page.goto(`${BASE}/login`);
  await page.waitForSelector('input[type="email"]', { timeout: 60000 });
  marca('login');
  await page.locator('input[type="email"]').pressSequentially(email, { delay: 25 });
  await page.fill('input[type="password"]', senha);
  await page.click('button[type="submit"]');
  await page.waitForURL(u => !u.pathname.startsWith('/login'), { timeout: 20000 });
  await page.waitForLoadState('networkidle');
  await passos(page, marca);
  await page.waitForTimeout(1500);
  marca('fim');
  const video = page.video();
  await ctx.close();
  renameSync(await video.path(), `${OUT}/${nome}.webm`);
}

const pausa = (page, ms = 1500) => page.waitForTimeout(ms);

// 1. Professor publica a vaga.
await sessao('prof_publica', process.env.TEST_OFFERER_EMAIL, process.env.TEST_OFFERER_PASSWORD, async (page, marca) => {
  marca('painel'); await pausa(page, 2000);
  await page.goto(`${BASE}/offerer/opportunities/new`, { waitUntil: 'networkidle' });
  marca('formulario');
  await page.locator('#title').pressSequentially(TITULO, { delay: 30 });
  await page.fill('#description', 'Vaga de exemplo criada para a demonstração do ITERI. Apoio aos alunos de Cálculo I em listas de exercícios e plantões de dúvidas.');
  await page.fill('#workload', '8h semanais');
  await page.fill('#payRate', '18');
  await page.fill('#startDate', '2026-10-19');
  await page.fill('#applicationDeadline', '2026-10-16');
  await page.fill('#requiredCourse', 'Engenharia');
  await page.mouse.wheel(0, 900); await pausa(page, 800);
  marca('publicar');
  await page.getByRole('button', { name: 'Publicar Vaga' }).click();
  await page.waitForURL('**/offerer/opportunities', { timeout: 20000 });
  await page.waitForLoadState('networkidle');
  marca('publicada'); await pausa(page, 2500);
});

// 2. Aluno encontra a vaga e se candidata.
await sessao('aluno_candidata', process.env.TEST_STUDENT_EMAIL, process.env.TEST_STUDENT_PASSWORD, async (page, marca) => {
  await page.goto(`${BASE}/student/feed`, { waitUntil: 'networkidle' });
  marca('feed'); await pausa(page, 2500);
  await page.getByText(TITULO).first().click();
  await page.waitForLoadState('networkidle');
  marca('vaga'); await pausa(page, 2500);
  await page.getByRole('button', { name: 'Candidatar-se Agora' }).click();
  marca('confirmar'); await pausa(page, 2000);
  await page.getByRole('button', { name: 'Confirmar candidatura' }).click();
  await pausa(page, 2500);
  await page.goto(`${BASE}/student/applications`, { waitUntil: 'networkidle' });
  marca('em_analise'); await pausa(page, 3000);
});

// 3. Professor vê o candidato e aprova.
await sessao('prof_aprova', process.env.TEST_OFFERER_EMAIL, process.env.TEST_OFFERER_PASSWORD, async (page, marca) => {
  marca('painel'); await pausa(page, 2500);
  await page.goto(`${BASE}/offerer/opportunities`, { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'Ver Candidatos' }).first().click();
  await page.waitForLoadState('networkidle');
  marca('candidatos'); await pausa(page, 2500);
  await page.getByRole('button', { name: 'Aprovar', exact: true }).first().click();
  marca('aprovado'); await pausa(page, 3000);
});

// 4. Aluno vê a aprovação.
await sessao('aluno_aprovado', process.env.TEST_STUDENT_EMAIL, process.env.TEST_STUDENT_PASSWORD, async (page, marca) => {
  await page.goto(`${BASE}/student/applications`, { waitUntil: 'networkidle' });
  marca('aprovada'); await pausa(page, 3500);
});

await browser.close();
writeFileSync(`${OUT}/marcas_${ETAPAS.join('+')}.json`, JSON.stringify(marcas, null, 2));
