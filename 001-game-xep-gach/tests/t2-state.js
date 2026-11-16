// Trạng thái lưu, chuyển save cũ (bản thiết kế + kho mảnh), khóa theo bộ, ?all
module.exports = [
  { name: 'moi-vao', post: async () => {
      ok(S.coins === 0, 'coins ' + S.coins);
      ok(!owned(0) && !built(0), 'chưa có mô hình nào');
      ok(seriesOpen(0) && !seriesOpen(1), 'chỉ mở bộ 1');
      ok(S.own && S.sp && S.next && S.tut === 0, 'thiếu trường mới');
      ok(boxCost(0) === 0, 'hộp đầu miễn phí: ' + boxCost(0));
      ok(S.next[0] && S.next[0].i === 0 && !S.next[0].sp, 'hộp đầu luôn ra Cây nấm: ' + JSON.stringify(S.next[0]));
  } },
  { name: 'du-lieu-cu', pre: () => localStorage.setItem('xepgach.v2', JSON.stringify({ coins: 77, best: { 0: 3, 1: 2, 2: 1, 3: 3 },
      bp: { 'Kim tự tháp Giza': true }, inv: { 'base_12x12|green': 2, 'plate_1x1|red': 3 }, tut: 4 })),
    post: async () => {
      ok(S.coins === 77 + 24 + 3, 'kho mảnh phải hoàn 100% ra xu: ' + S.coins);
      ok(built(0) && owned(3), 'màn cũ đã lắp phải còn');
      const g = LEVELS.findIndex(l => l.name === 'Kim tự tháp Giza');
      ok(owned(g) && !built(g), 'bản thiết kế đã mua → chờ lắp');
      ok(!('inv' in S) && !('bp' in S), 'bỏ trường cũ');
      ok(seriesOpen(1) && !seriesOpen(2), 'khóa theo bộ');
      ok(S.tut === 6, 'đã lắp rồi thì xong hướng dẫn: ' + S.tut);
      ok(JSON.parse(localStorage.getItem('xepgach.v2')).coins === 104, 'phải lưu sau chuyển đổi');
  } },
  { name: 'query-all', query: '?all', pre: () => localStorage.setItem('xepgach.v2', JSON.stringify({ coins: 77, best: {} })),
    post: async () => {
      ok(owned(15) && seriesOpen(2), 'all phải mở + sở hữu');
      ok(S.coins === 99999, 'coins ' + S.coins);
      giveModel(4); save();
      const st = JSON.parse(localStorage.getItem('xepgach.v2'));
      ok(st.coins === 77 && !st.own, '?all không được ghi save');
  } },
];
module.exports.lib = require('./t4-build.js').lib;
