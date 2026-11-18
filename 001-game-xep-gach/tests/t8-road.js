// Đường lắp (level tự dẫn) + nhảy cóc mua trước + mục tiêu ghim + bảng thiếu xu + QC ×2 / hồi mạng / giới hạn QC
const save0 = o => new Function("localStorage.setItem('xepgach.v2'," + JSON.stringify(JSON.stringify(o)) + ')');
module.exports = [
  { name: 'duong-lap', pre: save0({ tut: 6 }), post: async () => {
      ok(ROAD.length === LEVELS.length && new Set(ROAD).size === LEVELS.length && LEVELS[ROAD[0]].name === 'Cây nấm', 'đường lắp đủ mọi mô hình, bắt đầu Cây nấm');
      ok(roadNext() === ROAD[0] && $('hNextBtn').textContent.includes('LEVEL 1') && $('hNext').textContent.includes('Cây nấm'), 'màn chính: LẮP LEVEL 1');
      $('hNextBtn').click();
      ok($('bpView').classList.contains('show') && bpI === ROAD[0] && owned(ROAD[0]), 'level miễn phí: có mô hình, mở sách');
      startBuild(bpI); commitAll();
      ok(S.coins === rewardFor(ROAD[0], 3) && roadNext() === ROAD[1], 'xong Lv1 → Lv2');
      $('rNext').click(); ok($('bpView').classList.contains('show') && bpI === ROAD[1], 'TIẾP TỤC → sách level kế');
  } },
  { name: 'nhay-coc', pre: save0({ tut: 6, coins: 300, best: { 'Cây nấm': 3 } }), post: async () => {
      const cmc = LEVELS.findIndex(l => l.name === 'Chùa Một Cột'), k = ROAD.indexOf(cmc);
      ok(k > 2, 'Chùa Một Cột ở xa trên đường: ' + k);
      shelf(); const pr = buyPrice(cmc); openShop(cmc); $('mBuy').click();
      ok(S.coins === 300 - pr && owned(cmc), 'mua trước: ' + S.coins);
      S.best['Chùa Một Cột'] = 2; save();
      ok(roadNext() === ROAD[1], 'nhảy cóc xong vẫn quay về Lv2');
      ROAD.slice(1, k).forEach(i => S.best[LEVELS[i].name] = 1); save(); showHome();
      ok(roadNext() === ROAD[k + 1] && $('hNextBtn').textContent.includes('LEVEL ' + (k + 2)), 'tới lượt mô hình đã mua thì tự bỏ qua');
  } },
  { name: 'hop-khong-trung', pre: save0({ tut: 6, coins: 99999, best: { 'Cây nấm': 3 } }), post: async () => {
      for (let n = 0; n < LEVELS.length - 1; n++) {
        const g = peekBox(); ok(!owned(g.i) && (g.i !== roadNext() || ALL_IDX.filter(i => !owned(i)).length === 1), 'hộp ra cái chưa có, không trùng level kế: ' + g.i);
        const c = ALL_IDX.filter(owned).length; openBox(); ok(ALL_IDX.filter(owned).length === c + 1, 'mỗi hộp thêm 1 mô hình');
      }
      ok(!$('hKhoBtn') && !$('kho'), 'không còn kho');
      const sp = Object.keys(S.sp).length, g = peekBox(); ok(g.sp && !special(g.i), 'có đủ rồi: hộp ra bản vàng kim');
      openBox(); ok(Object.keys(S.sp).length === sp + 1, 'nâng vàng kim');
  } },
  { name: 'thieu-xu', pre: save0({ tut: 6, coins: 100, best: { 'Cây nấm': 3 } }), post: async () => {
      const ld = LEVELS.findIndex(l => l.name === 'Lâu đài');
      openShop(ld); $('mBuy').click();
      ok($('needModal').classList.contains('show') && $('needModal').textContent.includes('thiếu ' + (buyPrice(ld) - 100)), 'bảng thiếu xu');
      ok(S.goal === 'Lâu đài' && !owned(ld) && S.coins === 100, 'tự ghim mục tiêu, chưa trừ xu');
      ok($('needPlay').textContent.includes('LEVEL 2') && $('needBox').textContent.includes('100') && $('needAd').textContent.includes('30'), '3 lối: lắp level kế, hộp, QC');
      $('needPlay').click(); ok($('bpView').classList.contains('show') && bpI === roadNext(), 'lắp level kế');
  } },
  { name: 'muc-tieu', pre: save0({ tut: 6, coins: 100, best: { 'Cây nấm': 3 }, goal: 'Lâu đài' }), post: async () => {
      const ld = LEVELS.findIndex(l => l.name === 'Lâu đài'), t = $('hGoal').textContent;
      ok(t.includes('Lâu đài') && t.includes('100/' + shopPrice(ld)) && t.includes('LEVEL 2'), 'thẻ mục tiêu: ' + t);
      const R = e => $(e).getBoundingClientRect(), hit = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
      ok(!hit(R('hGoal'), R('hDrawer')) && !hit(R('hGoal'), R('hNext')), 'thẻ mục tiêu không đè ngăn kéo / nút level');
      S.coins = 999; renderHome(); $('hGoalBuy').click();
      ok($('shop').classList.contains('show') && mSel === ld, 'đủ xu: bấm mua mở cửa hàng chọn sẵn');
      $('mBuy').click(); ok(owned(ld) && !S.goal, 'mua xong bỏ mục tiêu');
  } },
  { name: 'qc-x2', budget: 30000, pre: save0({ tut: 6, coins: 0, best: { 'Cây nấm': 3 }, goal: 'Lâu đài' }), post: async () => {
      giveModel(1); startBuild(1); commitAll(); const r = rewardFor(1, 3); await wait(1500); $('skipBtn').click();
      ok(S.coins === r && $('rX2').offsetWidth > 0 && $('result').textContent.includes('Lâu đài'), 'kết quả: nút ×2 + tiến độ mục tiêu');
      $('rX2').click(); await wait(3500);
      ok(S.coins === 2 * r && $('rX2').offsetWidth === 0, 'xem QC: nhân đôi, 1 lần');
      $('rAgain').click(); commitAll(); await wait(1500); $('skipBtn').click(); ok(S.coins === 2 * r && $('rX2').offsetWidth === 0, 'lắp lại: không xu, không ×2');
  } },
  { name: 'hoi-mang', pre: save0({ tut: 6, coins: 60, best: { 'Cây nấm': 3 } }), post: async () => {
      startBuild(0); wrong(); wrong(); wrong(); await wait(900);
      ok($('loseModal').classList.contains('show') && $('lAd').offsetWidth > 0 && $('lCoin').textContent.includes('50'), 'thua: hồi mạng bằng QC hoặc 50 xu');
      $('lCoin').click(); ok(!$('loseModal').classList.contains('show') && !done && mistakes === 2 && S.coins === 10, 'trả 50 xu: hồi 1 mạng');
      wrong(); await wait(900); ok(!$('loseModal').classList.contains('show') && $('failModal').classList.contains('show'), 'mỗi màn hồi 1 lần: thua lần 2 vào thẳng bảng thua');
  } },
  { name: 'gioi-han-qc', budget: 40000, pre: save0({ tut: 6, coins: 0, best: { 'Cây nấm': 3 } }), post: async () => {
      openGacha(); $('adBtn').click(); await wait(3500);
      ok(ALL_IDX.filter(owned).length === 2, 'QC mở hộp lần 1');
      $('ubLater').click(); ok($('adBtn').classList.contains('dis') && $('adBtn').textContent.includes('0/1'), 'hết lượt QC hộp hôm nay');
      for (let k = 0; k < 4; k++) { adCoins(); await wait(3500); }
      ok(S.coins === 90, 'QC +30 tối đa 3 lần/ngày: ' + S.coins);
  } },
  { name: 'ke-hom-nay', budget: 30000, pre: save0({ tut: 6, coins: 500, best: { 'Cây nấm': 3 }, goal: 'Khuê Văn Các' }), post: async () => {
      openShop();
      const ids = () => [...document.querySelectorAll('#mShelf .mItem')].map(e => +e.dataset.i), kv = LEVELS.findIndex(l => l.name === 'Khuê Văn Các');
      const a = ids();
      ok(a.length === 6 && new Set(a).size === 6 && a.every(i => !owned(i) && i !== roadNext()), 'kệ 6 ô, chưa có, không gồm level kế (miễn phí): ' + a);
      ok(a.includes(kv) && a.includes(ROAD[2]) && a.includes(ROAD[3]), 'kệ có mục tiêu + 2 mô hình sắp tới trên đường');
      const sale = document.querySelectorAll('#mShelf .mItem.sale');
      ok(sale.length === 1 && rarOf(+sale[0].dataset.i) > 0 && buyPrice(+sale[0].dataset.i) === Math.round(shopPrice(+sale[0].dataset.i) * 0.8 / 5) * 5, '1 ô hiếm/huyền thoại giảm 20%');
      ok(/\d+:\d\d:\d\d/.test($('shop').textContent) && S.daily.d === new Date().toDateString(), 'đếm ngược tới lúc đổi kệ, lưu theo ngày');
      renderShopM(); ok(JSON.stringify(ids()) === JSON.stringify(a), 'trong ngày kệ giữ nguyên');
      showSeries(); const rows = document.querySelectorAll('#sList .sRow');
      ok(rows.length === SERIES.length && [...rows].every((r, s) => r.querySelectorAll('.sRowL .mItem').length === SERIES[s].n && !r.querySelector('.sMore')), 'tất cả mô hình: mỗi bộ 1 hàng cuộn ngang, không mở rộng xuống');
      ok(rows[0].textContent.includes('1/4'), 'hàng có số đã có / tổng');
      const L1 = rows[1].querySelector('.sRowL'); ok(L1.scrollWidth > L1.clientWidth && getComputedStyle(L1).overflowX === 'auto', 'hàng dài hơn khung: cuộn ngang');
      $('serClose').click(); const si = +sale[0].dataset.i; document.querySelector(`#mShelf .mItem[data-i="${si}"]`).click(); $('mBuy').click();
      ok(owned(si) && S.coins === 500 - buyPrice(si), 'mua giá giảm: ' + S.coins);
      openShop(); $('mShelfAd').click(); await wait(3500);
      ok(S.daily.d === new Date().toDateString() && !$('mShelfAd'), 'xem QC đổi kệ mới, 1 lần/ngày');
  } },
];
module.exports.lib = require('./t4-build.js').lib;
