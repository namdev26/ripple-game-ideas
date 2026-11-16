// Ảnh để xem bằng mắt (SHOT=1 node tests/run-headless.js tests/shots-t3.js) — không chạy trong run-all
const done1 = () => localStorage.setItem('xepgach.v2', JSON.stringify({ coins: 420, best: { 'Cây nấm': 3, 'Ngôi nhà': 3, 'Dưa hấu': 2, 'Lâu đài': 3 }, bp: { 'Kim tự tháp Giza': true }, inv: { 'base_12x12|sand': 1, 'brick_2x4|sand': 6 } }));
module.exports = [
  { name: 'shot-home', pre: done1, post: async () => { showHome(1); homeSel = 4; renderHome(); } },
  { name: 'shot-bp', pre: done1, post: async () => { openBlueprint(4); bpPage = 2; renderBp(); } },
  { name: 'shot-shop', pre: done1, post: async () => { openShop(4); } },
  { name: 'shot-shelf', pre: done1, post: async () => { openShop(null, 'shelf'); document.querySelectorAll('#catGrid .catItem')[3].click(); } },
  { name: 'shot-inv', pre: done1, post: async () => { openInv(); document.querySelector('#invGrid .invItem').click(); } },
];
