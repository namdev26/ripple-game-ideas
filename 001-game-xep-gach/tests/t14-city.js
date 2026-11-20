// Thành phố: đặt mô hình đã lắp / đồ trang trí, xu theo giờ (trần 8 giờ), thu xu, mở rộng đất
const save0 = o => new Function("localStorage.setItem('xepgach.v2'," + JSON.stringify(JSON.stringify(o)) + ')');
const BASE = { tut: 6, coins: 500, best: { '@R0': 3, '@L0': 2 }, deco: { '🎄': 1 } };
module.exports = [
  { name: 'dat-va-cat', pre: save0(BASE), post: async () => {
      openCity(); ok($('city').classList.contains('show') && $('cityGrid').querySelectorAll('.plot:not(.lock)').length === CITY_ROW0 * CITY_W, 'mở đầu 2 hàng đất');
      const f = cityFree(); ok(f.ms.length === 2 && f.ds.length === 1, 'kho: 2 mô hình đã lắp + 1 cây thông');
      $('cityGrid').querySelector('[data-k="0"]').click(); ok($('cityPick').style.display === '' && $('cityPick').querySelectorAll('.cpIt').length === 3, 'chọn ô trống → bảng chọn 3 món');
      $('cityPick').querySelector('.cpIt[data-m="' + lvIdx('@L0') + '"]').click();
      ok(city().p[0].m === '@L0' && cityRate() === CITY_RATE[2], 'đặt Lâu đài (huyền thoại) → +' + cityRate() + '/giờ');
      $('cityGrid').querySelector('[data-k="1"]').click(); $('cityPick').querySelector('.cpIt[data-d]').click();
      ok(city().p[1].d === '🎄' && cityFree().ds.length === 0 && cityRate() === CITY_RATE[2] + 1, 'đặt cây thông, hết trong kho');
      $('cityGrid').querySelector('[data-k="0"]').click(); $('cpDel').click();
      ok(!city().p[0] && cityFree().ms.length === 2, 'cất vào kho → lấy lại được');
  } },
  { name: 'thu-xu-theo-gio', pre: save0({ ...BASE, city: { rows: 2, bank: 0, t: Date.now() - 20 * 3600e3, p: { 0: { m: '@L0' }, 1: { m: '@R0' } } } }), post: async () => {
      const r = CITY_RATE[2] + CITY_RATE[0]; ok(cityCoins() === r * CITY_CAP, 'vắng 20 giờ chỉ tính tối đa 8 giờ: ' + cityCoins());
      openCity(); const c0 = S.coins; $('cityCollect').click();
      ok(S.coins === c0 + r * CITY_CAP && cityCoins() === 0, 'thu xu');
      city().t -= 3600e3; citySettle(); city().p[2] = { d: '🎄' }; city().t -= 3600e3;
      ok(cityCoins() === r + r + 1, 'đổi công trình giữa chừng: giờ trước tính theo mức cũ: ' + cityCoins());
  } },
  { name: 'mo-rong-dat', pre: save0({ ...BASE, coins: 200 }), post: async () => {
      openCity(); $('cityExpand').click(); ok(city().rows === 3 && S.coins === 200 - CITY_EXP[0], 'mở rộng 150 xu');
      $('cityExpand').click(); ok(city().rows === 3 && S.coins === 50, 'thiếu xu thì không mở');
      S.coins = 99999; for (let k = 0; k < 9; k++) $('cityExpand').click();
      ok(city().rows === CITY_ROWS && $('cityExpand').style.display === 'none', 'tối đa ' + CITY_ROWS + ' hàng');
      $('cityGrid').querySelector('[data-k="0"]').click(); ok($('cityPick').textContent.includes('Đặt gì'), 'ô mới mở đặt được');
  } },
  { name: 'cham-do-o-man-chinh', pre: save0(BASE), post: async () => {
      renderHome(); ok(document.querySelector('#sbCity .badge'), 'còn ô trống + mô hình chưa đặt → chấm đỏ');
      city().p = { 0: { m: '@R0' }, 1: { m: '@L0' } }; renderHome(); ok(!document.querySelector('#sbCity .badge'), 'đặt hết, chưa có xu → hết chấm');
  } },
];
module.exports.lib = require('./t4-build.js').lib;
