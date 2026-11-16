# Hộp bí ẩn: thiết kế game (GDD)

Trạng thái: **đã duyệt, đã làm MVP** (kết hợp cửa hàng mô hình và hộp bí ẩn). Bản này thay vòng chơi "mua bản thiết kế, đi tiệm mua gạch" trong `2026-11-16-mua-ban-thiet-ke-design.md`.

## 1. Vì sao đổi

- Vòng hiện tại là: mua bản vẽ → vào tiệm → bấm "Túi combo" → quay lại → lắp. Từ màn thứ 3 trở đi, ai cũng chỉ bấm combo, nên tiệm thành việc vặt. Nó thêm 4 lần chạm mà không thêm cảm xúc nào.
- Ý của người dùng: **mua một hộp, mở ra là có nguyên một bộ hoàn chỉnh** (sách hướng dẫn và đủ mảnh), chỉ cần lắp.
- Người dùng chốt **kết hợp hai cách có bộ**:
  - **Cửa hàng:** chọn đúng mô hình mình muốn rồi mua.
  - **Hộp bí ẩn (gacha):** một chế độ riêng, ra ngẫu nhiên.
- Đây là mô hình blind box kiểu Pop Mart hay LEGO Minifigures. Niềm vui đến từ ba khoảnh khắc: **chờ, mở, khoe**. Game đã có sẵn khoảnh khắc "khoe" (kệ trưng bày, phát lại), giờ thêm hai khoảnh khắc đầu.

## 2. Trụ cột

1. **Mở hộp đã tay.** Khoảnh khắc mở là phần thưởng, nên phải có nhịp, âm thanh và rung.
2. **Lắp thư giãn.** Không có trạng thái thua, không bao giờ kẹt vì thiếu mảnh hay hết xu.
3. **Sưu tầm có đích.** Luôn thấy bộ còn thiếu mô hình nào, và có một thứ hiếm để săn.

**Chống mục tiêu** (làm vậy là hỏng, dù chạy được):
- Ra trùng mô hình rồi mất xu oan.
- Người chơi bị kẹt không đủ xu để đi tiếp.
- Mô hình khó nhất ra đầu tiên khiến người mới bỏ game.
- Tỉ lệ bị giấu.

## 3. Vòng chơi chính

```
Có xu → ┬ Cửa hàng: chọn mô hình, mua (giá theo độ hiếm) ─┐
        └ Hộp bí ẩn: rẻ hơn, ngẫu nhiên, có bản đặc biệt ─┴→ Mở hộp (hiệu ứng)
  → Sách hướng dẫn kiểu LEGO → Lắp (sao) → Phát lại → Lên kệ → Nhận xu → hộp tiếp theo
                                                          ↘ Đủ bộ: thưởng bộ + mở bộ sau
```

Một vòng mất khoảng 3–6 phút. Thắng một màn đủ tiền mua hộp tiếp theo (xem mục 6).

## 4. Hai cách có bộ: Cửa hàng và Hộp bí ẩn

### 4.0 Vì sao người ta còn chọn gacha khi đã có cửa hàng
Nếu không có lý do rõ ràng, người chơi sẽ chỉ dùng cửa hàng. Đây là lỗi hay gặp khi một game có cả hai kênh. Gacha cần **ba lợi thế mà cửa hàng không có**:

| | 🛒 Cửa hàng | 🎁 Hộp bí ẩn |
|---|---|---|
| Biết trước mô hình | ✅ chọn đúng cái mình thích | ❌ ngẫu nhiên trong các mô hình **chưa có** |
| Giá | Theo độ hiếm: Thường ×1,0 · Hiếm ×1,3 · Huyền thoại ×1,8 giá gốc của bộ | **Đồng giá ×0,8**, rẻ hơn cả mô hình rẻ nhất |
| Bản đặc biệt ✨ | ❌ không bao giờ | ✅ 12% mỗi hộp, kèm bảo hiểm |
| Hiệu ứng mở | Ngắn (đã biết sẽ ra gì) | Đầy đủ: lắc thử, khe sáng, lộ độ hiếm |

Ví dụ bộ Kỳ quan cổ đại (giá gốc 150):
- Cửa hàng: Tượng Rhodes 150, Kim tự tháp 200, Đền Artemis 270.
- Hộp bí ẩn: 120.

Lựa chọn rõ ràng: **"Mình muốn đúng cái này"** thì trả thêm tiền. **"Đằng nào cũng sưu tầm hết"** thì mở hộp, vừa rẻ hơn vừa có cơ hội ra bản đặc biệt.

- Cả hai đều không bán mô hình đã có, nên không bao giờ trùng.
- Bảo hiểm bản đặc biệt tính trên **hộp bí ẩn mở ra mô hình cuối cùng còn thiếu của bộ**: nếu bộ đó chưa có bản đặc biệt nào thì hộp này chắc chắn ra bản đặc biệt. Người chơi trung thành với gacha có phần thưởng cho tới cuối.

### 4.1 Luật rút (hộp bí ẩn)
- Mỗi bộ sưu tập có một loại hộp. Hộp chỉ ra **mô hình người chơi chưa có trong bộ đó** (rút không hoàn lại), nên **không bao giờ trùng**.
- Mở hết bộ thì hộp của bộ đó hết hàng, nút chuyển sang "Đủ bộ ✓".
- **Kết quả của hộp kế tiếp được tung trước** khi người chơi chưa mua, rồi lưu vào save. Có hai tác dụng:
  - Tải lại trang không đổi được kết quả.
  - "Lắc thử" luôn khớp với thứ sẽ ra.

### 4.2 Độ hiếm = độ khó
Độ hiếm xếp theo số mảnh trong từng bộ:

| Bộ | Thường ⚪ (trọng số 6) | Hiếm 🔵 (3) | Huyền thoại 🟡 (1) |
|---|---|---|---|
| Khởi động | Cây nấm (hộp đầu cố định), Ngôi nhà, Dưa hấu | | Lâu đài |
| Kỳ quan cổ đại | Tượng Rhodes, Tượng Zeus, Hải đăng Alexandria | Vườn treo Babylon, Lăng Halicarnassus, Kim tự tháp Giza | Đền Artemis |
| Việt Nam | Cột cờ Hà Nội, Cầu Vàng | Chùa Cầu Hội An, Chùa Một Cột | Khuê Văn Các |

Mô hình nhỏ có trọng số cao hơn, nên **hay ra trước**. Nhờ vậy độ khó vẫn tăng dần một cách tự nhiên, dù thứ tự là ngẫu nhiên.
- Ví dụ bộ Kỳ quan cổ đại: Đền Artemis ra ở hộp đầu chỉ có 1/28 ≈ 3,6%.
- Đây là cách giữ đường cong độ khó mà không phải khóa thứ tự.

### 4.3 Bản đặc biệt (thứ để săn)
- Mỗi hộp có **12%** ra mô hình ở **bản đặc biệt**: lắp bằng mảnh vàng kim hoặc chrome, có hiệu ứng lấp lánh trên kệ.
- Người chơi **vẫn nhận đúng mô hình mới**. Bản đặc biệt chỉ là phần thêm, nên trượt cũng không mất gì.
- Chỉ hộp bí ẩn mới ra bản đặc biệt; mua ở cửa hàng thì không.
- **Bảo hiểm:** xem mục 4.0. Cách này cũng xử lý được việc hộp cuối nhàm vì người chơi đã biết trước sẽ ra mô hình gì.
- Kệ trưng bày đếm "Bản đặc biệt x/16". Đây là mục tiêu dài hạn cho người chơi kỹ.

### 4.4 Minh bạch
- Nút "ⓘ" trên hộp hiện tỉ lệ hiện tại của từng mô hình còn lại, cộng với 12% bản đặc biệt.
- Lý do: người chơi tin hơn, và chuẩn chung của store và luật nhiều nước đều bắt công khai tỉ lệ.

### 4.5 Lắc thử (miễn phí, không bắt buộc)
- Chạm vào hộp chưa mua: hộp lắc, phát tiếng lạch cạch và rung theo độ hiếm (nhẹ, vừa, nặng).
- Hộp đang giấu bản đặc biệt thì có thêm một tiếng "ting".
- Chỉ là gợi ý. Đây là thói quen có thật của người mua blind box, chi phí làm rất thấp mà tạo được cảm giác chờ đợi.

## 5. Khoảnh khắc mở hộp (vòng quay ngang)

Đổi theo ảnh mẫu người dùng gửi (16/11): bỏ cảnh hộp rơi, lắc và bật nắp, thay bằng vòng quay ngang.

| Nhịp | Thời gian | Nội dung |
|---|---|---|
| Bấm "Mở hộp" | 0s | Dải 40 ô chạy qua vạch vàng ở giữa, mỗi ô là một hộp sản phẩm 3D. Các ô lấp chỗ được rút theo đúng tỉ lệ của hộp, nên chỉ có mô hình thật sự có thể ra. Có tiếng tích mỗi khi một ô qua vạch. |
| Chậm dần, dừng | 0–3,4s | Dừng lệch trong ô trúng một chút rồi trượt vào giữa. Ô trúng phóng to và sáng theo màu độ hiếm. |
| Lộ hộp | 3,85s | Trên cùng là tên bộ (vàng), rồi tên mô hình và nhãn độ hiếm. Hộp sản phẩm lớn hiện ra ở giữa, có tia sáng phía sau. |
| Bản đặc biệt | +0,65s | Hộp đổi sang vàng kim, có viền sáng và vệt bóng chạy qua, kèm chữ "✨ BẢN ĐẶC BIỆT". |
| Nút "Mở sách" / "Để sau" | +0,5s | |

- **Hộp sản phẩm:** mặt trước có hình mô hình, tên, số mảnh và nhãn độ hiếm ở góc; mặt bên có hình nhỏ và tên. Mua ở cửa hàng cũng hiện hộp này nhưng bỏ qua vòng quay.
- **Tua nhanh:** từ lần mở thứ hai trở đi, chạm màn hình thì dải trượt nhanh tới ô trúng. Hộp đầu tiên (trong hướng dẫn) không tua được.
- Hình dùng lại `thumbLevel`, không cần làm art mới.

## 6. Kinh tế

Xu chỉ có một việc là có bộ mới, qua cửa hàng hoặc hộp bí ẩn. Mục tiêu: **mỗi lần lắp xong (dù chỉ 1★) luôn đủ tiền mở một hộp bí ẩn**. Cửa hàng là đường đắt hơn nhưng được chọn.

Tất cả giá làm tròn tới hàng chục.

| Bộ | Giá gốc | 🎁 Hộp bí ẩn (×0,8) | 🛒 Thường / Hiếm / Huyền thoại |
|---|---|---|---|
| Khởi động | 40 | 30 (hộp đầu **miễn phí**, luôn ra Cây nấm) | 40 / – / 70 |
| Kỳ quan cổ đại | 150 | 120 | 150 / 200 / 270 |
| Việt Nam | 200 | 160 | 200 / 260 / 360 |

- **Thưởng khi lắp** = giá gốc của bộ × hệ số độ hiếm × hệ số sao, làm tròn lên hàng chục.
  - Hệ số độ hiếm: Thường 1,0 · Hiếm 1,2 · Huyền thoại 1,5.
  - Hệ số sao: 1★ 1,0 · 2★ 1,2 · 3★ 1,4.
  - Bản đặc biệt được thêm ×1,2.
- **Đủ bộ:** thưởng thêm bằng giá gốc của bộ sau và mở khóa bộ sau.
- **Lắp lại** từ kệ: +15🪙. Đây là lưới an toàn, không phải cách cày chính.
- **Xu ban đầu:** 0 (hộp đầu đã miễn phí).
- **Vì sao không bao giờ kẹt:**
  - Thưởng 1★ thấp nhất bằng giá gốc, luôn lớn hơn giá hộp bí ẩn (giá gốc ×0,8).
  - Lúc vào bộ mới, thưởng đủ bộ cũng bằng giá gốc của bộ mới, đủ mua hộp đầu.
  - Mua đồ đắt ở cửa hàng có thể khiến tạm hết tiền mua cửa hàng, nhưng luôn còn đủ cho hộp bí ẩn.
- Kiểm tra tự động (assert): với mọi thứ tự và mọi cách mua (cửa hàng hay hộp), lắp toàn 1★ thì xu không bao giờ thấp hơn giá hộp bí ẩn của bộ đang mở, chừng nào bộ còn mô hình chưa có.
- Hệ quả: người chơi giỏi sẽ dư xu. Tạm chấp nhận vì game mới có 16 mô hình. Muốn có chỗ tiêu xu thì làm thêm ở giai đoạn 2 (mục 10).

## 7. Sách hướng dẫn (kiểu LEGO)

- **Bìa:** ảnh mô hình hoàn chỉnh, tên, bộ, độ hiếm, số bước, số mảnh, góc vàng như bìa sách LEGO.
- **Trang bước:** nền trắng ngà, số bước to ở góc trái.
  - Khung bo tròn viền đen chứa các mảnh của bước đó. Dưới mỗi mảnh ghi `2x` và tên màu tiếng Việt (giống ảnh mẫu người dùng gửi).
  - Bên dưới là ảnh mô hình đã lắp tới bước đó.
- **Trang cuối:** danh sách toàn bộ mảnh.
- Lật trang bằng cách vuốt hoặc ◀ ▶, có hiệu ứng lật giấy. Nút "▶ Lắp" cố định ở chân màn hình.
- Lúc đang lắp, vẫn mở sách xem lại được (nút 📖) mà không mất tiến độ.

## 8. Màn hình chính và kệ

```
┌──────────────────────────┐
│ 🪙 320        ⚙          │
│   KỲ QUAN CỔ ĐẠI  ◀ ▶   │  ← đổi bộ
│      ┌────────┐          │
│      │  HỘP   │  ⓘ       │  ← chạm để lắc thử
│      │ BÍ ẨN  │          │
│      └────────┘          │
│   Còn 4/7 mô hình        │
│  [ 🎁 MỞ HỘP · 120🪙 ]   │
│  [ 🛒 Cửa hàng ]         │  ← chọn đúng mô hình
│                          │
│ Chờ lắp:  [Zeus][Rhodes] │  ← hộp đã mở, chưa lắp
│ 🏛 Kệ trưng bày (3/7 ✨1) │
└──────────────────────────┘
```

- **Cửa hàng:** hiện lưới các mô hình của bộ đang mở.
  - Mỗi ô có ảnh thật, tên, độ hiếm và giá. Mô hình đã có thì hiện "Đã có".
  - Bấm vào một ô sẽ ra bìa sách và nút "Mua · X🪙". Mua xong có hiệu ứng mở hộp bản ngắn.
  - Đầu cửa hàng có một dòng nhắc: "🎁 Hộp bí ẩn rẻ hơn và có thể ra ✨ bản đặc biệt".
- **Chờ lắp:** người chơi có thể có nhiều bộ rồi lắp sau. Mỗi thẻ mở sách của mô hình đó.
- **Kệ:** lưới theo bộ. Mô hình chưa có hiện **bóng đen kèm dấu "?"**, giống mặt sau hộp blind box. Thấy chỗ trống sẽ khiến người chơi muốn mở tiếp.
  - Bản đặc biệt có khung vàng và lấp lánh.
  - Nút Phát lại và Lắp lại giữ như hiện nay.
- Mở hộp ở bộ đã đủ thì nút xám, hiện "Đủ bộ ✓".
- Bộ chưa mở khóa hiện hộp có ổ khóa.

## 9. Hướng dẫn lần đầu

1. Bong bóng chỉ vào "🎁 MỞ HỘP · Miễn phí".
2. Mở hộp ra Cây nấm, kèm hiệu ứng.
3. Bong bóng chỉ "Mở sách".
4. Chỉ ◀ ▶ một lần.
5. Bấm "▶ Lắp", rồi hiện toast "Kéo mảnh vào đúng hình" như hiện nay.
6. Lần đầu về home sau khi lắp xong, bong bóng chỉ "🛒 Cửa hàng" một lần: "Muốn chọn đúng mô hình? Vào cửa hàng".

Xong Cây nấm thì nhận 40🪙: đủ mở hộp bí ẩn (30) hoặc mua Ngôi nhà/Dưa hấu ở cửa hàng (40). Người chơi tự mở mà không cần chỉ.

## 10. Phạm vi

**MVP (làm ngay):**
- **Cửa hàng mô hình** (giá theo độ hiếm, bìa sách, mở hộp bản ngắn).
- Hộp bí ẩn theo bộ, rút không trùng có trọng số, tung trước kết quả.
- Lắc thử, hiệu ứng mở 3 cấp độ hiếm.
- Bản đặc biệt kèm bảo hiểm.
- Sách hướng dẫn kiểu LEGO.
- Danh sách "Chờ lắp", kệ có bóng đen "?".
- Kinh tế mới kèm assert chống kẹt, hướng dẫn mới, bảng tỉ lệ.

**Bỏ:**
- Tiệm gạch, mua phần thiếu, túi combo, kệ hàng.
- Kho và bán mảnh.
- Giá bản thiết kế theo màn.
- Hướng dẫn mua gạch.

**Giai đoạn 2 (chưa làm):**
- **Túi đánh số:** mảnh chia thành túi 1, 2, 3 theo nhóm bước. Lắp tới đâu xé túi tới đó, mảnh đổ ra khay. Đây là một khoảnh khắc ASMR nữa.
- **Chỗ tiêu xu:** nền kệ, bệ trưng bày, sơn lại mô hình.
- **Hộp sự kiện / bộ giới hạn.**

## 11. Chuyển save cũ

- Mô hình đã lắp được tính là đã sở hữu.
- Bản thiết kế đã mua mà chưa lắp thì đưa vào "Chờ lắp".
- Mảnh trong kho được hoàn 100% giá ra xu.
- Bỏ các trường `bp`, `inv`, `tut` cũ. Hướng dẫn mới chỉ hiện nếu chưa lắp mô hình nào.

## 12. Rủi ro và cách đỡ

| Rủi ro | Cách đỡ |
|---|---|
| Người chơi ghét chữ "gacha" | Không trùng, không tốn tiền thật, công khai tỉ lệ. Thực chất là thứ tự ngẫu nhiên có quà phụ. |
| Thứ tự ngẫu nhiên làm hỏng đường cong độ khó | Trọng số theo độ hiếm (mục 4.2). Bộ đã chia theo độ khó sẵn. |
| Có cửa hàng thì không ai mở hộp bí ẩn | Hộp rẻ hơn 20% hoặc hơn, và là nguồn duy nhất ra ✨ bản đặc biệt (mục 4.0). |
| Hộp cuối mỗi bộ biết trước, nhàm | Bảo hiểm bản đặc biệt rơi vào hộp cuối, cộng màn ăn mừng đủ bộ. |
| Hiệu ứng mở lặp lại 16 lần thấy dài | Tua nhanh từ lần thứ 2, giữ lại khe sáng. |
| Dư xu, không có gì để tiêu | Chấp nhận ở MVP. Giai đoạn 2 thêm chỗ tiêu xu. |
