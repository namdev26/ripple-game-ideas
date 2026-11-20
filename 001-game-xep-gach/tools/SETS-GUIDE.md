# Hướng dẫn dựng bộ mô hình (sets/*.js)

Mỗi bộ = 1 file `sets/<số>-<tên>.js`, nội dung đúng 1 lệnh:

```js
SETS.push({name:'Tên bộ', c:'#màu-bộ', bonus:250, levels:[
  voxLevel('Tên mô hình', ['base_12x12','lime'], [ /* khối voxel */ ], [ /* chi tiết */ ]),
  ...
]});
```

`node tools/build-sets.js` chép mọi file vào khối `// <SETS>` của mobile.html. Không sửa tay khối đó.
Xem trước, không đụng mobile.html: `node tools/preview-set.js sets/x.js` (lưới cả bộ) hoặc `node tools/preview-set.js sets/x.js "Tên"` (4 góc + 4 bước).
Lệnh in số mảnh, ô phải thêm cột đỡ (fix) và lỗi. Ảnh nằm ở tests/.tmp/preview_*.png.

## Toạ độ
- Đế: `[mảnh đế, màu]`, ví dụ `['base_12x12','lime']`. Có base_10x10, base_12x12, base_16x16, plate_8x8, plate_6x6. Kích thước mô hình = kích thước đế.
- x đi sang phải, z đi về phía người xem. Camera và ảnh nhìn từ phía +Z, hơi lệch sang +X. Mặt trước của mô hình quay về +Z, mặt bên đẹp quay về +X.
- 1 tầng voxel = 1 viên gạch = 3 plate. Tầng 0 nằm ngay trên đế.

## Khối voxel `[x, z, tầng, dài theo x, rộng theo z, cao (số tầng), màu]`
- Lấp đầy một hộp. Màu `''` là khoét (xoá các ô đã lấp).
- Mô hình tự chia thành gạch TO nhất (2x6, 2x4, 1x6, 1x4, 2x2, 1x2, 1x1), trong đúng 1 tầng và cùng 1 màu.
- Ô không có gì bên dưới (treo) phải chung viên gạch với ô có chỗ tựa: chìa ra tối đa vài ô, cùng màu với ô bên cạnh.
  Không chia được thì tự thêm cột đỡ, lỗi đó ghi trong `fix`. **fix phải = 0.**
- Muốn mảnh to thì vùng cùng màu phải rộng và liền. Sọc màu lắt nhắt sinh nhiều 1x1.
- `side(rows, legend, x0=0)` dựng theo hình chiếu cạnh, hợp cho con vật / xe:
  `rows` = các tầng từ trên xuống, mỗi ký tự = 1 cột x; `legend[ký tự] = [[z từ, z đến, màu], ...]`.
  Helper dựng sẵn: `W(a,b,c)`, `EYE(a,b,c,mắt)`, `MID(a,b,c,giữa)`, `LEG(a,b,c)`. Ghép nhiều mảng bằng `[...side(...), ...box]`.

## Chi tiết `[mảnh, màu, x, z, xoay=0]`
- Tự rơi xuống mặt cao nhất tại chỗ đó. Đặt 2 mảnh cùng chỗ thì mảnh sau chồng lên mảnh trước.
- `'|'` ngăn các nhóm. Mỗi nhóm thành 1 hay nhiều bước (gần nhau ≤3 núm thì chung bước).
- Xoay: 0 = dài theo x; 1 = xoay 90°. Với dốc: 0 thấp về −Z, 1 thấp về −X, 2 thấp về +Z, 3 thấp về +X.
- Helper: `flowers([[x,z,màu],...])`, `fence(x,z0,n)`, `tree(x,y,z,c)` và `palm(x,z,y,c)` (dạng thô, xem bên dưới).

## Dạng thô (khi cần tự xếp từng mảnh, ví dụ tháp nhiều tầng mái)
`{name, size:[w,d], steps:[[ [mảnh,màu,x,y(plate),z,xoay], ... ], ...]}`. Mảnh phải đặt đúng lên mặt bên dưới.
Có thể trộn: dùng voxLevel cho thân, rồi `lv.steps.push(...)` thêm bước thô.

## Mảnh (w×d theo núm, h theo plate; gạch cao 3, plate/tile cao 1)
- Gạch: brick_1x1, 1x2, 1x4, 1x6, 2x2, 2x4, 2x6.
- Tấm: plate_1x1, 1x2, 1x4, 2x2, 2x4, 2x6, 2x8, 4x4, 6x6, 8x8.
- Tấm trơn (không núm): tile_1x1, 1x2, 1x4, 2x2, 2x4, round_tile_1x1.
- Dốc: slope_1x2, slope_2x2, slope_2x4 (cao 3, có gờ đỉnh); wedge_1x2 (dốc 1 ô không gờ); wcorner_1x1 (góc chéo); cheese_1x1, cheese_1x2 (dốc thấp, cao 2); curve_2x2, curve_2x4 (cong mượt, cao 3).
- Tròn: round_1x1 (h1), cyl_1x1, cyl_2x2 (h3), cone_1x1 (h3), cone_2x2 (h6), pyr_2x2 (chóp vuông h3), dome_2x2 (h3), dome_4x4 (h6, trơn), ball_1x1 (h2), ball_2x2 (h4).
- Kiến trúc: arch_1x4 (h3), arch_1x6 (h6), column_1x1 (cột có đầu, h3), window_1x2, rwindow_1x2 (cửa sổ vòm), corner_2x2, onion_2x2 (vòm củ hành h5), spire_1x1 (chóp nhọn h6), roofcone_2x2 (mái nón h6), vase_2x2.
- Thiên nhiên: flower_1x1 (h2), bush_2x2 (h3), palm_1x1 (tán dừa, h3), pine_2x2 (thông h6), trunk_1x1 (thân cây h3), flame_1x1 (h3), flame_2x2 (h5).
- Bánh xe dựng đứng: wheel_2x1 (đường kính 2 núm, cao 5 plate), wheel_4x1 (đường kính 4, cao 10). Xoay 0: trục theo z, nhìn từ +Z (camera) thấy tròn. Xoay 1: trục theo x. Đặt ở ô trống sát thân xe (chi tiết tự rơi xuống mặt bên dưới); thân xe nên kê cao 1–2 tầng để bánh lộ ra.
- Khác: statue_1x1 (tượng người h4), lion_1x2, horse_1x2, sail_1x2 (cánh buồm h5), flag_1x1 (cờ bay về +X, h3), star_1x1 (sao gắn đỉnh cờ).

## Màu
green lime darkgreen white black gray darkgray red darkred orange yellow gold sand tan darktan brown bronze blue azure darkazure mint pink lavender peach water(trong suốt).
(goldsp là màu riêng của bản đặc biệt, không dùng.)

## Tiêu chuẩn đẹp + "mảnh to"
- Nhìn ảnh lưới thu nhỏ vẫn nhận ra ngay vật gì. Hình khối rõ, màu tươi, ít màu (3–5 màu chính).
- Thân dựng bằng voxel khối lớn. Bề mặt cong / mái thì phủ dốc hoặc curve để mượt.
- Hạn chế 1x1: dưới khoảng 25% số mảnh. Không rải chi tiết vụn.
- Mỗi mô hình rộng 8–14 núm, cao 3–9 viên. Có thể có cảnh nhỏ quanh (vài bông hoa / bụi cây), nhưng thân chính phải chiếm phần lớn đế.
- Độ hiếm tự tính theo số mảnh trong bộ: khoảng 10% nhiều mảnh nhất là Huyền thoại, 30% kế tiếp là Hiếm. Nên chia cỡ rõ ràng:
  Thường 30–60 mảnh, Hiếm 60–120, Huyền thoại 120–200 (khoảng 1 cái mỗi bộ). Bước lắp tự chia, mỗi bước ≤10 mảnh.
- Thứ tự ra trong game (đường độ khó, hộp bám theo) tự tính kiểu răng cưa: Thường từ đầu, Hiếm rải từ 15%, Huyền thoại từ 40%, mỗi nhóm theo số mảnh tăng dần.
  Mô hình đầu tiên (miễn phí, dạy chơi) là mô hình Thường ít mảnh nhất cả game, nên giữ ≤ 30 mảnh. Ép vị trí bằng `lv.order` (0..1), ép độ hiếm bằng `lv.rar` (0/1/2).
- Thêm bộ mới: tạo file sets/6-xxx.js → `node tools/preview-set.js` cho đến khi không lỗi → `node tools/build-sets.js` → chạy test (`sh tests/run-all.sh`).
- Tên mô hình không được trùng giữa các bộ.
- Ví dụ mẫu: 12 con giáp cũ (dựng bằng `side`) nằm trong git: `git show 0ff8da7:001-game-xep-gach/mobile.html`, tìm `const ZODIAC=` và `const VOX_SCENE=`.
