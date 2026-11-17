// Kiểm tra kinh tế hộp bí ẩn / cửa hàng mô hình trong khối DỮ LIỆU của mobile.html. Chạy: node tests/check-econ.js mobile.html
const fs = require('fs'), assert = require('assert');
const html = fs.readFileSync(process.argv[2] || __dirname + '/../mobile.html', 'utf8');
const a = html.indexOf('// ====================== DỮ LIỆU'), b = html.indexOf('// ====================== HÌNH HỌC');
const E = new Function(html.slice(a, b) + ';return {LEVELS,SERIES,seriesOf,rarOf,RAR,shopPrice,boxPrice,rewardFor,seriesBonus,seriesIdx,boxOdds,rollBox,SPECIAL_P,REBUILD_REWARD,ROAD,COLORS,COLOR_VI,bomOf,partPrice};')();
const idx = n => { const i = E.LEVELS.findIndex(l => l.name === n); assert(i >= 0, n); return i; };
const eq = (x, y, m) => assert.strictEqual(x, y, m);
const ALL = E.LEVELS.map((_, i) => i);

// kinh tế bản 2 (17/11/2026): đường lắp tự dẫn + mua trước mô hình mơ ước; xem docs/superpowers/specs/2026-11-17-kinh-te-vong-choi-design.md
eq(E.boxPrice(), 100);
eq(E.shopPrice(idx('Ngôi nhà')), 150); eq(E.shopPrice(idx('Chùa Một Cột')), 250); eq(E.shopPrice(idx('Lâu đài')), 400);
eq(E.rewardFor(idx('Ngôi nhà'), 1), 60); eq(E.rewardFor(idx('Ngôi nhà'), 2), 75); eq(E.rewardFor(idx('Ngôi nhà'), 3), 90);
eq(E.rewardFor(idx('Chùa Một Cột'), 3), 120); eq(E.rewardFor(idx('Đền Artemis'), 3), 180); eq(E.rewardFor(idx('Tượng Rhodes'), 3, true), 110);
eq(E.REBUILD_REWARD, 0); eq(E.seriesBonus(0), 200); eq(E.seriesBonus(2), 300);
// lắp xong luôn hơi thiếu so với mua đúng: mua trước phải tốn ≥ 2 level
ALL.forEach(i => assert(E.shopPrice(i) >= 1.6 * E.rewardFor(i, 3), 'mua đúng quá rẻ: ' + E.LEVELS[i].name));
// độ hiếm
const cnt = s => [0, 1, 2].map(r => E.seriesIdx(s).filter(i => E.rarOf(i) === r).length).join(',');
eq(cnt(0), '3,0,1'); eq(cnt(1), '3,3,1'); eq(cnt(2), '2,2,1');
// đường lắp: đủ 16, bắt đầu dễ, mô hình huyền thoại không ở 5 level đầu
eq(E.ROAD.length, 16); eq(new Set(E.ROAD).size, 16); eq(E.ROAD[0], idx('Cây nấm'));
E.ROAD.slice(0, 5).forEach(i => assert(E.rarOf(i) === 0, 'đầu đường phải dễ: ' + E.LEVELS[i].name));
// tỉ lệ theo pool (người gọi chỉ đưa mô hình chưa có)
const odds = E.boxOdds(ALL);
assert(Math.abs(odds.find(o => o.i === idx('Đền Artemis')).p - 1 / 66) < 1e-9, 'Artemis 1/66');
assert(Math.abs(odds.reduce((s, o) => s + o.p, 0) - 1) < 1e-9, 'tổng tỉ lệ = 1');
const seq = xs => { let k = 0; return () => xs[k++ % xs.length]; };
let r = E.rollBox(ALL, seq([0, 0.5])); eq(r.i, 0); eq(r.sp, false);
r = E.rollBox(ALL, seq([0.9999, 0.01])); eq(r.i, 15); eq(r.sp, true);
// mô phỏng người không xem QC, không mua: chỉ đi đường lắp (1–3★) → không bao giờ kẹt (level luôn miễn phí),
// xu cuối đường chỉ đủ "mua trước" một số lần, không đủ mua hết
let tot = 0, maxC = 0, minC = 1e9;
for (let run = 0; run < 1000; run++) {
  let coins = 0; const done = new Set();
  for (const i of E.ROAD) { coins += E.rewardFor(i, 1 + Math.floor(Math.random() * 3)); done.add(i);
    E.SERIES.forEach((sr, s) => { if (E.seriesIdx(s).every(j => done.has(j)) && !sr._b) { sr._b = 1; coins += E.seriesBonus(s); } }); }
  E.SERIES.forEach(sr => delete sr._b); tot += coins; maxC = Math.max(maxC, coins); minC = Math.min(minC, coins);
}
const all = ALL.reduce((s, i) => s + E.shopPrice(i), 0);
assert(maxC < all * 0.8, 'đi hết đường không được đủ tiền mua gần hết: ' + maxC + ' / ' + all);
assert(minC > 4 * E.boxPrice(), 'đi hết đường phải đủ vài hộp: ' + minC);
console.log('đi hết đường (không QC): trung bình', Math.round(tot / 1000), 'xu (', minC, '–', maxC, '); mua cả 16 ở cửa hàng:', all);
// sách: mọi màu có tên tiếng Việt; bom gom đúng số mảnh
Object.keys(E.COLORS).forEach(c => assert(E.COLOR_VI[c], 'thiếu tên màu ' + c));
eq(E.bomOf(0).reduce((s, m) => s + m.n, 0), E.LEVELS[0].steps.flat().length);
eq(E.partPrice('base_12x12'), 12);
console.log('check-econ OK');
