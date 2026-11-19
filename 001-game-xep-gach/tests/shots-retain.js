// Ảnh các tính năng giữ chân: SHOT=1 node tests/run-headless.js tests/shots-retain.js → tests/.tmp/rt_*.png
const save0 = o => new Function("localStorage.setItem('xepgach.v2'," + JSON.stringify(JSON.stringify(o)) + ')');
const ST = { goal: 'Khuê Văn Các', coins: 260, best: { 'Cây nấm': 3, 'Ngôi nhà': 2, 'Dưa hấu': 3, 'Lâu đài': 1 }, own: { 'Tượng Zeus': true }, tut: 6 };
module.exports = [
  { name: 'rt-home', pre: save0(ST), post: async () => { await wait(500); } },
  { name: 'rt-login', pre: save0({ ...ST, login: { n: 3, d: new Date(Date.now() - 864e5).toDateString() } }), post: async () => { openLogin(); await wait(600); } },
  { name: 'rt-quest', pre: save0(ST), post: async () => { qList(); S.q.list[0].got = 25; S.q.list[1].got = S.q.list[1].n; S.q.list[2].got = S.q.list[2].n; S.q.list[2].done = true; openQuest(); await wait(600); } },
];
module.exports.lib = require('./t4-build.js').lib;
module.exports.push(
  { name: 'rt-dc', pre: save0(ST), post: async () => { openDc(); await wait(600); } },
  { name: 'rt-dc-play', pre: save0(ST), post: async () => { $('dcPlay').click(); targets.filter(t => t.step < 2).forEach(t => commit(t)); mT = 37; await pump(800); } },
  { name: 'rt-dc-win', pre: save0(ST), post: async () => { $('dcPlay').click(); mT = 74; commitAll(); await wait(1600); } },
);
module.exports.push(
  { name: 'rt-league', pre: save0(ST), post: async () => { lgCheck().pts = 260; save(); openLeague(); await wait(600); } },
  { name: 'rt-lg-res', pre: new Function("localStorage.setItem('xepgach.v2',JSON.stringify({tut:6,coins:260,best:{'Cây nấm':3},lg:{w:new Date(2026,0,5).getTime(),pts:99999,tier:0}}))"), post: async () => { openLgRes(); await wait(600); } },
);
