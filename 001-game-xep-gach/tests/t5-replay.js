// Task 5: phát lại + kệ trưng bày
module.exports = [
  { name: 'phat-lai-sau-khi-thang', post: async () => {
      fillInv(0); startBuild(0); const order = commitAll();
      await new Promise(r => setTimeout(r, 1500));
      ok(replaying, 'phải đang phát lại sau khi thắng');
      ok($('app').classList.contains('replaying'), 'thiếu class replaying');
      ok(!$('result').classList.contains('show'), 'chưa được hiện kết quả');
      ok(targets.find(t => t.idx === order[order.length - 1]).obj.visible === false, 'mảnh cuối phải còn ẩn lúc đầu');
      $('skipBtn').click();
      ok(!replaying && targets.every(t => t.obj.visible), 'skip phải hiện hết');
      const t = targets[0], [fx, fz] = footprint(t.key, t.rot);
      ok(Math.abs(t.obj.position.y - t.y * PLATE) < 1e-6 && Math.abs(t.obj.position.x - (t.x + fx / 2)) < 1e-6, 'mảnh phải về đúng chỗ');
      ok($('result').classList.contains('show'), 'skip xong phải hiện kết quả');
  } },
  { name: 'phat-lai-tu-chay-het', budget: 30000, post: async () => {
      fillInv(0); startBuild(0); commitAll();
      await pump(1500 + 9500);
      ok(!replaying && $('result').classList.contains('show'), 'hết phát lại phải hiện kết quả');
      ok(targets.every(t => t.obj.visible && t.obj.scale.x === 1), 'mảnh phải hiện đủ, đúng cỡ');
  } },
  { name: 'ke-trung-bay', pre: () => localStorage.setItem('xepgach.v2', JSON.stringify({ coins: 0, best: { 'Cây nấm': 3, 'Dưa hấu': 1 }, order: { 'Cây nấm': [1, 0] } })),
    post: async () => {
      $('shelfBtn').click();
      ok($('shelf').classList.contains('show'), 'kệ phải hiện');
      ok(document.querySelectorAll('#shGrid .shItem').length === 2, 'kệ có 2 mô hình');
      document.querySelector('#shGrid .shItem').click();
      $('shReplay').click();
      ok(replaying && L.name === 'Cây nấm' && !$('shelf').classList.contains('show'), 'phải phát lại Cây nấm');
      $('skipBtn').click();
      ok($('shelf').classList.contains('show') && !$('result').classList.contains('show'), 'xem xong quay về kệ, không hiện kết quả');
      document.querySelector('#shGrid .shItem').click(); $('shBuild').click();
      ok(L.name === 'Cây nấm' && rebuild && !replaying, 'lắp lại từ kệ');
  } },
  { name: 'home-da-lap-mo-ke', pre: () => localStorage.setItem('xepgach.v2', JSON.stringify({ coins: 0, best: { 'Cây nấm': 3 } })),
    post: async () => {
      showHome(0); homeSel = 0; renderHome(); $('playBtn').click();
      ok($('shelf').classList.contains('show'), 'nút chính của màn đã lắp phải mở kệ');
  } },
];
// lib là chuỗi nguồn hàm (runner chèn nguyên văn): dùng lại helper của t4 + wait
module.exports.lib = `()=>{(${require('./t4-build.js').lib})(); window.wait=ms=>new Promise(r=>setTimeout(r,ms));
  window.pump=ms=>new Promise(r=>{ const id=setInterval(()=>frame(),150); setTimeout(()=>{ clearInterval(id); r(); },ms); });}`;
// pump: Chrome headless với virtual-time gần như không chạy requestAnimationFrame, nên tự gọi frame()
