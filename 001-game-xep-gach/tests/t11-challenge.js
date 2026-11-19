// Thử thách của ngày: cùng ngày cùng mô hình + luật, không tốn ❤️, không lưu tiến độ, thưởng lần đầu
const save0 = o => new Function("localStorage.setItem('xepgach.v2'," + JSON.stringify(JSON.stringify(o)) + ')');
module.exports = [
  { name: 'thu-thach-co-dinh-theo-ngay', post: async () => {
      const a = dcToday(), b = dcToday();
      ok(a.i === b.i && a.k === b.k && DC_POOL.includes(a.i) && DC_RULES[a.k], 'cùng ngày cùng thử thách: ' + JSON.stringify(a));
      ok(DC_POOL.length >= 8, 'đủ mô hình để xoay vòng: ' + DC_POOL.length);
      const days = new Set(); for (let d = 0; d < 30; d++) { const r = rng(20260101 + d); days.add(Math.floor(r() * DC_POOL.length)); }
      ok(days.size > 5, 'các ngày khác nhau ra mô hình khác nhau');
  } },
  { name: 'choi-thu-thach', pre: save0({ tut: 6, hearts: 0, hT: Date.now() }), post: async () => {
      const c = dcToday(); openDc(); ok($('dcModal').classList.contains('show') && $('dcName').textContent.startsWith(LEVELS[c.i].name), 'bảng thử thách');
      $('dcPlay').click();
      ok(mode === 'daily' && L === LEVELS[c.i] && !$('home').classList.contains('show'), 'hết ❤️ vẫn chơi được thử thách, kể cả mô hình chưa có');
      ok(LIVES === (c.k === 'one' ? 1 : 3) && (c.k !== 'nohint' || $('hintBtn').style.display === 'none'), 'đúng luật ' + c.k);
      mT = 42.4; const c0 = S.coins; commitAll(); await wait(1500);
      ok(!built(c.i) && !owned(c.i), 'không tính là đã lắp / đã có');
      ok(S.coins === c0 + DC_REW && S.dc.won && S.dc.best === 42, 'thưởng lần đầu + kỷ lục: ' + JSON.stringify(S.dc));
      ok($('mResult').classList.contains('show') && /Nhanh hơn \d+%/.test($('mrInfo').textContent), 'bảng kết quả có thời gian + % người chơi');
      $('mrAgain').click(); ok(mode === 'daily' && !done, 'chơi lại vẫn là thử thách');
      mT = 30; commitAll(); ok(S.coins === c0 + DC_REW && S.dc.best === 30, 'lần 2 không thưởng, cập nhật kỷ lục');
      toMenu(); renderHome(); ok(!document.querySelector('#sbDaily .badge'), 'xong rồi thì hết chấm đỏ');
  } },
  { name: 'thu-thach-thua-khong-mat-tim', post: async () => {
      $('dcPlay').click(); const h = heartsNow();
      for (let k = 0; k < LIVES; k++) wrong(); await wait(900);
      ok($('failModal').classList.contains('show') && !$('loseModal').classList.contains('show'), 'hết lượt sai → thua luôn, không mời hồi sinh');
      ok($('fT').textContent.includes('Thử thách'), 'báo không tốn ❤️: ' + $('fT').textContent);
      $('lRetry').click(); ok(heartsNow() === h && mode === 'daily', 'chơi lại không mất ❤️, vẫn là thử thách');
      giveModel(0); startBuild(0); ok(mode === null && LIVES === 3 && $('hintBtn').style.display === '', 'vào lắp thường thì trả lại luật thường');
  } },
  { name: 'het-gio', post: async () => {
      $('dcPlay').click(); dcToday = () => ({ i: levelIdx, k: 'time', n: targets.length, limit: 5 });
      mT = 6; modeTick(0); await wait(900);
      ok(done && $('failModal').classList.contains('show'), 'hết giờ → thua');
  } },
];
module.exports.lib = require('./t4-build.js').lib;
