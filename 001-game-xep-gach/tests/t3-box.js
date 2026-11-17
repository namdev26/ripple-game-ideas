// Hộp bí ẩn (mở hộp, tung trước, không trùng, bảo hiểm, lắc thử, tỉ lệ) + cửa hàng mô hình
// pre được chèn nguyên văn vào trang (mất closure) nên dựng hàm từ chuỗi
const save0 = o => new Function("localStorage.setItem('xepgach.v2'," + JSON.stringify(JSON.stringify(o)) + ')');

module.exports = [
  { name: 'hop-dau-mien-phi', post: async () => {
      ok($('playBtn').textContent.includes('Miễn phí') && $('adBtn').offsetWidth === 0, 'hộp đầu: chỉ 1 nút Miễn phí: ' + $('playBtn').textContent);
      $('playBtn').click();
      ok($('unbox').classList.contains('show'), 'phải mở màn mở hộp');
      await wait(5600);
      ok(owned(0) && S.coins === 0, 'phải có Cây nấm, không mất xu');
      ok($('ubName').textContent.includes('Cây nấm') && $('ubBtns').classList.contains('on'), 'phải lộ mô hình + nút');
      $('ubBook').click();
      ok($('bpView').classList.contains('show') && bpI === 0, 'Mở sách → sách Cây nấm');
  } },
  { name: 'tung-truoc', pre: save0({ coins: 500, best: { 'Cây nấm': 3 }, next: { g: { i: 5, sp: false } } }), post: async () => {
      ok(JSON.parse(localStorage.getItem('xepgach.v2')).next.g.i === 5, 'kết quả tung trước phải được lưu');
      $('playBtn').click(); await wait(5600);
      ok(owned(5) && !special(5) && S.coins === 500 - boxPrice(), 'ra đúng mô hình đã tung trước, trừ ' + boxPrice() + ': ' + S.coins);
      ok(S.next.g && S.next.g.i >= 0 && S.next.g.i < LEVELS.length, 'tung trước hộp kế (cả game)');
  } },
  { name: 'ra-trung-vao-kho', pre: save0({ coins: 500, best: { 'Cây nấm': 3 }, next: { g: { i: 0, sp: false } } }), post: async () => {
      $('playBtn').click(); await wait(5600);
      ok(S.coins === 500 - boxPrice() && S.dup['Cây nấm'] === 1, 'trùng → cất vào kho, chưa bán: ' + S.coins + ' ' + JSON.stringify(S.dup));
      ok($('ubDup').offsetWidth > 0 && $('ubDup').textContent.includes('kho'), 'báo trùng, cất kho: ' + $('ubDup').textContent);
      ok($('ubBook').offsetWidth === 0 && $('ubSell').offsetWidth > 0 && $('ubSell').textContent.includes('+' + shopPrice(0)), 'trùng: không mở sách, có nút bán ngay');
      $('ubSell').click();
      ok(S.coins === 500 - boxPrice() + shopPrice(0) && !S.dup['Cây nấm'] && $('ubSell').offsetWidth === 0, 'bán ngay → +giá cửa hàng, khỏi kho');
      ok(JSON.parse(localStorage.getItem('xepgach.v2')).coins === S.coins, 'đã lưu');
  } },
  { name: 'kho-ban', pre: save0({ coins: 10, best: { 'Cây nấm': 3, 'Cầu Vàng': 1 }, dup: { 'Cây nấm': 2, 'Cầu Vàng': 1 }, tut: 6 }), post: async () => {
      ok($('hKhoBtn').textContent.includes('3'), 'nút kho có số đếm: ' + $('hKhoBtn').textContent);
      $('hKhoBtn').click(); ok($('kho').classList.contains('show'), 'mở kho');
      const items = () => [...document.querySelectorAll('#khoList .khoItem')];
      ok(items().length === 2 && items()[0].textContent.includes('×2'), 'kho liệt kê mô hình trùng + số lượng');
      items().find(e => e.textContent.includes('Cây nấm')).querySelector('.price').click();
      ok(S.coins === 10 + shopPrice(0) && S.dup['Cây nấm'] === 1, 'bán 1 cái: ' + S.coins);
      $('khoAll').click();
      ok(S.coins === 10 + 2 * shopPrice(0) + shopPrice(13) && !Object.keys(S.dup).length && items().length === 0 && $('kho').textContent.includes('trống'), 'bán hết: ' + S.coins);
      $('khoClose').click(); ok(!$('kho').classList.contains('show') && $('hKhoBtn').textContent.includes('Kho'), 'đóng kho');
  } },
  { name: 'nang-cap-vang-kim', pre: save0({ coins: 500, best: { 'Cây nấm': 3 }, next: { g: { i: 0, sp: true } } }), post: async () => {
      $('playBtn').click(); await wait(5600);
      ok(special(0) && S.coins === 500 - boxPrice() && $('ubDup').offsetWidth === 0, 'có bản thường, ra vàng kim → nâng cấp, không tính trùng');
  } },
  { name: 'vong-quay', pre: save0({ coins: 500, best: { 'Cây nấm': 3 } }), post: async () => {
      const nx = S.next.g, pool = LEVELS.map((_, i) => i); $('playBtn').click();
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
      ok($('ubTitle').textContent === SERIES[seriesOf(nx.i)].name, 'trên cùng là tên bộ: ' + $('ubTitle').textContent);
      // headless không chạy transition nên bỏ transition để đo vị trí đích
      $('ubStrip').style.transition = 'none'; $('unbox').classList.remove('reveal'); cards[REEL_WIN].classList.remove('win');
      const w = cards[REEL_WIN].getBoundingClientRect(), R = $('ubReel').getBoundingClientRect();
      ok(Math.abs(w.left + w.width / 2 - (R.left + R.width / 2)) < 2, 'ô trúng phải nằm giữa vạch: ' + (w.left + w.width / 2) + ' vs ' + (R.left + R.width / 2));
  } },
  { name: 'tua-nhanh', pre: save0({ coins: 500, best: { 'Cây nấm': 3 } }), post: async () => {
      $('playBtn').click(); await wait(300); $('unbox').click(); await wait(1300);
      ok($('ubBtns').classList.contains('on'), 'chạm để tua phải lộ mô hình nhanh');
  } },
  { name: 'bo-chua-mo-van-ra', pre: save0({ coins: 500, best: { 'Cây nấm': 3 }, next: { g: { i: 15, sp: false } } }), post: async () => {
      ok(!seriesOpen(2), 'bộ Việt Nam chưa mở');
      $('playBtn').click(); await wait(5600);
      ok(owned(15), 'hộp chung ra được mô hình của bộ chưa mở');
      $('ubBook').click(); ok($('bpView').classList.contains('show') && bpI === 15, 'mở sách lắp được luôn');
  } },
  { name: 'mo-bang-quang-cao', pre: save0({ coins: 0, best: { 'Cây nấm': 3 }, next: { g: { i: 5, sp: false } }, tut: 6 }), post: async () => {
      $('gachaBtn').click(); ok($('adBtn').offsetWidth > 0 && $('adBtn').textContent.includes('AD') && $('playBtn').textContent.includes('100'), '2 nút: AD + xu');
      $('playBtn').click(); ok(!$('unbox').classList.contains('show'), 'không đủ xu thì nút xu không mở');
      $('adBtn').click(); ok($('adView').classList.contains('show') && !$('unbox').classList.contains('show'), 'xem quảng cáo giả lập trước');
      await wait(3600);
      ok(!$('adView').classList.contains('show') && $('unbox').classList.contains('show') && owned(5) && S.coins === 0, 'xem xong → mở hộp miễn phí: ' + S.coins);
  } },
  { name: 'khong-du-xu', pre: save0({ coins: 10, best: { 'Cây nấm': 3 } }), post: async () => {
      $('playBtn').click();
      ok(!$('unbox').classList.contains('show') && S.coins === 10, 'không đủ xu thì không mở');
  } },
  { name: 'du-bo-van-mo', pre: save0({ coins: 200, best: { 'Cây nấm': 1, 'Ngôi nhà': 1, 'Dưa hấu': 1 }, own: { 'Lâu đài': true } }), post: async () => {
      showHome(0);
      ok(!$('playBtn').classList.contains('dis') && $('playBtn').textContent.includes('100') && $('hName').textContent.includes('4/16'), 'đủ bộ vẫn mở hộp chung: ' + $('hName').textContent);
      $('playBtn').click(); ok($('unbox').classList.contains('show') && S.coins < 200, 'mở được');
  } },
  { name: 'lac-thu', pre: save0({ coins: 100, best: { 'Cây nấm': 3 } }), post: async () => {
      const nx = JSON.stringify(S.next.g); $('hBox').click();
      ok($('hBox').classList.contains('shake'), 'phải lắc');
      ok(JSON.stringify(S.next.g) === nx && S.coins === 100, 'lắc thử không mua, không đổi kết quả');
  } },
  { name: 'ti-le', pre: save0({ coins: 100, best: { 'Cây nấm': 3 } }), post: async () => {
      $('oddsBtn').click();
      const t = $('oddsModal').textContent;
      ok($('oddsModal').classList.contains('show') && LEVELS.every(l => t.includes(l.name)) && ['9,1%', '1,5%', '12%', 'trùng'].every(s => t.includes(s)), 'bảng tỉ lệ cả 16 mô hình, cố định: ' + t);
  } },
  { name: 'cua-hang', pre: save0({ coins: 100, best: { 'Cây nấm': 3 }, next: { g: { i: 1, sp: false } } }), post: async () => {
      $('shopBtn').click();
      ok($('shop').classList.contains('show'), 'phải mở cửa hàng');
      const items = document.querySelectorAll('#mGrid .mItem');
      ok(items.length === 4, 'bộ Khởi động có 4 mô hình: ' + items.length);
      ok(items[0].textContent.includes('Đã có'), 'Cây nấm đã có');
      ok([...items].every(e => e.querySelector('.pbox') && !e.querySelector(':scope > img')), 'cửa hàng hiển thị hộp sản phẩm, không phải ảnh mô hình trần');
      items[1].click(); ok($('mImg').querySelector('.pbox'), 'ô chọn cũng hiện hộp');
      $('mBuy').click();
      ok(S.coins === 60 && owned(1) && !special(1), 'mua Ngôi nhà 40: ' + S.coins);
      ok($('unbox').classList.contains('show') && $('ubReel').offsetWidth === 0, 'mua xong có mở hộp, không quay');
      ok(S.next.g.i === 1, 'tỉ lệ cố định: mua ở cửa hàng không tung lại hộp');
      await wait(4200); ok($('ubBtns').classList.contains('on') && $('ubPrize').textContent.includes('Ngôi nhà'), 'hiệu ứng ngắn phải xong, hiện hộp Ngôi nhà');
  } },
  { name: 'cua-hang-thieu-xu', pre: save0({ coins: 50, best: { 'Cây nấm': 3 } }), post: async () => {
      $('shopBtn').click(); document.querySelectorAll('#mGrid .mItem')[3].click(); $('mBuy').click();
      ok(S.coins === 50 && !owned(3) && !$('unbox').classList.contains('show'), 'thiếu xu không mua được Lâu đài 70');
  } },
  { name: 'home-bo-cuc', pre: save0({ coins: 100, best: { 'Cây nấm': 3 }, own: { 'Ngôi nhà': true, 'Dưa hấu': true }, sp: { 'Dưa hấu': true }, tut: 6 }), post: async () => {
      const R = e => $(e).getBoundingClientRect(), A = R('app'), hit = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
      ok(['shopBtn', 'gachaBtn', 'hHomeTab', 'hKhoBtn', 'shelfBtn'].every(id => $(id).closest('#hNav')) && Math.abs(R('hNav').bottom - A.bottom) < 2, 'thanh dưới: cửa hàng, hộp bí ẩn, trang chủ, kho, kệ');
      ok(!$('playBtn').closest('#home') && $('playBtn').closest('#gacha') && !$('hBox').closest('#home'), 'gacha không còn ở màn chính');
      ok($('hColBtn').closest('#hLeft') && $('hLevels').closest('#hDrawer') && !$('hRight') && $('hSetBtn'), 'cột trái: nút chức năng; chờ lắp thành ngăn kéo dưới; có nút cài đặt');
      const pend = [...$('hLevels').children];
      ok(pend.length === 2 && pend[1].classList.contains('sp') && pend.every(e => e.querySelector('.pbox') && e.textContent.includes('NEW') && e.textContent.includes('0%')), 'thẻ chờ lắp: hộp sản phẩm, NEW, 0%, bản đặc biệt vàng');
      ok($('hDrawer').textContent.includes('2 bộ') && R('hDrawer').bottom <= R('hNav').top + 1 && R('hLevels').height > 0, 'ngăn kéo trên thanh dưới, đếm số bộ');
      ok($('hNext').querySelector('.pbox') && !hit(R('hNext'), R('hLeft')) && !hit(R('hNext'), R('hDrawer')), 'giữa: hộp lắp tiếp, không đè cột trái / ngăn kéo');
      $('hTabDone').click(); ok($('hLevels').children.length === 1 && $('hLevels').textContent.includes('100%') && $('hDrawer').textContent.includes('1 bộ'), 'tab Đã xong: mô hình đã lắp');
      $('hTabWait').click(); $('hDrawerTog').click(); ok(R('hLevels').height === 0 && S.hideWait, 'thu gọn ngăn kéo');
      showHome(); ok(R('hLevels').height === 0, 'nhớ trạng thái thu gọn'); $('hDrawerTog').click(); ok(R('hLevels').height > 0 && !S.hideWait, 'mở lại');
      ok([...document.querySelectorAll('#home *')].every(e => { const r = e.getBoundingClientRect(); return !r.width || (r.left >= A.left - 1 && r.right <= A.right + 1); }), 'không tràn ngang');
      $('hNextBtn').click(); ok($('bpView').classList.contains('show') && bpI === 1, 'LẮP TIẾP mở sách mô hình chờ lắp đầu tiên');
      showHome(); $('hLevels').children[1].click(); ok($('bpView').classList.contains('show') && bpI === 2, 'chạm thẻ trong ngăn kéo mở sách');
      showHome(); $('hSetBtn').click(); ok($('setModal').classList.contains('show'), 'nút cài đặt mở bảng cài đặt');
  } },
  { name: 'gacha-rieng', pre: save0({ coins: 500, best: { 'Cây nấm': 3 }, next: { g: { i: 5, sp: false } }, tut: 6 }), post: async () => {
      ok($('hNext').textContent.includes('MỞ HỘP'), 'không còn mô hình chờ lắp → giữa màn chính mời mở hộp');
      $('gachaBtn').click(); ok($('gacha').classList.contains('show') && $('hBox').offsetWidth > 0 && $('playBtn').offsetWidth > 0 && $('adBtn').offsetWidth > 0 && $('oddsBtn').closest('#gacha'), 'màn hộp bí ẩn riêng');
      $('playBtn').click(); ok($('unbox').classList.contains('show') && !$('gacha').classList.contains('show'), 'mở hộp → màn vòng quay');
      await wait(5600); $('ubLater').click(); ok($('gacha').classList.contains('show'), 'xong quay về màn hộp bí ẩn để quay tiếp');
      $('gachaClose').click(); ok($('home').classList.contains('show') && !$('gacha').classList.contains('show'), 'đóng về màn chính');
  } },
  { name: 'shop-gop', pre: save0({ coins: 120, best: { 'Cây nấm': 3 }, tut: 6 }), post: async () => {
      const B = $('shopBody'), top = id => $(id).offsetTop - B.offsetTop, near = id => Math.abs(B.scrollTop - Math.min(top(id), B.scrollHeight - B.clientHeight)) < 3;
      ok(!$('iap') && !$('hIapBtn'), 'không còn màn Ưu đãi riêng');
      document.querySelector('#home .coins').click();
      ok($('shop').classList.contains('show') && near('secCoin'), 'chạm ô xu → cửa hàng, cuộn tới mục xu');
      const packs = B.querySelectorAll('#secCoin .coinPack'), sets = B.querySelectorAll('#secOffer .setPack');
      ok(packs.length >= 6 && [...packs].every(p => /\d/.test(p.textContent) && p.querySelector('.price')), 'gói xu kèm giá: ' + packs.length);
      ok(sets.length >= 2 && [...sets].every(p => p.querySelector('img') && p.querySelector('.price')), 'gói bộ LEGO mới có ảnh');
      const dino = $('offerBody').firstElementChild;
      ok(dino && dino.classList.contains('dinoPack') && /Khủng long/i.test(dino.textContent) && dino.querySelector('.price') && dino.querySelectorAll('.dIt').length >= 3 && /\d+:\d\d:\d\d/.test(dino.textContent), 'thẻ bộ khủng long nổi bật đầu mục ưu đãi: quà kèm, giá, đếm ngược');
      ok($('secOffer').textContent.includes('quảng cáo') && B.querySelector('#secOffer .starter .price'), 'gói khởi đầu + bỏ quảng cáo');
      ok(B.querySelectorAll('#secModel #mGrid .mItem').length === 4, 'mô hình nằm chung một màn cuộn');
      const tabs = [...document.querySelectorAll('#shopTabs button')];
      ok(tabs.length === 3 && tabs.map(t => t.dataset.s).join() === 'secOffer,secModel,secCoin', 'tab dưới: ưu đãi, mô hình, xu');
      tabs[1].click(); ok(near('secModel') && tabs[1].classList.contains('cur'), 'tab mô hình cuộn tới mục mô hình');
      tabs[0].click(); ok(B.scrollTop === 0 && tabs[0].classList.contains('cur'), 'tab ưu đãi về đầu');
      packs[0].querySelector('.price').click();
      ok(S.coins === 120 && $('toast').classList.contains('show'), 'nạp chỉ giả lập: không cộng xu, báo bản thử');
      $('shopClose').click(); ok(!$('shop').classList.contains('show') && $('home').classList.contains('show'), 'đóng về màn chính');
      $('gachaBtn').click(); document.querySelector('#gacha .coins').click();
      ok($('shop').classList.contains('show') && +getComputedStyle($('shop')).zIndex > +getComputedStyle($('gacha')).zIndex, 'mở từ màn hộp bí ẩn, nằm trên');
      $('shopClose').click(); ok($('gacha').classList.contains('show') && !$('shop').classList.contains('show'), 'đóng thì quay lại màn hộp bí ẩn');
  } },
];
module.exports.lib = require('./t4-build.js').lib;
