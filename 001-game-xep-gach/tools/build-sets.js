// Chép mọi bộ mô hình sets/*.js (theo thứ tự tên file) vào khối // <SETS> … // </SETS> của mobile.html.
// Chạy: node tools/build-sets.js   (sửa mô hình trong sets/, không sửa tay trong mobile.html)
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), html = path.join(root, 'mobile.html');
const files = fs.readdirSync(path.join(root, 'sets')).filter(f => f.endsWith('.js')).sort();
const block = '// <SETS>\nconst SETS=[];\n' + files.map(f => `// ---- sets/${f} ----\n` + fs.readFileSync(path.join(root, 'sets', f), 'utf8').trim()).join('\n') + '\n// </SETS>';
const src = fs.readFileSync(html, 'utf8'), a = src.indexOf('// <SETS>'), b = src.indexOf('// </SETS>');
if (a < 0 || b < 0) throw new Error('không thấy khối // <SETS> trong mobile.html');
fs.writeFileSync(html, src.slice(0, a) + block + src.slice(b + '// </SETS>'.length));
console.log('đã chép ' + files.length + ' bộ: ' + files.join(', '));
