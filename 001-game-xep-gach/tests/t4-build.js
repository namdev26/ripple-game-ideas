// Task 4: lắp — chỉ trừ kho khi thắng, thưởng mới, lắp lại +15, ghi thứ tự lắp
module.exports = [
  { name: 'lap-lan-dau', post: async () => {
      fillInv(0);
      ok(cardState(0) === 'ready', 'phải ready');
      startBuild(0);
      ok(!rebuild, 'không phải lắp lại');
      const order = commitAll();
      ok(Object.values(S.inv).every(n => n === 0), 'kho phải trừ hết: ' + JSON.stringify(S.inv));
      ok(S.coins === rewardFor(0, 3), 'coins ' + S.coins + ' != ' + rewardFor(0, 3));
      ok(JSON.stringify(S.order['Cây nấm']) === JSON.stringify(order), 'order ' + JSON.stringify(S.order['Cây nấm']));
      ok(built(0), 'phải đã lắp');
      ok(JSON.parse(localStorage.getItem('xepgach.v2')).best['Cây nấm'] === 3, 'phải lưu');
  } },
  { name: 'lap-lai-kho-trong', pre: () => localStorage.setItem('xepgach.v2', JSON.stringify({ coins: 5, best: { 'Cây nấm': 2 } })),
    post: async () => {
      startBuild(0, true);
      ok(rebuild && L && L.name === 'Cây nấm', 'phải vào lắp lại');
      commitAll();
      ok(S.coins === 5 + REBUILD_REWARD, 'coins ' + S.coins);
      ok(Object.keys(S.inv).length === 0, 'không đụng kho');
      ok(S.best['Cây nấm'] === 3, 'lưu sao cao hơn');
  } },
  { name: 'bo-giua-chung', post: async () => {
      fillInv(0); const before = JSON.stringify(S.inv);
      startBuild(0); commit(targets.find(supported)); toMenu();
      ok(JSON.stringify(S.inv) === before, 'kho đổi khi bỏ giữa chừng');
      startBuild(0); commit(targets.find(supported)); $('sRestart').click();
      ok(JSON.stringify(S.inv) === before, 'kho đổi khi chơi lại');
      ok(S.coins === 0, 'coins ' + S.coins);
  } },
  { name: 'rAgain-la-lap-lai', post: async () => {
      fillInv(0); startBuild(0); commitAll();
      const c = S.coins; $('rAgain').click();
      ok(rebuild, 'rAgain sau khi thắng phải là lắp lại');
      commitAll(); ok(S.coins === c + REBUILD_REWARD, 'coins ' + S.coins);
  } },
  { name: 'rNext-chua-du-manh', post: async () => {
      fillInv(0); startBuild(0); commitAll(); $('rNext').click();
      ok($('home').classList.contains('show') && homeSel === 1, 'phải về home ở màn 2, homeSel=' + homeSel);
  } },
  { name: 'tat-ca-16-man', query: '?all', budget: 30000, post: async () => {
      for (let i = 0; i < LEVELS.length; i++) { startBuild(i, true); commitAll(); ok(done && built(i), 'màn ' + i + ' chưa thắng'); }
      ok(Object.values(S.inv).every(n => n >= 0), 'kho âm');
  } },
];
module.exports.lib = () => {
  window.fillInv = i => { S.coins = 0; S.inv = {}; bomOf(i).forEach(m => S.inv[m.key + '|' + m.color] = m.n); save(); };
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
