// Ảnh các popup: SHOT=1 node tests/run-headless.js tests/shots-popup.js → tests/.tmp/pp-*.png
const save0 = o => new Function("localStorage.setItem('xepgach.v2'," + JSON.stringify(JSON.stringify(o)) + ')');
const ST = { goal: 'Khuê Văn Các', coins: 260, best: { 'Cây nấm': 3, 'Ngôi nhà': 2, 'Dưa hấu': 3, 'Lâu đài': 1 }, own: { 'Tượng Zeus': true }, tut: 6 };
module.exports = [
  { name: 'pp-setting', pre: save0(ST), post: async () => { startBuild(1, true); await wait(300); $('setBtn').click(); await wait(500); } },
  { name: 'pp-help', pre: save0(ST), post: async () => { startBuild(1, true); await wait(300); $('setBtn').click(); $('sHelp').click(); await wait(500); } },
  { name: 'pp-lose', pre: save0(ST), post: async () => { giveModel(1); startBuild(1); targets.filter(t => t.step < 3).forEach(t => commit(t)); wrong(); wrong(); wrong(); await wait(1400); } },
  { name: 'pp-win', pre: save0(ST), post: async () => { giveModel(5); startBuild(5); commitAll(); await wait(1500); $('skipBtn').click(); await wait(2500); } },
  { name: 'pp-life', pre: save0({ ...ST, hearts: 0, hT: 1 }), post: async () => { S.hearts = 0; S.hT = Date.now() - 11 * 60e3; renderHome(); openLife(); await wait(500); } },
  { name: 'pp-need', pre: save0(ST), post: async () => { openShop(15); $('mBuy').click(); await wait(500); } },
  { name: 'pp-fail', pre: save0(ST), post: async () => { giveModel(1); startBuild(1); wrong(); wrong(); wrong(); await wait(1000); $('lClose').click(); await wait(500); } },
  { name: 'pp-quit', pre: save0({ coins: 260, tut: 6 }), post: async () => { giveModel(1); startBuild(1); commit(targets.find(supported)); $('backBtn').click(); await wait(500); } },
  { name: 'pp-setting-home', pre: save0({ ...ST, snd: false }), post: async () => { $('hSetBtn').click(); await wait(500); } },
  { name: 'pp-tab-shop', pre: save0(ST), post: async () => { $('shopBtn').click(); await wait(500); } },
  { name: 'pp-tab-gacha', pre: save0(ST), post: async () => { $('shopBtn').click(); $('gachaBtn').click(); await wait(500); } },
  { name: 'pp-tab-ke', pre: save0(ST), post: async () => { $('shelfBtn').click(); await wait(500); } },
  { name: 'pp-shop-duoi', pre: save0(ST), post: async () => { $('shopBtn').click(); await wait(300); $('shopBody').scrollTop = 700; await wait(300); } },
  { name: 'pp-sb-thang', pre: save0(ST), post: async () => { giveModel(5); startBuild(5); targets.filter(t => t.step < 6).forEach(t => commit(t)); await wait(400); showStep(6); await wait(300); $('stepBook').classList.add('big'); } },
  { name: 'pp-sb-xoay', pre: save0(ST), post: async () => { giveModel(5); startBuild(5); targets.filter(t => t.step < 6).forEach(t => commit(t)); await wait(400); showStep(6); const v = camera.position.clone().sub(controls.target); v.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI * 0.8); camera.position.copy(controls.target).add(v); controls.update(); await wait(500); $('stepBook').classList.add('big'); } },
  { name: 'pp-odds', pre: save0(ST), post: async () => { openGacha(); $('oddsBtn').click(); await wait(500); } },
];
module.exports.lib = require('./t4-build.js').lib;
