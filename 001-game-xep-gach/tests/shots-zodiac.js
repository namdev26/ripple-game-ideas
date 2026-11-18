// Ảnh 12 con giáp: SHOT=1 node tests/run-headless.js tests/shots-zodiac.js → tests/.tmp/zd-*.png
// zd-all: cả bộ ở góc mặc định · zd-<k>: 1 con, 4 góc (mặc định, trước mặt, sau, trên)
module.exports = [{ name: 'zd-lap', query: '?all', post: async () => { const i = LEVELS.findIndex(l => l.name === 'Rồng'); startBuild(i); targets.filter(t => t.step < 6).forEach(t => commit(t)); await wait(500); showStep(6); } },
  { name: 'zd-sach', query: '?all', post: async () => { openBlueprint(LEVELS.findIndex(l => l.name === 'Mèo')); bpPage = 5; renderBp(); } },
  { name: 'zd-buoc', query: '?all', post: async () => { const i = LEVELS.findIndex(l => l.name === 'Chuột'), N = LEVELS[i].steps.length, d = document.createElement('div');
      d.style.cssText = 'position:fixed;inset:0;z-index:99;background:#222;display:grid;grid-template-columns:repeat(3,1fr);gap:2px;color:#fff;font:12px sans-serif';
      for (let n = N - 9; n < N; n++) d.innerHTML += `<div><img style="width:100%" src="${thumbStep(i, n, false, true)}">Bước ${n + 1}/${N}</div>`; document.body.appendChild(d); } },
  { name: 'zd-all', post: async () => zgrid([...Array(ZODIAC.length).keys()]) }]
  .concat([...Array(12).keys()].map(k => ({ name: 'zd-' + k, post: new Function(`zgrid([${k}], [[0.55, 0.65, 1], [1, 0.4, 0.15], [-1, 0.5, -0.6], [0.2, 1.5, 0.6]])`) })));
const zlib = () => {
  window.zgrid = (ids, dirs) => {
    const d = document.createElement('div'), Z = LEVELS.length - ZODIAC.length;
    d.style.cssText = 'position:fixed;inset:0;z-index:99;background:#cfd8ea;display:grid;grid-template-columns:repeat(' + (dirs ? 2 : 3) + ',1fr);gap:2px;font:12px sans-serif';
    ids.forEach(k => (dirs || [[0.55, 0.65, 1]]).forEach((v, j) => { const i = Z + k, e = document.createElement('div');
      e.innerHTML = `<img style="width:100%;height:88%;object-fit:contain" src="${thumbModel('zd' + i + '_' + j, LEVELS[i], false, new THREE.Vector3(...v))}"><div>${LEVELS[i].name} · ${levelTargets(LEVELS[i]).length} mảnh</div>`; d.appendChild(e); }));
    document.body.appendChild(d);
  };
};

// dùng chung startBuild/commit... của t4-build
module.exports.lib = new Function('(' + require('./t4-build.js').lib + ')(); (' + zlib + ')();');
