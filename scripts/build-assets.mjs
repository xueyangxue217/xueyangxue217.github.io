// Converts + optimizes source images into public/assets and emits a manifest.
// Uses macOS `sips` (no external deps). HEIC -> JPG, resized + recompressed.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const SRC_ROOT = path.resolve(process.cwd(), '..'); // portfolio web/
const OUT = path.resolve(process.cwd(), 'public/assets');
const MANIFEST = path.resolve(process.cwd(), 'src/data/media.json');

// project folder (Chinese) -> { slug, zh title }
const PROJECTS = [
  { dir: '中法文化之春', slug: 'sino-french-spring', zh: '中法文化之春' },
  { dir: '品牌伴手礼', slug: 'brand-gifts', zh: '品牌伴手礼' },
  { dir: '品牌合作-武汉网球公开赛', slug: 'wuhan-open', zh: '武汉网球公开赛 · 品牌合作' },
  { dir: '品牌活动-城市更新主题系列活动', slug: 'urban-renewal', zh: '城市更新主题系列活动' },
  { dir: '品牌活动-武汉市妇联寻美展览', slug: 'xunmei-exhibition', zh: '武汉市妇联「寻美」展览' },
  { dir: '戛纳电影节', slug: 'cannes', zh: '戛纳电影节 · 中国馆' },
  { dir: '瑞安房地产入汉20周年', slug: 'shui-on-20th', zh: '瑞安房地产入汉 20 周年特展' },
];

const isImg = (f) => /\.(jpe?g|png|webp|heic)$/i.test(f) && !f.startsWith('.');

function ensure(dir) { fs.mkdirSync(dir, { recursive: true }); }
function clean(dir) { fs.rmSync(dir, { recursive: true, force: true }); ensure(dir); }

// resize longest edge to `max`, output jpeg quality ~80
function convert(srcFile, outFile, max) {
  execFileSync('sips', [
    '-s', 'format', 'jpeg',
    '-s', 'formatOptions', '80',
    '-Z', String(max),
    srcFile, '--out', outFile,
  ], { stdio: 'ignore' });
}

// read pixel dimensions of an image via sips
function dims(file) {
  const out = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', file], { encoding: 'utf8' });
  const w = Number((out.match(/pixelWidth:\s*(\d+)/) || [])[1] || 0);
  const h = Number((out.match(/pixelHeight:\s*(\d+)/) || [])[1] || 0);
  return { w, h };
}

// Only clean the directories this script manages. `assets/home` and
// `assets/about` are curated by hand (cropped via PIL) — never wipe them.
ensure(OUT);
clean(path.join(OUT, 'projects'));
clean(path.join(OUT, 'posters'));
clean(path.join(OUT, 'life'));
const manifest = { projects: [], posters: [], life: [] };

// resolve a subfolder by NFC-normalized name (macOS stores names as NFD)
function resolveDir(parent, wanted) {
  if (!fs.existsSync(parent)) return null;
  const target = wanted.normalize('NFC');
  const hit = fs.readdirSync(parent).find((n) => n.normalize('NFC') === target);
  return hit ? path.join(parent, hit) : null;
}

// ---- Projects (read dynamically from disk; folders are numbered "N. 名称") ----
const PROJ_ROOT = resolveDir(SRC_ROOT, '项目图片') || path.join(SRC_ROOT, '项目图片');
const projDirs = fs.readdirSync(PROJ_ROOT)
  .filter((n) => !n.startsWith('.') && fs.statSync(path.join(PROJ_ROOT, n)).isDirectory())
  .sort((a, b) => (parseInt(a, 10) || 99) - (parseInt(b, 10) || 99) || a.localeCompare(b));

projDirs.forEach((dir, idx) => {
  const srcDir = path.join(PROJ_ROOT, dir);
  const num = (dir.match(/^\s*(\d+)/) || [])[1] || String(idx + 1);
  const title = dir.normalize('NFC').replace(/^\s*\d+[.．、]?\s*/, '').trim();
  const slug = `proj-${num}`;
  const outDir = path.join(OUT, 'projects', slug);
  ensure(outDir);
  const files = fs.readdirSync(srcDir).filter(isImg).sort();
  const images = [];
  const landscape = []; // horizontal images only (w > h)
  files.forEach((f, i) => {
    const name = String(i + 1).padStart(2, '0') + '.jpg';
    const rel = `assets/projects/${slug}/${name}`;
    try {
      const out = path.join(outDir, name);
      convert(path.join(srcDir, f), out, 1600);
      images.push(rel);
      const { w, h } = dims(out);
      if (w > h) landscape.push(rel);
    } catch (e) { console.warn('skip', f, e.message); }
  });
  const cover = landscape[0] || images[0] || null;
  manifest.projects.push({ slug, title, cover, images, landscape });
  console.log(`${slug} · ${title}: ${images.length} imgs, ${landscape.length} landscape`);
});

// ---- Posters (marquee) ----
{
  const srcDir = resolveDir(SRC_ROOT, '过往品牌活动海报') || path.join(SRC_ROOT, '过往品牌活动海报');
  const outDir = path.join(OUT, 'posters');
  ensure(outDir);
  const files = fs.readdirSync(srcDir).filter(isImg).sort();
  files.forEach((f, i) => {
    const name = String(i + 1).padStart(2, '0') + '.jpg';
    try {
      convert(path.join(srcDir, f), path.join(outDir, name), 900);
      manifest.posters.push(`assets/posters/${name}`);
    } catch (e) { console.warn('skip', f, e.message); }
  });
  console.log(`posters: ${manifest.posters.length}`);
}

// ---- Life snapshots ----
{
  const srcDir = resolveDir(SRC_ROOT, '生活碎片') || path.join(SRC_ROOT, '生活碎片');
  const outDir = path.join(OUT, 'life');
  ensure(outDir);
  const files = fs.readdirSync(srcDir).filter(isImg).sort();
  files.forEach((f, i) => {
    const name = String(i + 1).padStart(2, '0') + '.jpg';
    try {
      convert(path.join(srcDir, f), path.join(outDir, name), 1200);
      manifest.life.push(`assets/life/${name}`);
    } catch (e) { console.warn('skip', f, e.message); }
  });
  console.log(`life: ${manifest.life.length}`);
}

ensure(path.dirname(MANIFEST));
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
console.log('manifest ->', MANIFEST);
