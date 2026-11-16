// Task 6: hướng dẫn màn 1 (bong bóng #tip chỉ vào nút cần bấm)
const tipOn = () => tipEl.classList.contains('show') && document.contains(tipEl);
module.exports = [
  { name: 'huong-dan-day-du', post: async () => {
      ok(tipOn() && S.tut === 0 && tipAt === $('playBtn'), 'bước 0: chỉ nút chính, tut=' + S.tut);
      $('playBtn').click();
      ok(tipOn() && S.tut === 1 && tipAt === $('bpShop'), 'bước 1: chỉ nút mua gạch, tut=' + S.tut);
      $('bpShop').click();
      ok(tipOn() && S.tut === 2 && tipAt === $('comboBuy'), 'bước 2: chỉ combo, tut=' + S.tut);
      $('comboBuy').click();
      ok(tipOn() && S.tut === 3 && tipAt === $('shopClose'), 'bước 3: chỉ nút quay lại, tut=' + S.tut);
      $('shopClose').click();
      ok(tipOn() && tipAt === $('bpBuild'), 'bước 3: chỉ nút lắp');
      $('bpBuild').click();
      ok(S.tut === 4 && !tipOn(), 'xong: tut=' + S.tut);
      ok(JSON.parse(localStorage.getItem('xepgach.v2')).tut === 4, 'phải lưu tut');
  } },
  { name: 'da-xong-khong-hien', pre: () => localStorage.setItem('xepgach.v2', JSON.stringify({ coins: 200, best: {}, tut: 4 })),
    post: async () => { ok(!tipOn(), 'không được hiện hướng dẫn'); $('playBtn').click(); ok(!tipOn(), 'không hiện ở bản thiết kế'); } },
  { name: 'nguoi-cu-khong-hien', pre: () => localStorage.setItem('xepgach.v2', JSON.stringify({ coins: 50, best: { 'Cây nấm': 3 } })),
    post: async () => { ok(!tipOn() && S.tut === 4, 'người chơi cũ đã lắp màn 1: tut=' + S.tut); } },
];
module.exports.forEach(c => { const p = c.post; c.post = new Function('return (async()=>{ const tipOn=' + tipOn.toString() + '; return (' + p.toString() + ')(); })()'); });
