// Kiểm tra kinh tế hộp bí ẩn / cửa hàng mô hình trong khối DỮ LIỆU của mobile.html. Chạy: node tests/check-econ.js mobile.html
const fs = require('fs'), assert = require('assert');
const html = fs.readFileSync(process.argv[2] || __dirname + '/../mobile.html', 'utf8');
const a = html.indexOf('// ====================== DỮ LIỆU'), b = html.indexOf('// ====================== HÌNH HỌC');
const E = new Function(html.slice(a, b) + ';return {LEVELS,SERIES,seriesOf,rarOf,RAR,shopPrice,boxPrice,rewardFor,seriesBonus,seriesIdx,boxOdds,rollBox,BOX_NEAR,BOX_FAR,BOX_PITY,BOX_PITY_N,SPECIAL_P,REBUILD_REWARD,ROAD,COLORS,COLOR_VI,bomOf,partPrice};')();
const idx = n => { const i = E.LEVELS.findIndex(l => l.name === n); assert(i >= 0, n); return i; };
const eq = (x, y, m) => assert.strictEqual(x, y, m);
const ALL = E.LEVELS.map((_, i) => i);

// kinh tế bản 3 (19/11/2026): vòng hộp — mở hộp 100 → lắp → thắng ≥ 100 → mở hộp kế; mua đúng mô hình ở cửa hàng ≈ 2–3 hộp
eq(E.boxPrice(), 100);
eq(E.shopPrice(idx('Ngôi nhà')), 250); eq(E.shopPrice(idx('Chùa Một Cột')), 300); eq(E.shopPrice(idx('Lâu đài')), 400);
eq(E.rewardFor(idx('Ngôi nhà'), 1), 100); eq(E.rewardFor(idx('Ngôi nhà'), 2), 125); eq(E.rewardFor(idx('Ngôi nhà'), 3), 150);
eq(E.rewardFor(idx('Chùa Một Cột'), 3), 180); eq(E.rewardFor(idx('Đền Artemis'), 3), 240); eq(E.rewardFor(idx('Tượng Rhodes'), 3, true), 180);
// thắng 1★ bất kỳ mô hình nào cũng đủ mở hộp kế
ALL.forEach(i => assert(E.rewardFor(i, 1) >= E.boxPrice(), 'thắng 1★ không đủ mở hộp: ' + E.LEVELS[i].name));
eq(E.REBUILD_REWARD, 0); eq(E.seriesBonus(0), 200); eq(E.seriesBonus(2), 300);
// lắp xong luôn hơi thiếu so với mua đúng: mua trước phải tốn ≥ 2 level
ALL.forEach(i => assert(E.shopPrice(i) >= 1.6 * E.rewardFor(i, 3), 'mua đúng quá rẻ: ' + E.LEVELS[i].name));
// độ hiếm
const cnt = s => [0, 1, 2].map(r => E.seriesIdx(s).filter(i => E.rarOf(i) === r).length).join(',');
eq(cnt(0), '3,0,1'); eq(cnt(1), '3,3,1'); eq(cnt(2), '2,2,1'); eq(cnt(3), '7,4,1'); eq(E.seriesBonus(3), 400);
// đường lắp: đủ mọi mô hình (28 = 16 + 12 con giáp), bắt đầu dễ, mô hình huyền thoại không ở 5 level đầu
eq(E.ROAD.length, 28); eq(E.LEVELS.length, 28); eq(new Set(E.ROAD).size, 28); eq(E.ROAD[0], idx('Cây nấm'));
E.ROAD.slice(0, 5).forEach(i => assert(E.rarOf(i) === 0, 'đầu đường phải dễ: ' + E.LEVELS[i].name));
// hộp ngẫu nhiên có kiểm soát: 3 mô hình kế trên đường chiếm 90% (50/30/20), xa 10% theo độ hiếm
const pOf = (od, i) => (od.find(o => o.i === i) || { p: 0 }).p, sum = od => od.reduce((s, o) => s + o.p, 0);
const pool = E.ROAD.slice(1), odds = E.boxOdds(pool); // đã có Cây nấm
assert(Math.abs(sum(odds) - 1) < 1e-9, 'tổng tỉ lệ = 1');
assert(Math.abs(pOf(odds, E.ROAD[1]) - 0.45) < 1e-9 && Math.abs(pOf(odds, E.ROAD[2]) - 0.27) < 1e-9 && Math.abs(pOf(odds, E.ROAD[3]) - 0.18) < 1e-9, 'gần: 45/27/18%');
const far = E.ROAD.slice(4), fw = far.reduce((s, i) => s + E.RAR[E.rarOf(i)].w, 0);
assert(Math.abs(pOf(odds, idx('Rồng')) - 0.1 * E.RAR[2].w / fw) < 1e-9 && pOf(odds, idx('Rồng')) < pOf(odds, idx('Dê')), 'xa: chia theo độ hiếm, huyền thoại ít nhất');
eq(E.boxOdds([E.ROAD[5], E.ROAD[9]]).length, 2); assert(Math.abs(sum(E.boxOdds([E.ROAD[5]])) - 1) < 1e-9, 'pool ít: vẫn đủ 100%');
// bảo hiểm: hết hạn dry → chắc chắn Hiếm+ trong 6 mô hình sắp tới
const pity = E.boxOdds(pool, E.BOX_PITY);
const near2 = pool.filter(i => E.rarOf(i) > 0).sort((a, b) => E.ROAD.indexOf(a) - E.ROAD.indexOf(b)).slice(0, E.BOX_PITY_N);
assert(pity.length === E.BOX_PITY_N && pity.every(o => near2.includes(o.i)) && Math.abs(sum(pity) - 1) < 1e-9, 'bảo hiểm ra Hiếm+ gần: ' + pity.map(o => E.LEVELS[o.i].name));
const seq = xs => { let k = 0; return () => xs[k++ % xs.length]; };
let r = E.rollBox(pool, seq([0, 0.5])); eq(r.i, E.ROAD[1]); eq(r.sp, false);
r = E.rollBox(pool, seq([0.9999, 0.01])); eq(r.sp, true); assert(E.ROAD.indexOf(r.i) > 3, 'số lớn → nhảy xa');
// mô phỏng 2000 người chỉ mở hộp: mô hình thứ k ra trung bình gần vị trí k trên đường (độ khó vẫn tăng dần), không bao giờ quá 4 hộp liền không Hiếm+
let drift = 0, maxDry = 0;
for (let run = 0; run < 2000; run++) {
  let left = E.ROAD.slice(1), dry = 0, k = 1;
  while (left.length) { const g = E.rollBox(left, Math.random, dry).i; drift += Math.abs(E.ROAD.indexOf(g) - k++); left = left.filter(i => i !== g);
    dry = E.rarOf(g) > 0 ? 0 : dry + 1; if (left.some(i => E.rarOf(i) > 0)) maxDry = Math.max(maxDry, dry); }
}
drift /= 2000 * (E.ROAD.length - 1);
assert(drift < 3, 'mô hình ra lệch đường trung bình < 3 bậc: ' + drift.toFixed(2)); assert(maxDry <= E.BOX_PITY, 'bảo hiểm giữ được: ' + maxDry);
console.log('hộp có kiểm soát: lệch đường trung bình', drift.toFixed(2), 'bậc');
// mô phỏng người không xem QC, không mua: lắp hết (1–3★), mỗi mô hình sau mô hình đầu tốn 1 hộp → không bao giờ kẹt,
// xu dư cuối đường chỉ đủ "mua trước" một số lần, không đủ mua hết
let tot = 0, maxC = 0, minC = 1e9;
for (let run = 0; run < 1000; run++) {
  let coins = 0; const done = new Set();
  for (const i of E.ROAD) { if (done.size) { assert(coins >= E.boxPrice(), 'kẹt: không đủ xu mở hộp'); coins -= E.boxPrice(); } coins += E.rewardFor(i, 1 + Math.floor(Math.random() * 3)); done.add(i);
    E.SERIES.forEach((sr, s) => { if (E.seriesIdx(s).every(j => done.has(j)) && !sr._b) { sr._b = 1; coins += E.seriesBonus(s); } }); }
  E.SERIES.forEach(sr => delete sr._b); tot += coins; maxC = Math.max(maxC, coins); minC = Math.min(minC, coins);
}
const all = ALL.reduce((s, i) => s + E.shopPrice(i), 0);
assert(maxC < all * 0.8, 'đi hết đường không được đủ tiền mua gần hết: ' + maxC + ' / ' + all);
assert(minC > 4 * E.boxPrice(), 'đi hết đường còn dư vài hộp: ' + minC);
console.log('đi hết đường (không QC, đã trừ hộp): dư trung bình', Math.round(tot / 1000), 'xu (', minC, '–', maxC, '); mua cả ' + ALL.length + ' ở cửa hàng:', all);
// sách: mọi màu có tên tiếng Việt; bom gom đúng số mảnh
Object.keys(E.COLORS).forEach(c => assert(E.COLOR_VI[c], 'thiếu tên màu ' + c));
eq(E.bomOf(0).reduce((s, m) => s + m.n, 0), E.LEVELS[0].steps.flat().length);
eq(E.partPrice('base_12x12'), 12);
// 12 con giáp dựng từ voxel: mọi ô phải tự có chỗ tựa, không phải thêm cột đỡ
E.LEVELS.forEach(l => assert(!(l.fix || []).length, 'cần thêm cột đỡ: ' + l.name + ' ' + (l.fix || []).join(' | ')));
console.log('check-econ OK');
