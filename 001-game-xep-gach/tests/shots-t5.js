// Ảnh để xem bằng mắt (SHOT=1 node tests/run-headless.js tests/shots-t5.js)
module.exports = [
  // ảnh giữa lúc phát lại: --screenshot treo khi đang có cảnh 3D (swiftshader chậm), chụp bằng canvas.toDataURL ở tests/.tmp khi cần
  { name: 'shot-shelf', pre: () => localStorage.setItem('xepgach.v2', JSON.stringify({ coins: 0, best: { 'Cây nấm': 3, 'Ngôi nhà': 2, 'Dưa hấu': 1, 'Lâu đài': 3, 'Kim tự tháp Giza': 3 } })),
    post: async () => { openShelf(4); } },
];
module.exports.lib = require('./t5-replay.js').lib;
