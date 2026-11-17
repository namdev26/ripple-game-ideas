// Hướng dẫn lần đầu: LEVEL 1 miễn phí → lật trang → lắp → (sau khi lắp xong) chỉ cửa hàng một lần
const tipOn = () => tipEl.classList.contains('show') && document.contains(tipEl);
module.exports = [
  { name: 'huong-dan-day-du', post: async () => {
      ok(tipOn() && tipAt === $('hNextBtn'), 'bước 1: chỉ nút LEVEL 1');
      $('hNextBtn').click();
      ok(tipOn() && tipAt === $('bpNext'), 'bước 3: chỉ lật trang');
      $('bpNext').click();
      ok(tipOn() && tipAt === $('bpBuild'), 'bước 4: chỉ Lắp');
      $('bpBuild').click();
      ok(!tipOn() && L && L.name === 'Cây nấm', 'vào lắp, tắt bong bóng');
      commitAll(); toMenu();
      ok(S.tut === 5 && tipOn() && tipAt === $('shopBtn'), 'sau lần lắp đầu: chỉ cửa hàng, tut=' + S.tut);
      $('shopBtn').click();
      ok(S.tut === 6 && !tipOn(), 'mở cửa hàng xong thì thôi');
      ok(JSON.parse(localStorage.getItem('xepgach.v2')).tut === 6, 'phải lưu tut');
  } },
  { name: 'co-roi-chi-the-cho-lap', pre: () => localStorage.setItem('xepgach.v2', JSON.stringify({ coins: 0, own: { 'Cây nấm': true } })),
    post: async () => { ok(tipOn() && tipAt === $('hNextBtn'), 'có Cây nấm chưa lắp: chỉ nút LEVEL 1'); } },
  { name: 'da-xong-khong-hien', pre: () => localStorage.setItem('xepgach.v2', JSON.stringify({ coins: 200, best: {}, tut: 6 })),
    post: async () => { ok(!tipOn(), 'không được hiện hướng dẫn'); } },
  { name: 'nguoi-cu-khong-hien', pre: () => localStorage.setItem('xepgach.v2', JSON.stringify({ coins: 50, best: { 'Cây nấm': 3 } })),
    post: async () => { ok(!tipOn() && S.tut === 6, 'người chơi cũ: tut=' + S.tut); } },
];
module.exports.forEach(c => { const p = c.post; c.post = new Function('return (async()=>{ const tipOn=' + tipOn.toString() + '; return (' + p.toString() + ')(); })()'); });
module.exports.lib = require('./t4-build.js').lib;
