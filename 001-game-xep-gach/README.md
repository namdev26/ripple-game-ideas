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
  **Vòng chơi (kinh tế bản 2, 17/11):** game đi theo **đường lắp** như game giải đố: LEVEL 1 → 2 → 3… (thứ tự sẵn, độ khó tăng dần kiểu răng cưa, xen kẽ các bộ). Level luôn **miễn phí** nên không bao giờ đứng game. Có xu thì **nhảy cóc**: mua trước mô hình mình thích ở cửa hàng để lắp ngay; tới lượt nó trên đường thì tự bỏ qua, các level khác vẫn phải chơi.
  - Thưởng lắp xong: Thường 60 · Hiếm 80 · Huyền thoại 120, × sao (1★ ×1 · 2★ ×1,25 · 3★ ×1,5), vàng kim ×1,2. Lắp lại không có xu. Đủ bộ +200 / +300 / +300.
  - 🛒 Cửa hàng: mua đúng mô hình 150 / 250 / 400 (≈ 2–4 level xu). Level kế hiện "miễn phí". Chạm ⭐ để ghim **mục tiêu**: màn chính hiện thanh xu + "Lắp LEVEL n (tới +x) là đủ!", màn kết quả hiện "còn x xu".
  - Thiếu xu khi bấm mua → bảng THIẾU XU: ▶ lắp level kế · 🎁 hộp bí ẩn · 🎬 QC +30 (tự ghim mục tiêu).
  - 🎁 Hộp bí ẩn (màn riêng, thanh dưới: Cửa hàng · Hộp bí ẩn · Trang chủ · Kệ): 100 xu, **chỉ ra mô hình chưa có** (trừ level kế vì đã miễn phí), tỉ lệ Thường 6 · Hiếm 3 · Huyền thoại 1; ✨ vàng kim 12%. Có đủ 16 thì hộp ra bản vàng kim. Không còn ra trùng / kho. Mở bằng 🪙 100 hoặc AD 🎬 (1 lần/ngày). Kết quả tung trước và lưu; chạm hộp để lắc thử; 🎲 xem tỉ lệ.
  - QC giả lập: ×2 thưởng ở màn kết quả (1 lần mỗi level mới) · +30 xu (3 lần/ngày) · mở hộp (1 lần/ngày) · hồi 1 mạng khi thua (1 lần mỗi màn, hoặc trả 50 xu).
  - Màn chính (1 tiêu điểm): trên trái thanh tiến độ LEVEL n/16, trên phải xu + ⚙; dưới là thẻ mục tiêu (nếu có); giữa là hộp mô hình level kế trên bục sáng + tên + nút ▶ LEVEL n to; trái có 📚 Bộ sưu tập; ngăn kéo Chờ lắp / Đã xong mặc định thu gọn thành 1 thanh trên thanh dưới (chạm để mở, nhớ trạng thái). Bỏ nút chọn bộ và logo trang trí.
  - Sách: bìa → mỗi bước một trang có khung mảnh "2x + tên màu" → trang danh sách mảnh. Vuốt hoặc ◀ ▶ để lật.
  - Hướng dẫn lần đầu: LEVEL 1 miễn phí → sách → lắp → chỉ cửa hàng. Save cũ: bản thiết kế đã mua → chờ lắp, kho mảnh hoàn ra xu, mô hình trùng trong kho bán 25/40/80.
  - Mục Ưu đãi và Xu là nạp **giả lập**, chỉ có giao diện — thẻ nổi bật Bộ Khủng Long (hộp LEGO sản phẩm, T-Rex + khủng long cổ dài dựng bằng gạch thật bằng bộ vẽ 3D của game, 3 mô hình + 2.000 xu + 5 hộp + T-Rex vàng kim, đếm ngược tới nửa đêm, chỉ là hình), gói khởi đầu, bỏ quảng cáo, mua bộ LEGO mới, 6 gói xu. Bấm mua chỉ báo bản thử. Chạm ô xu ở đâu cũng mở cửa hàng tại mục Xu.
  Thêm `?all` vào cuối link để mở hết + 99999 xu ảo khi test (không lưu gì).
  Thiết kế: `docs/superpowers/specs/2026-11-17-kinh-te-vong-choi-design.md` (kinh tế hiện tại), `docs/superpowers/specs/2026-11-16-hop-bi-an-design.md` (hộp bí ẩn cũ). Test: `sh tests/run-all.sh` (cần node + Chrome); ảnh xem bằng mắt: `SHOT=1 node tests/run-headless.js tests/shots-hb.js`.
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
