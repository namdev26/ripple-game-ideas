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
  sổ bước nhỏ ở giữa phía trên (mảnh của bước + đã lắp, hình bước có mảnh mới viền đỏ, số bước; chạm để phóng to),
  trên bàn không hiện hình xem trước, kéo mảnh màu từ khay thả đúng chỗ là tự khớp (💡 gợi ý mới hiện chỗ cần lắp).
  Mảnh trong khay xoay theo góc nhìn của bàn chính. Góc trên: sổ bước (kèm tên mô hình) bên trái, hàng trên: ◀ về menu · ❤ mạng · ⚙ (không hiện xu khi lắp) (cách chơi nằm trong ⚙). Có 3 mạng (❤ giữa hàng trên): thả sai mất 1, hết mạng phải chơi lại; sao = số mạng còn,
  xu (thưởng khi thắng, dùng mua gợi ý), gợi ý phát sáng, cài đặt âm thanh/rung,
  16 màn chia 3 bộ (nút 📚 góc trái trên để chọn bộ):
  - Khởi động: Cây nấm, Ngôi nhà, Dưa hấu, Lâu đài
  - Kỳ quan cổ đại: Kim tự tháp Giza, Vườn treo Babylon, Tượng Zeus, Đền Artemis, Lăng Halicarnassus, Tượng Rhodes, Hải đăng Alexandria
  - Việt Nam: Chùa Một Cột, Cột cờ Hà Nội, Cầu Vàng, Chùa Cầu Hội An, Khuê Văn Các
  **Vòng chơi:** có bộ mô hình (🎁 hộp bí ẩn hoặc 🛒 cửa hàng) → mở hộp → sách hướng dẫn kiểu LEGO → lắp → xem phát lại → lên kệ trưng bày.
  - 🎁 Hộp bí ẩn: đồng giá (Khởi động 30 · Kỳ quan 120 · Việt Nam 160), ra ngẫu nhiên mô hình **chưa có** (không trùng), mô hình dễ hay ra trước (Thường 6 · Hiếm 3 · Huyền thoại 1). Kết quả tung trước và lưu lại; chạm hộp để lắc thử. Nút ⓘ xem tỉ lệ.
  - ✨ Bản đặc biệt (vàng kim, chỉ có trong hộp): 12% mỗi hộp; hộp ra mô hình cuối của bộ mà bộ chưa có bản đặc biệt thì chắc chắn ra.
  - 🛒 Cửa hàng: chọn đúng mô hình, giá theo độ hiếm (giá gốc ×1 / ×1,3 / ×1,8), đắt hơn hộp.
  - Sách: bìa → mỗi bước một trang có khung mảnh "2x + tên màu" → trang danh sách mảnh. Vuốt hoặc ◀ ▶ để lật.
  - Thưởng = giá gốc bộ × độ hiếm (1 / 1,2 / 1,5) × sao (1 / 1,2 / 1,4), bản đặc biệt ×1,2; lắp xong dù 1★ luôn đủ mở 1 hộp. Đủ bộ thưởng thêm + mở bộ sau. Lắp lại từ kệ +15.
  - Hộp đầu tiên tặng, luôn ra Cây nấm, có bong bóng hướng dẫn. Bắt đầu 0 xu. Save cũ: bản thiết kế đã mua → chờ lắp, kho mảnh hoàn 100% ra xu.
  - 🛍️ Ưu đãi (chạm ô xu hoặc nút Ưu đãi ở màn chính): shop nạp **giả lập**, chỉ có giao diện — gói khởi đầu, bỏ quảng cáo, mua bộ LEGO mới, 6 gói xu. Bấm mua chỉ báo bản thử.
  Thêm `?all` vào cuối link để mở hết + 99999 xu ảo khi test (không lưu gì).
  Thiết kế: `docs/superpowers/specs/2026-11-16-hop-bi-an-design.md`. Test: `sh tests/run-all.sh` (cần node + Chrome); ảnh xem bằng mắt: `SHOT=1 node tests/run-headless.js tests/shots-hb.js`.
  Mảnh trên chỉ lắp được khi mảnh dưới đã có.
  Loại gạch: brick/plate các cỡ, tile (trơn, không núm), dốc 2x2/1x2/2x4, dốc cheese, gạch tròn 1x1/2x2,
  nón vuông/tròn, mái vòm 2x2/4x4, vòm cửa 1x4/1x6, dốc nghiêng + góc chéo (mặt kim tự tháp).
  Mảnh tạo hình: mái củ hành, chóp nhọn, quả cầu, chậu, cột, cây thông, cây cọ, bụi cây, hoa, ngọn lửa,
  tượng người, sư tử, ngựa, cửa sổ vòm, góc bo tròn, mái cong, buồm. Nước trong suốt, chất liệu bóng.

## Hướng phát triển có thể
- Chế độ khó: ẩn danh sách mảnh của từng bước, khay có thêm mảnh gây nhiễu.
- Chế độ "giải đố ngược": chỉ cho xem hình mô hình hoàn chỉnh, người chơi tự tìm thứ tự lắp.
- Lắp gạch gắn ngang (SNOT), mảnh lệch nửa ô (jumper).
- Mô hình xong thì "sống dậy" (animation) để làm phần thưởng.
- Editor để tự tạo màn.

## Bước tiếp theo
- [ ] Chơi thử prototype, ghi lại cảm giác
- [x] Quyết định hướng: thư giãn, sưu tầm. Đã đổi từ "mua bản thiết kế → mua gạch" sang hộp bí ẩn + cửa hàng mô hình
