// Đường lắp (level tự dẫn) + nhảy cóc mua trước + mục tiêu ghim + bảng thiếu xu + QC ×2 / hồi mạng / giới hạn QC
const save0 = o => new Function("localStorage.setItem('xepgach.v2'," + JSON.stringify(JSON.stringify(o)) + ')');
module.exports = [
  { name: 'duong-lap', pre: save0({ tut: 6 }), post: async () => {
      ok(ROAD.length === LEVELS.length && new Set(ROAD).size === LEVELS.length && LEVELS[ROAD[0]].name === '@R0', 'đường lắp đủ mọi mô hình, bắt đầu Cây nấm');
      ok(firstFree() && $('hNextBtn').textContent.includes('@R0'), 'màn chính: lắp Cây nấm miễn phí');
      $('hNextBtn').click();
      ok($('bpView').classList.contains('show') && bpI === ROAD[0] && owned(ROAD[0]), 'mô hình đầu miễn phí: có mô hình, mở sách');
      startBuild(bpI); commitAll();
      ok(S.coins === rewardFor(ROAD[0], 3) && S.coins >= BOX_PRICE, 'thắng đủ xu mở hộp kế');
      showHome(); ok($('hNextBtn').textContent.includes('MỞ HỘP'), 'hết mô hình chờ lắp: nút chính là MỞ HỘP');
      $('hNextBtn').click(); ok($('unbox').classList.contains('show') && pendingList().length === 1, 'mở hộp ra mô hình mới');
      showHome(); ok($('hNextBtn').textContent.includes(LEVELS[pendingList()[0]].name), 'rồi LẮP TIẾP mô hình đó');
  } },
  { name: 'nhay-coc', pre: save0({ tut: 6, coins: 300, best: { '@R0': 3 } }), post: async () => {
      const cmc = LEVELS.findIndex(l => l.name === '@R16'), k = ROAD.indexOf(cmc);
      ok(k > 2, 'Chùa Một Cột ở xa trên đường: ' + k);
      shelf(); const pr = buyPrice(cmc); openShop(cmc); $('mBuy').click();
      ok(S.coins === 300 - pr && owned(cmc), 'mua trước: ' + S.coins);
      showHome(); ok($('hNextBtn').textContent.includes('@R16'), 'mua xong: LẮP TIẾP mô hình vừa mua');
      ok(!boxOdds(boxPool()).some(o => o.i === cmc), 'đã mua thì hộp không ra nữa');
  } },
  { name: 'hop-khong-trung', pre: save0({ tut: 6, coins: 99999, best: { '@R0': 3 } }), post: async () => {
      for (let n = 0; n < LEVELS.length - 1; n++) {
        const g = peekBox(); ok(!owned(g.i), 'hộp ra cái chưa có: ' + g.i); ok((S.dry || 0) <= BOX_PITY, 'bảo hiểm Hiếm+ giữ được: ' + S.dry);
        const c = ALL_IDX.filter(owned).length; openBox(); ok(ALL_IDX.filter(owned).length === c + 1, 'mỗi hộp thêm 1 mô hình');
      }
      ok(!$('hKhoBtn') && !$('kho'), 'không còn kho');
      const sp = Object.keys(S.sp).length, g = peekBox(); ok(g.sp && !special(g.i), 'có đủ rồi: hộp ra bản vàng kim');
      openBox(); ok(Object.keys(S.sp).length === sp + 1, 'nâng vàng kim');
  } },
  { name: 'thieu-xu', pre: save0({ tut: 6, coins: 100, best: { '@R0': 3 }, own: { '@R1': true } }), post: async () => {
      const ld = LEVELS.findIndex(l => l.name === '@L0');
      openShop(ld); $('mBuy').click();
      ok($('needModal').classList.contains('show') && $('needModal').textContent.includes('thiếu ' + (buyPrice(ld) - 100)), 'bảng thiếu xu');
      ok(!('goal' in S) && !owned(ld) && S.coins === 100, 'chưa trừ xu, không ghim mục tiêu');
      ok($('needPlay').textContent.includes('@R1') && $('needBox').textContent.includes('100') && $('needAd').textContent.includes('30'), '3 lối: lắp mô hình đang chờ, hộp, QC');
      $('needPlay').click(); ok($('bpView').classList.contains('show') && bpI === ROAD[1], 'lắp mô hình đang chờ');
  } },
  { name: 'qc-x2', budget: 30000, pre: save0({ tut: 6, coins: 0, best: { '@R0': 3 } }), post: async () => {
      giveModel(1); startBuild(1); commitAll(); const r = rewardFor(1, 3); await wait(1500); $('skipBtn').click();
      ok(S.coins === r && $('rX2').offsetWidth > 0, 'kết quả: nút ×2');
      $('rX2').click(); await wait(3500);
      ok(S.coins === 2 * r && $('rX2').offsetWidth === 0, 'xem QC: nhân đôi, 1 lần');
      $('rAgain').click(); commitAll(); await wait(1500); $('skipBtn').click(); ok(S.coins === 2 * r && $('rX2').offsetWidth === 0, 'lắp lại: không xu, không ×2');
  } },
  { name: 'hoi-mang', pre: save0({ tut: 6, coins: 60, best: { '@R0': 3 } }), post: async () => {
      startBuild(0); wrong(); wrong(); wrong(); await wait(900);
      ok($('loseModal').classList.contains('show') && $('lAd').offsetWidth > 0 && $('lCoin').textContent.includes('50'), 'thua: hồi mạng bằng QC hoặc 50 xu');
      $('lCoin').click(); ok(!$('loseModal').classList.contains('show') && !done && mistakes === 2 && S.coins === 10, 'trả 50 xu: hồi 1 mạng');
      wrong(); await wait(900); ok(!$('loseModal').classList.contains('show') && $('failModal').classList.contains('show'), 'mỗi màn hồi 1 lần: thua lần 2 vào thẳng bảng thua');
  } },
  { name: 'gioi-han-qc', budget: 40000, pre: save0({ tut: 6, coins: 0, best: { '@R0': 3 } }), post: async () => {
      openGacha(); $('adBtn').click(); await wait(3500);
      ok(ALL_IDX.filter(owned).length === 2, 'QC mở hộp lần 1');
      $('ubLater').click(); ok($('adBtn').classList.contains('dis') && $('adBtn').textContent.includes('0/1'), 'hết lượt QC hộp hôm nay');
      for (let k = 0; k < 4; k++) { adCoins(); await wait(3500); }
      ok(S.coins === 90, 'QC +30 tối đa 3 lần/ngày: ' + S.coins);
  } },
  { name: 'ke-hom-nay', budget: 30000, pre: save0({ tut: 6, coins: 500, best: { '@R0': 3 } }), post: async () => {
      openShop();
      const ids = () => [...document.querySelectorAll('#mShelf .mItem')].map(e => +e.dataset.i);
      const a = ids();
      ok(a.length === 6 && new Set(a).size === 6 && a.every(i => !owned(i)), 'kệ 6 ô, chưa có: ' + a);
      ok(a.includes(ROAD[1]) && a.includes(ROAD[2]), 'kệ có 2 mô hình sắp tới trên đường');
      const sale = document.querySelectorAll('#mShelf .mItem.sale');
      ok(sale.length === 1 && rarOf(+sale[0].dataset.i) > 0 && buyPrice(+sale[0].dataset.i) === Math.round(shopPrice(+sale[0].dataset.i) * 0.8 / 5) * 5, '1 ô hiếm/huyền thoại giảm 20%');
      ok(/\d+:\d\d:\d\d/.test($('shop').textContent) && S.daily.d === new Date().toDateString(), 'đếm ngược tới lúc đổi kệ, lưu theo ngày');
      renderShopM(); ok(JSON.stringify(ids()) === JSON.stringify(a), 'trong ngày kệ giữ nguyên');
      const rows = document.querySelectorAll('#mAll .sRow');
      ok(rows.length === SERIES.length && [...rows].every((r, s) => r.querySelectorAll('.sRowL .mItem').length === SERIES[s].n && !r.querySelector('.sMore')), 'tất cả mô hình: mỗi bộ 1 hàng cuộn ngang, không mở rộng xuống');
      ok(rows[0].textContent.includes('1/' + SERIES[0].n), 'hàng có số đã có / tổng');
      const L1 = rows[1].querySelector('.sRowL'); ok(L1.scrollWidth > L1.clientWidth && getComputedStyle(L1).overflowX === 'auto', 'hàng dài hơn khung: cuộn ngang');
      const si = +sale[0].dataset.i; document.querySelector(`#mShelf .mItem[data-i="${si}"]`).click(); $('mBuy').click();
      ok(owned(si) && S.coins === 500 - buyPrice(si), 'mua giá giảm: ' + S.coins);
      openShop(); $('mShelfAd').click(); await wait(3500);
      ok(S.daily.d === new Date().toDateString() && !$('mShelfAd'), 'xem QC đổi kệ mới, 1 lần/ngày');
  } },
];
module.exports.lib = require('./t4-build.js').lib;

module.exports.push({ name: 'bo-muc-tieu', pre: save0({ tut: 6, coins: 100, best: { '@R0': 3 }, goal: '@R12' }), post: async () => {
  ok(!('goal' in S) && !$('hGoal') && !$('mGoal') && !$('rGoal'), 'save cũ có mục tiêu: xoá, không còn thẻ/nút mục tiêu');
} });
