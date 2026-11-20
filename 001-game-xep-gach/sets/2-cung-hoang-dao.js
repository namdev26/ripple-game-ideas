SETS.push((()=>{
// dời cả mảng khối lên dy tầng / sang dx
const up=(a,dy,dx=0)=>a.map(([x,z,y,w,d,h,c])=>[x+dx,z,y+dy,w,d,h,c]);
// cá nhìn ngang, đầu sang phải (+X); flip = quay đầu sang trái. Thân dày 2 ô (z0..z0+1)
const fish=(x0,z0,y0,c,fin,flip)=>{ let r=['....ff...','tt.bbbbbb','.tbbbbbEb','tt.bbbbbb'];
  if(flip) r=r.map(s=>[...s].reverse().join(''));
  return up(side(r,{f:W(z0+1,z0+1,fin),t:W(z0+1,z0+1,fin),b:W(z0,z0+2,c),E:[[z0,z0+1,c],[z0+2,z0+2,'black']]},x0),y0); };
// em bé chibi 5 ô ngang (x..x+4), mặt quay ra +Z, đứng từ tầng 1
const kid=(x,shirt,hair)=>[
  [x+1,5,1,3,2,1,'blue'],[x,4,2,5,3,2,shirt],
  [x,5,4,5,2,2,'peach'],[x,3,4,5,2,2,hair],[x,3,6,5,4,1,hair],
  [x+1,5,5,1,2,1,'black'],[x+3,5,5,1,2,1,'black'],
];
return {name:'12 Cung hoàng đạo', c:'#9b5de5', bonus:300, levels:[
  // Bạch Dương: cừu lông xoăn trắng (lưng phủ vòm), mặt + chân xám đen, sừng xoắn vàng 2 bên đầu
  voxLevel('Bạch Dương',['base_12x12','lime'],[
    [2,3,0,2,2,1,'darkgray'],[2,7,0,2,2,1,'darkgray'],[6,3,0,2,2,1,'darkgray'],[6,7,0,2,2,1,'darkgray'],
    [1,3,1,8,6,2,'white'],[0,5,2,1,2,1,'white'],[1,3,3,7,6,1,'white'],
    [8,4,2,4,4,2,'darkgray'],[8,4,4,2,4,1,'white'],[10,4,3,1,1,1,'white'],[10,7,3,1,1,1,'white'],
    [8,3,2,2,1,1,'gold'],[8,3,3,1,1,1,'gold'],[8,3,4,2,1,1,'gold'],
    [8,8,2,2,1,1,'gold'],[8,8,3,1,1,1,'gold'],[8,8,4,2,1,1,'gold'],
  ],[
    ['dome_2x2','white',1,3],['dome_2x2','white',3,3],['dome_2x2','white',5,3],['dome_2x2','white',1,5],['dome_2x2','white',3,5],['dome_2x2','white',5,5],'|',
    ['dome_2x2','white',1,7],['dome_2x2','white',3,7],['dome_2x2','white',5,7],['dome_2x2','white',8,5],'|',
    ['tile_1x2','pink',11,5,1],'|',
    ...flowers([[0,0,'pink'],[11,0,'white'],[0,11,'yellow'],[11,10,'pink']]),
  ]),
  // Kim Ngưu: bò tót nâu, mõm hồng đào, sừng trắng vểnh, khoen mũi vàng, giữa đồng hoa
  voxLevel('Kim Ngưu',['base_12x12','green'],side([
    '.........HHH',
    '.bbbbbbbbHEM',
    'tbbbbbbbbNNN',
    '.BBBBBBBBNN.',
    '..LL....LL..',
    '..KK....KK..',
  ],{H:W(4,7,'brown'),b:W(3,8,'brown'),E:EYE(4,7,'brown','black'),M:W(4,7,'peach'),t:W(5,6,'brown'),N:W(4,7,'brown'),
     B:W(3,8,'brown'),L:[[3,4,'brown'],[7,8,'brown']],K:[[3,4,'darkgray'],[7,8,'darkgray']]}),[
    ['plate_1x4','white',10,1,1],['plate_1x4','white',10,7,1],'|',
    ['cone_1x1','white',10,1],['cone_1x1','white',10,10],['tile_1x2','white',10,5,1],['round_1x1','gold',11,5],'|',
    ['cone_1x1','darkgray',0,5],'|',
    ['bush_2x2','lime',0,0],...flowers([[11,0,'yellow'],[0,11,'red'],[11,11,'pink']]),
  ]),
  // Song Tử: 2 em bé sinh đôi áo vàng nắm tay nhau trên mây, cùng giơ ngôi sao
  voxLevel('Song Tử',['base_12x12','darkazure'],[
    [0,2,0,12,8,1,'white'],[0,2,0,1,1,1,''],[11,2,0,1,1,1,''],[0,9,0,1,1,1,''],[11,9,0,1,1,1,''],
    ...kid(0,'yellow','brown'),...kid(7,'yellow','brown'),
    [5,5,3,2,1,2,'yellow'],
  ],[
    ['star_1x1','gold',5,5],['star_1x1','gold',6,5],'|',['ball_1x1','pink',7,4],['ball_1x1','pink',11,4],'|',
    ['dome_2x2','white',0,8],['dome_2x2','white',10,8],['dome_2x2','white',4,8],['dome_2x2','white',5,2],'|',
    ['star_1x1','yellow',11,11],
  ]),
  // Cự Giải: cua đỏ quay mặt ra, 2 càng giơ cao há kẹp, mắt trắng trên cuống, miệng cười
  voxLevel('Cự Giải',['base_12x12','sand'],[
    [2,2,0,8,6,2,'red'],[3,3,2,6,4,1,'red'],[4,7,1,4,1,1,'black'],
    [0,4,0,3,2,4,'red'],[9,4,0,3,2,4,'red'],
    [0,3,4,3,4,1,'red'],[9,3,4,3,4,1,'red'],[0,3,5,1,4,1,'red'],[2,3,5,1,4,1,'red'],[9,3,5,1,4,1,'red'],[11,3,5,1,4,1,'red'],
    [0,2,0,2,1,1,'darkred'],[0,7,0,2,1,1,'darkred'],[10,2,0,2,1,1,'darkred'],[10,7,0,2,1,1,'darkred'],
    [4,6,3,1,1,1,'red'],[7,6,3,1,1,1,'red'],
  ],[
    ['ball_1x1','white',4,6],['ball_1x1','white',7,6],['tile_2x2','red',5,3],'|',
    ['cheese_1x2','red',0,3,1],['cheese_1x2','red',0,5,1],['cheese_1x2','red',2,3,3],['cheese_1x2','red',2,5,3],'|',
    ['cheese_1x2','red',9,3,1],['cheese_1x2','red',9,5,1],['cheese_1x2','red',11,3,3],['cheese_1x2','red',11,5,3],'|',
    ['tile_2x4','water',0,0],['tile_2x4','water',4,0],['tile_2x4','water',8,0],['round_tile_1x1','orange',5,10],['round_tile_1x1','white',7,11],['round_tile_1x1','pink',2,10],
  ]),
  // Sư Tử: sư tử vàng ngồi nhìn thẳng, bờm cam tròn to, mõm trắng mũi nâu, đuôi chùm cam, trên mỏm đá
  voxLevel('Sư Tử',['base_16x16','lime'],[
    [1,1,0,14,14,1,'gray'],[2,2,1,12,12,1,'gray'],[1,1,0,2,2,1,''],[13,13,0,2,2,1,''],[3,12,1,3,2,1,'darkgray'],[11,2,1,3,2,1,'darkgray'],
    [4,3,2,8,6,3,'yellow'],[5,9,2,6,3,3,'yellow'],[5,12,2,2,2,1,'yellow'],[9,12,2,2,2,1,'yellow'],[5,13,2,2,1,1,'white'],[9,13,2,2,1,1,'white'],
    [4,6,5,8,3,1,'orange'],[3,6,6,10,3,4,'orange'],[4,6,10,8,3,1,'orange'],[6,6,11,4,3,1,'orange'],
    [3,6,6,1,3,1,''],[12,6,6,1,3,1,''],[3,6,9,1,3,1,''],[12,6,9,1,3,1,''],
    [5,9,5,6,2,5,'yellow'],[6,11,5,4,1,2,'white'],[7,11,7,2,1,1,'brown'],
    [6,10,8,1,1,1,'black'],[9,10,8,1,1,1,'black'],
    [12,4,2,2,2,1,'yellow'],[13,4,3,1,2,2,'yellow'],[13,4,5,1,2,1,'orange'],
  ],[
    ['dome_2x2','yellow',5,9],['dome_2x2','yellow',9,9],['round_1x1','pink',5,10],['round_1x1','pink',10,10],'|',
    ['ball_2x2','orange',12,3],'|',['dome_2x2','orange',6,6],['dome_2x2','orange',8,6],'|',
    ['tile_2x2','darkgray',2,9],['tile_2x2','darkgray',12,10],['tile_2x4','darkgray',1,3,1],'|',
    ['bush_2x2','green',0,14],['flower_1x1','yellow',4,14],['flower_1x1','white',14,14],['flower_1x1','pink',15,1],['pine_2x2','darkgreen',13,13],
    ['pine_2x2','green',0,0],['bush_2x2','lime',14,0],['flower_1x1','red',6,15],['flower_1x1','yellow',10,15],
  ]),
  // Xử Nữ: thiên thần chibi váy hồng tóc vàng, cánh trắng dang rộng, bó lúa vàng bên cạnh, vòng hoa trên đầu
  voxLevel('Xử Nữ',['base_12x12','mint'],[
    [3,3,0,6,6,1,'white'],[3,3,1,6,6,1,'pink'],[3,4,2,6,4,1,'pink'],
    [3,4,3,6,4,3,'yellow'],[4,6,3,4,2,3,'peach'],[4,7,4,1,1,1,'black'],[7,7,4,1,1,1,'black'],[3,4,6,6,4,1,'yellow'],
    [1,3,2,10,1,1,'white'],[0,3,3,12,1,2,'white'],[0,3,5,3,1,1,'white'],[9,3,5,3,1,1,'white'],[0,3,6,2,1,1,'white'],[10,3,6,2,1,1,'white'],
    [9,8,0,2,2,2,'lime'],[9,8,2,2,2,1,'tan'],
  ],[
    ['flame_1x1','gold',9,8],['flame_1x1','gold',10,8],['flame_1x1','gold',9,9],['flame_1x1','gold',10,9],'|',
    ['flower_1x1','pink',3,7],['flower_1x1','white',5,7],['flower_1x1','pink',6,7],['flower_1x1','white',8,7],'|',
    ['bush_2x2','green',0,9],['bush_2x2','lime',0,0],['flower_1x1','pink',2,11],['flower_1x1','white',1,11],['tile_2x4','white',4,10],['tile_1x4','white',4,9],'|',
    ['cheese_1x2','white',0,3,1],['cheese_1x2','white',10,3,3],['star_1x1','yellow',11,0],'|',['arch_1x4','gold',4,5],'|',
    ['dome_2x2','white',1,5],['dome_2x2','white',1,7],['dome_2x2','white',9,5],['bush_2x2','lime',10,0],
  ]),
  // Thiên Bình: cân vàng trên bệ đá trắng, đòn ngang dài, 2 dây xích tròn xuống 2 đĩa cân trên mây
  voxLevel('Thiên Bình',['base_12x12','darkazure'],[
    [3,3,0,6,6,1,'white'],[4,4,1,4,4,1,'gold'],[5,5,2,2,2,5,'gold'],
    [0,3,0,4,6,2,'white'],[8,3,0,4,6,2,'white'],
    [0,4,2,3,3,1,'gold'],[9,4,2,3,3,1,'gold'],
  ],[
    ['column_1x1','gold',1,5],['column_1x1','gold',1,5],['column_1x1','gold',1,5],['column_1x1','gold',1,5],'|',
    ['column_1x1','gold',10,5],['column_1x1','gold',10,5],['column_1x1','gold',10,5],['column_1x1','gold',10,5],'|',
    ['brick_1x6','gold',0,5],['brick_1x6','gold',6,5],'|',['ball_2x2','gold',5,5],'|',
    ['dome_2x2','white',0,7],['dome_2x2','white',10,7],['dome_2x2','white',0,2],['dome_2x2','white',10,2],['plate_2x4','white',4,9],
  ]),
  // Bọ Cạp: bọ cạp xanh đuôi cong vồng qua lưng, ngòi vàng, 2 càng kẹp phía trước
  voxLevel('Bọ Cạp',['base_12x12','sand'],[
    [2,4,0,7,4,2,'darkazure'],[8,4,0,1,4,1,'darkazure'],
    [1,5,2,2,2,1,'darkazure'],[0,5,3,2,2,2,'darkazure'],[0,5,5,4,2,1,'darkazure'],[1,5,6,4,2,1,'darkazure'],
    [3,2,0,1,2,1,'darkazure'],[5,2,0,1,2,1,'darkazure'],[3,8,0,1,2,1,'darkazure'],[5,8,0,1,2,1,'darkazure'],
    [8,2,0,4,2,1,'darkazure'],[9,2,1,1,2,1,'darkazure'],[11,2,1,1,2,1,'darkazure'],
    [8,8,0,4,2,1,'darkazure'],[9,8,1,1,2,1,'darkazure'],[11,8,1,1,2,1,'darkazure'],
  ],[
    ['cone_1x1','gold',4,5],['round_1x1','black',8,5],['round_1x1','black',8,6],'|',
    ['tile_2x4','blue',5,4,1],['tile_1x4','blue',7,4,1],'|',
    ['brick_2x2','green',0,10],['brick_1x2','green',0,10],['dome_2x2','green',0,10],['flower_1x1','pink',1,11],'|',
    ['brick_2x2','tan',10,10],['slope_2x2','tan',10,10,2],['round_tile_1x1','tan',1,1],['bush_2x2','darkgreen',0,0],
  ]),
  // Nhân Mã: nhân mã thân ngựa nâu nhạt, áo xanh, tóc đen, giương cung vàng dây trắng về phía trước, đuôi đen
  voxLevel('Nhân Mã',['base_12x12','darkgreen'],side([
    '.......kkkGG',
    '.......kseWG',
    '.......kssWG',
    '.......aaahG',
    '.......rrrWG',
    '.......rrrWG',
    '.BBBBBBBBBGG',
    '.BBBBBBBBBB.',
    '.BBBBBBBBBB.',
    '..LL....LL..',
    '..HH....HH..',
  ],{k:W(4,7,'black'),s:W(4,7,'peach'),e:[[4,6,'peach'],[7,7,'black']],a:W(4,7,'peach'),h:W(5,6,'peach'),G:W(5,6,'gold'),W:W(5,6,'white'),
     r:W(4,7,'darkgreen'),B:W(3,8,'tan'),L:[[3,4,'tan'],[7,8,'tan']],H:[[3,4,'darkgray'],[7,8,'darkgray']]}),[
    ['slope_1x2','black',1,4,1],['slope_1x2','black',1,6,1],['tile_2x4','darkgreen',3,3,1],['tile_2x4','darkgreen',3,5,1],'|',
    ['cheese_1x2','black',7,4,1],['cheese_1x2','black',7,6,1],'|',
    ['pine_2x2','darkgreen',0,0],['pine_2x2','green',3,0],['bush_2x2','green',0,10],['bush_2x2','lime',9,10],['flower_1x1','yellow',3,11],['flower_1x1','white',6,10],['flower_1x1','pink',5,11],
  ]),
  // Ma Kết: dê biển — đầu dê trắng sừng xám vểnh ra sau, nửa sau đuôi cá bạc hà cuộn vồng lên, vây xanh, trên mỏm đá giữa sóng
  voxLevel('Ma Kết',['base_12x12','darkazure'],side([
    'ff.....hh...',
    'ff......hHH.',
    '.tt.....HHEM',
    '..t....NNNN.',
    '..t..wwwwww.',
    '..tt.wwwwww.',
    '...tttwwww..',
    '...RRRL..L..',
    '..RRRRRRRR..',
  ],{h:[[4,4,'darkgray'],[7,7,'darkgray']],H:W(4,7,'white'),E:EYE(4,7,'white','black'),M:W(5,6,'white'),N:W(4,7,'white'),w:W(4,7,'white'),
     f:W(5,6,'green'),t:W(5,6,'mint'),L:W(4,7,'white'),R:W(3,8,'gray')}),[
    ['tile_1x2','pink',11,5,1],['curve_2x2','green',0,5,1],'|',
    ['tile_2x4','water',0,9],['tile_2x4','water',4,9],['tile_2x4','water',8,9],['tile_2x4','water',0,0],['tile_2x4','water',4,0],['tile_2x4','water',8,0],'|',
    ['round_tile_1x1','white',11,2],['round_tile_1x1','white',2,10],'|',
    ['ball_2x2','pink',10,0],['flame_1x1','green',0,0],['flame_1x1','green',1,1],['bush_2x2','darkgreen',0,9],['round_tile_1x1','orange',6,10],['round_tile_1x1','yellow',9,10],
  ]),
  // Bảo Bình: bình gốm xanh vai vàng nằm nghiêng trên mỏm đá, nước trong tuôn từ miệng bình xuống hồ
  voxLevel('Bảo Bình',['base_12x12','lavender'],side([
    'bbbbbB.L....',
    'bbbbbBnMWW..',
    'bbbbbB.L.W..',
    '.ccccRRR.W..',
    'RRRRRRRR.W..',
    'RRRRRRRRPPPP',
  ],{c:W(5,6,'blue'),G:W(5,6,'gold'),b:W(4,7,'blue'),B:W(4,7,'gold'),n:W(5,6,'gold'),L:W(4,7,'gold'),M:[[4,4,'gold'],[5,6,'water'],[7,7,'gold']],
     W:W(5,6,'water'),R:W(3,8,'gray'),P:W(1,10,'water')}),[
    ['curve_2x4','blue',0,4,0],['curve_2x4','blue',0,6,2],['tile_1x2','blue',4,5,1],'|',
    ['round_tile_1x1','white',9,3],['round_tile_1x1','white',10,8],['round_tile_1x1','white',8,9],'|',
    ['bush_2x2','green',0,10],['flower_1x1','pink',0,3],['flower_1x1','white',4,8],['flower_1x1','yellow',6,3],['star_1x1','yellow',0,0],['star_1x1','white',11,11],
  ]),
  // Song Ngư: 2 cá bơi ngược chiều — cá hồng phía trước sang phải, cá vàng phía sau nhảy trên ngọn sóng sang trái
  voxLevel('Song Ngư',['base_12x12','darkazure'],[
    [0,0,0,12,11,1,'water'],[3,2,1,9,3,2,'water'],
    ...fish(0,7,1,'pink','red'),
    ...fish(3,2,3,'yellow','orange',true),
  ],[
    ['round_tile_1x1','white',11,6],['round_tile_1x1','white',1,4],'|',['pine_2x2','darkgreen',0,0],['ball_2x2','pink',10,9],['cyl_2x2','orange',0,10],['bush_2x2','green',0,2],
    ['ball_1x1','water',9,8],['ball_1x1','water',10,9],['ball_1x1','water',2,2],
  ]),
]};
})());
