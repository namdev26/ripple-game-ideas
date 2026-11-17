// Hộp bí ẩn (mở hộp, tung trước, không trùng, bảo hiểm, lắc thử, tỉ lệ) + cửa hàng mô hình
// pre được chèn nguyên văn vào trang (mất closure) nên dựng hàm từ chuỗi
const save0 = o => new Function("localStorage.setItem('xepgach.v2'," + JSON.stringify(JSON.stringify(o)) + ')');

module.exports = [
  { name: 'hop-dau-mien-phi', post: async () => {
      ok($('playBtn').textContent.includes('Miễn phí'), 'nút mở hộp phải ghi Miễn phí: ' + $('playBtn').textContent);
      $('playBtn').click();
      ok($('unbox').classList.contains('show'), 'phải mở màn mở hộp');
      await wait(5600);
      ok(owned(0) && S.coins === 0, 'phải có Cây nấm, không mất xu');
      ok($('ubName').textContent.includes('Cây nấm') && $('ubBtns').classList.contains('on'), 'phải lộ mô hình + nút');
      $('ubBook').click();
      ok($('bpView').classList.contains('show') && bpI === 0, 'Mở sách → sách Cây nấm');
  } },
  { name: 'tung-truoc-khong-trung', pre: save0({ coins: 500, best: { 'Cây nấm': 3 } }), post: async () => {
      const nx = S.next[0];
      ok(nx && !owned(nx.i), 'phải tung trước hộp kế: ' + JSON.stringify(nx));
      ok(JSON.parse(localStorage.getItem('xepgach.v2')).next[0].i === nx.i, 'kết quả tung trước phải được lưu');
      $('playBtn').click(); await wait(5600);
      ok(owned(nx.i) && S.coins === 500 - boxPrice(0), 'ra đúng mô hình đã tung trước, trừ ' + boxPrice(0) + ': ' + S.coins);
      ok(!!S.sp[LEVELS[nx.i].name] === !!nx.sp, 'bản đặc biệt theo kết quả tung');
      ok(S.next[0] && !owned(S.next[0].i), 'hộp kế không trùng');
  } },
  { name: 'vong-quay', pre: save0({ coins: 500, best: { 'Cây nấm': 3 } }), post: async () => {
      const nx = S.next[0], pool = poolOf(0); $('playBtn').click();
      const cards = [...document.querySelectorAll('#ubStrip .rc')];
      ok(cards.length >= 30 && $('ubReel').offsetWidth > 0, 'phải có dải quay: ' + cards.length);
      ok(+cards[REEL_WIN].dataset.i === nx.i, 'ô trúng phải là mô hình đã tung trước');
      ok(cards.every(c => pool.includes(+c.dataset.i)), 'dải chỉ gồm mô hình có thể ra');
      ok(cards.every(c => c.querySelector('.pbox img') && c.textContent.includes(LEVELS[c.dataset.i].name)), 'mỗi ô là một hộp sản phẩm có tên');
      const A = $('ubArrow').getBoundingClientRect(), R0 = $('ubReel').getBoundingClientRect();
      ok(A.width > 0 && A.bottom <= R0.top + 1 && Math.abs(A.left + A.width / 2 - (R0.left + R0.width / 2)) < 2, 'mũi tên chỉ xuống ở giữa, phía trên dải');
      await wait(5600);
      ok(cards[REEL_WIN].classList.contains('win') && $('ubBtns').classList.contains('on'), 'dừng ở ô trúng rồi lộ mô hình');
      const pz = $('ubPrize').textContent;
      ok([LEVELS[nx.i].name, levelTargets(LEVELS[nx.i]).length + ' mảnh', RAR[rarOf(nx.i)].n].every(t => pz.includes(t)), 'hộp trúng: tên, số mảnh, độ hiếm: ' + pz);
      ok($('ubTitle').textContent === SERIES[0].name, 'trên cùng là tên bộ: ' + $('ubTitle').textContent);
      // headless không chạy transition nên bỏ transition để đo vị trí đích
      $('ubStrip').style.transition = 'none'; $('unbox').classList.remove('reveal'); cards[REEL_WIN].classList.remove('win');
      const w = cards[REEL_WIN].getBoundingClientRect(), R = $('ubReel').getBoundingClientRect();
      ok(Math.abs(w.left + w.width / 2 - (R.left + R.width / 2)) < 2, 'ô trúng phải nằm giữa vạch: ' + (w.left + w.width / 2) + ' vs ' + (R.left + R.width / 2));
  } },
  { name: 'tua-nhanh', pre: save0({ coins: 500, best: { 'Cây nấm': 3 } }), post: async () => {
      $('playBtn').click(); await wait(300); $('unbox').click(); await wait(1300);
      ok($('ubBtns').classList.contains('on'), 'chạm để tua phải lộ mô hình nhanh');
  } },
  { name: 'bao-hiem-dac-biet', pre: save0({ coins: 100, best: { 'Cây nấm': 1, 'Ngôi nhà': 1, 'Dưa hấu': 1 } }), post: async () => {
      $('playBtn').click(); await wait(5600);
      ok(owned(3) && special(3), 'mô hình cuối của bộ, bộ chưa có bản đặc biệt → chắc chắn đặc biệt');
      ok(document.querySelector('#ubPrize .pbox.sp'), 'hộp trúng là hộp vàng kim');
  } },
  { name: 'khong-du-xu', pre: save0({ coins: 10, best: { 'Cây nấm': 3 } }), post: async () => {
      $('playBtn').click();
      ok(!$('unbox').classList.contains('show') && S.coins === 10, 'không đủ xu thì không mở');
  } },
  { name: 'du-bo', pre: save0({ coins: 100, best: { 'Cây nấm': 1, 'Ngôi nhà': 1, 'Dưa hấu': 1 }, own: { 'Lâu đài': true } }), post: async () => {
      showHome(0);
      ok($('playBtn').classList.contains('dis') && $('playBtn').textContent.includes('ĐỦ BỘ'), 'bộ đã đủ: ' + $('playBtn').textContent);
      $('playBtn').click(); ok(!$('unbox').classList.contains('show') && S.coins === 100, 'không mở được');
  } },
  { name: 'lac-thu', pre: save0({ coins: 100, best: { 'Cây nấm': 3 } }), post: async () => {
      const nx = JSON.stringify(S.next[0]); $('hBox').click();
      ok($('hBox').classList.contains('shake'), 'phải lắc');
      ok(JSON.stringify(S.next[0]) === nx && S.coins === 100, 'lắc thử không mua, không đổi kết quả');
  } },
  { name: 'ti-le', pre: save0({ coins: 100, best: { 'Cây nấm': 3 } }), post: async () => {
      $('oddsBtn').click();
      const t = $('oddsModal').textContent;
      ok($('oddsModal').classList.contains('show') && ['Ngôi nhà', 'Dưa hấu', 'Lâu đài', '%', '12%'].every(s => t.includes(s)) && !t.includes('Cây nấm'), 'bảng tỉ lệ: ' + t);
  } },
  { name: 'cua-hang', pre: save0({ coins: 100, best: { 'Cây nấm': 3 }, next: { 0: { i: 1, sp: false } } }), post: async () => {
      $('shopBtn').click();
      ok($('shop').classList.contains('show'), 'phải mở cửa hàng');
      const items = document.querySelectorAll('#mGrid .mItem');
      ok(items.length === 4, 'bộ Khởi động có 4 mô hình: ' + items.length);
      ok(items[0].textContent.includes('Đã có'), 'Cây nấm đã có');
      items[1].click(); $('mBuy').click();
      ok(S.coins === 60 && owned(1) && !special(1), 'mua Ngôi nhà 40: ' + S.coins);
      ok($('unbox').classList.contains('show') && $('ubReel').offsetWidth === 0, 'mua xong có mở hộp, không quay');
      ok(S.next[0].i !== 1, 'mô hình đã tung trước bị mua ở cửa hàng → tung lại');
      await wait(4200); ok($('ubBtns').classList.contains('on') && $('ubPrize').textContent.includes('Ngôi nhà'), 'hiệu ứng ngắn phải xong, hiện hộp Ngôi nhà');
  } },
  { name: 'cua-hang-thieu-xu', pre: save0({ coins: 50, best: { 'Cây nấm': 3 } }), post: async () => {
      $('shopBtn').click(); document.querySelectorAll('#mGrid .mItem')[3].click(); $('mBuy').click();
      ok(S.coins === 50 && !owned(3) && !$('unbox').classList.contains('show'), 'thiếu xu không mua được Lâu đài 70');
  } },
  { name: 'home-bo-cuc', pre: save0({ coins: 100, best: { 'Cây nấm': 3 }, own: { 'Ngôi nhà': true, 'Dưa hấu': true }, sp: { 'Dưa hấu': true }, tut: 6 }), post: async () => {
      const R = e => $(e).getBoundingClientRect(), A = R('app'), hit = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
      ok(['shopBtn', 'shelfBtn'].every(id => $(id).closest('#hNav')) && Math.abs(R('hNav').bottom - A.bottom) < 2, 'thanh dưới: cửa hàng + kệ, sát đáy');
      ok($('oddsBtn').closest('#hLeft') && $('hLevels').closest('#hRight') && $('hSetBtn'), 'cột trái: nút chức năng, cột phải: chờ lắp, có nút cài đặt');
      const pend = [...$('hLevels').children];
      ok(pend.length === 2 && pend[1].classList.contains('sp') && pend.every(e => e.textContent.includes('LẮP')), 'ô chờ lắp có nhãn LẮP, bản đặc biệt vàng');
      ok(R('playBtn').bottom < R('hNav').top && !hit(R('playBtn'), R('hLeft')) && !hit(R('playBtn'), R('hRight')) && !hit(R('hBox'), R('hLeft')) && !hit(R('hBox'), R('hRight')), 'giữa không đè lên cột hai bên / thanh dưới');
      ok([...document.querySelectorAll('#home *')].every(e => { const r = e.getBoundingClientRect(); return !r.width || (r.left >= A.left - 1 && r.right <= A.right + 1); }), 'không tràn ngang');
      $('hSetBtn').click(); ok($('setModal').classList.contains('show'), 'nút cài đặt mở bảng cài đặt');
  } },
  { name: 'shop-xu-gia-lap', pre: save0({ coins: 120, best: { 'Cây nấm': 3 }, tut: 6 }), post: async () => {
      document.querySelector('#home .coins').click();
      ok($('iap').classList.contains('show'), 'chạm ô xu → mở shop xu');
      const packs = document.querySelectorAll('#iap .coinPack'), sets = document.querySelectorAll('#iap .setPack');
      ok(packs.length >= 6 && [...packs].every(p => /\d/.test(p.textContent) && p.querySelector('.price')), 'có các gói xu kèm giá: ' + packs.length);
      ok(sets.length >= 2 && [...sets].every(p => p.querySelector('img') && p.querySelector('.price')), 'có gói bộ LEGO mới có ảnh');
      ok($('iap').textContent.includes('quảng cáo') && document.querySelector('#iap .starter .price'), 'có gói bỏ quảng cáo + gói khởi đầu');
      packs[0].querySelector('.price').click();
      ok(S.coins === 120 && $('toast').classList.contains('show'), 'chỉ giả lập: không cộng xu, báo bản thử');
      $('iapClose').click(); ok(!$('iap').classList.contains('show') && $('home').classList.contains('show'), 'đóng về màn chính');
      $('hIapBtn').click(); ok($('iap').classList.contains('show'), 'nút Ưu đãi ở màn chính mở shop xu');
      $('iapClose').click(); $('shopBtn').click(); document.querySelector('#shop .coins').click();
      ok($('iap').classList.contains('show') && getComputedStyle($('iap')).zIndex > getComputedStyle($('shop')).zIndex, 'mở được từ cửa hàng mô hình, nằm trên');
      $('iapClose').click(); ok($('shop').classList.contains('show'), 'đóng thì quay lại cửa hàng mô hình');
  } },
];
module.exports.lib = require('./t4-build.js').lib;
