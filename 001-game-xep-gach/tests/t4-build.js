// Lắp: chỉ lắp mô hình đã có, thưởng theo độ hiếm/sao/bản đặc biệt, đủ bộ thưởng thêm, lắp lại +15, ghi thứ tự lắp
// pre được chèn nguyên văn vào trang (mất closure) nên dựng hàm từ chuỗi
const save0 = o => new Function("localStorage.setItem('xepgach.v2'," + JSON.stringify(JSON.stringify(o)) + ')');
module.exports = [
  { name: 'lap-lan-dau', post: async () => {
      giveModel(0); startBuild(0);
      ok(L && L.name === 'Cây nấm' && !rebuild, 'phải vào lắp Cây nấm');
      const order = commitAll();
      ok(S.coins === rewardFor(0, 3), 'coins ' + S.coins + ' != ' + rewardFor(0, 3));
      ok(JSON.stringify(S.order['Cây nấm']) === JSON.stringify(order), 'order ' + JSON.stringify(S.order['Cây nấm']));
      ok(built(0) && JSON.parse(localStorage.getItem('xepgach.v2')).best['Cây nấm'] === 3, 'phải lưu');
  } },
  { name: 'chua-co-khong-lap', post: async () => {
      startBuild(1);
      ok(L.name !== LEVELS[1].name && $('home').classList.contains('show'), 'chưa có mô hình thì không được lắp');
  } },
  { name: 'lap-lai', pre: save0({ coins: 5, best: { 'Cây nấm': 2 } }), post: async () => {
      startBuild(0, true); ok(rebuild, 'phải là lắp lại'); commitAll();
      ok(S.coins === 5 + REBUILD_REWARD && S.best['Cây nấm'] === 3, 'coins ' + S.coins);
  } },
  { name: 'rAgain-la-lap-lai', post: async () => {
      giveModel(0); startBuild(0); commitAll(); const c = S.coins; $('rAgain').click();
      ok(rebuild, 'rAgain phải là lắp lại'); commitAll(); ok(S.coins === c + REBUILD_REWARD, 'coins ' + S.coins);
  } },
  { name: 'dac-biet-vang-kim', post: async () => {
      giveModel(0, true); startBuild(0);
      ok(targets.every(t => t.color === 'goldsp' || t.color === 'water'), 'bản đặc biệt phải lắp bằng mảnh vàng kim');
      commitAll(); ok(S.coins === rewardFor(0, 3, true), 'thưởng bản đặc biệt ' + S.coins);
  } },
  { name: 'du-bo-thuong-them', pre: save0({ coins: 0, best: { 'Cây nấm': 1, 'Ngôi nhà': 1, 'Dưa hấu': 1 }, own: { 'Lâu đài': true } }), post: async () => {
      ok(!seriesOpen(1), 'bộ 2 chưa mở'); startBuild(3); commitAll();
      ok(S.coins === rewardFor(3, 3) + seriesBonus(0), 'coins ' + S.coins);
      ok(seriesOpen(1), 'đủ bộ phải mở bộ sau');
  } },
  { name: 'tiep-tuc-mo-sach-cho-lap', post: async () => {
      giveModel(0); giveModel(2); startBuild(0); commitAll(); $('rNext').click();
      ok($('bpView').classList.contains('show') && bpI === 2, 'còn mô hình chờ lắp → mở sách của nó');
  } },
  { name: 'so-tay-buoc', post: async () => {
      giveModel(0); startBuild(0); const N = L.steps.length, s0 = targets.filter(t => t.step === 0);
      const B = $('stepBook').getBoundingClientRect(), W = $('app').getBoundingClientRect(), G = $('setBtn').getBoundingClientRect();
      const K = $('backBtn').getBoundingClientRect();
      ok(B.width > 0 && Math.abs(B.left + B.width / 2 - (W.left + W.width / 2)) < 2, 'sổ bước ở giữa');
      ok(K.width > 0 && K.left - W.left < W.width * 0.08 && K.top - W.top < W.width * 0.08, 'nút back góc trên trái');
      const hit = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
      ok(![K, G].some(r => hit(r, B)), 'sổ không đè back/⚙');
      ok($('stepBook').textContent.includes('Cây nấm'), 'tên mô hình nằm trong sổ bước');
      ok(['lvText', 'stepText', 'pbar', 'infoBtn'].every(id => !$(id)), 'bỏ MÀN, nhãn bước, thanh %, nút i');
      $('setBtn').click(); $('sHelp').click(); ok($('infoModal').classList.contains('show'), 'cách chơi mở từ cài đặt');
      ok(B.bottom - W.top < W.width * 0.5, 'sổ bước gọn, không che nhiều bàn lắp: đáy ở ' + Math.round((B.bottom - W.top) / W.width * 100) + 'cqw');
      ok($('sbNo').textContent === 'Bước 1/' + N, 'số bước: ' + $('sbNo').textContent);
      ok($('sbImg').src.startsWith('data:image'), 'có hình bước');
      ok(sbBrick({ step: 0, color: 'red' }, 1, false)[0] === 'gray' && sbBrick({ step: 1, color: 'red' }, 1, false)[0] === 'red' && sbBrick({ step: 1, color: 'red' }, 1, true)[0] === 'goldsp', 'sổ bước: mảnh bước trước xám đồng màu, bước hiện tại giữ màu');
      const cnt = () => [...document.querySelectorAll('#sbParts b')].map(b => b.textContent);
      ok(cnt().every(c => c.startsWith('0/')) && cnt().reduce((a, c) => a + +c.split('/')[1], 0) === s0.length, 'đếm mảnh bước 1: ' + cnt());
      commit(s0[0]); ok(cnt().reduce((a, c) => a + +c.split('/')[0], 0) === 1, 'lắp 1 mảnh → tăng: ' + cnt());
      s0.slice(1).forEach(t => commit(t)); await wait(400);
      ok($('sbNo').textContent === 'Bước 2/' + N, 'xong bước → sang bước 2: ' + $('sbNo').textContent);
      show('infoModal', false);
      const w0 = $('sbImg').getBoundingClientRect().width; $('stepBook').click();
      ok($('stepBook').classList.contains('big') && $('sbImg').getBoundingClientRect().width > w0 * 1.6, 'chạm sổ → phóng to hình bước: ' + w0 + ' → ' + $('sbImg').getBoundingClientRect().width);
      canvas.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); ok(!$('stepBook').classList.contains('big'), 'chạm ra ngoài → thu nhỏ');
      $('backBtn').click(); ok($('home').classList.contains('show'), 'back về màn chính');
  } },
  { name: 'khong-hien-hinh-trang', post: async () => {
      giveModel(0); startBuild(0); await wait(500);
      ok(targets.every(t => !t.ghost.visible), 'không hiện hình trắng xem trước trên bàn');
      scene.updateMatrixWorld(); camera.updateMatrixWorld(); // headless gần như không chạy frame()
      const t = targets.find(t => t.step === 0 && supported(t)), r = canvas.getBoundingClientRect();
      const p = new THREE.Vector3(t.x + t.fx / 2, (t.y + PARTS[t.key].h) * PLATE, t.z + t.fz / 2).project(camera);
      const res = findGhost(r.left + (p.x + 1) / 2 * r.width, r.top + (1 - p.y) / 2 * r.height, { key: t.key, color: t.color });
      ok(res.ok && res.ok.key === t.key, 'thả đúng chỗ vẫn khớp dù không hiện hình: ' + JSON.stringify(Object.keys(res)));
      $('hintBtn').click(); ok(hintT && hintT.ghost.visible, 'gợi ý thì hiện hình chỗ cần lắp');
  } },
  { name: 'mang-song', post: async () => {
      giveModel(0); S.coins = 99999; startBuild(0); // xu nhiều nhất vẫn không đè mạng
      const on = () => document.querySelectorAll('#lives .on').length, W = $('app').getBoundingClientRect(), V = $('lives').getBoundingClientRect();
      ok(on() === 3 && Math.abs(V.left + V.width / 2 - (W.left + W.width / 2)) < 2, '3 mạng ở giữa: ' + on());
      ok(![...$('hud').querySelectorAll('.coins')].length, 'màn lắp không hiện xu');
      const R = ['backBtn', 'lives', 'setBtn'].map(id => $(id).getBoundingClientRect());
      ok(R.every(r => Math.abs((r.top + r.bottom) / 2 - (R[0].top + R[0].bottom) / 2) < W.width * 0.03), 'back, mạng, ⚙ cùng một hàng');
      ok(R.every((r, i) => i === 0 || r.left >= R[i - 1].right), 'không đè nhau, đúng thứ tự');
      ok($('stepBook').getBoundingClientRect().top >= Math.max(...R.map(r => r.bottom)), 'sổ bước dưới hàng HUD');
      wrong(); ok(on() === 2 && !done, 'sai → mất 1 mạng');
      wrong(); wrong(); await wait(900);
      ok(done && $('loseModal').classList.contains('show'), 'hết mạng → thua');
      $('lRetry').click(); ok(!$('loseModal').classList.contains('show') && on() === 3 && !done, 'chơi lại đủ 3 mạng');
      wrong(); commitAll(); ok(S.best['Cây nấm'] === 2, 'sao = số mạng còn: ' + S.best['Cây nấm']);
  } },
  { name: 'tiep-tuc-ve-home', post: async () => {
      giveModel(0); startBuild(0); commitAll(); $('rNext').click();
      ok($('home').classList.contains('show'), 'hết mô hình chờ lắp → về home mở hộp');
  } },
  { name: 'roi-man-truoc-phat-lai', post: async () => {
      giveModel(0); startBuild(0); commitAll(); toMenu();
      await wait(1600);
      ok(!replaying && !$('result').classList.contains('show') && !$('app').classList.contains('replaying'), 'vẫn phát lại sau khi về menu');
  } },
  { name: 'tat-ca-16-man', query: '?all', budget: 30000, post: async () => {
      for (let i = 0; i < LEVELS.length; i++) { startBuild(i); commitAll(); ok(done && built(i), 'màn ' + i + ' chưa thắng'); }
  } },
];
module.exports.lib = () => {
  window.giveModel = (i, sp) => { S.own[LEVELS[i].name] = true; if (sp) S.sp[LEVELS[i].name] = true; save(); };
  window.wait = ms => new Promise(r => setTimeout(r, ms));
  // Chrome headless với virtual-time gần như không chạy requestAnimationFrame, nên tự gọi frame()
  window.pump = ms => new Promise(r => { const id = setInterval(() => frame(), 150); setTimeout(() => { clearInterval(id); r(); }, ms); });
  // lắp hết: trong mỗi bước lấy mảnh cuối cùng đã được đỡ (thứ tự khác thứ tự gốc)
  window.commitAll = () => {
    const order = [];
    for (let s = step; s < L.steps.length; s++) {
      if (step !== s) showStep(s);
      let left = targets.filter(t => t.step === s && !t.placed);
      while (left.length) {
        const t = [...left].reverse().find(supported);
        if (!t) throw 'kẹt phụ thuộc ở bước ' + s;
        order.push(t.idx); commit(t); left = left.filter(x => x !== t);
      }
    }
    return order;
  };
};
