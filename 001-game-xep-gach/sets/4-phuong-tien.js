// Bộ Phương tiện: 8 xe / tàu / máy bay kiểu Lego chunky. Dựng theo hình chiếu cạnh side(): thân xe quay về +Z, đầu xe hướng +X.
SETS.push({name:'Phương tiện', c:'#e8463a', bonus:300, levels:(()=>{
  // wh: chèn bánh tròn (wheel_*) ngay sau đế, trước thân — để bánh nằm được dưới phần thân chìa ra (chi tiết thường tự rơi lên nóc)
  //   mỗi bước là [[mảnh,màu,x,z,xoay=0,y(plate)=1],...]
  const wh=(lv,...st)=>(lv.steps.splice(1,0,...st.map(b=>b.map(([p,c,x,z,r=0,y=1])=>[p,c,x,y,z,r]))),lv);
  return [
  // Xe máy: xe tay ga xanh bạc hà to chiếm gần hết đế — đuôi bo tròn, yên dài, sàn để chân thấp, yếm trước cao, tay lái + đèn pha vàng; người lái đội mũ đỏ, trên khúc đường
  wh(voxLevel('Xe máy',['base_12x12','gray'],side([
    '.........H..',
    '..bbbb..ssL.',
    'mmmmmm.mmmm.',
    '...mmmmm....',
    '...ggggg....',
  ],{H:W(4,7,'black'),b:W(5,6,'black'),s:W(4,7,'mint'),L:W(5,6,'yellow'),m:W(5,6,'mint'),g:W(5,6,'darkgray')}),[
    ['curve_2x2','mint',0,5,1],['statue_1x1','blue',4,5],['ball_1x1','red',4,5],['round_1x1','gray',9,4],['round_1x1','gray',9,7],['tile_1x2','black',6,5,1],'|',
    ['plate_2x6','sand',0,0],['plate_2x6','sand',6,0],['trunk_1x1','brown',1,0],['bush_2x2','green',0,0],['flower_1x1','yellow',3,1],['flower_1x1','pink',4,1],
    ['brick_1x2','red',6,0],['brick_1x2','red',6,0],['tile_1x2','white',6,0],['bush_2x2','green',8,0],['bush_2x2','lime',10,0],'|',
    ['tile_1x4','white',0,10],['tile_1x4','white',6,10],['tile_2x2','yellow',10,10],
  ]),[['wheel_2x1','black',1,5],['wheel_2x1','black',1,6],['wheel_2x1','black',8,5],['wheel_2x1','black',8,6]]),
  // Xích lô: ghế khách thấp phía TRƯỚC (thùng xanh, mui đỏ gập bo tròn phía sau ghế), 2 bánh nhỏ phía trước, 1 bánh to phía sau, người đạp ngồi cao trên yên sau
  wh(voxLevel('Xích lô',['base_12x12','gray'],side([
    '...ss.......',
    '....p.hh....',
    '....p.BAAA..',
    '....pcccccc.',
    '....fffffff.',
  ],{s:W(5,6,'black'),p:W(5,6,'darkgray'),f:W(5,6,'darkgray'),h:W(3,8,'red'),B:W(3,8,'blue'),A:LEG(3,8,'blue'),c:W(3,8,'blue')}),[
    ...[3,5,7].map(z=>['curve_2x2','red',6,z,3]),['statue_1x1','white',3,5],['ball_1x1','sand',3,5],'|',
    ['tile_2x4','red',8,4,1],['statue_1x1','yellow',8,5],['statue_1x1','pink',8,6],['tile_1x4','blue',10,4,1],['wheel_2x1','black',9,2],['wheel_2x1','black',9,9],'|',
    ['plate_2x6','sand',0,0],['plate_2x6','sand',6,0],['trunk_1x1','brown',10,0],['bush_2x2','lime',10,0],['bush_2x2','green',0,0],['flower_1x1','yellow',2,1],['flower_1x1','pink',3,1],['brick_2x4','brown',4,0],['tile_2x4','orange',4,0],['bush_2x2','green',8,0],'|',
    ['tile_1x4','white',0,10],['tile_1x4','white',6,10],
  ]),[['wheel_4x1','black',0,5],['wheel_4x1','black',0,6]]),
  // Thuyền buồm: thân đỏ viền trắng, boong gỗ, buồm trắng lớn + buồm mũi, cột nâu cắm cờ, giữa biển có đảo dừa
  voxLevel('Thuyền buồm',['base_12x12','blue'],side([
    '.......m....',
    '.....ssm....',
    '...ssssmj...',
    '.ssssssmjjj.',
    '.wwwwwwwwwwn',
    '..rrrrrrrrr.',
    '...aaaaaa...',
  ],{m:W(5,6,'brown'),s:W(5,6,'white'),j:W(5,6,'white'),w:W(4,7,'white'),n:W(5,6,'white'),r:W(4,7,'red'),a:W(5,6,'red')}),[
    ['flag_1x1','red',7,5],'|',
    ['tile_1x4','tan',1,4],['tile_1x4','tan',5,4],['tile_1x2','tan',9,4],['tile_1x4','tan',1,7],['tile_1x4','tan',5,7],['tile_1x2','tan',9,7],'|',
    ['tile_2x4','water',0,9],['tile_2x4','water',7,10],['tile_2x4','water',5,0],['round_tile_1x1','white',4,10],['round_tile_1x1','white',11,2],'|',
    ['plate_2x2','sand',0,0],['trunk_1x1','brown',0,0],['trunk_1x1','brown',0,0],['palm_1x1','green',0,0],['cyl_1x1','red',10,9],['round_1x1','white',10,9],
  ]),
  // Máy bay: thân dài trắng bo tròn trên nóc, dải cửa sổ xanh, mũi kính bo tròn, cánh chính đỏ rộng 2 bên (tấm gác lên thân), đuôi đứng đỏ + cánh đuôi, càng đáp nâng thân lên khỏi đường băng
  wh(voxLevel('Máy bay',['base_12x12','gray'],side([
    'T...........',
    'TT..........',
    'ewwwwwwwwfff',
    '.ffffffffff.',
    '...SS....S..',
    '...SS....S..',
  ],{T:W(5,6,'red'),w:[[4,4,'azure'],[5,6,'white'],[7,7,'azure']],f:W(4,7,'white'),n:W(5,6,'white'),e:W(5,6,'white'),S:W(5,6,'darkgray')}),[
    ['plate_2x4','red',0,1,1],['plate_2x4','red',0,7,1],'|',
    ['curve_2x2','white',2,4,0],['curve_2x2','white',2,6,2],['curve_2x2','white',8,4,0],['curve_2x2','white',8,6,2],['curve_2x4','azure',10,4,3],'|',
    ['plate_2x6','red',4,0,1],['plate_2x6','red',4,6,1],['plate_2x6','red',6,0,1],['plate_2x6','red',6,6,1],'|',
    ['brick_2x2','white',10,0],['brick_2x2','white',10,0],['brick_2x2','azure',10,0],['dome_2x2','red',10,0],'|',
    ['tile_1x4','white',0,11],['tile_1x4','white',8,11],['round_tile_1x1','yellow',3,10],['round_tile_1x1','yellow',2,0],
    ['column_1x1','white',0,0],['flag_1x1','orange',0,0],
  ]),[['wheel_2x1','black',3,4],['wheel_2x1','black',3,7],['wheel_2x1','black',9,4],['wheel_2x1','black',9,7]]),
  // Khinh khí cầu: quả cầu tròn — tầng rộng là hình bát giác (4 → 6 → 8 → 8 → 6), vai trên phủ 2 vòng dốc, nóc vòm; sọc ngang cầu vồng, giỏ mây nâu nhỏ treo bằng 2 dây, trên đồi cỏ
  voxLevel('Khinh khí cầu',['base_12x12','lime'],[
    [4,5,0,4,2,1,'brown'],[4,5,1,1,2,1,'tan'],[7,5,1,1,2,1,'tan'],
    [4,4,2,4,4,1,'red'],
    [3,3,3,6,6,1,'orange'],
    ...[[4,'yellow'],[5,'lime']].flatMap(([t,c])=>[[4,2,t,4,8,1,c],[3,3,t,6,6,1,c],[2,4,t,8,4,1,c]]),
    [4,3,6,4,6,1,'azure'],[3,4,6,6,4,1,'azure'],
  ],[
    ...[4,6].flatMap(x=>[['wedge_1x2','azure',x,2,0],['wedge_1x2','azure',x,9,2],['wedge_1x2','azure',2,x,1],['wedge_1x2','azure',9,x,3]]),
    ['wcorner_1x1','azure',3,3,0],['wcorner_1x1','azure',3,8,1],['wcorner_1x1','azure',8,8,2],['wcorner_1x1','azure',8,3,3],'|',
    ...[4,6].flatMap(x=>[['wedge_1x2','blue',x,3,0],['wedge_1x2','blue',x,8,2],['wedge_1x2','blue',3,x,1],['wedge_1x2','blue',8,x,3]]),
    ['dome_4x4','red',4,4],'|',
    ['bush_2x2','green',0,0],['pine_2x2','darkgreen',0,9],['bush_2x2','lime',10,10],['flower_1x1','pink',2,11],['flower_1x1','yellow',3,10],['bush_2x2','green',10,0],
  ]),
  // Xe buýt 2 tầng: thân đỏ, 2 dãy cửa sổ xanh, mái trắng, trạm chờ có người đợi ở vỉa hè
  wh(voxLevel('Xe buýt',['base_16x16','gray'],side([
    '.RRRRRRRRRRRRRR.',
    '.pwwpwwpwwpwwpG.',
    '.yyyyyyyyyyyyyy.',
    '.pwwwwpwwpwwwwG.',
    '.yaayyyyyyaayyy.',
    '.ccccccccccccc..',
  ],{R:W(4,7,'white'),p:W(4,7,'red'),w:[[4,4,'azure'],[5,6,'red'],[7,7,'azure']],G:W(4,7,'azure'),y:W(4,7,'red'),
     c:W(5,6,'darkgray'),a:W(5,6,'red')}),[
    ['tile_2x4','yellow',5,5],['tile_1x2','black',13,5,1],'|',
    ['tile_1x4','white',0,10],['tile_1x4','white',6,10],['tile_1x4','white',12,10],'|',
    ['plate_2x8','sand',0,12],['plate_2x8','sand',8,12],['plate_2x8','sand',0,14],['plate_2x8','sand',8,14],'|',
    ['column_1x1','white',9,14],['column_1x1','white',13,14],['statue_1x1','yellow',10,14],['statue_1x1','blue',11,14],['statue_1x1','pink',12,13],['tile_2x4','blue',9,14],['tile_1x4','blue',10,14],'|',
    ['trunk_1x1','brown',2,14],['bush_2x2','green',1,13],['flower_1x1','red',5,13],['flower_1x1','yellow',6,13],['column_1x1','darkgray',15,13],['flag_1x1','blue',15,13],
  ]),[['wheel_2x1','black',2,4],['wheel_2x1','black',10,4],['wheel_2x1','black',2,7],['wheel_2x1','black',10,7]]),
  // Tên lửa: thân tròn trắng sọc đỏ, mũi nhọn đỏ, 2 tên lửa đẩy hai bên, tháp phóng cam-đỏ có 2 cần nối phía sau, bệ phóng viền vàng, khói trắng chờ phóng
  voxLevel('Tên lửa',['base_12x12','darkgray'],[
    [2,2,0,8,8,1,'gray'],
    ...[0,1,2,3,4,5,6,7,8].map(t=>[5,0,t,2,2,1,t%2?'red':'orange']),[5,2,3,2,3,1,'red'],[5,2,6,2,3,1,'orange'],
  ],[
    ['tile_1x4','yellow',2,9],['tile_1x4','yellow',6,9],['tile_1x4','yellow',2,2,1],['tile_1x4','yellow',9,2,1],['tile_1x4','yellow',2,6,1],['tile_1x4','yellow',9,6,1],'|',
    ['cyl_2x2','white',5,5],['cyl_2x2','white',5,5],['cyl_2x2','red',5,5],['cyl_2x2','white',5,5],['cyl_2x2','white',5,5],['cyl_2x2','white',5,5],['cone_2x2','red',5,5],'|',
    ['slope_1x2','red',5,7,2],['slope_1x2','red',6,7,2],'|',
    ['cyl_2x2','white',3,5],['cyl_2x2','white',3,5],['cyl_2x2','white',3,5],['cone_2x2','red',3,5],['slope_2x2','red',3,7,2],'|',
    ['cyl_2x2','white',7,5],['cyl_2x2','white',7,5],['cyl_2x2','white',7,5],['cone_2x2','red',7,5],['slope_2x2','red',7,7,2],'|',
    ['ball_2x2','white',3,3],['ball_2x2','white',7,3],['round_tile_1x1','yellow',2,2],['round_tile_1x1','yellow',9,2],'|',
    ['statue_1x1','white',9,9],['statue_1x1','white',10,10],['flag_1x1','red',11,0],['star_1x1','yellow',11,0],'|',
    ['cyl_2x2','gray',0,10],['cyl_2x2','gray',0,10],['dome_2x2','gray',0,10],['cyl_2x2','gray',10,4],['cyl_2x2','gray',10,4],['dome_2x2','gray',10,4],['brick_2x2','gray',10,1],['dome_2x2','white',10,1],['tile_1x2','yellow',3,2],['tile_1x2','yellow',7,2],['brick_2x4','white',0,0,1],['tile_2x4','blue',0,0,1],
  ]),
  // Tàu hoả: đầu máy hơi nước đỏ-đen (ống khói, vòm vàng, khói trắng) kéo toa khách xanh trên đường ray, sân ga có người đợi
  wh(voxLevel('Tàu hoả',['base_16x16','green'],[...side([
    'vvvvvvv.RRRR....',
    'BBBBBBB.CCC.....',
    'BwwBwwB.CgCbbbbF',
    'BBBBBBB.CCCbbbbF',
    'ddddddddeeeeeeee',
    '.AA.AA..AA.AA.AA',
    '.AA.AA..AA.AA.AA',
  ],{v:W(6,9,'white'),R:W(6,9,'black'),C:W(6,9,'red'),g:[[6,6,'azure'],[7,8,'red'],[9,9,'azure']],b:W(6,9,'black'),F:W(6,9,'darkgray'),
     B:W(6,9,'blue'),w:[[6,6,'azure'],[7,8,'blue'],[9,9,'azure']],d:W(6,9,'darkgray'),e:W(6,9,'red'),A:W(7,8,'darkgray')}),
    [0,0,0,16,3,1,'gray']],[
    ['dome_2x2','gold',11,7],['cyl_2x2','black',14,7],['ball_2x2','white',14,7],['round_tile_1x1','yellow',15,6],['round_tile_1x1','yellow',15,9],'|',
    ['tile_2x4','gray',1,7],['tile_2x2','gray',5,7],['tile_2x4','red',8,7,1],'|',
    ...[0,2,4,6,8,10,12,14].flatMap(x=>[['tile_1x2','brown',x,4,1],['tile_1x2','brown',x,10,1]]),'|',
    ['tile_1x4','yellow',0,2],['tile_1x4','yellow',4,2],['tile_1x4','yellow',8,2],['tile_1x4','yellow',12,2],'|',
    ['statue_1x1','blue',3,1],['statue_1x1','pink',4,1],['brick_1x2','brown',6,0],['tile_1x2','brown',6,0],['column_1x1','darkgray',1,0],['column_1x1','darkgray',1,0],['round_1x1','yellow',1,0],
    ['column_1x1','darkgray',10,0],['column_1x1','darkgray',10,0],['tile_2x4','red',9,0],['statue_1x1','yellow',12,1],['bush_2x2','green',14,0],'|',
    ['bush_2x2','lime',0,13],['flower_1x1','red',3,13],['flower_1x1','yellow',4,14],['flower_1x1','pink',6,13],['bush_2x2','green',8,14],['flower_1x1','white',11,13],
    ['column_1x1','darkgray',14,13],['column_1x1','darkgray',14,13],['round_1x1','red',14,13],['round_1x1','lime',14,13],'|',
    ['pine_2x2','darkgreen',12,14],['bush_2x2','lime',4,14],['flower_1x1','yellow',10,13],['flower_1x1','pink',2,15],['ball_2x2','white',13,7],
    ['column_1x1','darkgray',14,1],['column_1x1','darkgray',14,1],['round_1x1','yellow',14,1],['brick_1x2','tan',8,1],['tile_1x2','brown',8,1],
  ]),[0,4,8,12].flatMap(x=>[['tile_1x4','darkgray',x,6],['tile_1x4','darkgray',x,9]]),
    [1,4].flatMap(x=>[['wheel_2x1','black',x,6,0,2],['wheel_2x1','black',x,9,0,2]]),[8,11,14].flatMap(x=>[['wheel_2x1','red',x,6,0,2],['wheel_2x1','red',x,9,0,2]])),
];
})()});
