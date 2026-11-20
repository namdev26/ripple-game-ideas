// Xem trước 1 bộ mô hình mà không đụng mobile.html: kiểm lỗi dựng + chụp ảnh.
//   node tools/preview-set.js sets/1-am-thuc.js            → tests/.tmp/preview_1-am-thuc.png (lưới mọi mô hình, kèm số mảnh / độ hiếm)
//   node tools/preview-set.js sets/1-am-thuc.js "Bánh mì"  → tests/.tmp/preview_1-am-thuc_<tên>.png (4 góc nhìn + vài bước lắp của 1 mô hình)
// In ra: số mảnh, số bước, cỡ mảnh, ô phải thêm cột đỡ (fix — phải bằng 0), lỗi lơ lửng/đè.
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const root = path.join(__dirname, '..'), file = path.resolve(process.argv[2]), one = process.argv[3];
const base = path.basename(file, '.js'), tmp = path.join(root, 'tests', '.tmp'); fs.mkdirSync(tmp, { recursive: true });
const src = fs.readFileSync(path.join(root, 'mobile.html'), 'utf8'), a = src.indexOf('// <SETS>'), b = src.indexOf('// </SETS>');
let html = src.slice(0, a) + '// <SETS>\nconst SETS=[];\n' + fs.readFileSync(file, 'utf8') + '\n' + src.slice(b);

// 1) kiểm lỗi bằng khối DỮ LIỆU (không cần trình duyệt)
const da = html.indexOf('// ====================== DỮ LIỆU'), db = html.indexOf('// ====================== HÌNH HỌC');
const asserts = []; const con = { assert: (c, ...m) => { if (!c) asserts.push(m.join(' ')); }, warn: () => {}, log: () => {} };
const E = new Function('console', html.slice(da, db) + ';return {PARTS,LEVELS,levelTargets,RARITY,RAR};')(con);
const fp = (k, r) => { const p = E.PARTS[k]; return r % 2 ? [p.d, p.w] : [p.w, p.d]; };
let bad = 0;
E.LEVELS.forEach(lv => {
  const ts = E.levelTargets(lv), hm = new Map(), vox = new Set(), err = [];
  let maxH = 0, small = 0;
  ts.forEach(t => {
    if (!E.PARTS[t.key]) return err.push('mảnh lạ ' + t.key);
    const [fx, fz] = fp(t.key, t.rot), top = t.y + E.PARTS[t.key].h, id = `${t.key} ${t.color} (${t.x},${t.y},${t.z})`;
    if (t.x < 0 || t.z < 0 || t.x + fx > lv.size[0] || t.z + fz > lv.size[1]) err.push('ra ngoài đế ' + id);
    let m = 0; for (let i = 0; i < fx; i++) for (let j = 0; j < fz; j++) m = Math.max(m, hm.get((t.x + i) + ',' + (t.z + j)) || 0);
    if (m !== t.y) err.push(`lơ lửng/đè ${id}, bên dưới cao ${m}`);
    for (let i = 0; i < fx; i++) for (let j = 0; j < fz; j++) { hm.set((t.x + i) + ',' + (t.z + j), top);
      for (let y = t.y; y < top; y++) { const k = `${t.x + i},${y},${t.z + j}`; if (vox.has(k)) err.push('đè ' + id); vox.add(k); } }
    if (fx * fz === 1) small++; maxH = Math.max(maxH, top);
  });
  const fix = (lv.fix || []).length; bad += err.length + fix;
  console.log(`${lv.name}: ${ts.length} mảnh (1x1: ${small}), ${lv.steps.length} bước, đế ${lv.size.join('x')}, cao ${(maxH / 3).toFixed(1)} viên, ${E.RAR[E.RARITY[lv.name]].n}`
    + (fix ? ` ✗ ${fix} ô phải thêm cột đỡ: ${lv.fix.slice(0, 4).join(' | ')}` : '') + (err.length ? '\n  ✗ ' + err.slice(0, 6).join('\n  ✗ ') : ''));
});
asserts.forEach(m => { bad++; console.log('✗ ' + m); });

// 2) ảnh: lưới cả bộ, hoặc 1 mô hình 4 góc + các bước
const shot = `<script>window.__noAuto=1;try{localStorage.clear();}catch(e){}</script>`;
const post = `<script>addEventListener('load',()=>setTimeout(()=>{
  const ONE=${JSON.stringify(one || null)}, L=LEVELS, d=document.createElement('div');
  d.style.cssText='position:fixed;inset:0;z-index:99;background:#eef1fa;display:flex;flex-wrap:wrap;gap:8px;padding:8px;font:700 15px system-ui;color:#2b3150;align-content:flex-start';
  const card=(src,t)=>'<div style="width:330px;background:#fff;border-radius:10px;text-align:center"><img src="'+src+'" style="width:330px;height:330px"><div style="padding:4px">'+t+'</div></div>';
  thumbR.setSize(512,512);
  if (!ONE) d.innerHTML=L.map((lv,i)=>card(thumbModel('pv'+i,lv),(i+1)+'. '+lv.name+' · '+levelTargets(lv).length+' mảnh · '+RAR[rarOf(i)].n)).join('');
  else { const i=L.findIndex(l=>l.name===ONE), lv=L[i], N=lv.steps.length, V=THREE.Vector3;
    if (i<0){ d.textContent='không có mô hình '+ONE; } else {
    const dirs=[[0.55,0.65,1],[-1,0.65,0.55],[-0.55,0.5,-1],[0.15,2.2,0.3]];
    d.innerHTML=dirs.map((v,k)=>card(thumbModel('pv'+k,lv,false,new V(...v)),['trước-phải','trước-trái','sau','trên'][k])).join('')
      +[Math.floor(N/4),Math.floor(N/2),Math.floor(3*N/4),N-1].map(n=>card(thumbStep(i,n,false,true),'bước '+(n+1)+'/'+N)).join(''); } }
  document.body.appendChild(d); document.title='OK';
},400));</script>`;
html = html.replace('<script src=', shot + '\n<script src=').replace(/<\/body>/, post + '\n</body>');
const out = path.join(tmp, 'preview_' + base + (one ? '_' + one.replace(/[^\p{L}\p{N}]+/gu, '-') : '') + '.html');
fs.writeFileSync(out, html);
const n = one ? 8 : E.LEVELS.length, rows = Math.ceil(n / 4), png = out.replace(/\.html$/, '.png');
const ud = fs.mkdtempSync(path.join(os.tmpdir(), 'xg-pv-'));
try { execFileSync(CHROME, ['--headless=new', '--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--mute-audio', '--disable-audio-output', `--user-data-dir=${ud}`, '--hide-scrollbars',
  `--window-size=${4 * 338 + 16},${rows * 372 + 16}`, '--virtual-time-budget=20000', `--screenshot=${png}`, 'file:///' + out.split(path.sep).join('/')], { stdio: 'ignore', timeout: 120000 }); } catch (e) {}
fs.rmSync(ud, { recursive: true, force: true });
console.log((bad ? bad + ' lỗi' : 'không lỗi') + ' · ảnh: ' + png);
process.exit(bad ? 1 : 0);
