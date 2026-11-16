// Kiểm tra LEVELS trong mobile.html: part/màu tồn tại, mảnh không lơ lửng, không đè nhau.
const fs = require('fs');
const html = fs.readFileSync(process.argv[2], 'utf8');
const a = html.indexOf('// ====================== DỮ LIỆU'), b = html.indexOf('// ====================== HÌNH HỌC');
const { PARTS, COLORS, LEVELS, levelTargets } = new Function(html.slice(a, b) + ';return {PARTS,COLORS,LEVELS,levelTargets};')();
const fp = (k, r) => { const p = PARTS[k]; return r % 2 ? [p.d, p.w] : [p.w, p.d]; };
let bad = 0;
const err = (lv, m) => { bad++; console.log(`  ✗ [${lv}] ${m}`); };
LEVELS.forEach((lv, li) => {
  const ts = levelTargets(lv), hm = new Map(), vox = new Set();
  let maxH = 0;
  ts.forEach(t => {
    const id = `${t.key} ${t.color} (${t.x},${t.y},${t.z})`;
    if (!PARTS[t.key]) return err(lv.name, 'part lạ ' + id);
    if (!COLORS[t.color]) return err(lv.name, 'màu lạ ' + id);
    const [fx, fz] = fp(t.key, t.rot), top = t.y + PARTS[t.key].h;
    if (t.x < 0 || t.z < 0 || t.x + fx > lv.size[0] || t.z + fz > lv.size[1]) err(lv.name, 'ra ngoài size ' + id);
    let m = 0;
    for (let i = 0; i < fx; i++) for (let j = 0; j < fz; j++) m = Math.max(m, hm.get((t.x + i) + ',' + (t.z + j)) || 0);
    if (m !== t.y) err(lv.name, `lơ lửng/đè: ${id} nhưng bên dưới cao ${m}`);
    for (let i = 0; i < fx; i++) for (let j = 0; j < fz; j++) {
      hm.set((t.x + i) + ',' + (t.z + j), top);
      for (let y = t.y; y < top; y++) { const k = `${t.x + i},${y},${t.z + j}`; if (vox.has(k)) err(lv.name, 'đè ' + id); vox.add(k); }
    }
    maxH = Math.max(maxH, top);
  });
  console.log(`${li + 1}. ${lv.name}: ${ts.length} mảnh, ${lv.steps.length} bước, cao ${maxH} plate`);
});
console.log(bad ? `${bad} lỗi` : 'OK, không lỗi');
process.exit(bad ? 1 : 0);
