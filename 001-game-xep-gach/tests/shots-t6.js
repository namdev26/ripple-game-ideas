// Ảnh hướng dẫn lần đầu (SHOT=1 node tests/run-headless.js tests/shots-t6.js)
module.exports = [
  { name: 'shot-tut-home', post: async () => {} },
  { name: 'shot-tut-shop', post: async () => { $('playBtn').click(); $('bpShop').click(); } },
];
module.exports.push({ name: 'shot-tut-back', post: async () => { $('playBtn').click(); $('bpShop').click(); $('comboBuy').click(); } });
