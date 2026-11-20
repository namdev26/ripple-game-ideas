// Ảnh để xem bằng mắt (SHOT=1 node tests/run-headless.js tests/shots-t5.js)
module.exports = [
  // ảnh giữa lúc phát lại: --screenshot treo khi đang có cảnh 3D (swiftshader chậm), chụp bằng canvas.toDataURL ở tests/.tmp khi cần
  { name: 'shot-shelf', pre: () => localStorage.setItem('xepgach.v2', JSON.stringify({ coins: 0, best: { '@R0': 3, '@R1': 2, '@R2': 1, '@R12': 3, '@R18': 3 } })),
    post: async () => { openShelf(4); } },
];
module.exports.lib = require('./t4-build.js').lib;
