// Sự kiện mùa: lịch 14 ngày xoay vòng, điểm sự kiện, mốc quà miễn phí + Sổ Vàng, đồ trang trí
const save0 = o => new Function("localStorage.setItem('xepgach.v2'," + JSON.stringify(JSON.stringify(o)) + ')');
module.exports = [
  { name: 'lich-su-kien', post: async () => {
      const a = evNow(new Date(2026, 10, 19).getTime()), b = evNow(new Date(2026, 10, 30, 1).getTime()), c = evNow(new Date(2026, 10, 10).getTime());
      ok(a.id === 'winter' && a.end === new Date(2026, 10, 30).getTime(), 'đang là Lễ hội Mùa Đông tới 30/11: ' + a.id + ' ' + new Date(a.end));
      ok(b.id === 'tet' && c.id === EVENTS[EVENTS.length - 1].id, 'sự kiện sau / trước xoay vòng: ' + b.id + ' ' + c.id);
      ok(EVENTS.every(e => e.free.length === 15 && e.prem.length === 15), 'mỗi sự kiện 15 mốc');
  } },
  { name: 'diem-va-moc', post: async () => {
      giveModel(0); startBuild(0); commitAll();
      ok(evState().pts === evPts(3, false) && evPts(3, false) === 25, 'lắp mới 3 sao +25: ' + evState().pts);
      evState().pts = EV_STEP * 2 + 5; ok(evTier() === 2 && evReady() === 2, 'qua 2 mốc → 2 quà miễn phí chờ nhận');
      openEvent(); ok($('event').classList.contains('show') && $('evBody').querySelectorAll('.evC.can').length === 2, 'hiện 2 ô nhận được');
      const c0 = S.coins; $('evBody').querySelector('.evC.free[data-i="0"]').click();
      ok(S.coins === c0 + evNow().free[0].c && evState().free.includes(0), 'nhận mốc 1');
      $('evBody').querySelector('.evC.free[data-i="2"]').click(); ok(!evState().free.includes(2), 'mốc chưa tới thì không nhận được');
      $('evBody').querySelector('.evC.prem[data-i="0"]').click(); ok($('buyModal').classList.contains('show'), 'bấm ô Sổ Vàng khi chưa mua → bảng mua');
      $('buyOk').click(); ok(evState().pass && evReady() === 3, 'mua Sổ Vàng → mở hàng quà vàng: ' + evReady());
      $('evBody').querySelector('.evC.free[data-i="1"]').click(); $('evBody').querySelector('.evC.prem[data-i="0"]').click(); $('evBody').querySelector('.evC.prem[data-i="1"]').click();
      ok(evReady() === 0, 'nhận hết');
  } },
  { name: 'do-trang-tri', post: async () => {
      evState().pts = EV_STEP * 3; evState().free = [0, 1]; openEvent();
      $('evBody').querySelector('.evC.free[data-i="2"]').click();
      const d = evNow().free[2].deco; ok(d && S.deco[d] === 1, 'mốc 3 cho đồ trang trí ' + d);
  } },
  { name: 'su-kien-moi-reset', pre: save0({ tut: 6, ev: { key: 'winter-5', pts: 500, free: [0], prem: [], pass: true } }), post: async () => {
      ok(evState().pts === 0 && !evState().pass && evState().key === evNow().key, 'sang sự kiện mới thì làm lại từ đầu');
  } },
  { name: 'nhiem-vu-cho-diem', post: async () => {
      for (const q of qList()) q.got = q.n; openQuest(); const p0 = evState().pts;
      document.querySelector('[data-q="0"]').click(); ok(evState().pts === p0 + 10, 'nhận nhiệm vụ +10 điểm sự kiện');
  } },
];
module.exports.lib = require('./t4-build.js').lib;
