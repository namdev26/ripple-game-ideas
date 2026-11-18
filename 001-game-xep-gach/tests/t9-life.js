// ❤ mạng ngoài (kiểu Candy Crush: mất khi thua / thoát giữa chừng, hồi 30 phút, tối đa 5) + ∞ chơi không tốn mạng có hạn giờ
const pre = (o, ago = {}) => new Function(`const n=Date.now(), o=${JSON.stringify(o)}, a=${JSON.stringify(ago)};
  for (const k in a) o[k] = n + a[k]; localStorage.setItem('xepgach.v2', JSON.stringify(o));`);
module.exports = [
  { name: 'mang-ngoai', pre: pre({ tut: 6, coins: 0, best: { 'Cây nấm': 3 } }), post: async () => {
      ok(heartsNow() === 5 && $('hLife').textContent.includes('5') && $('hLife').textContent.includes('Đầy'), 'mặc định 5 ❤ đầy: ' + $('hLife').textContent);
      ok(document.querySelectorAll('#lives i').length === 3 && $('lives').textContent.includes('✖') && !$('lives').textContent.includes('♥'), 'trong màn: 3 lần sai hiện ✖');
      giveModel(1); startBuild(1); wrong(); wrong(); wrong(); await wait(900);
      $('lClose').click(); ok($('failModal').classList.contains('show') && $('fT').textContent.includes('mất 1 ❤') && $('fIcon').offsetWidth > 0, 'bỏ hồi sinh → bảng thua báo mất 1 ❤');
      $('lRetry').click(); ok(heartsNow() === 4 && L.name === LEVELS[1].name && !done, 'thua level mới: −1 ❤, chơi lại');
      ok(S.hT && Date.now() - S.hT < 5000, 'bắt đầu hồi từ lúc mất');
      startBuild(0); wrong(); wrong(); wrong(); await wait(900); $('lMenu').click();
      ok(heartsNow() === 4, 'lắp lại mô hình cũ: thua không mất ❤');
  } },
  { name: 'hoi-theo-gio', pre: pre({ tut: 6, hearts: 2 }, { hT: -3900000 }), post: async () => {
      ok(heartsNow() === 4, 'sau 65 phút hồi 2 ❤: ' + heartsNow());
      const t = $('hLife').textContent; ok(/2[45]:\d\d/.test(t), 'đồng hồ hồi ❤ kế ~25 phút: ' + t);
  } },
  { name: 'het-mang-chan', pre: pre({ tut: 6, coins: 100, hearts: 0, best: { 'Cây nấm': 3 } }, { hT: 0 }), post: async () => {
      $('hNextBtn').click();
      ok($('lifeModal').classList.contains('show') && !$('bpView').classList.contains('show'), 'hết ❤: không vào level mới, hiện bảng hết mạng');
      const t = $('lifeModal').textContent;
      ok(/(30:00|29:\d\d)/.test(t) && t.includes('15 phút') && t.includes('60') && t.includes('3 giờ') && t.includes('Lắp lại'), 'bảng: đồng hồ, QC ∞15p, 60 xu, gói ∞, lắp lại: ' + t);
      ok($('hNextBtn').textContent.includes('LEVEL') && $('hNext').textContent.match(/\d\d:\d\d/), 'nút level hiện đồng hồ hồi');
      $('lifeCoin').click(); ok(heartsNow() === 5 && S.coins === 40 && !$('lifeModal').classList.contains('show'), '60 xu nạp đầy');
      $('hNextBtn').click(); ok($('bpView').classList.contains('show'), 'có ❤ thì vào được');
  } },
  { name: 'qc-vo-han', budget: 30000, pre: pre({ tut: 6, hearts: 0, best: { 'Cây nấm': 3 } }, { hT: 0 }), post: async () => {
      openLife(); $('lifeAd').click(); await wait(3500);
      ok(infLeft() > 840000 && canPlay(), 'xem QC: ∞ 15 phút');
      ok($('hLife').textContent.includes('∞') && /1[45]:\d\d/.test($('hLife').textContent), 'thanh trên hiện ∞ + đồng hồ: ' + $('hLife').textContent);
      giveModel(1); startBuild(1); wrong(); wrong(); wrong(); await wait(900); $('lRetry').click();
      ok(heartsNow() === 0 && L.name === LEVELS[1].name, 'đang ∞: thua không mất ❤, chơi lại được');
      openLife(); $('lifeAd').click(); await wait(3500); const a = infLeft(); ok(a > 1680000, '∞ cộng dồn: ' + a);
  } },
  { name: 'chuoi-thang', pre: pre({ tut: 6, best: { 'Cây nấm': 3 } }), post: async () => {
      [1, 2, 4].forEach((i, k) => { giveModel(i); startBuild(i); commitAll(); ok(S.streak === k + 1, 'chuỗi ' + S.streak); });
      ok(infLeft() > 840000, 'thắng 3 level liên tiếp: ∞ 15 phút');
      giveModel(5); startBuild(5); wrong(); wrong(); wrong(); await wait(900); $('lMenu').click();
      ok(S.streak === 0, 'thua: mất chuỗi');
  } },
  { name: 'du-bo-vo-han', pre: pre({ tut: 6, coins: 0, best: { 'Cây nấm': 1, 'Ngôi nhà': 1, 'Dưa hấu': 1 }, own: { 'Lâu đài': true } }), post: async () => {
      startBuild(3); commitAll(); ok(infLeft() > 1740000, 'đủ bộ: ∞ 30 phút');
  } },
  { name: 'quay-lai', pre: pre({ tut: 6, best: { 'Cây nấm': 3 } }, { last: -25 * 3600000 }), post: async () => {
      ok(infLeft() > 1740000 && $('toast').textContent.includes('trở lại'), 'vắng hơn 24h: quà ∞ 30 phút');
      ok(Date.now() - S.last < 5000, 'ghi lại lần vào cuối');
  } },
  { name: 'thoat-giua-chung', pre: pre({ tut: 6, best: { 'Cây nấm': 3 } }), post: async () => {
      giveModel(1); startBuild(1); commit(targets.find(supported));
      $('backBtn').click(); ok(!$('home').classList.contains('show') && $('quitModal').classList.contains('show') && $('qT').textContent.includes('❤'), 'thoát giữa chừng: bảng cảnh báo mất ❤');
      $('qNo').click(); ok(!$('quitModal').classList.contains('show') && !$('home').classList.contains('show') && heartsNow() === 5, 'chơi tiếp: ở lại, không mất ❤');
      $('backBtn').click(); $('qYes').click(); ok($('home').classList.contains('show') && heartsNow() === 4, 'xác nhận thoát: về, −1 ❤');
      giveModel(2); startBuild(2); $('backBtn').click(); ok($('home').classList.contains('show') && heartsNow() === 4, 'chưa lắp mảnh nào: thoát không mất ❤');
  } },
  { name: 'uu-dai-vo-han', pre: pre({ tut: 6 }), post: async () => {
      openIap(); const t = $('offerBody').textContent;
      ok($('offerBody').querySelector('.starter').textContent.includes('∞') && t.includes('3 giờ'), 'gói khởi đầu kèm ∞ + gói ∞ 3 giờ');
  } },
];
module.exports.lib = require('./t4-build.js').lib;
