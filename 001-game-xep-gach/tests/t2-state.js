// Trạng thái lưu, chuyển save cũ (bản thiết kế + kho mảnh), ?all
module.exports = [
  { name: 'moi-vao', post: async () => {
      ok(S.coins === 0, 'coins ' + S.coins);
      ok(!owned(0) && !built(0), 'chưa có mô hình nào');
      ok(S.own && S.sp && S.next && S.tut === 0, 'thiếu trường mới');
      ok(roadNext() === 0 && $('hNextBtn').textContent.includes('LEVEL 1'), 'người mới: Level 1 Cây nấm miễn phí');
      ok(S.next.g && S.next.g.i !== 0 && !owned(S.next.g.i), 'hộp không bán level kế (đã miễn phí): ' + JSON.stringify(S.next.g));
  } },
  { name: 'du-lieu-cu', pre: () => localStorage.setItem('xepgach.v2', JSON.stringify({ coins: 77, best: { 0: 3, 1: 2, 2: 1, 3: 3 },
      bp: { 'Kim tự tháp Giza': true }, inv: { 'base_12x12|green': 2, 'plate_1x1|red': 3 }, tut: 4 })),
    post: async () => {
      ok(S.coins === 77 + 24 + 3, 'kho mảnh phải hoàn 100% ra xu: ' + S.coins);
      ok(built(0) && owned(3), 'màn cũ đã lắp phải còn');
      const g = LEVELS.findIndex(l => l.name === 'Kim tự tháp Giza');
      ok(owned(g) && !built(g), 'bản thiết kế đã mua → chờ lắp');
      ok(!('inv' in S) && !('bp' in S), 'bỏ trường cũ');
      ok(S.tut === 6, 'đã lắp rồi thì xong hướng dẫn: ' + S.tut);
      ok(JSON.parse(localStorage.getItem('xepgach.v2')).coins === 104, 'phải lưu sau chuyển đổi');
  } },
  { name: 'query-all', query: '?all', pre: () => localStorage.setItem('xepgach.v2', JSON.stringify({ coins: 77, best: {} })),
    post: async () => {
      ok(owned(15), 'all phải sở hữu hết');
      ok(S.coins === 99999, 'coins ' + S.coins);
      giveModel(4); save();
      const st = JSON.parse(localStorage.getItem('xepgach.v2'));
      ok(st.coins === 77 && !st.own, '?all không được ghi save');
  } },
];
module.exports.lib = require('./t4-build.js').lib;
