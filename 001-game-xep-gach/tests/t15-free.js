// Chế độ sáng tạo: kéo gạch tự do, chồng lên nhau, đổi màu/xoay, hoàn tác/xoá, tự lưu, chụp ảnh
const save0 = o => new Function("localStorage.setItem('xepgach.v2'," + JSON.stringify(JSON.stringify(o)) + ')');
// toạ độ màn hình của điểm (x,y,z) trên bàn
const extra = () => {
  window.scr = (x, y, z) => { scene.updateMatrixWorld(); camera.updateMatrixWorld(); const r = canvas.getBoundingClientRect(), p = new THREE.Vector3(x, y, z).project(camera); return [r.left + (p.x + 1) / 2 * r.width, r.top + (1 - p.y) / 2 * r.height]; };
  // kéo mảnh idx của khay tới (cx,cy) rồi thả
  window.dragTo = (idx, cx, cy) => {
    const r = tray[idx].el.getBoundingClientRect(), x0 = r.left + r.width / 2, y0 = r.top + r.height / 2;
    tray[idx].el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: x0, clientY: y0, pointerType: 'mouse' }));
    dispatchEvent(new PointerEvent('pointermove', { clientX: x0, clientY: y0 - 40 }));
    dispatchEvent(new PointerEvent('pointermove', { clientX: cx, clientY: cy }));
    const pv = drag && drag.prev; dispatchEvent(new PointerEvent('pointerup', { clientX: cx, clientY: cy })); return pv;
  };
};
module.exports = [
  { name: 'vao-sang-tao', post: async () => {
      $('sbFree').click();
      ok(mode === 'free' && L === FREE_LV && $('app').classList.contains('free') && tray.length === FREE_PARTS.length, 'vào bàn trống, khay = bảng gạch');
      ok(getComputedStyle($('freeBar')).display === 'flex' && getComputedStyle($('stepBook')).display === 'none' && $('hintBtn').style.display === 'none', 'hiện thanh màu, ẩn sổ bước + gợi ý');
      const h = heartsNow(); $('backBtn').click(); ok($('home').classList.contains('show') && heartsNow() === h, 'thoát không mất ❤️, không hỏi');
      giveModel(0); startBuild(0); ok(!$('app').classList.contains('free') && tray.length > 0 && tray.every(it => it.left > 0) && mode === null, 'lắp thường trở lại bình thường');
  } },
  { name: 'dat-va-chong', post: async () => {
      $('sbFree').click(); await wait(200);
      const [cx, cy] = scr(8, 0, 8), k = FREE_PARTS.indexOf('brick_2x2');
      const a = dragTo(k, cx, cy);
      ok(a && freeB.length === 1 && freeB[0].y === 0 && freeB[0].color === 'red', 'thả lên bàn → đặt gạch đỏ ở đáy: ' + JSON.stringify(a));
      const b = dragTo(k, cx, cy); ok(freeB.length === 2 && freeB[1].y === PARTS.brick_2x2.h && freeB[1].x === freeB[0].x, 'thả cùng chỗ → chồng lên trên: y=' + freeB[1].y);
      ok(S.free.length === 2, 'tự lưu');
      $('fColors').querySelector('[data-c="blue"]').click(); ok(tray.every(it => it.color === 'blue'), 'đổi màu cả khay');
      $('fRot').click(); const k4 = FREE_PARTS.indexOf('brick_2x4'), [px, py] = scr(3, 0, 3), c = dragTo(k4, px, py);
      ok(freeB[2].rot === 1 && freeB[2].color === 'blue', 'xoay + màu mới: ' + JSON.stringify(c));
      $('fUndo').click(); ok(freeB.length === 2 && S.free.length === 2, 'hoàn tác');
      $('fShot').click(); ok($('shotModal').classList.contains('show') && $('shotImg').src.startsWith('data:image/png') && $('shotSave').href === $('shotImg').src, 'chụp ảnh → bảng lưu ảnh');
      show('shotModal', false); $('fClear').click(); ok(freeB.length === 2, 'xoá cần bấm 2 lần'); $('fClear').click(); ok(freeB.length === 0 && S.free.length === 0, 'xoá hết');
  } },
  { name: 'tu-luu-lan-sau', pre: save0({ tut: 6, free: [['brick_2x4', 'red', 2, 0, 2, 0], ['plate_2x2', 'yellow', 2, 3, 2, 0], ['xx', 'red', 0, 0, 0, 0]] }), post: async () => {
      $('sbFree').click(); ok(freeB.length === 2 && levelRoot.children.includes(freeB[1].obj), 'mở lại thấy công trình cũ, bỏ mảnh lỗi');
      const c = freeCell(...scr(3, 0.8, 3), 'brick_1x1'); ok(c && c.y === 4, 'đặt lên chỗ đã có 2 lớp → y=4: ' + JSON.stringify(c));
  } },
];
module.exports.lib = new Function('(' + require('./t4-build.js').lib + ')();(' + extra + ')();');
