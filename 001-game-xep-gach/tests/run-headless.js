// Chạy test trong Chrome headless: node tests/run-headless.js tests/t2-state.js
// File case export mảng {name, query?, pre?(), post: async()} (+ tuỳ chọn .lib(): định nghĩa hàm dùng chung trên window); post ném lỗi = ERR. Lỗi JS/console.assert/console.error cũng = ERR.
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const src = fs.readFileSync(path.join(__dirname, '../mobile.html'), 'utf8');
const cases = require(path.resolve(process.argv[2]));
const only = process.argv[3];
const tmp = path.join(__dirname, '.tmp'); fs.mkdirSync(tmp, { recursive: true });
let fail = 0;
for (const c of cases) {
  if (only && c.name !== only) continue;
  const pre = `<script>window.__errs=[];window.addEventListener('error',e=>__errs.push('js: '+e.message));
const _a=console.assert;console.assert=(c,...m)=>{if(!c)__errs.push('assert: '+m.join(' '));};
const _e=console.error;console.error=(...m)=>{__errs.push('console.error: '+m.join(' '));};
window.ok=(c,m)=>{if(!c)throw m;};
try{localStorage.clear();}catch(e){}
(${cases.lib || (() => {})})();
(${c.pre || (() => {})})();</script>`;
  const post = `<script>window.addEventListener('load',()=>setTimeout(async()=>{let r;try{await (${c.post})();r=__errs.length?'ERR:'+__errs.join(' | '):'OK';}catch(e){r='ERR:'+(e&&e.message||e)+(__errs.length?' | '+__errs.join(' | '):'');}
document.title=r;const d=document.createElement('pre');d.id='__res';d.textContent=r;document.body.appendChild(d);},300));</script>`;
  let html = src.replace('<script src=', pre + '\n<script src=');
  html = html.replace(/<\/body>/, post + '\n</body>');
  const f = path.join(tmp, c.name.replace(/\W+/g, '_') + '.html');
  fs.writeFileSync(f, html);
  const ud = fs.mkdtempSync(path.join(os.tmpdir(), 'xg-'));
  let out = '';
  if (process.env.SHOT) { // SHOT=1: chụp ảnh tests/.tmp/<case>.png thay vì kiểm kết quả
    const png = f.replace(/\.html$/, '.png');
    try { execFileSync(CHROME, ['--headless=new', '--enable-unsafe-swiftshader', '--use-angle=swiftshader', `--user-data-dir=${ud}`, '--hide-scrollbars',
      '--window-size=432,768', `--virtual-time-budget=${c.budget || 15000}`, `--screenshot=${png}`, 'file:///' + f.split(path.sep).join('/') + (c.query || '')],
      { stdio: 'ignore', timeout: 90000 }); } catch (e) {}
    console.log('📷 ' + png); continue;
  }
  try {
    out = execFileSync(CHROME, ['--headless=new', '--enable-unsafe-swiftshader', '--use-angle=swiftshader', `--user-data-dir=${ud}`,
      '--window-size=432,768', `--virtual-time-budget=${c.budget || 15000}`, '--dump-dom', 'file:///' + f.split(path.sep).join('/') + (c.query || '')],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 90000, maxBuffer: 1 << 28 });
  } catch (e) { out = e.stdout || ''; }
  const m = out.match(/<pre id="__res">([\s\S]*?)<\/pre>/);
  const res = m ? m[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>') : 'ERR: không có kết quả (trang treo/lỗi tải)';
  if (res !== 'OK') fail++;
  console.log((res === 'OK' ? '✓ ' : '✗ ') + c.name + (res === 'OK' ? '' : '  → ' + res));
}
console.log(fail ? fail + ' case lỗi' : 'tất cả OK');
process.exit(fail ? 1 : 0);
