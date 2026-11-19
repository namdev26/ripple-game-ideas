// Điểm danh 7 ngày + nhiệm vụ ngày
const save0 = o => new Function("localStorage.setItem('xepgach.v2'," + JSON.stringify(JSON.stringify(o)) + ')');
const yday = () => new Date(Date.now() - 864e5).toDateString();
module.exports = [
  { name: 'tu-hien-diem-danh', pre: new Function("window.__noAuto=0;localStorage.setItem('xepgach.v2',JSON.stringify({tut:6,best:{'Cây nấm':3}}))"), post: async () => {
      await wait(900); ok($('loginModal').classList.contains('show'), 'mở game lần đầu trong ngày: tự hiện điểm danh');
      ok(document.querySelector('#sbLogin .badge'), 'nút điểm danh có chấm đỏ');
      const c0 = S.coins; $('loginOk').click();
      ok(S.coins === c0 + LOGIN[0].c && S.login.n === 1 && !loginK().can, 'nhận ngày 1: +' + (S.coins - c0));
      $('loginOk').click(); ok(S.coins === c0 + LOGIN[0].c, 'không nhận 2 lần trong ngày');
      ok(!document.querySelector('#sbLogin .badge'), 'nhận xong hết chấm đỏ');
  } },
  { name: 'diem-danh-lien-tuc', pre: new Function("localStorage.setItem('xepgach.v2',JSON.stringify({tut:6,login:{n:6,d:new Date(Date.now()-864e5).toDateString()}}))"), post: async () => {
      ok(loginK().k === 6 && loginK().can, 'hôm qua đã nhận ngày 6 → hôm nay ngày 7');
      const c0 = S.coins, own0 = Object.keys(S.own).length; openLogin(); $('loginOk').click();
      ok(S.coins === c0 + 200 && Object.keys(S.own).length === own0 + 1, 'ngày 7: +200 xu + 1 hộp');
  } },
  { name: 'lo-ngay-ve-ngay-1', pre: save0({ tut: 6, login: { n: 4, d: 'Mon Jan 01 2024' } }), post: async () => {
      ok(loginK().k === 0 && loginK().can, 'lỡ 1 ngày → về ngày 1');
  } },
  { name: 'nhiem-vu', post: async () => {
      const L = qList(); ok(L.length === 3 && L[0].k === 'brick' && new Set(L.map(q => q.k)).size === 3, 'có 3 nhiệm vụ, luôn có lắp gạch: ' + L.map(q => q.k));
      ok(JSON.stringify(qList()) === JSON.stringify(L), 'cùng ngày giữ nguyên nhiệm vụ');
      giveModel(0); startBuild(0); commitAll();
      ok(L[0].got === Math.min(L[0].n, targets.length), 'lắp gạch tăng tiến độ: ' + L[0].got);
      for (const q of L) q.got = q.n;
      openQuest(); const c0 = S.coins;
      document.querySelector('[data-q="0"]').click(); ok(S.coins === c0 + QUESTS[L[0].k].c && L[0].done, 'nhận thưởng nhiệm vụ');
      ok(document.querySelector('[data-q="all"]').classList.contains('dis'), 'chưa xong cả 3 thì chưa nhận rương');
      document.querySelector('[data-q="1"]').click(); document.querySelector('[data-q="2"]').click();
      const own0 = Object.keys(S.own).length; document.querySelector('[data-q="all"]').click();
      ok(S.q.all && Object.keys(S.own).length === own0 + 1, 'xong cả 3 → nhận 1 hộp');
      ok(questReady() === 0, 'không còn gì để nhận');
  } },
  { name: 'nhiem-vu-hop-va-hoan-hao', post: async () => {
      S.q = { d: today(), all: false, list: [{ k: 'box', n: 1, got: 0 }, { k: 'perfect', n: 1, got: 0 }, { k: 'win', n: 1, got: 0 }] };
      S.coins = 500; openBox(); ok(S.q.list[0].got === 1, 'mở hộp → xong nhiệm vụ hộp');
      giveModel(0); startBuild(0); commitAll(); ok(S.q.list[1].got === 1 && S.q.list[2].got === 1, 'lắp không sai → xong hoàn hảo + lắp mô hình');
  } },
];
module.exports.lib = require('./t4-build.js').lib;
