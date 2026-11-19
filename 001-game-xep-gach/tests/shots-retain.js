// Ảnh các tính năng giữ chân: SHOT=1 node tests/run-headless.js tests/shots-retain.js → tests/.tmp/rt_*.png
const save0 = o => new Function("localStorage.setItem('xepgach.v2'," + JSON.stringify(JSON.stringify(o)) + ')');
const ST = { coins: 260, best: { 'Cây nấm': 3, 'Ngôi nhà': 2, 'Dưa hấu': 3, 'Lâu đài': 1 }, own: { 'Tượng Zeus': true }, tut: 6 };
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
module.exports.push(
  { name: 'rt-event', pre: save0(ST), post: async () => { evState().pts = EV_STEP * 3 + 22; evState().free = [0, 1]; save(); openEvent(); await wait(600); } },
  { name: 'rt-event-pass', pre: save0(ST), post: async () => { evState().pts = EV_STEP * 3 + 22; evState().free = [0, 1]; evState().pass = true; evState().prem = [0]; save(); openEvent(); await wait(600); } },
);
const CT = { ...ST, best: { 'Cây nấm': 3, 'Ngôi nhà': 2, 'Dưa hấu': 3, 'Lâu đài': 1, 'Tượng Rhodes': 3, 'Chuột': 2, 'Cầu Vàng': 3 }, sp: { 'Dưa hấu': true }, deco: { '🎄': 2, '⛄': 1 },
  city: { rows: 3, t: Date.now() - 5 * 3600e3, bank: 0, p: { 0: { m: 'Cây nấm' }, 1: { d: '🎄' }, 2: { m: 'Lâu đài' }, 5: { m: 'Dưa hấu' }, 6: { m: 'Ngôi nhà' }, 7: { d: '⛄' }, 9: { m: 'Tượng Rhodes' } } } };
module.exports.push(
  { name: 'rt-city', pre: save0(CT), post: async () => { openCity(); await wait(800); } },
  { name: 'rt-city-pick', pre: save0(CT), post: async () => { openCity(); $('cityGrid').querySelector('[data-k="10"]').click(); await wait(800); } },
);
// nhà nhỏ dựng sẵn cho ảnh chế độ sáng tạo
const HOUSE = [];
for (const [x, z, r] of [[5, 5, 0], [9, 5, 0], [5, 10, 0], [9, 10, 0], [5, 6, 1], [5, 8, 1], [12, 6, 1], [12, 8, 1]]) HOUSE.push(['brick_1x4', 'white', x, 0, z, r]);
for (const [x, z, r] of [[5, 5, 0], [9, 5, 0], [5, 10, 0], [9, 10, 0], [5, 6, 1], [5, 8, 1], [12, 6, 1], [12, 8, 1]]) HOUSE.push(['brick_1x4', 'azure', x, 3, z, r]);
for (const x of [5, 7, 9, 11]) for (const z of [5, 7, 9]) HOUSE.push(['slope_2x2', 'red', x, 6, z, 0]);
HOUSE.push(['pine_2x2', 'green', 1, 0, 1, 0], ['pine_2x2', 'green', 13, 0, 13, 0], ['flame_1x1', 'yellow', 2, 0, 12, 0], ['round_1x1', 'pink', 3, 0, 13, 0]);
module.exports.push(
  { name: 'rt-free', pre: save0({ ...ST, free: HOUSE }), post: async () => { $('sbFree').click(); await pump(900); } },
);
module.exports.push(
  { name: 'rt-home-box', pre: save0({ tut: 6, coins: 150, best: { 'Cây nấm': 3, 'Ngôi nhà': 2, 'Dưa hấu': 3, 'Lâu đài': 1 } }), post: async () => { await wait(500); } },
  { name: 'rt-win', pre: save0({ tut: 6, coins: 40, best: { 'Cây nấm': 3 }, own: { 'Ngôi nhà': true } }), post: async () => { startBuild(1); commitAll(); await wait(1500); $('skipBtn').click(); await wait(2500); } },
);
