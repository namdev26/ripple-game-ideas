# Game xếp gạch (puzzle lắp mô hình theo hướng dẫn)

- **Trạng thái:** Đang làm (prototype)
- **Ngày tạo:** 2026-11-15

## Tóm tắt
Game puzzle lắp mô hình bằng gạch nhựa kiểu LEGO: người chơi nhìn hình hướng dẫn từng bước, chọn đúng mảnh, xoay đúng hướng và lắp vào đúng vị trí trên mô hình 3D.

## Vấn đề / Cơ hội
Ý tưởng nảy ra khi ngồi xếp LEGO (mô hình dưa hấu). Cảm giác đọc sách hướng dẫn rồi lắp từng mảnh rất thư giãn và thoả mãn, có thể chuyển thành puzzle nhẹ nhàng kiểu ASMR.

## Ý tưởng chính
- Màn hình chính: mô hình 3D xoay được, lưới để lắp.
- Góc phải: "trang hướng dẫn" của bước hiện tại, mảnh mới được tô sáng, kèm danh sách mảnh cần dùng.
- Khay mảnh ở dưới, kèm số lượng còn lại.
- Lắp đúng thì mảnh khớp vào kèm tiếng "tách"; lắp sai thì mảnh rung lên và bị tính 1 lỗi.
- Chấm sao theo số lỗi và việc có dùng gợi ý hay không.

## Prototype
Mở thẳng bằng trình duyệt (cần internet để tải three.js).
- `mobile.html`: bản điện thoại (khung 9:16), bố cục kiểu game "lấp tượng":
  tượng đất sét trắng hiện theo từng bước, kéo mảnh màu từ khay vào đúng hình là tự khớp.
  Mảnh trong khay xoay theo góc nhìn của bàn chính. HUD: tên màn + % hoàn thành. Thả sai hình bị tính lỗi (trừ sao),
  xu (thưởng khi thắng, dùng mua gợi ý), gợi ý phát sáng, cài đặt âm thanh/rung,
  11 màn: Cây nấm, Ngôi nhà, Dưa hấu, Lâu đài (81 mảnh) + 7 kỳ quan thế giới cổ đại (Kim tự tháp Giza,
  Vườn treo Babylon, Tượng Zeus, Đền Artemis, Lăng Halicarnassus, Tượng Rhodes, Hải đăng Alexandria).
  Mảnh trên chỉ lắp được khi mảnh dưới đã có.
  Loại gạch: brick/plate các cỡ, tile (trơn, không núm), dốc 2x2/1x2/2x4, dốc cheese, gạch tròn 1x1/2x2,
  nón vuông/tròn, mái vòm 2x2/4x4, vòm cửa 1x4/1x6.
- `mobile-v2.html`: bản điện thoại trước đó (khung hướng dẫn từng bước ở trên, thanh booster).
- `index.html`: bản desktop đầu tiên (rê chuột + click để lắp).

## Hướng phát triển có thể
- Chế độ khó: ẩn danh sách mảnh của từng bước, khay có thêm mảnh gây nhiễu.
- Chế độ "giải đố ngược": chỉ cho xem hình mô hình hoàn chỉnh, người chơi tự tìm thứ tự lắp.
- Lắp gạch gắn ngang (SNOT), mảnh lệch nửa ô (jumper).
- Mô hình xong thì "sống dậy" (animation) để làm phần thưởng.
- Editor để tự tạo màn.

## Bước tiếp theo
- [ ] Chơi thử prototype, ghi lại cảm giác
- [ ] Quyết định hướng: thư giãn (ASMR) hay giải đố (khó)
