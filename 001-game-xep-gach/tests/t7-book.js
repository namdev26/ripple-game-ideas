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
];
module.exports.lib = require('./t4-build.js').lib;
