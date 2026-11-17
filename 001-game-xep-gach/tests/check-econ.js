// Kiểm tra kinh tế hộp bí ẩn / cửa hàng mô hình trong khối DỮ LIỆU của mobile.html. Chạy: node tests/check-econ.js mobile.html
const fs = require('fs'), assert = require('assert');
const html = fs.readFileSync(process.argv[2] || __dirname + '/../mobile.html', 'utf8');
const a = html.indexOf('// ====================== DỮ LIỆU'), b = html.indexOf('// ====================== HÌNH HỌC');
const E = new Function(html.slice(a, b) + ';return {LEVELS,SERIES,seriesOf,rarOf,RAR,shopPrice,boxPrice,rewardFor,seriesBonus,seriesIdx,boxOdds,rollBox,SPECIAL_P,REBUILD_REWARD,COLORS,COLOR_VI,bomOf,partPrice};')();
const idx = n => { const i = E.LEVELS.findIndex(l => l.name === n); assert(i >= 0, n); return i; };
const eq = (x, y, m) => assert.strictEqual(x, y, m);

// giá: một hộp chung cho cả game (đổi 17/11/2026: hộp toàn game, ra trùng được)
eq(E.boxPrice(), 100);
eq(E.shopPrice(idx('Ngôi nhà')), 40); eq(E.shopPrice(idx('Lâu đài')), 70);
eq(E.shopPrice(idx('Tượng Rhodes')), 150); eq(E.shopPrice(idx('Kim tự tháp Giza')), 200); eq(E.shopPrice(idx('Đền Artemis')), 270);
eq(E.shopPrice(idx('Cầu Vàng')), 200); eq(E.shopPrice(idx('Chùa Một Cột')), 260); eq(E.shopPrice(idx('Khuê Văn Các')), 360);
// độ hiếm (spec mục 4.2)
const cnt = s => [0, 1, 2].map(r => E.seriesIdx(s).filter(i => E.rarOf(i) === r).length).join(',');
eq(cnt(0), '3,0,1'); eq(cnt(1), '3,3,1'); eq(cnt(2), '2,2,1');
eq(E.rarOf(idx('Đền Artemis')), 2); eq(E.rarOf(idx('Cây nấm')), 0);
// thưởng: lắp mô hình mới dù 1★ luôn đủ mở 1 hộp
eq(E.rewardFor(0, 1), 100); eq(E.rewardFor(idx('Đền Artemis'), 3), 320); eq(E.rewardFor(idx('Tượng Rhodes'), 1, true), 180);
eq(E.REBUILD_REWARD, 15);
E.LEVELS.forEach((l, i) => assert(E.rewardFor(i, 1) >= E.boxPrice(), '1★ không đủ mua hộp: ' + l.name));
// tỉ lệ cố định trên cả 16 mô hình, không đổi theo thứ đã có
const ALL = E.LEVELS.map((_, i) => i), odds = E.boxOdds(ALL);
assert(Math.abs(odds.find(o => o.i === idx('Đền Artemis')).p - 1 / 66) < 1e-9, 'Artemis 1/66');
assert(Math.abs(odds.find(o => o.i === 0).p - 6 / 66) < 1e-9, 'Cây nấm 6/66');
assert(Math.abs(odds.reduce((s, o) => s + o.p, 0) - 1) < 1e-9, 'tổng tỉ lệ = 1');
// trùng đổi ra xu bằng giá cửa hàng. Trung bình ~150 xu/hộp > giá hộp: chấp nhận (đủ bộ rồi thì xu ít chỗ tiêu);
// giá hộp 150 thì không lời nhưng phải lắp lại trung bình ~37 lần mới đủ 16 mô hình — quá cày
// rút
const seq = xs => { let k = 0; return () => xs[k++ % xs.length]; };
let r = E.rollBox(ALL, seq([0, 0.5])); eq(r.i, 0); eq(r.sp, false);
r = E.rollBox(ALL, seq([0.9999, 0.01])); eq(r.i, 15); eq(r.sp, true);
let nArt = 0, nSp = 0; const N = 60000;
for (let k = 0; k < N; k++) { const x = E.rollBox(ALL); assert(ALL.includes(x.i)); nArt += x.i === idx('Đền Artemis'); nSp += x.sp; }
assert(Math.abs(nArt / N - 1 / 66) < 0.004, 'tần suất Artemis ' + nArt / N);
assert(Math.abs(nSp / N - E.SPECIAL_P) < 0.008, 'tần suất đặc biệt ' + nSp / N);
// mô phỏng: chỉ mở hộp, lắp toàn 1★, trùng đổi xu → không bao giờ kẹt, đủ 16 mô hình
let totRb = 0, maxRb = 0, totSp = 0;
for (let run = 0; run < 1000; run++) {
  const own = new Set([0]); let coins = E.rewardFor(0, 1), spins = 0, rebuilds = 0; // hộp đầu tặng Cây nấm, lắp xong
  while (own.size < ALL.length) {
    while (coins < E.boxPrice()) { coins += E.REBUILD_REWARD; rebuilds++; } // thiếu xu: lắp lại mô hình cũ (+15) — không bao giờ kẹt hẳn
    coins -= E.boxPrice(); spins++;
    const x = E.rollBox(ALL);
    if (own.has(x.i)) coins += E.shopPrice(x.i); else { own.add(x.i); coins += E.rewardFor(x.i, 1); }
  }
  assert(spins < 2000, 'quá nhiều lượt: ' + spins); totRb += rebuilds; totSp += spins; maxRb = Math.max(maxRb, rebuilds);
}
assert(totRb / 1000 < 3 && maxRb < 60, 'phải lắp lại quá nhiều vì thiếu xu: ' + totRb / 1000 + ' / ' + maxRb);
console.log('đủ 16 mô hình: trung bình', totSp / 1000, 'hộp; lắp lại vì thiếu xu: trung bình', totRb / 1000, 'tối đa', maxRb);
// sách: mọi màu có tên tiếng Việt; bom gom đúng số mảnh
Object.keys(E.COLORS).forEach(c => assert(E.COLOR_VI[c], 'thiếu tên màu ' + c));
eq(E.bomOf(0).reduce((s, m) => s + m.n, 0), E.LEVELS[0].steps.flat().length);
eq(E.partPrice('base_12x12'), 12);
console.log('check-econ OK');
