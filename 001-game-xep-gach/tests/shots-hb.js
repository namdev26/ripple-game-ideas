// Ảnh để xem bằng mắt: SHOT=1 node tests/run-headless.js tests/shots-hb.js  → tests/.tmp/<case>.png
const save0 = o => new Function("localStorage.setItem('xepgach.v2'," + JSON.stringify(JSON.stringify(o)) + ')');
const ST = { goal: 'Khuê Văn Các', coins: 260, best: { 'Cây nấm': 3, 'Ngôi nhà': 2, 'Dưa hấu': 3, 'Lâu đài': 1 }, own: { 'Tượng Zeus': true, 'Đền Artemis': true }, sp: { 'Dưa hấu': true }, tut: 6 };
module.exports = [
  { name: 'hb-thieu-xu', pre: save0(ST), post: async () => { openShop('secModel'); document.querySelector('#mGrid .mItem[data-i="15"]').click(); $('mBuy').click(); } },
  { name: 'hb-ket-qua', pre: save0(ST), post: async () => { giveModel(5); startBuild(5); commitAll(); await wait(1500); $('skipBtn').click(); await wait(2000); } },
  { name: 'hb-home-moi', post: async () => {} },
  { name: 'hb-home', pre: save0(ST), post: async () => {} },
  { name: 'hb-unbox', pre: save0(ST), post: async () => { openUnbox(7, true, true); ubGo(3); ubGo(4); ubGo(5); } },
  { name: 'hb-unbox-giua', pre: save0(ST), post: async () => { openUnbox(5, false, true); ubT.forEach(clearTimeout); ubSpin = null; const st = $('ubStrip'); st.style.transition = 'none'; st.style.transform = 'translateX(-520cqw)'; } },
  { name: 'hb-unbox-dung', pre: save0(ST), post: async () => { openUnbox(5, false, true); await wait(3600); ubT.forEach(clearTimeout); $('ubStrip').style.transition = 'none'; } },
  { name: 'hb-ke-hang', pre: save0(ST), post: async () => { openShop('secModel'); const B = $('shopBody'); B.scrollTop = document.querySelector('#mGrid .shH').offsetTop - B.offsetTop - 10; } },
  { name: 'hb-hang-bo', pre: save0(ST), post: async () => { openShop('secModel'); mFull = 1; renderShopM(); const B = $('shopBody'); B.scrollTop = document.querySelectorAll('#mGrid .shH')[1].offsetTop - B.offsetTop - 10; } },
  { name: 'hb-shop', pre: save0(ST), post: async () => { showHome(1); openShop('secModel'); mSel = 4; renderShopM(); } },
  { name: 'hb-bia', pre: save0(ST), post: async () => { openBlueprint(6); } },
  { name: 'hb-trang', pre: save0(ST), post: async () => { openBlueprint(6); bpPage = 3; renderBp(); } },
  { name: 'hb-trang-cuoi', pre: save0(ST), post: async () => { openBlueprint(6); bpPage = 13; renderBp(); } },
  { name: 'hb-lap', pre: save0(ST), post: async () => { startBuild(1, true); targets.filter(t => t.step === 0).forEach(t => commit(t)); await wait(400); commit(targets.find(t => t.step === 1)); wrong(); $('toast').style.display = 'none'; } },
  { name: 'hb-lap-cao', query: '?all', post: async () => { startBuild(LEVELS.findIndex(l => l.name === 'Hải đăng Alexandria')); targets.filter(t => t.step < 13).forEach(t => commit(t)); await wait(400); showStep(13); } },
  { name: 'hb-thua', pre: save0(ST), post: async () => { startBuild(1, true); wrong(); wrong(); wrong(); await wait(900); } },
  { name: 'hb-iap', pre: save0(ST), post: async () => { openShop(); } },
  { name: 'hb-iap-duoi', pre: save0(ST), post: async () => { openIap(); } },
  { name: 'hb-ad', pre: save0(ST), post: async () => { show('adView', true); } },
  { name: 'hb-gacha', pre: save0(ST), post: async () => { openGacha(); } },
  { name: 'hb-home-het', pre: save0({ coins: 260, best: { 'Cây nấm': 3 }, tut: 6 }), post: async () => {} },
  { name: 'hb-home-xong', pre: save0({ ...ST, tut: 6 }), post: async () => { $('hTabDone').click(); } },
  { name: 'hb-home-gon', pre: save0({ ...ST, tut: 6, showWait: true }), post: async () => {} },
  { name: 'hb-ke', pre: save0(ST), post: async () => { openShelf(); } },
  { name: 'hb-tile', pre: save0(ST), post: async () => { showHome(1); $('oddsBtn').click(); } },
];
module.exports.lib = require('./t4-build.js').lib;
