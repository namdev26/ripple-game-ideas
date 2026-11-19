// Giải đấu tuần: điểm khi lắp, bảng 30 người, chốt tuần lên/xuống hạng + thưởng
const save0 = o => new Function("localStorage.setItem('xepgach.v2'," + JSON.stringify(JSON.stringify(o)) + ')');
module.exports = [
  { name: 'tuan-bat-dau-thu-hai', post: async () => {
      const w = weekStart(new Date(2026, 10, 19, 15).getTime()); // thứ Năm 19/11/2026
      ok(new Date(w).getDay() === 1 && new Date(w).getDate() === 16 && new Date(w).getHours() === 0, 'tuần bắt đầu thứ Hai 0h: ' + new Date(w));
      ok(weekStart(new Date(2026, 10, 22, 23).getTime()) === w && weekStart(new Date(2026, 10, 23, 0, 1).getTime()) === w + WEEK, 'Chủ nhật cùng tuần, thứ Hai sau là tuần mới');
  } },
  { name: 'bang-30-nguoi', post: async () => {
      const g = lgCheck(), a = lgTable(g.w, 0, 0, g.w + WEEK / 2), b = lgTable(g.w, 0, 0, g.w + WEEK / 2);
      ok(a.length === LG_N && a.filter(x => x.me).length === 1 && new Set(a.map(x => x.nm)).size === LG_N, '30 người, tên không trùng');
      ok(JSON.stringify(a) === JSON.stringify(b), 'cùng thời điểm cùng bảng');
      const early = lgBots(g.w, 0, g.w + 3600e3).reduce((s, x) => s + x.pts, 0), late = lgBots(g.w, 0, g.w + WEEK).reduce((s, x) => s + x.pts, 0);
      ok(early < late, 'điểm người khác tăng dần trong tuần');
      ok(lgRank(g.w, 0, 99999, Date.now()) === 1 && lgRank(g.w, 0, 0, g.w + WEEK) === LG_N, 'điểm cao nhất hạng 1, 0 điểm cuối tuần đứng chót');
  } },
  { name: 'lap-xong-cong-diem', post: async () => {
      giveModel(0); startBuild(0); commitAll();
      ok(lgCheck().pts === lgPts(3, false) && lgPts(3, false) === 50, 'lắp mới 3 sao +50: ' + lgCheck().pts);
      startBuild(0, true); commitAll(); ok(lgCheck().pts === 60, 'lắp lại +10');
      openLeague(); ok($('league').classList.contains('show') && $('lgBody').querySelectorAll('.lgRow').length === LG_N && $('lgBody').querySelector('.me .pt').textContent === '60', 'bảng hiện điểm của mình');
  } },
  { name: 'chot-tuan-len-hang', pre: new Function("localStorage.setItem('xepgach.v2',JSON.stringify({tut:6,lg:{w:new Date(2026,0,5).getTime(),pts:99999,tier:1}}))"), post: async () => {
      const r = lgCheck().res;
      ok(r && r.rank === 1 && r.from === 1 && r.to === 2 && lgCheck().tier === 2 && lgCheck().pts === 0, 'hạng 1 → lên Vàng, điểm về 0: ' + JSON.stringify(r));
      ok(r.rew === lgRew(1, 1) && r.rew === 450, 'thưởng hạng 1 theo bậc: ' + r.rew);
      renderHome(); ok(document.querySelector('#sbLeague .badge'), 'có chấm đỏ nhận thưởng');
      const c0 = S.coins; $('sbLeague').click(); ok($('lgResModal').classList.contains('show'), 'bấm nút → bảng kết quả');
      $('lgrOk').click(); ok(S.coins === c0 + 450 && !lgCheck().res && $('league').classList.contains('show'), 'nhận thưởng rồi mở bảng tuần mới');
  } },
  { name: 'chot-tuan-xuong-hang', pre: new Function("localStorage.setItem('xepgach.v2',JSON.stringify({tut:6,lg:{w:new Date(2026,0,5).getTime(),pts:0,tier:2}}))"), post: async () => {
      const r = lgCheck().res; ok(r.rank === LG_N && r.to === 1 && r.rew === 0, 'đứng chót → xuống Bạc, không thưởng: ' + JSON.stringify(r));
  } },
];
module.exports.lib = require('./t4-build.js').lib;
