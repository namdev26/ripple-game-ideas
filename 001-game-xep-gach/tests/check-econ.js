// Kiểm tra kinh tế hộp bí ẩn / cửa hàng mô hình trong khối DỮ LIỆU của mobile.html. Chạy: node tests/check-econ.js mobile.html
const fs = require('fs'), assert = require('assert');
const html = fs.readFileSync(process.argv[2] || __dirname + '/../mobile.html', 'utf8');
const a = html.indexOf('// ====================== DỮ LIỆU'), b = html.indexOf('// ====================== HÌNH HỌC');
const E = new Function(html.slice(a, b) + ';return {LEVELS,SERIES,seriesOf,rarOf,RAR,shopPrice,boxPrice,rewardFor,seriesBonus,seriesIdx,boxOdds,rollBox,SPECIAL_P,REBUILD_REWARD,COLORS,COLOR_VI,bomOf,partPrice};')();
const idx = n => { const i = E.LEVELS.findIndex(l => l.name === n); assert(i >= 0, n); return i; };
const eq = (x, y, m) => assert.strictEqual(x, y, m);

// giá (spec mục 6)
eq(E.boxPrice(0), 30); eq(E.boxPrice(1), 120); eq(E.boxPrice(2), 160);
eq(E.shopPrice(idx('Ngôi nhà')), 40); eq(E.shopPrice(idx('Lâu đài')), 70);
eq(E.shopPrice(idx('Tượng Rhodes')), 150); eq(E.shopPrice(idx('Kim tự tháp Giza')), 200); eq(E.shopPrice(idx('Đền Artemis')), 270);
eq(E.shopPrice(idx('Cầu Vàng')), 200); eq(E.shopPrice(idx('Chùa Một Cột')), 260); eq(E.shopPrice(idx('Khuê Văn Các')), 360);
// độ hiếm (spec mục 4.2)
const cnt = s => [0, 1, 2].map(r => E.seriesIdx(s).filter(i => E.rarOf(i) === r).length).join(',');
eq(cnt(0), '3,0,1'); eq(cnt(1), '3,3,1'); eq(cnt(2), '2,2,1');
eq(E.rarOf(idx('Đền Artemis')), 2); eq(E.rarOf(idx('Cây nấm')), 0);
// hộp luôn rẻ hơn mô hình rẻ nhất cửa hàng
E.SERIES.forEach((r, s) => E.seriesIdx(s).forEach(i => assert(E.boxPrice(s) < E.shopPrice(i), 'hộp phải rẻ hơn ' + E.LEVELS[i].name)));
// thưởng
eq(E.rewardFor(0, 1), 40); eq(E.rewardFor(idx('Đền Artemis'), 3), 320); eq(E.rewardFor(idx('Tượng Rhodes'), 1, true), 180);
eq(E.REBUILD_REWARD, 15);
E.LEVELS.forEach((l, i) => assert(E.rewardFor(i, 1) >= E.boxPrice(E.seriesOf(i)), '1★ không đủ mua hộp: ' + l.name));
E.SERIES.forEach((r, s) => { if (s + 1 < E.SERIES.length) assert(E.seriesBonus(s) >= E.boxPrice(s + 1), 'thưởng đủ bộ không đủ hộp bộ sau'); });
// tỉ lệ
const art = E.boxOdds(E.seriesIdx(1)).find(o => o.i === idx('Đền Artemis'));
assert(Math.abs(art.p - 1 / 28) < 1e-9, 'Artemis 1/28: ' + art.p);
assert(Math.abs(E.boxOdds(E.seriesIdx(2)).reduce((s, o) => s + o.p, 0) - 1) < 1e-9, 'tổng tỉ lệ = 1');
// rút
const seq = xs => { let k = 0; return () => xs[k++ % xs.length]; };
eq(E.rollBox([], false), null);
let r = E.rollBox([5, 9], true, seq([0, 0.5])); eq(r.i, 5); eq(r.sp, false);
r = E.rollBox([5, 9], true, seq([0.999, 0.01])); eq(r.i, 9); eq(r.sp, true);
r = E.rollBox([7], false, seq([0.5, 0.99])); eq(r.i, 7); eq(r.sp, true, 'bảo hiểm: hộp cuối chưa có đặc biệt');
r = E.rollBox([7], true, seq([0.5, 0.99])); eq(r.sp, false);
const pool = E.seriesIdx(1); let nArt = 0, nSp = 0; const N = 40000;
for (let k = 0; k < N; k++) { const x = E.rollBox(pool, true); assert(pool.includes(x.i)); nArt += x.i === idx('Đền Artemis'); nSp += x.sp; }
assert(Math.abs(nArt / N - 1 / 28) < 0.006, 'tần suất Artemis ' + nArt / N);
assert(Math.abs(nSp / N - E.SPECIAL_P) < 0.008, 'tần suất đặc biệt ' + nSp / N);
// mô phỏng: mọi kiểu mua (cửa hàng khi đủ tiền / hộp), lắp toàn 1★ → không bao giờ kẹt
for (let run = 0; run < 2000; run++) {
  const own = new Set([0]); let coins = E.rewardFor(0, 1), hasSp = {}; // hộp đầu tặng Cây nấm, lắp xong
  for (let s = 0; s < E.SERIES.length; s++) {
    let left = E.seriesIdx(s).filter(i => !own.has(i));
    while (left.length) {
      const can = left.filter(i => E.shopPrice(i) <= coins);
      let i, sp = false;
      if (can.length && Math.random() < 0.5) { i = can[Math.floor(Math.random() * can.length)]; coins -= E.shopPrice(i); }
      else {
        assert(coins >= E.boxPrice(s), `kẹt: bộ ${s} còn ${coins} xu < ${E.boxPrice(s)}`);
        const x = E.rollBox(left, !!hasSp[s]); i = x.i; sp = x.sp; if (sp) hasSp[s] = true; coins -= E.boxPrice(s);
      }
      own.add(i); left = left.filter(k => k !== i); coins += E.rewardFor(i, 1, sp);
    }
    coins += E.seriesBonus(s);
  }
}
// sách: mọi màu có tên tiếng Việt; bom gom đúng số mảnh
Object.keys(E.COLORS).forEach(c => assert(E.COLOR_VI[c], 'thiếu tên màu ' + c));
eq(E.bomOf(0).reduce((s, m) => s + m.n, 0), E.LEVELS[0].steps.flat().length);
eq(E.partPrice('base_12x12'), 12);
console.log('check-econ OK');
