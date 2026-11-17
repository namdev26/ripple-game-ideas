# Thiết kế lại kinh tế và vòng chơi (game xếp gạch), bản 2

- Ngày: 17/11/2026 · Trạng thái: **đề xuất, chờ duyệt** (chưa sửa code)
- Áp dụng cho: `001-game-xep-gach/mobile.html`
- Bản 2 sửa theo góp ý: game vẫn đi theo level như game giải đố (tự sang mô hình tiếp, độ khó tăng dần), nhưng cho người chơi tự mua bộ mình thích. Kinh tế được căn để khéo léo đẩy người chơi về level tiếp theo: "chưa đủ xu → chơi xong cái này đã".

## 1. Vì sao phải đổi (số thật trong code hiện tại)

1. **Hộp in ra tiền:** mở hộp tốn 100 xu, ra trùng được trung bình 150 xu. Không cần lắp gì, cứ bấm hộp là giàu.
2. **Quảng cáo mở hộp không giới hạn:** giá hộp coi như bằng 0.
3. **Lắp xong 1 mô hình luôn đủ tiền mở hộp kế:** không có lúc nào "thiếu một chút", nên không có lý do xem QC, nạp tiền hay cố lấy 3★.
4. **Lắp lại được +15 không giới hạn:** cày Cây nấm 4 phút là được 1 hộp.
5. **Độ khó ngẫu nhiên:** hộp thứ 2 có thể ra Đền Artemis 96 mảnh.
6. **Cửa hàng bán bộ Khởi động 40 xu, rẻ hơn hộp:** mua chắc lại rẻ hơn đánh cược.
7. **Thua ở mảnh 90/96 phải làm lại cả màn.**

## 2. Ý tưởng chính: "Đường lắp" + "Mô hình mơ ước"

```
          ĐƯỜNG LẮP (miễn phí, tự dẫn, độ khó tăng dần)
   Lv1 Cây nấm → Lv2 Ngôi nhà → Lv3 Dưa hấu → Lv4 Tượng Rhodes → ...
          │ mỗi level xong: + xu (theo sao) + tiến độ bộ sưu tập
          ▼
   XU ──► Cửa hàng: MUA ĐÚNG mô hình mơ ước (đắt, khoảng 2–4 level xu)
     └──► Hộp bí ẩn: rẻ hơn, ra 1 mô hình CHƯA CÓ ngẫu nhiên (có thể trúng cái mơ ước)
```

- **Đường lắp:** thứ tự 16 mô hình do game sắp sẵn, độ khó dạng răng cưa (dễ, dễ, khó, nghỉ...). Lắp xong thì level sau tự mở. **Miễn phí, nên không bao giờ kẹt**: không có xu vẫn luôn có level tiếp để chơi.
- **Mua trước cái mình thích:** cửa hàng cho mua bất kỳ mô hình nào chưa có. Mua rồi thì mô hình đó ra khỏi đường lắp (đường tự bỏ qua). Thứ người chơi trả tiền là **được lắp cái mình thích ngay, không phải đợi tới lượt**.
- **Hộp bí ẩn:** chỉ ra mô hình **chưa có** (không còn trùng), rẻ hơn cửa hàng. Đây là lựa chọn "thôi mua hộp này đi" khi chưa đủ xu mua đúng cái mình muốn.
- Bỏ khóa theo bộ. Bộ chỉ còn là bộ sưu tập: đủ bộ thì thưởng lớn.

## 3. Bảng số

Mô hình hiện có 3 độ hiếm: Thường 8 cái · Hiếm 5 · Huyền thoại 3. Độ hiếm tương ứng độ khó (số mảnh).

| | Thường | Hiếm | Huyền thoại |
|---|---|---|---|
| Thưởng lắp xong (1★ / 2★ / 3★) | 60 / 75 / 90 | 80 / 100 / 120 | 120 / 150 / 180 |
| Giá cửa hàng (mua đúng) | 150 (~2 level) | 250 (~3 level) | 400 (~4–5 level) |

- **Hộp bí ẩn:** 100 xu, ra 1 mô hình chưa có, tỉ lệ theo độ hiếm (6 : 3 : 1). Có 12% ra bản vàng kim. Hộp đầu tiên tặng.
- **Đủ bộ:** Khởi động +200 · Kỳ quan +300 · Việt Nam +300. Thời điểm được đặt sao cho số này **vừa đủ mua 1 mô hình mơ ước**.
- **QC nhân đôi thưởng:** 1 lần mỗi level, hiện ở màn kết quả.
- **QC nhận xu:** +30 xu, tối đa 3 lần/ngày.
- **Hết mạng:** xem QC hoặc trả 50 xu để hồi 1 mạng (1 lần mỗi màn), hoặc chơi lại.
- **Gợi ý:** 30 xu, giữ nguyên.
- **Lắp lại mô hình cũ:** không có xu, chỉ để vui và lấy thêm sao. Nhờ vậy hết bị cày.

Tổng xu kiếm được khi đi hết đường (trung bình 2–3★, chưa tính QC): khoảng 1.700 từ lắp + 800 đủ bộ ≈ **2.500**. Nếu mua cả 16 mô hình ở cửa hàng thì hết **3.650**. Tức là chỉ đủ tiền "mua trước" khoảng 6–8 lần trong cả hành trình. Vì vậy mỗi lần mua là một lựa chọn có cân nhắc, và phần lớn mô hình vẫn đến từ đường lắp.

## 4. Những chỗ "khéo léo lồng ghép"

1. **Ghim mục tiêu ở màn chính.** Người chơi bấm ⭐ lên một mô hình trong cửa hàng. Màn chính hiện:
   ```
   ┌───────────────────────────────┐
   │ ⭐ Mục tiêu: Chùa Một Cột       │
   │ ████████████░░░░  180/250 🪙   │
   │ Lắp Lv4 Tượng Rhodes (+~80) là đủ! │
   └───────────────────────────────┘
          [ ▶ LẮP LEVEL 4 ]
   ```
   Game luôn chỉ ra con đường ngắn nhất tới thứ họ muốn, và con đường đó luôn là **level tiếp theo**.
2. **Bấm mua khi thiếu xu** thì không chỉ báo "không đủ" mà mở bảng lựa chọn:
   ```
   Thiếu 70 🪙 để mua Chùa Một Cột
   [ ▶ Lắp Lv4 (+~80)  → đủ! ]
   [ 🎁 Hộp bí ẩn 100 · có thể ra đúng nó ]
   [ 🎬 Xem QC +30 ]
   ```
3. **Màn kết quả:** thanh mục tiêu chạy lên kèm dòng "Còn 20 xu nữa!" và nút **🎬 ×2: đủ ngay**. Thiếu vài chục xu là lúc người chơi dễ xem QC nhất.
4. **Đủ bộ = đủ tiền:** thanh bộ sưu tập ghi "Đủ bộ Khởi động: +200 → đủ mua Kim tự tháp". Người chơi lắp nốt mô hình mình không mê lắm để lấy thưởng bộ.
5. **3★ có giá trị thật:** 3★ hơn 1★ tới 50%. Người chơi biết "lần này cẩn thận thì đủ mua".
6. **Hộp là cám dỗ vừa phải:** 100 xu thay vì 250. Có thể ra đúng cái đang thích (lớn hơn 1/16, vì đã loại những cái đã có), nhưng cũng có thể không.

## 5. Ví dụ 15 phút đầu

| Bước | Hành động | Xu |
|---|---|---|
| 1 | Mở hộp tặng → Cây nấm → lắp 3★ | 90 |
| 2 | Lv2 Ngôi nhà 2★ · thấy Chùa Một Cột trong cửa hàng, ghim mục tiêu 250 | 165 |
| 3 | Lv3 Dưa hấu 3★ | 255 |
| 4 | Mua Chùa Một Cột (đường lắp tự bỏ qua nó) | 5 |
| 5 | Lắp Chùa Một Cột 2★ | 105 |
| 6 | Muốn Lâu đài (400) → "lắp Lv4, Lv5 nữa nhé" · hoặc thử hộp 100 | ... |

## 6. Những phần cũ bị ảnh hưởng (cần bạn biết)

- **Ra trùng và Kho:** hộp chỉ ra mô hình chưa có, nên không còn trùng. Kho sẽ bỏ, hoặc để dành cho sau này (đổi vàng kim). Việc này ngược với yêu cầu trước của bạn ("ra trùng được, cất kho"), nên cần bạn chốt.
- **Khi đã có đủ 16 mô hình:** hộp bí ẩn chuyển sang chỉ ra bản vàng kim của mô hình đã có (100%) để xu vẫn có chỗ tiêu.
- **Chờ lắp / Đã xong ở màn chính:** giữ nguyên. Thêm nút "▶ LẮP LEVEL N" và thẻ mục tiêu.

## 7. Cần bạn chốt

1. Bỏ ra trùng (hộp chỉ ra mô hình chưa có) và bỏ Kho? Hay vẫn giữ trùng nhưng chỉ bán rẻ 25/40/80?
2. Thứ tự đường lắp theo độ khó dạng răng cưa (xen kẽ các bộ), hay đi lần lượt từng bộ (Khởi động → Kỳ quan → Việt Nam)?
3. Bảng giá ở mục 3: ok chưa?

## 7b. Thêm sau này (chưa làm đợt này)

- Quà đăng nhập 7 ngày.
- Đơn lắp lại có điều kiện (không gợi ý / không sai) để kiếm xu sau khi đã đi hết đường.
- Kệ trưng bày sinh xu theo giờ.

## 8. Phạm vi khi làm (sau khi duyệt)

Sửa trong `mobile.html`:
- số trong khối DỮ LIỆU;
- thứ tự đường lắp;
- nút LẮP LEVEL N;
- thẻ mục tiêu (ghim ⭐);
- bảng "thiếu xu";
- thanh mục tiêu + nút ×2 ở màn kết quả;
- hồi mạng;
- hộp chỉ ra mô hình chưa có;
- bỏ +15 lắp lại;
- giới hạn QC.

Cập nhật `tests/check-econ.js` theo số mới và mô phỏng "đi hết đường không kẹt".
