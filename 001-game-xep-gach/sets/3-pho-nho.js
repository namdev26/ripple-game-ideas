// Bộ "Phố nhỏ": 8 nhà/tiệm cùng phong cách, mặt tiền quay về +Z (đặt cạnh nhau trên đảo Thành phố).
// Khung tiệm chuẩn (đế 10x10): thân x1..8 z1..6 cao 4 viên, hàng trước z7 cao 2 viên (cửa + tủ kính),
// mái hiên sọc gác lên hàng trước chìa ra z8, biển hiệu ở viên thứ 4 ngay trên mái hiên, mái 2 dốc 2 viên.
SETS.push({name:'Phố nhỏ', c:'#3fa9f5', bonus:250, levels:(()=>{
  // 1 hàng mảnh 2xN dọc x (đoạn 4 rồi 2), c2 = màu sọc xen kẽ (đoạn 2)
  const row=(k,c,x,w,z,r,c2)=>{ const o=[]; for(let i=0;i<w;){ const n=c2||w-i<4?2:4; o.push([k+'_2x'+n,c2&&(i/2)%2?c2:c,x+i,z,r]); i+=n; } return o; };
  // mái 2 dốc sống chạy dọc x, phủ x..x+w-1, z..z+5 (sâu 6), cao 2 viên; k1 = mảnh hàng dưới (slope / curve)
  const roof=(c,x,w,z,c2,k1='slope')=>[...row(k1,c,x,w,z+4,2,c2),...row(k1,c,x,w,z,0,c2),...row('brick',c,x,w,z+2,0,c2),...row('slope',c,x,w,z+3,2,c2),...row('slope',c,x,w,z+1,0,c2)];
  const awn=(x,w,z,a,b)=>[...Array(w)].map((_,i)=>['slope_1x2',i%2?b:a,x+i,z,2]); // mái hiên sọc
  // thân tiệm chuẩn: tường cao h viên, cửa x4-5, 2 tủ kính x2-3 & x6-7, biển hiệu x2..7 ở viên thứ 4
  const body=(wall,door,sign,h=4)=>[[1,1,0,8,6,h,wall],[1,7,0,8,1,2,wall],[4,7,0,2,1,2,door],
    [2,7,1,2,1,1,''],[6,7,1,2,1,1,''],[2,6,3,6,1,1,sign]];
  const wins=(c,z=7,k='window_1x2')=>[[k,c,2,z],[k,c,6,z]];
  // gắn mảnh vào giữa tường (cửa sổ tầng dưới): chỗ đó đã khoét trong voxel; chèn ngay trước bước lắp tầng voxel kế tiếp
  const inset=(lv,layer,ps)=>{ const y=1+3*layer; let i=lv.steps.findIndex(s=>s.some(p=>p[3]>y)); if(i<0) i=lv.steps.length;
    lv.steps.splice(i,0,ps.map(([k,c,x,z,r=0])=>[k,c,x,y,z,r])); return lv; };
  return [
  voxLevel('Tiệm bánh', ['base_10x10','lime'], body('peach','brown','pink'), [
    ...wins('white'), '|',
    ['tile_2x2','gray',4,8], ['bush_2x2','green',0,8], ['flower_1x1','red',8,9], ['flower_1x1','yellow',9,8], '|',
    ...awn(1,8,7,'pink','white'), '|',
    ...roof('darkred',1,8,1), '|',
    ['cyl_2x2','white',4,3], ['cyl_2x2','pink',4,3], ['cone_1x1','red',4,3],          // bánh kem trên nóc
  ]),
  voxLevel('Tiệm hoa', ['base_10x10','lime'], body('lavender','darkgreen','white'), [
    ...wins('white'), '|',
    ['tile_2x2','gray',4,8], ['brick_1x4','brown',0,9], ['brick_1x4','brown',6,9], '|',
    ...flowers([[0,9,'red'],[1,9,'yellow'],[2,9,'pink'],[6,9,'pink'],[7,9,'yellow'],[8,9,'red'],[9,9,'white']]), '|',
    ...awn(1,8,7,'green','white'), '|',
    ['plate_2x8','green',1,1], ['plate_2x8','green',1,3], ['plate_2x8','green',1,5], '|',   // vườn trên sân thượng
    ['bush_2x2','green',1,1], ['bush_2x2','darkgreen',7,1], ['pine_2x2','darkgreen',4,1],
  ]),
  voxLevel('Quán cà phê', ['base_10x10','lime'], [
    [1,1,0,6,6,4,'sand'], [1,7,0,6,1,2,'sand'], [4,7,0,2,1,2,'darkred'],
    [1,7,1,2,1,1,''], [1,6,1,2,1,1,'azure'], [2,6,3,4,1,1,'brown'],
  ], [
    ['window_1x2','white',1,7], '|',
    ['tile_2x4','tan',7,1,1], ['tile_2x4','tan',7,5,1], ['tile_2x2','gray',4,8], '|',
    ['column_1x1','white',8,3], ['pyr_2x2','red',7,2], ['column_1x1','white',8,7], ['pyr_2x2','red',7,6], '|',
    ...awn(1,6,7,'red','white'), '|',
    ...roof('darkgreen',1,6,1), '|',
    ['cyl_2x2','white',3,3], ['round_1x1','brown',3,3],                                 // tách cà phê trên nóc
  ]),
  voxLevel('Nhà sách', ['base_10x10','lime'], [
    ...body('blue','darkred','yellow',5),
    [2,6,4,6,1,1,''], [2,5,4,6,1,1,'yellow'],                                          // lầu: 3 cửa sổ vòm, đèn vàng
  ], [
    ...wins('white'), ['rwindow_1x2','white',2,6], ['rwindow_1x2','white',4,6], ['rwindow_1x2','white',6,6], '|',
    ['tile_2x2','gray',4,8], '|',
    ...awn(1,8,7,'yellow','white'), '|',
    ...roof('darkgray',1,8,1,null,'curve'), '|',
    ['plate_2x4','red',3,3], ['plate_2x4','white',3,3], ['plate_2x4','blue',3,3],          // chồng sách trên nóc
  ]),
  voxLevel('Chợ', ['base_10x10','gray'], [
    [1,1,0,1,2,3,'brown'], [8,1,0,1,2,3,'brown'], [1,5,0,1,2,3,'brown'], [8,5,0,1,2,3,'brown'],   // 4 cột
    [2,6,0,6,1,1,'tan'], [2,1,0,6,1,1,'tan'],                                                       // 2 quầy
  ], [
    ['plate_1x2','green',2,6], ['ball_1x1','orange',4,6], ['ball_1x1','orange',5,6], ['ball_1x1','red',6,6], ['ball_1x1','yellow',7,6],
    ['brick_2x2','brown',3,3], ['bush_2x2','green',3,3], ['brick_2x2','brown',5,3], ['plate_2x2','orange',5,3], '|',
    ['plate_4x4','white',1,1], ['plate_4x4','white',5,1], ['plate_2x8','white',1,5], '|',
    ...roof('red',1,8,1,'white'), '|',
    ['flag_1x1','yellow',1,3], ['flag_1x1','yellow',8,3],
  ]),
  inset(voxLevel('Trạm cứu hoả', ['base_12x12','gray'], [
    [1,1,0,8,6,5,'red'],
    [2,6,0,4,1,2,'darkgray'], [1,6,2,8,1,1,'white'], [3,6,2,4,1,1,'yellow'],           // cửa xe + viền trắng + biển hiệu
    [2,6,3,6,1,2,''], [2,5,3,6,1,2,'azure'],                                            // 3 cửa sổ cao ở lầu
    [9,3,0,2,4,8,'red'], [9,6,0,2,1,2,'darkgray'], [9,6,2,2,1,1,'white'],               // tháp phơi vòi
    [9,6,4,2,1,1,''], [9,5,4,2,1,1,'azure'], [9,6,7,2,1,1,''], [9,5,7,2,1,1,'azure'],
  ], [
    ...[2,4,6].flatMap(x=>[['window_1x2','white',x,6],['window_1x2','white',x,6]]), ['window_1x2','white',9,6], '|',
    ...roof('darkgray',1,8,1), '|',
    ['slope_2x2','darkgray',9,3,0], ['pyr_2x2','darkgray',9,5], '|',
    ['plate_2x4','black',2,8], ['brick_2x4','red',2,8], ['plate_2x2','white',2,8], ['slope_2x2','red',4,8,3], ['round_1x1','blue',4,8], ['round_1x1','blue',4,9], '|', // xe cứu hoả
    ['cyl_1x1','red',10,9], ['round_1x1','yellow',10,9], ['cone_1x1','orange',7,10], ['cone_1x1','orange',8,10], '|',
    ['bush_2x2','green',0,9], ['bush_2x2','darkgreen',10,1],
  ]), 4, [['window_1x2','white',9,6]]),
  [1,3,5].reduce((lv,y)=>inset(lv,y,[['window_1x2','white',2,7],['window_1x2','white',8,7]]), voxLevel('Bệnh viện', ['base_12x12','lime'], [
    [1,1,0,10,7,7,'white'],
    [5,7,0,2,1,2,'azure'],                                                               // cửa kính
    [5,6,3,2,2,3,'red'], [4,6,4,4,2,1,'red'],                                            // chữ thập đỏ
    ...[1,3,5].flatMap(y=>[[2,7,y,2,1,1,''],[8,7,y,2,1,1,''],[2,6,y,2,1,1,'azure'],[8,6,y,2,1,1,'azure']]),   // cửa sổ 3 tầng
    [1,7,6,10,1,1,'azure'],                                                              // dải kính trên cùng
  ], [
    ['column_1x1','white',4,9], ['column_1x1','white',4,9], ['column_1x1','white',7,9], ['column_1x1','white',7,9],
    ['plate_2x4','white',4,8], ['tile_1x4','red',4,9], '|',                              // mái sảnh
    ['plate_4x4','darkgray',4,2], ['tile_2x2','white',5,3], ['cyl_2x2','gray',1,2], ['dome_2x2','gray',1,2], '|',   // sân trực thăng + bồn nước
    ['plate_2x4','black',8,9], ['brick_2x4','white',8,9], ['tile_1x4','red',8,10], ['window_1x2','azure',10,9,1], ['round_1x1','blue',9,9], '|',   // xe cứu thương
    ['trunk_1x1','brown',0,9], ['bush_2x2','green',0,9], ['flower_1x1','red',2,10], ['flower_1x1','pink',3,10],
  ])),
  inset(inset(voxLevel('Trường học', ['base_12x12','lime'], [
    [0,1,0,4,6,5,'yellow'], [8,1,0,4,6,5,'yellow'],                                     // 2 dãy lớp
    [4,1,0,4,7,5,'white'], [4,4,5,4,4,2,'white'],                                        // khối giữa + tháp
    [5,7,0,2,1,2,'brown'], [4,7,2,4,1,1,'blue'],                                         // cửa + biển trường
    [1,6,1,2,1,1,''], [9,6,1,2,1,1,''], [1,5,1,2,1,1,'azure'], [9,5,1,2,1,1,'azure'],    // cửa sổ trệt
    [1,6,3,2,1,2,''], [9,6,3,2,1,2,''], [1,5,3,2,1,2,'azure'], [9,5,3,2,1,2,'azure'],    // cửa sổ lầu (cao 2)
    [5,7,3,2,1,1,''], [5,6,3,2,1,1,'azure'], [5,7,6,2,1,1,''], [5,6,6,2,1,1,'darkgray'],   // cửa sổ + đồng hồ
    [11,2,1,1,4,1,''], [10,2,1,1,4,1,'azure'], [11,2,4,1,4,1,''], [10,2,4,1,4,1,'azure'], // cửa sổ hông phải
  ], [
    ['window_1x2','white',1,6], ['window_1x2','white',1,6], ['window_1x2','white',9,6], ['window_1x2','white',9,6], ['rwindow_1x2','gold',5,7], ['window_1x2','white',11,2,1], ['window_1x2','white',11,4,1], '|',
    ...roof('darkred',0,4,1), '|', ...roof('darkred',8,4,1), '|',
    ['slope_2x4','darkred',4,1,0], ['tile_1x4','darkred',4,3], '|',
    ['brick_2x2','darkred',5,5], ['wcorner_1x1','darkred',4,4,0], ['wcorner_1x1','darkred',4,7,1], ['wcorner_1x1','darkred',7,7,2], ['wcorner_1x1','darkred',7,4,3],
    ['wedge_1x2','darkred',5,4,0], ['wedge_1x2','darkred',5,7,2], ['wedge_1x2','darkred',4,5,1], ['wedge_1x2','darkred',7,5,3], ['pyr_2x2','darkred',5,5], '|',
    ['tile_2x4','gray',5,8,1], '|',
    ['plate_2x2','gray',10,10], ['cyl_1x1','white',10,10], ['cyl_1x1','white',10,10], ['flag_1x1','red',10,10], ['star_1x1','yellow',10,10], '|',   // cột cờ
    ['trunk_1x1','brown',1,9], ['bush_2x2','green',1,9], ['trunk_1x1','brown',8,9], ['bush_2x2','darkgreen',8,9], ['bush_2x2','green',2,10], '|',
    ['brick_2x2','blue',0,10], ['plate_2x2','yellow',0,10], ['slope_2x2','red',2,10,3], '|',                       // cầu trượt
    ['statue_1x1','blue',4,10], ['statue_1x1','red',7,10], ...flowers([[4,8,'red'],[7,8,'yellow'],[3,11,'pink'],[8,11,'red']]),
  ]), 1, [['window_1x2','white',1,6], ['window_1x2','white',9,6], ['window_1x2','white',11,2,1], ['window_1x2','white',11,4,1]]), 3, [['window_1x2','white',5,7]]),
  ];
})()});
