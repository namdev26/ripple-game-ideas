// Bộ "Kỳ quan thế giới": 8 công trình nổi tiếng kiểu Lego Architecture thu nhỏ. Mặt trước quay về +Z.
// Cả file nằm trong 1 hàm để helper không đụng tên với các bộ khác khi build-sets ghép chung.
SETS.push((()=>{
// cùng 1 mảnh đặt ở nhiều điểm [x,z]
const P=(p,c,pts,r=0)=>pts.map(([x,z])=>[p,c,x,z,r]);
// 1 tầng chóp n×n: lõi + viền dốc 1 ô + 4 góc chéo (bản chi tiết của pyrLayer)
const pyr=(c,x,z,n,core)=>{ const o=[...core], m=n-1;
  o.push(['wcorner_1x1',c,x,z,0],['wcorner_1x1',c,x,z+m,1],['wcorner_1x1',c,x+m,z+m,2],['wcorner_1x1',c,x+m,z,3]);
  for(let i=1;i<m;i+=2) o.push(['wedge_1x2',c,x+i,z,0],['wedge_1x2',c,x+i,z+m,2],['wedge_1x2',c,x,z+i,1],['wedge_1x2',c,x+m,z+i,3]);
  return o; };
// vòng tròn tách ra rất nhiều bước 1–2 mảnh: gộp các bước liền nhau còn ít mảnh (≤ n) cho đỡ vụn; thứ tự mảnh giữ nguyên nên không đổi chỗ tựa
const compact=(lv,n=8)=>{ const o=[lv.steps[0]]; lv.steps.slice(1).forEach(st=>{ const l=o[o.length-1];
  if (o.length>1&&l.length+st.length<=n) o[o.length-1]=l.concat(st); else o.push(st); }); lv.steps=o; return lv; };
// vòng tròn 4x4 ghép từ 4 góc bo
const ring4=(c,x,z)=>[['corner_2x2',c,x,z,0],['corner_2x2',c,x,z+2,1],['corner_2x2',c,x+2,z+2,2],['corner_2x2',c,x+2,z,3]];
// răng cưa trên đỉnh tháp vuông 4x4: 4 gạch 1x2 xếp chong chóng, chừa khe giữa mỗi cạnh
const crown4=(c,x,z)=>[['brick_1x2',c,x,z,0],['brick_1x2',c,x+3,z,1],['brick_1x2',c,x+2,z+3,0],['brick_1x2',c,x,z+2,1]];

// ---------- Tháp Eiffel: 4 chân vòm, 2 sàn, thân thon dần lên chóp ----------
const eiffel=voxLevel('Tháp Eiffel',['base_12x12','green'],[
  [1,1,0,2,2,2,'bronze'],[9,1,0,2,2,2,'bronze'],[1,9,0,2,2,2,'bronze'],[9,9,0,2,2,2,'bronze'],
],[
  ...[1,9].flatMap(v=>[['wedge_1x2','bronze',v,0,0],['wedge_1x2','bronze',v,11,2],['wedge_1x2','bronze',0,v,1],['wedge_1x2','bronze',11,v,3]]),'|',
  ['arch_1x6','bronze',3,10,0],['arch_1x6','bronze',3,1,0],['arch_1x6','bronze',1,3,1],['arch_1x6','bronze',10,3,1],'|',
  // sàn 1: vòng 10x10 rỗng giữa
  ['plate_2x8','darktan',1,1,0],['plate_2x8','darktan',9,1,1],['plate_2x8','darktan',3,9,0],['plate_2x8','darktan',1,3,1],'|',
  // thân giữa: vòng dốc thu nhỏ từ 10 về 6
  ...[2,4,6].flatMap(x=>[['slope_2x2','bronze',x,2,0],['slope_2x2','bronze',x+2,8,2]]),
  ...[4,6].flatMap(z=>[['slope_2x2','bronze',2,z,1],['slope_2x2','bronze',8,z-2,3]]),
  ['slope_2x2','bronze',2,8,1],['slope_2x2','bronze',8,6,3],'|',
  ['plate_6x6','darktan',3,3],'|',
  ...P('brick_2x2','bronze',[[3,3],[7,3],[3,7],[7,7]]),'|',
  ...P('brick_2x2','bronze',[[3,3],[7,3],[3,7],[7,7]]),'|',
  ['plate_4x4','darktan',4,4],'|',
  ...pyr('bronze',4,4,4,[['brick_2x2','bronze',5,5]]),'|',
  // ngọn tháp dài, 2 đai sàn ngắm cảnh
  ['brick_2x2','bronze',5,5],['brick_2x2','bronze',5,5],['plate_2x2','darktan',5,5],
  ['brick_2x2','bronze',5,5],['brick_2x2','bronze',5,5],['plate_2x2','darktan',5,5],['cone_2x2','bronze',5,5],
]);

// ---------- Tượng Nữ thần Tự do: đảo giữa biển, pháo đài sao, bệ đá, tượng xanh bạc hà giơ đuốc ----------
const liberty=voxLevel('Tượng Nữ thần Tự do',['base_10x10','darkazure'],[
  [0,1,0,10,8,1,'green'],[1,0,0,8,1,1,'green'],[1,9,0,8,1,1,'green'],
  [1,1,1,8,8,1,'gray'],[2,2,2,6,6,1,'sand'],[3,3,3,4,4,2,'tan'],
],[
  ['wedge_1x2','gray',4,9,2],['wedge_1x2','gray',4,0,0],['wedge_1x2','gray',0,4,1],['wedge_1x2','gray',9,4,3],'|',
  ['plate_6x6','sand',2,2],'|',
  ['brick_2x2','mint',4,4],['brick_2x2','mint',4,4],['brick_1x2','mint',6,4,1],['brick_1x2','tan',6,4,1],'|',
  ['brick_2x2','mint',4,4],['plate_2x4','mint',3,4],'|',
  // đầu tròn + vương miện 4 tia nhọn chĩa ra ngoài
  ['cyl_2x2','mint',4,4],['wcorner_1x1','mint',4,4,2],['wcorner_1x1','mint',5,4,1],['wcorner_1x1','mint',4,5,3],['wcorner_1x1','mint',5,5,0],'|',
  ['brick_1x1','mint',3,4],['brick_1x1','mint',3,4],['cyl_1x1','gold',3,4],['flame_1x1','gold',3,4],'|',
  ...P('bush_2x2','green',[[0,1],[8,7]]),...P('flower_1x1','pink',[[0,8],[9,1]]),
]);

// ---------- Tháp Big Ben + toà nhà Quốc hội: thân be, tầng đồng hồ 4 mặt trắng, mái chóp xám, xe buýt đỏ ----------
const bigben=voxLevel('Tháp Big Ben',['base_12x12','green'],[
  [0,3,0,6,6,1,'sand'],[1,4,1,4,4,5,'tan'],
  [0,3,6,6,6,2,'white'],...[[0,3],[4,3],[0,7],[4,7]].map(([x,z])=>[x,z,6,2,2,2,'tan']),
  [1,4,8,4,4,1,'darktan'],
  // cánh nhà Quốc hội, cửa vòm phía trước
  [6,4,0,6,6,2,'sand'],[6,9,0,4,1,2,''],
],[
  ...P('spire_1x1','gold',[[0,3],[5,3],[0,8],[5,8]]),'|',
  ...pyr('darkgray',1,4,4,[['brick_2x2','darkgray',2,5]]),'|',
  ['cone_2x2','darkgray',2,5],'|',
  ['arch_1x4','sand',6,9],['brick_1x4','sand',6,9],'|',
  ['slope_2x4','darkgray',6,4,0],['slope_2x2','darkgray',10,4,0],['brick_2x6','darkgray',6,6],
  ['slope_2x4','darkgray',6,8,2],['slope_2x2','darkgray',10,8,2],'|',
  ...[6,8,10].flatMap(x=>[['wedge_1x2','darkgray',x,6,0],['wedge_1x2','darkgray',x,7,2]]),'|',
  ['brick_2x4','red',0,10],['brick_2x4','red',0,10],'|',
  ['brick_1x1','red',10,10],['brick_1x1','red',10,10],'|',
  ...P('bush_2x2','green',[[7,0],[10,0]]),
]);
bigben.rar=1;

// ---------- Tháp nghiêng Pisa: 8 tầng tròn trắng, mỗi tầng lệch dần sang +X ----------
const pisaDet=[['plate_6x6','white',1,2],'|'], PX=[1,2,2,3,3,4,4];
PX.forEach((x,i)=>{ pisaDet.push(...ring4('white',x,3)); if(i===0) pisaDet.push('|',...ring4('white',x,3));
  pisaDet.push('|',['plate_4x4',i===PX.length-1?'gray':'sand',x,3],'|'); });
pisaDet.push(['cyl_2x2','white',5,4],['dome_2x2','gray',5,4],'|',
  ['tile_1x4','white',0,9],['tile_1x4','white',4,9],...P('bush_2x2','green',[[8,0],[8,8]]),...P('flower_1x1','pink',[[0,0],[1,0],[9,6]]));
const pisa=voxLevel('Tháp nghiêng Pisa',['base_10x10','green'],[],pisaDet);

// ---------- Đền Taj Mahal: nền cát, khối trắng 4 cửa vòm, vòm lớn trên trống cao, 4 chòi, 4 tháp, hồ phản chiếu ----------
const taj=voxLevel('Đền Taj Mahal',['base_16x16','green'],[
  [2,0,0,12,12,1,'sand'],[4,2,1,8,8,3,'white'],
  // khoét 2 cửa vòm mặt trước và mặt phải
  [5,9,1,6,1,3,''],[11,3,1,1,6,3,''],
  // vát 4 góc nhà
  [4,2,1,1,1,3,''],[11,2,1,1,1,3,''],[4,9,1,1,1,3,''],[11,9,1,1,1,3,''],
],[
  ['arch_1x6','white',5,9,0],['brick_1x6','white',5,9,0],['brick_1x4','white',6,9,0],'|',
  ['arch_1x6','white',11,3,1],['brick_1x6','white',11,3,1],['brick_1x4','white',11,4,1],'|',
  ...ring4('white',6,4),'|',...ring4('white',6,4),'|',['dome_4x4','white',6,4],['onion_2x2','white',7,5],'|',
  ...P('onion_2x2','white',[[4,2],[10,2],[4,8],[10,8]]),'|',
  ...[[2,0],[13,0],[2,11],[13,11]].flatMap(([x,z])=>[['cyl_1x1','white',x,z],['cyl_1x1','white',x,z],['spire_1x1','white',x,z]]),'|',
  ['tile_2x4','water',7,12,1],['tile_1x4','white',6,12,1],['tile_1x4','white',9,12,1],'|',
  ...P('pine_2x2','darkgreen',[[3,12],[11,12],[1,14],[13,14]]),...P('bush_2x2','green',[[0,3],[14,3],[0,7],[14,7]]),
  ...P('flower_1x1','pink',[[5,13],[10,13]]),
]);

// ---------- Nhà hát Sydney: bục be giữa vịnh, 2 dãy cánh vỏ sò trắng, cầu cảng phía sau ----------
// vỏ sò k tầng, mép phải ở xr, dâng dần về −X: tầng i có 1 mảnh cong ở xr−2i−2, phía sau là gạch
const shell=(xr,z,k)=>{ const o=[]; for(let i=0;i<k;i++){ o.push(['curve_2x4','white',xr-2*i-2,z,3]);
  for(let j=i+1;j<k;j++) o.push(['brick_2x4','white',xr-2*j-2,z,1]); } return o; };
const sydney=voxLevel('Nhà hát Sydney',['base_16x16','darkazure'],[
  [0,2,0,12,12,1,'tan'],
],[
  ...shell(12,3,1),...shell(10,3,2),...shell(6,3,3),'|',
  ...shell(11,8,1),...shell(9,8,2),...shell(5,8,2),'|',
  ['brick_2x2','white',6,12],['curve_2x2','white',4,12,3],['curve_2x2','white',6,12,3],'|',
  // cầu cảng Sydney phía sau
  ['brick_2x2','sand',0,0],['brick_2x2','sand',0,0],['brick_2x2','sand',14,0],['brick_2x2','sand',14,0],'|',
  ['plate_2x8','darkgray',0,0],['plate_2x8','darkgray',8,0],'|',
  ['curve_2x2','darkgray',3,0,1],['arch_1x6','darkgray',5,0],['arch_1x6','darkgray',5,1],['curve_2x2','darkgray',11,0,3],'|',
  ['plate_2x4','white',13,5,1],['brick_1x2','red',13,6,1],'|',['plate_2x4','green',12,12],['brick_1x2','yellow',13,12],'|',
  ...[[1,13],[10,13]].flatMap(([x,z])=>[['trunk_1x1','brown',x,z],['palm_1x1','green',x,z]]),
]);

// ---------- Vạn Lý Trường Thành: tường đá uốn khúc từ chân đồi lên đỉnh, 2 tháp canh ----------
const wall=voxLevel('Vạn Lý Trường Thành',['base_16x16','green'],[
  // đồi 2 bậc
  [3,0,0,13,10,1,'darkgreen'],[8,0,1,8,4,1,'darkgreen'],
  // tường trước → tháp 1 → leo đồi → rẽ phải → tháp 2 → lên đỉnh đồi
  [0,12,0,5,2,2,'gray'],[5,11,0,4,4,3,'gray'],
  [6,10,0,2,1,2,'gray'],[6,6,1,2,4,2,'gray'],[8,6,1,3,2,2,'gray'],
  [11,4,1,4,4,4,'gray'],[12,0,2,2,4,2,'gray'],
  // cửa sổ tháp (khoét)
  [6,14,1,2,1,1,''],[8,12,1,1,2,1,''],[12,7,3,2,1,1,''],[14,5,3,1,2,1,''],
],[
  // sườn đồi
  ['slope_2x4','darkgreen',9,10,2],['slope_2x2','darkgreen',13,10,2],['slope_2x2','darkgreen',3,10,2],
  ['slope_2x4','darkgreen',1,0,1],['slope_2x4','darkgreen',1,4,1],['slope_2x2','darkgreen',1,8,1],'|',
  ['slope_2x2','darkgreen',8,4,2],['slope_1x2','darkgreen',10,4,2],['slope_1x2','darkgreen',15,4,2],['slope_2x4','darkgreen',6,0,1],'|',
  // lỗ châu mai
  ['brick_1x2','gray',0,13],['brick_1x2','gray',3,13],['plate_1x4','gray',0,12],'|',
  ...crown4('gray',5,11),'|',
  ['brick_1x2','gray',7,8,1],['brick_1x2','gray',6,6,1],['brick_1x2','gray',9,7],['brick_1x2','gray',8,6],'|',
  ...pyr('red',11,4,4,[['brick_2x2','darkred',12,5]]),['pyr_2x2','red',12,5],'|',
  ['brick_1x2','gray',13,0,1],['brick_1x2','gray',12,2,1],'|',
  ...P('pine_2x2','darkgreen',[[12,12],[14,14],[4,2],[14,0],[9,1]]),...P('bush_2x2','lime',[[10,13],[0,14],[4,6],[3,14]]),
  ...P('flower_1x1','pink',[[9,15],[15,12]]),...P('flower_1x1','yellow',[[10,15],[2,11]]),
]);

// ---------- Đấu trường Colosseum: vòng ngoài 3 tầng vòm + tường attic, nửa trước đổ nát lộ vòng trong ----------
const CO={c0:['corner_2x2',0,2,0],c1:['corner_2x2',0,12,1],c2:['corner_2x2',14,12,2],c3:['corner_2x2',14,2,3],
  b2:['arch_1x4',2,2,0],b6:['arch_1x4',6,2,0],b10:['arch_1x4',10,2,0],f2:['arch_1x4',2,13,0],f6:['arch_1x4',6,13,0],f10:['arch_1x4',10,13,0],
  l4:['arch_1x4',0,4,1],l8:['arch_1x4',0,8,1],r4:['arch_1x4',15,4,1],r8:['arch_1x4',15,8,1]};
const coTier=(keys,c)=>keys.map(k=>{ const [p,x,z,r]=CO[k]; return [p,c,x,z,r]; });
const coCornice=(keys)=>keys.map(k=>{ const [p,x,z,r]=CO[k]; return p==='corner_2x2'?['plate_2x2','sand',x,z]:['plate_1x4','sand',x,z,r]; });
const T1=Object.keys(CO), T2=['c0','c1','c3','b2','b6','b10','l4','l8','r4','r8','f2'], T3=['c0','c3','b2','b6','b10','l4','l8','r4'];
const inner=[['corner_2x2',2,4,0],['corner_2x2',2,10,1],['corner_2x2',12,10,2],['corner_2x2',12,4,3],
  ['arch_1x4',4,4,0],['arch_1x4',8,4,0],['arch_1x4',4,11,0],['arch_1x4',8,11,0],['arch_1x4',2,6,1],['arch_1x4',13,6,1]].map(([p,x,z,r])=>[p,'tan',x,z,r]);
const colosseum=voxLevel('Đấu trường Colosseum',['base_16x16','green'],[],[
  ['tile_2x4','sand',4,6],['tile_2x4','sand',4,8],['brick_1x4','darktan',8,6],['brick_1x4','darktan',8,8],'|',
  ...inner,'|',...inner,'|',
  ...[4,6,8,10].map(x=>['slope_2x2','sand',x,4,2]),...[4,6,8,10].map(x=>['slope_2x2','sand',x,10,0]),
  ['slope_2x2','sand',2,6,3],['slope_2x2','sand',2,8,3],['slope_2x2','sand',12,6,1],['slope_2x2','sand',12,8,1],'|',
  ...coTier(T1,'tan'),'|',...coCornice(T1),'|',
  ...coTier(T2,'tan'),'|',...coCornice(T2),'|',
  ...coTier(T3,'tan'),'|',...coCornice(T3),'|',
  // tường attic trên cùng + nắp
  ...coTier(['c0','c3'],'tan'),['brick_1x4','tan',2,2],['brick_1x4','tan',6,2],['brick_1x4','tan',10,2],
  ['brick_1x4','tan',0,4,1],['brick_1x4','tan',0,8,1],['brick_1x4','tan',15,4,1],'|',
  ...coCornice(['c0','c3','b2','b6','b10','l4','l8','r4']),'|',
  // Khải hoàn môn Constantine, đường lát đá, thông Rome
  ['arch_1x4','white',6,14],['arch_1x4','white',6,15],['plate_2x4','white',6,14],'|',
  ['tile_2x4','gray',2,14],['tile_2x4','gray',10,14],
  ...P('pine_2x2','darkgreen',[[0,0],[14,0],[0,14],[14,14]]),...P('bush_2x2','green',[[3,0],[11,0]]),
]);

return {name:'Kỳ quan thế giới', c:'#e3a923', bonus:400, levels:[eiffel,liberty,bigben,pisa,taj,sydney,wall,compact(colosseum,6)]};
})());
