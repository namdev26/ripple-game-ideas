// Sách hướng dẫn kiểu LEGO (bìa / trang bước có khung mảnh "2x + tên màu" / trang danh sách mảnh) + kệ có bóng đen
// pre được chèn nguyên văn vào trang (mất closure) nên dựng hàm từ chuỗi
const save0 = o => new Function("localStorage.setItem('xepgach.v2'," + JSON.stringify(JSON.stringify(o)) + ')');
module.exports = [
  { name: 'sach-kieu-lego', post: async () => {
      const g = LEVELS.findIndex(l => l.name === 'Kim tự tháp Giza');
      giveModel(g); openBlueprint(g);
      ok($('bpPage').textContent.includes('Kim tự tháp Giza') && $('bpPage').textContent.includes(LEVELS[g].steps.length + ' bước'), 'bìa: ' + $('bpPage').textContent);
      $('bpNext').click();
      const n0 = new Set(LEVELS[g].steps[0].map(([k, c]) => k + '|' + c)).size, cis = document.querySelectorAll('#bpPage .callout .ci');
      ok(cis.length === n0, 'khung mảnh bước 1: ' + cis.length + '/' + n0);
      ok([...cis].every(e => /\d+x/.test(e.textContent) && Object.values(COLOR_VI).some(v => e.textContent.includes(v))), 'mỗi mảnh có "Nx" + tên màu');
      ok(document.querySelector('#bpPage .stepNo').textContent.trim() === '1', 'số bước to');
      for (let k = 0; k < 40; k++) $('bpNext').click();
      ok(document.querySelectorAll('#bpPage .ci').length === bomOf(g).length && $('bpPage').textContent.includes('Danh sách mảnh'), 'trang cuối: danh sách mảnh');
  } },
  { name: 'sach-ban-dac-biet', post: async () => {
      giveModel(0, true); openBlueprint(0); $('bpNext').click();
      ok([...document.querySelectorAll('#bpPage .ci')].every(e => e.textContent.includes('Vàng kim')), 'bản đặc biệt: mảnh vàng kim');
      ok($('bpBuild').textContent.includes('LẮP'), 'nút lắp');
  } },
  { name: 'ke-bong-den', pre: save0({ coins: 0, best: { 'Cây nấm': 3 }, own: { 'Ngôi nhà': true }, sp: { 'Cây nấm': true } }), post: async () => {
      $('shelfBtn').click();
      const it = document.querySelectorAll('#shGrid .shItem');
      ok(it.length === LEVELS.length, 'kệ hiện đủ 16 chỗ: ' + it.length);
      ok(document.querySelectorAll('#shGrid .shItem.sil').length === LEVELS.length - 2, 'chưa có → bóng đen');
      ok(it[0].classList.contains('sp'), 'bản đặc biệt có khung vàng');
      it[2].click(); ok($('shPick').style.display === 'none', 'chọn bóng đen không làm gì');
      it[1].click(); ok($('bpView').classList.contains('show') && bpI === 1, 'chờ lắp → mở sách');
  } },
  { name: 'buoc-khong-bi-che', query: '?all', post: async () => {
      const i = LEVELS.findIndex(l => l.name === 'Chuột'), ts = modelInfo(LEVELS[i]).ts, n = ts.find(t => t.key === 'arch_1x4').step, v = stepView(ts, n);
      ok(v.sc > 0.8 && v.dir.z < 0, 'hang chuột sau lưng con chuột: sổ bước xoay ra sau để thấy rõ, điểm ' + v.sc);
      ok(stepView(ts, 1).dir.equals(new THREE.Vector3(0.55, 0.65, 1)), 'bước không bị che giữ góc quen thuộc');
      ok(ts.filter(t => t.step === n).every(t => t.x < 4 && t.z < 4), 'bước chỉ lắp 1 cụm ở 1 chỗ (không gom phô mai ở góc kia)');
      ok(thumbStep(i, n, false, true).startsWith('data:image'), 'vẽ được ảnh bước');
      const same = LEVELS.every(l => { const c = l.steps.length; splitHiddenSteps(l); return l.steps.length === c; });
      ok(same && LEVELS.find(l => l.name === 'Lâu đài').steps.length > 21, 'bước rải nhiều chỗ bị che đã được tách (chia lại không đổi gì nữa)');
  } },
  { name: 'so-buoc-quay-theo-board', post: async () => {
      giveModel(1); startBuild(1); await wait(300); const a = $('sbImg').src;
      const v = camera.position.clone().sub(controls.target); v.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI * 0.75); camera.position.copy(controls.target).add(v); controls.update();
      await wait(400); ok($('sbImg').src !== a && $('sbImg').src.startsWith('data:image'), 'xoay board → hình sổ bước quay theo cùng hướng');
  } },
];
module.exports.lib = require('./t4-build.js').lib;
