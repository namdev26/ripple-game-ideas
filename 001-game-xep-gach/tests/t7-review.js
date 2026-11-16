// Sửa sau review cuối: ?all không ghi save, rời màn trong lúc chờ phát lại, bong bóng hướng dẫn, bán mảnh 0 xu, nhãn "Rẻ hơn"
const tipOn = 'tipEl.classList.contains("show") && document.contains(tipEl)';
module.exports = [
  { name: 'all-khong-ghi-save', query: '?all', pre: () => localStorage.setItem('xepgach.v2', JSON.stringify({ coins: 77, best: {} })),
    post: async () => {
      openShop(4); $('comboBuy').click(); fillInv(0); S.coins = 99999; startBuild(0); commitAll(); save();
      const st = JSON.parse(localStorage.getItem('xepgach.v2'));
      ok(st.coins === 77 && !st.inv && !Object.keys(st.best).length, 'save bị ghi: ' + JSON.stringify(st).slice(0, 120));
  } },
  { name: 'roi-man-truoc-phat-lai', post: async () => {
      fillInv(0); startBuild(0); commitAll(); toMenu();
      await wait(1600);
      ok(!replaying && !$('result').classList.contains('show') && !$('app').classList.contains('replaying'), 'vẫn phát lại/hiện kết quả sau khi về menu');
  } },
  { name: 'bong-bong-khong-bi-cat', post: async () => {
      $('playBtn').click();
      const a = $('app').getBoundingClientRect(), r = tipEl.getBoundingClientRect();
      ok(tipAt === $('bpShop') && r.left >= a.left - 1 && r.right <= a.right + 1, `bong bóng tràn khung: ${r.left}-${r.right} / ${a.left}-${a.right}`);
  } },
  { name: 'bong-bong-ben-vung', post: async () => {
      $('playBtn').click(); $('bpShop').click();
      document.querySelector('#missList [data-d="-1"]').click();
      ok(eval(TIP_ON) && tipAt === $('comboBuy'), 'bấm −/+ làm mất bong bóng');
      $('shopClose').click(); $('bpClose').click();
      $('hLevels').children[1].click();
      ok(!eval(TIP_ON), 'chọn màn khác vẫn còn bong bóng màn 1');
  } },
  { name: 'ban-0-xu-bi-khoa', post: async () => {
      S.coins = 10; S.inv = { 'plate_1x1|red': 2 }; openInv();
      document.querySelector('#invGrid .invItem').click();
      ok($('sellBtn').classList.contains('dis'), 'nút bán phải mờ khi giá 0');
      $('sellBtn').click(); ok(S.inv['plate_1x1|red'] === 2 && S.coins === 10, 'không được bán 0 xu');
  } },
  { name: 'nguoi-moi-chua-co-ke-hang', post: async () => {
      openShop(0); ok($('tabShelf').style.display === 'none', 'người mới chưa lắp gì: ẩn Kệ hàng');
      openInv(); ok($('invShop').style.display === 'none', 'ẩn nút tiệm ở kho');
      fillInv(0); startBuild(0); commitAll(); openShop(1);
      ok($('tabShelf').style.display !== 'none', 'đã lắp 1 mô hình: hiện Kệ hàng');
  } },
  { name: 're-hon-theo-phan-thieu-that', pre: () => localStorage.setItem('xepgach.v2', JSON.stringify({ coins: 999, best: { 'Cây nấm': 3, 'Ngôi nhà': 3, 'Dưa hấu': 3, 'Lâu đài': 3 }, bp: { 'Kim tự tháp Giza': true } })),
    post: async () => {
      openShop(4);
      Object.keys(missQty).forEach(k => missQty[k] = 0); missQty[Object.keys(missQty)[0]] = 1; renderMiss();
      ok($('comboBuy').classList.contains('cheap') && !$('missBuy').classList.contains('cheap'), 'giảm số lượng không được làm "Rẻ hơn" nhảy sang phần thiếu');
  } },
];
module.exports.forEach(c => { const p = c.post; c.post = new Function('return (async()=>{ const TIP_ON=' + JSON.stringify(tipOn) + '; return (' + p.toString() + ')(); })()'); });
module.exports.lib = require('./t5-replay.js').lib;
