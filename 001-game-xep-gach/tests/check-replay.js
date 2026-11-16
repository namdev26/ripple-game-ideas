// Kiểm tra thứ tự + nhịp phát lại (hàm thuần trong khối DỮ LIỆU). Chạy: node tests/check-replay.js mobile.html
const fs = require('fs'), assert = require('assert');
const html = fs.readFileSync(process.argv[2] || __dirname + '/../mobile.html', 'utf8');
const a = html.indexOf('// ====================== DỮ LIỆU'), b = html.indexOf('// ====================== HÌNH HỌC');
const { replayOrder, replayDelays } = new Function(html.slice(a, b) + ';return {replayOrder,replayDelays};')();
const d = replayDelays(96);
assert.strictEqual(d.length, 96); assert.strictEqual(d[0], 0); assert.strictEqual(d[1], 180);
assert(d[95] <= 8700, 'quá dài: ' + d[95]);
for (let k = 1; k < 96; k++) assert(d[k] > d[k - 1], 'không tăng tại ' + k);
for (let k = 2; k < 96; k++) assert(d[k] - d[k - 1] <= d[k - 1] - d[k - 2] + 1e-9, 'khoảng cách phải giảm dần tại ' + k);
const d10 = replayDelays(10); assert.strictEqual(d10[1], 180); assert(d10[9] <= 8700);
assert.deepStrictEqual(replayDelays(1), [0]); assert.deepStrictEqual(replayDelays(0), []);
assert.deepStrictEqual(replayOrder([2, 0, 1], 3), [2, 0, 1]);
assert.deepStrictEqual(replayOrder([0, 0, 1], 3), [0, 1, 2]);
assert.deepStrictEqual(replayOrder([0, 1], 3), [0, 1, 2]);
assert.deepStrictEqual(replayOrder(undefined, 3), [0, 1, 2]);
assert.deepStrictEqual(replayOrder([0, 1, 5], 3), [0, 1, 2]);
console.log('check-replay OK');
