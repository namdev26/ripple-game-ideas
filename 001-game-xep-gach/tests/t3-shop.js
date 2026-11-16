// Task 3: home theo trạng thái, bản thiết kế, tiệm gạch, kho
const done1 = () => localStorage.setItem('xepgach.v2', JSON.stringify({ coins: 200, best: { 'Cây nấm': 3, 'Ngôi nhà': 3, 'Dưa hấu': 3, 'Lâu đài': 3 } }));
module.exports = [
  { name: 'home-mua-ban-thiet-ke', pre: done1, post: async () => {
      showHome(1); homeSel = 4; renderHome();
      const t = $('playBtn').textContent;
      ok(/MUA/.test(t) && /100/.test(t), 'nút chính: ' + t);
      ok($('hLevels').children[0].textContent.includes('🛒'), 'thẻ chưa mua phải có 🛒');
      $('playBtn').click();
      ok(S.coins === 100, 'coins ' + S.coins);
      ok(S.bp['Kim tự tháp Giza'] && cardState(4) === 'need', 'phải sở hữu, state ' + cardState(4));
      ok(JSON.parse(localStorage.getItem('xepgach.v2')).coins === 100, 'phải lưu');
      ok(/BẢN/.test($('playBtn').textContent), 'nút chính sau khi mua: ' + $('playBtn').textContent);
  } },
  { name: 'khong-du-xu', pre: done1, post: async () => {
      S.coins = 50; showHome(1); homeSel = 4; renderHome(); $('playBtn').click();
      ok(S.coins === 50 && !S.bp['Kim tự tháp Giza'], 'không được mua');
      ok(/Không đủ xu/.test($('toast').textContent), 'toast: ' + $('toast').textContent);
  } },
  { name: 'ban-thiet-ke', pre: done1, post: async () => {
      S.bp['Kim tự tháp Giza'] = true; openBlueprint(4);
      ok($('bpView').classList.contains('show'), 'bpView phải hiện');
      ok($('bpList').children.length === bomOf(4).length, 'số dòng ' + $('bpList').children.length);
      ok($('bpBuild').classList.contains('dis'), 'nút lắp phải mờ khi thiếu');
      $('bpBuild').click(); ok(/thiếu/i.test($('toast').textContent), 'toast thiếu: ' + $('toast').textContent);
      ok(!$('home').classList.contains('show') || $('bpView').classList.contains('show'), 'không được vào lắp');
      $('bpNext').click(); ok(/Bước 2\//.test($('bpStepT').textContent), 'lật trang: ' + $('bpStepT').textContent);
  } },
  { name: 'combo', pre: done1, post: async () => {
      S.bp['Kim tự tháp Giza'] = true; S.coins = 100; openShop(4);
      ok($('shop').classList.contains('show'), 'shop phải hiện');
      ok($('comboBuy').textContent.includes(String(comboPrice(4))), 'giá combo: ' + $('comboBuy').textContent);
      $('comboBuy').click();
      ok(S.coins === 100 && Object.keys(S.inv).length === 0, 'không đủ xu thì không đổi');
      ok(/Không đủ xu/.test($('toast').textContent), 'toast');
      S.coins = 1000; $('comboBuy').click();
      ok(S.coins === 1000 - comboPrice(4), 'coins ' + S.coins);
      ok(missingOf(4, S.inv).length === 0 && cardState(4) === 'ready', 'phải đủ mảnh');
  } },
  { name: 'mua-phan-thieu-re-hon', pre: done1, post: async () => {
      S.bp['Kim tự tháp Giza'] = true; S.coins = 1000;
      bomOf(4).forEach((m, k) => { if (k) S.inv[m.key + '|' + m.color] = m.n; }); // chỉ thiếu loại đầu
      openShop(4);
      const miss = missingCost(4, S.inv);
      ok($('missBuy').textContent.includes(String(miss)), 'giá phần thiếu: ' + $('missBuy').textContent);
      ok($('missBuy').classList.contains('cheap') && !$('comboBuy').classList.contains('cheap'), 'nhãn rẻ hơn phải ở phần thiếu');
      $('missBuy').click();
      ok(S.coins === 1000 - miss && missingOf(4, S.inv).length === 0, 'mua phần thiếu');
  } },
  { name: 'ke-hang', pre: done1, post: async () => {
      S.coins = 100; openShop(null, 'shelf');
      const items = document.querySelectorAll('#catGrid .catItem');
      ok(items.length > 20, 'kệ hàng ít quá: ' + items.length);
      items[0].click();
      ok(document.querySelectorAll('#catColors .chip').length >= 1, 'phải có màu');
      const before = S.coins; $('catBuy').click();
      ok(S.coins < before && Object.values(S.inv).reduce((a, b) => a + b, 0) === 1, 'mua 1 mảnh từ kệ');
  } },
  { name: 'kho-ban', pre: done1, post: async () => {
      S.coins = 0; S.inv = { 'base_12x12|green': 2 }; openInv();
      ok(document.querySelectorAll('#invGrid .invItem').length === 1, 'kho 1 loại');
      document.querySelector('#invGrid .invItem').click(); $('sellBtn').click();
      ok(S.coins === 6 && S.inv['base_12x12|green'] === 1, 'bán: coins ' + S.coins);
  } },
];
