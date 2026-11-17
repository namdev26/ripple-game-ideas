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
      const B = $('stepBook').getBoundingClientRect(), H = $('hud').getBoundingClientRect(), W = $('app').getBoundingClientRect();
      ok(B.width > 0 && B.top >= H.bottom && Math.abs(B.left + B.width / 2 - (W.left + W.width / 2)) < 2, 'sổ bước ở giữa, dưới HUD');
      ok($('sbNo').textContent === '1/' + N, 'số bước: ' + $('sbNo').textContent);
      ok($('sbImg').src.startsWith('data:image'), 'có hình bước');
      const cnt = () => [...document.querySelectorAll('#sbParts b')].map(b => b.textContent);
      ok(cnt().every(c => c.startsWith('0/')) && cnt().reduce((a, c) => a + +c.split('/')[1], 0) === s0.length, 'đếm mảnh bước 1: ' + cnt());
      commit(s0[0]); ok(cnt().reduce((a, c) => a + +c.split('/')[0], 0) === 1, 'lắp 1 mảnh → tăng: ' + cnt());
      s0.slice(1).forEach(t => commit(t)); await wait(400);
      ok($('sbNo').textContent === '2/' + N, 'xong bước → sang bước 2: ' + $('sbNo').textContent);
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
