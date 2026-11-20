// Bộ Ẩm thực: bộ đầu tiên, mô hình 1 (Kem ốc quế) là màn dạy chơi nhỏ nhất game
{
// hình bát giác n×n góc (x,z), cắt góc `cut` ô (cut 1 = bỏ 4 ô góc, cut 2 = tròn hơn)
const oct=(x,z,n,c,y,h=1,cut=1)=>[...Array(n)].map((_,j)=>{ const k=Math.max(0,cut-Math.min(j,n-1-j)); return [x+k,z+j,y,n-2*k,1,h,c]; });
// viền dốc cheese 1 ô quanh mặt n×n (bỏ 4 góc), mặt dốc quay ra ngoài
// gộp bước a và a+1 (màn dạy chơi cần ít bước)
const join=(lv,...ab)=>{ ab.sort((a,b)=>b-a).forEach(a=>lv.steps.splice(a,2,lv.steps[a].concat(lv.steps[a+1]))); return lv; };
const rim=(x,z,n,c,k='cheese_1x2')=>{ const o=[]; for(let i=1;i<n-1;i+=2) o.push([k,c,x+i,z,0],[k,c,x+i,z+n-1,2],[k,c,x,z+i,1],[k,c,x+n-1,z+i,3]); return o; };
SETS.push({name:'Ẩm thực', c:'#ff7aa8', bonus:200, levels:[
  // 1. Kem ốc quế: ốc quế be thon dần, viên kem hồng tròn, quả anh đào
  join(voxLevel('Kem ốc quế',['base_10x10','mint'],[
    [4,4,0,2,2,2,'tan'],[3,3,2,4,4,2,'tan'],...oct(2,2,6,'white',4,1,2),...oct(2,2,6,'pink',5,1,2),
  ],[
    ['dome_4x4','pink',3,3],['cheese_1x2','pink',4,2,0],['cheese_1x2','pink',4,7,2],['cheese_1x2','pink',2,4,1],['cheese_1x2','pink',7,4,3],['ball_2x2','red',4,4],
  ]),1,3,5),
  // 2. Trà sữa trân châu: cốc bo góc, đáy trân châu đen + trà sữa be (thân water bị che mất màu trong nên dùng màu đặc), viền nắp trắng, nắp vòm trong, ống hút hồng to cắm giữa
  voxLevel('Trà sữa trân châu',['base_10x10','lavender'],[
    ...oct(2,2,6,'black',0),...oct(2,2,6,'tan',1,3),
  ],[
    ['plate_1x4','white',3,2],['plate_1x4','white',3,7],['plate_1x4','white',2,3,1],['plate_1x4','white',7,3,1],'|',
    ['wcorner_1x1','water',3,3,0],['wcorner_1x1','water',3,6,1],['wcorner_1x1','water',6,6,2],['wcorner_1x1','water',6,3,3],
    ['wedge_1x2','water',4,3,0],['wedge_1x2','water',4,6,2],['wedge_1x2','water',3,4,1],['wedge_1x2','water',6,4,3],'|',
    ['cyl_2x2','pink',4,4],['cyl_2x2','pink',4,4],['cyl_2x2','pink',4,4],'|',
    ['ball_1x1','black',8,8],['ball_1x1','black',9,7],['ball_1x1','black',8,9],
  ]),
  // 3. Bánh mì: ổ bánh mì vàng, kẹp chả hồng + rau xanh thò ra, chai tương ớt
  voxLevel('Bánh mì',['base_12x12','azure'],[
    [2,4,0,8,4,1,'tan'],[1,5,0,1,2,1,'tan'],[10,5,0,1,2,1,'tan'],
    [1,3,1,10,2,1,'lime'],[1,7,1,10,2,1,'lime'],[1,5,1,10,2,1,'pink'],
    [1,4,2,10,4,1,'tan'],
  ],[
    ['curve_2x4','tan',1,4,0],['curve_2x4','tan',5,4,0],['curve_2x2','tan',9,4,0],
    ['curve_2x4','tan',1,6,2],['curve_2x4','tan',5,6,2],['curve_2x2','tan',9,6,2],'|',
    ...[1,3,5,7,9].flatMap(x=>[['cheese_1x2','lime',x,3,0],['cheese_1x2','lime',x,8,2]]),'|',
    ['cyl_2x2','red',9,9],['cyl_2x2','red',9,9],['dome_2x2','white',9,9],'|',['bush_2x2','green',1,9],
  ]),
  // 4. Tô phở: tô trắng viền xanh, nước dùng, bánh phở, thịt bò, hành, ớt, đôi đũa
  voxLevel('Tô phở',['base_12x12','peach'],[
    [4,4,0,4,4,1,'white'],[3,3,1,6,6,1,'white'],[2,2,2,8,8,1,'white'],
    ...oct(1,1,10,'white',3,2,2),...oct(2,2,8,'sand',4),
    ...oct(1,1,10,'azure',5,1,2),...oct(2,2,8,'',5),
  ],[
    ['tile_2x4','white',3,3],['tile_2x4','white',5,6],['tile_2x4','white',2,5,1],'|',
    ['tile_2x2','pink',5,3],['tile_2x2','pink',7,5],['tile_2x2','pink',3,6],['tile_2x2','pink',6,7],'|',
    ['tile_1x2','lime',4,5],['tile_1x2','lime',8,8],['tile_1x2','lime',3,8],['tile_1x2','green',6,2],['tile_1x2','green',2,4,1],
    ['round_tile_1x1','red',9,3],['cheese_1x2','lime',8,3,0],'|',
    ['tile_1x4','tan',8,4],['tile_1x4','tan',8,6],
  ]),
  // 5. Donut: bánh vòng dựng đứng, mặt trước + đỉnh phủ kem hồng, rắc cốm màu, cốc sữa
  voxLevel('Donut',['base_12x12','mint'],side([
    '...PPPPPP...',
    '..PPPPPPPP..',
    '.DDD....DDD.',
    '.DDD....DDD.',
    '.DDD....DDD.',
    '..DDDDDDDD..',
    '...DDDDDD...',
  ],{P:W(4,7,'pink'),D:[[4,5,'tan'],[6,7,'pink']]}),[
    ['tile_1x2','yellow',3,4],['tile_1x2','azure',6,5],['tile_1x2','white',4,6],['tile_1x2','lime',7,7],['tile_1x2','lavender',3,7],['tile_1x2','white',7,4],'|',
    ['cheese_1x2','pink',2,4,1],['cheese_1x2','pink',2,6,1],['cheese_1x2','pink',9,4,3],['cheese_1x2','pink',9,6,3],
    ['cheese_1x2','tan',1,4,1],['cheese_1x2','pink',1,6,1],['cheese_1x2','tan',10,4,3],['cheese_1x2','pink',10,6,3],'|',
    ['cyl_2x2','white',9,9],['cyl_2x2','white',9,9],
  ]),
  // 6. Burger: bánh dưới, thịt, phô mai vuông chìa góc, xà lách, cà chua, bánh trên tròn có mè
  voxLevel('Burger',['base_12x12','azure'],[
    ...oct(2,2,8,'tan',0),...oct(1,1,10,'brown',1,1,3),[1,1,2,10,10,1,'yellow'],...oct(1,1,10,'lime',3,1,2),
    ...oct(2,2,8,'red',4),...oct(2,2,8,'tan',5),[3,3,6,6,6,1,'tan'],
  ],[
    ...rim(2,2,8,'tan'),'|',...rim(3,3,6,'tan'),'|',
    ['round_tile_1x1','white',4,4],['round_tile_1x1','white',6,5],['round_tile_1x1','white',5,7],['round_tile_1x1','white',7,4],['round_tile_1x1','white',4,6],
  ]),
  // 7. Pizza: hộp pizza trắng mở nắp, bánh pizza tròn viền be, phô mai, xúc xích, nấm, ô liu, lá húng
  voxLevel('Pizza',['base_12x12','peach'],[
    [0,0,0,12,12,1,'white'],
    [0,0,1,12,1,2,'white'],[0,11,1,12,1,1,'white'],[0,1,1,1,10,1,'white'],[11,1,1,1,10,1,'white'],
    ...oct(1,1,10,'tan',1,1,2),...oct(1,1,10,'tan',2,1,2),...oct(2,2,8,'yellow',2,1,1),
    [0,0,3,12,1,4,'white'],[0,0,7,12,1,1,'red'],
  ],[
    ['round_tile_1x1','red',3,3],['round_tile_1x1','red',6,3],['round_tile_1x1','red',8,5],['round_tile_1x1','red',4,6],
    ['round_tile_1x1','red',7,8],['round_tile_1x1','red',3,8],'|',
    ['tile_1x2','green',5,5],['tile_1x2','green',7,3,1],['tile_1x2','green',5,8,1],'|',
    ['round_1x1','white',4,4],['round_1x1','white',7,6],['round_tile_1x1','black',6,7],['round_tile_1x1','black',8,4],['round_tile_1x1','black',3,5],
  ]),
  // 8. Sushi: khay gỗ nâu với 3 nigiri (cá hồi vân trắng, cá ngừ, trứng quấn rong biển), cuộn maki (vỏ đen, ruột trắng, nhân cam), gừng hồng, wasabi, đôi đũa đỏ
  voxLevel('Sushi',['base_12x12','azure'],[
    [1,1,0,2,5,1,'brown'],[9,1,0,2,5,1,'brown'],[1,1,1,10,5,1,'brown'],
    [2,1,2,2,4,1,'white'],[5,1,2,2,4,1,'white'],[8,1,2,2,4,1,'white'],
    ...oct(1,6,5,'black',0),
  ],[
    ['plate_2x4','orange',2,1,1],['tile_1x2','white',2,2],['tile_1x2','white',2,4],'|',
    ['plate_2x4','red',5,1,1],'|',['plate_2x4','yellow',8,1,1],['tile_1x2','black',8,2],['tile_1x2','black',8,3],'|',
    ['tile_1x2','white',2,7],['tile_1x2','white',4,7,1],['tile_1x2','white',3,9],['tile_1x2','white',2,8,1],['round_tile_1x1','orange',3,8],'|',
    ['cheese_1x2','pink',7,6,2],['ball_1x1','lime',10,6],'|',['tile_1x4','red',7,8],['tile_1x4','red',7,10],
  ]),
  // 9. Bánh chưng: bánh vuông lá dong xanh, lạt buộc chữ thập, hoa mai bên cạnh
  voxLevel('Bánh chưng',['base_12x12','red'],[
    [2,2,0,8,8,2,'darkgreen'],[2,2,2,8,8,1,'green'],
  ],[
    ['tile_1x4','sand',4,2,1],['tile_1x4','sand',4,6,1],['tile_1x4','sand',7,2,1],['tile_1x4','sand',7,6,1],'|',
    ['tile_1x2','sand',2,4],['tile_1x2','sand',5,4],['tile_1x2','sand',8,4],['tile_1x2','sand',2,7],['tile_1x2','sand',5,7],['tile_1x2','sand',8,7],'|',
    ['flower_1x1','yellow',10,10],['flower_1x1','yellow',11,9],['flower_1x1','yellow',0,11],['flower_1x1','pink',1,10],
  ]),
  // 10. Bánh kem dâu: bánh 3 tầng hồng–trắng trên đĩa, dâu tây và kem xen kẽ, nến trên đỉnh
  voxLevel('Bánh kem dâu',['base_16x16','lavender'],[
    ...oct(1,1,14,'white',0,1,2),
    ...oct(2,2,12,'pink',1,1,2),...oct(2,2,12,'white',2,1,2),...oct(2,2,12,'pink',3,1,2),
    ...oct(4,4,8,'white',4),...oct(4,4,8,'pink',5),...oct(4,4,8,'white',6),
    [6,6,7,4,4,1,'pink'],[6,6,8,4,4,1,'white'],
  ],[
    ...[4,6,8,10].flatMap((v,i)=>{ const a=i%2?['dome_2x2','white']:['ball_2x2','red'], b=i%2?['ball_2x2','red']:['dome_2x2','white'];
      return [[...a,v,2],[...b,v,12],[...b,2,v],[...a,12,v]]; }),'|',
    ...[4,6,8,10].flatMap((v,i)=>{ const a=i%2?['dome_2x2','white']:['ball_2x2','red'];
      return [[...a,v,4],[...a,v,10]]; }),
    ['ball_2x2','red',4,6],['dome_2x2','white',4,8],['ball_2x2','red',10,8],['dome_2x2','white',10,6],'|',
    ['ball_2x2','red',7,7],['cyl_1x1','azure',6,6],['cyl_1x1','yellow',9,6],['cyl_1x1','yellow',6,9],['cyl_1x1','azure',9,9],
    ['flame_1x1','orange',6,6],['flame_1x1','orange',9,6],['flame_1x1','orange',6,9],['flame_1x1','orange',9,9],
  ]),
]});
}
