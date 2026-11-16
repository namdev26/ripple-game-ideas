// Ảnh để xem bằng mắt: SHOT=1 node tests/run-headless.js tests/shots-hb.js  → tests/.tmp/<case>.png
const save0 = o => new Function("localStorage.setItem('xepgach.v2'," + JSON.stringify(JSON.stringify(o)) + ')');
const ST = { coins: 260, best: { 'Cây nấm': 3, 'Ngôi nhà': 2, 'Dưa hấu': 3, 'Lâu đài': 1 }, own: { 'Tượng Zeus': true, 'Đền Artemis': true }, sp: { 'Dưa hấu': true }, tut: 6 };
module.exports = [
  { name: 'hb-home-moi', post: async () => {} },
  { name: 'hb-home', pre: save0(ST), post: async () => {} },
  { name: 'hb-unbox', pre: save0(ST), post: async () => { openUnbox(7, true, true); ubGo(1); ubGo(2); ubGo(3); ubGo(4); ubGo(5); } },
  { name: 'hb-unbox-giua', pre: save0(ST), post: async () => { openUnbox(5, false, true); ubGo(1); } },
  { name: 'hb-shop', pre: save0(ST), post: async () => { showHome(1); openShop(); mSel = 4; renderShopM(); } },
  { name: 'hb-bia', pre: save0(ST), post: async () => { openBlueprint(6); } },
  { name: 'hb-trang', pre: save0(ST), post: async () => { openBlueprint(6); bpPage = 3; renderBp(); } },
  { name: 'hb-trang-cuoi', pre: save0(ST), post: async () => { openBlueprint(6); bpPage = 13; renderBp(); } },
  { name: 'hb-ke', pre: save0(ST), post: async () => { openShelf(); } },
  { name: 'hb-tile', pre: save0(ST), post: async () => { showHome(1); $('oddsBtn').click(); } },
];
module.exports.lib = require('./t4-build.js').lib;
