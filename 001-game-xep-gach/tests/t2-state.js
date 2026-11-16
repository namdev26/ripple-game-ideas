// Task 2: trạng thái lưu, chuyển dữ liệu cũ, khóa theo bộ
module.exports = [
  { name: 'moi-vao', post: async () => {
      ok(S.coins === 200, 'coins ' + S.coins);
      ok(cardState(0) === 'need', 'card0 ' + cardState(0));
      ok(cardState(4) === 'buy', 'card4 ' + cardState(4));
      ok(levelOpen(4) === false, 'bộ 2 phải khóa');
      ok(levelOpen(3) === true, 'màn 4 bộ 1 phải mở (bỏ khóa từng màn)');
      ok(S.bp && S.inv && S.order && S.tut === 0, 'thiếu trường mới');
  } },
  { name: 'du-lieu-cu', pre: () => localStorage.setItem('xepgach.v2', JSON.stringify({ coins: 77, best: { 0: 3, 1: 2, 2: 1, 3: 3 } })),
    post: async () => {
      ok(S.coins === 77, 'coins ' + S.coins);
      ok(built(0) && owned(3), 'màn cũ phải đã lắp/sở hữu');
      ok(cardState(0) === 'built', 'card0 ' + cardState(0));
      ok(levelOpen(8) === true, 'bộ 2 mở, mọi màn trong bộ mở');
      ok(cardState(4) === 'buy', 'card4 ' + cardState(4));
      ok(levelOpen(11) === false, 'bộ 3 khóa');
  } },
  { name: 'query-all', query: '?all', pre: () => localStorage.setItem('xepgach.v2', JSON.stringify({ coins: 77, best: {} })),
    post: async () => {
      ok(owned(15) && levelOpen(15), 'all phải mở + sở hữu');
      ok(S.coins === 99999, 'coins ' + S.coins);
      save();
      ok(JSON.parse(localStorage.getItem('xepgach.v2')).coins === 77, 'không được lưu 99999');
  } },
];
