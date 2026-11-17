# Thiết kế lại kinh tế và vòng chơi (game xếp gạch)

- Ngày: 17/11/2026 · Trạng thái: **đề xuất, chờ duyệt** (chưa sửa code)
- Áp dụng cho: `001-game-xep-gach/mobile.html`

## 1. Hiện trạng (số thật trong code)

| Thứ | Giá trị hiện tại |
|---|---|
| Hộp bí ẩn | 100 xu, chung cả 16 mô hình, tỉ lệ Thường 9,1% · Hiếm 4,5% · Huyền thoại 1,5% mỗi mô hình |
| Thưởng lắp mô hình mới | 100–420 xu (luôn ≥ giá hộp, kể cả 1★) |
| Ra trùng | đổi ra xu bằng giá cửa hàng: 40–360, **trung bình 150** |
| Lắp lại mô hình cũ | +15 xu, không giới hạn |
| Cửa hàng mô hình | 40–360 xu (bộ Khởi động 40–70, rẻ hơn hộp) |
| Quảng cáo mở hộp | miễn phí, **không giới hạn** |
| Thua (hết 3 mạng) | chơi lại từ đầu, không mất gì |
| Gợi ý | 3 lượt miễn phí mỗi màn, thêm 30 xu/lượt |

## 2. Vấn đề, xếp theo mức nghiêm trọng

1. **Hộp in ra tiền.** Mở hộp tốn 100 nhưng ra trùng được trung bình 150. Càng về sau càng hay trùng nên càng lời. Người chơi không cần chơi, chỉ cần bấm mở hộp liên tục. Xu mất giá trị, nên gói nạp xu và cửa hàng cũng mất ý nghĩa.
2. **Quảng cáo mở hộp không giới hạn.** Thành ra giá hộp bằng 0: xem 3 giây là có hộp, và có thể mở hết 16 mô hình mà không lắp gì.
3. **Không có áp lực, cũng không có mong muốn.** Lắp 1 mô hình mới luôn đủ tiền mở hộp kế, nên xu không bao giờ thiếu và người chơi không có lý do để làm việc gì khác (lắp lại, xem quảng cáo, nạp).
4. **Lắp lại để cày thì lại bị khai thác.** Cây nấm có 10 mảnh, lắp khoảng 30 giây được 15 xu, tức 4 phút là đủ 1 hộp. Không có giới hạn, và cũng chẳng có gì thú vị.
5. **Độ khó nhảy cóc.** Hộp chung cả game nên người mới có thể ra ngay Đền Artemis (96 mảnh, 15 bước) ở hộp thứ 2. Trong khi đó, khóa "bộ" chỉ có tác dụng ở cửa hàng, không ảnh hưởng hộp, nên hai cơ chế mâu thuẫn nhau.
6. **Giá cửa hàng ngược.** Mô hình bộ Khởi động trong cửa hàng (40) rẻ hơn hộp (100). Mua chắc lại rẻ hơn đánh cược.
7. **Thua ở mảnh 90/96 phải làm lại cả màn.** Rất ức chế với màn dài. Đây cũng là chỗ bỏ lỡ một điểm kiếm tiền tự nhiên (hồi mạng).
8. **Không có lý do quay lại mỗi ngày,** và hết 16 mô hình là hết việc để tiêu xu.

## 3. Mục tiêu

- **Không bao giờ kẹt:** ngày nào cũng có ít nhất 1 cách miễn phí để có mô hình mới.
- **Luôn hơi thiếu một chút:** lắp xong 1 mô hình được khoảng 60–90% giá hộp. Phần còn thiếu đến từ quảng cáo ×2, nhiệm vụ ngày hoặc lắp lại có thử thách. Đó là chỗ người chơi chọn cách chơi, và cũng là chỗ có doanh thu.
- **Nhịp:** người không xem quảng cáo đủ 16 mô hình trong khoảng 10–12 ngày, người xem quảng cáo khoảng 6 ngày (hiện tại là 1 buổi).
- **Không có vòng nào in ra tiền:** mọi hành động lặp lại được đều phải có giới hạn theo ngày hoặc lỗ.

## 4. Vòng chơi mới

```
Mở hộp / mua cửa hàng → có mô hình chờ lắp → lắp (3 mạng) → thưởng xu (+ xem QC ×2)
        ↑                                                         │
        │   thiếu xu? → quà đăng nhập · 3 đơn lắp lại/ngày · 2 hộp QC/ngày
        └──────────── đủ 100 xu ←─────────────────────────────────┘
Ra trùng → kho → gom 3 bản trùng = nâng lên vàng kim (hoặc bán rẻ)
Đủ bộ → thưởng lớn + mở bộ sau
```

## 5. Bảng số đề xuất

### 5.1 Nguồn xu

| Nguồn | Số | Giới hạn | Ghi chú |
|---|---|---|---|
| Lắp mô hình mới | Thường 60 · Hiếm 80 · Huyền thoại 120, × sao (1★ ×1 · 2★ ×1,25 · 3★ ×1,5), vàng kim ×1,2 | 1 lần mỗi mô hình | 1★ Thường = 60, 3★ Huyền thoại = 180 |
| Xem QC nhân đôi thưởng | ×2 thưởng màn vừa xong | 1 lần mỗi màn mới | thường đủ 1 hộp, là động lực xem QC chính |
| Quà đăng nhập 7 ngày | 30 · 40 · 50 · 60 · 80 · 100 · ngày 7 tặng 1 hộp | 1 lần/ngày | lặp lại theo vòng |
| Đơn lắp lại | 3 đơn/ngày, 30–50 xu mỗi đơn | 3/ngày | thay cho "lắp lại +15 không giới hạn" (xem 5.5) |
| Đủ bộ | 150 · 200 · 300 | 1 lần mỗi bộ | giữ như cũ |
| Bán bản trùng | Thường 25 · Hiếm 40 · Huyền thoại 80 | theo số trùng | trước là 40–360 |

### 5.2 Chỗ tiêu xu

| Chỗ tiêu | Giá |
|---|---|
| Hộp bí ẩn | 100 (giữ nguyên) |
| Cửa hàng (mua đúng mô hình) | Thường 200 · Hiếm 350 · Huyền thoại 600: mua chắc thì đắt gấp 2–6 lần hộp |
| Gợi ý thêm | 30 (giữ) |
| Tiếp tục khi hết mạng | 50 xu, hoặc xem QC (1 lần mỗi màn) |

### 5.3 Hộp bí ẩn

- **Hộp tân thủ:** 3 hộp đầu chỉ ra bộ Khởi động. Sau đó mới mở ra cả 16 mô hình (vẫn đúng ý "hộp chung cả game", chỉ chặn người mới gặp màn 96 mảnh quá sớm).
- **Bảo hiểm:** trùng 3 hộp liên tiếp thì hộp thứ 4 chắc chắn ra mô hình chưa có. Giao diện hộp hiện "Chắc chắn mô hình mới sau X hộp". Nhờ vậy trung bình chỉ khoảng 36 hộp là đủ 16 mô hình (hiện tại khoảng 127).
- **Quảng cáo mở hộp:** 2 lần/ngày, nút hiện "Còn 2/2 hôm nay".
- Tỉ lệ hiếm và bản vàng kim 12% giữ nguyên.

### 5.4 Bản trùng → kho → vàng kim

- Ra trùng thì cất vào kho như bây giờ.
- **Gom 3 bản trùng của cùng mô hình thì đổi được bản vàng kim** của mô hình đó (nếu chưa có). Bản trùng thành thứ đáng mong chứ không phải tiền.
- Vẫn bán được, nhưng giá thấp (25 / 40 / 80) để không còn vòng in tiền.

### 5.5 Lắp lại: "Đơn lắp lại" thay cho +15 không giới hạn

- Mỗi ngày có 3 đơn. Mỗi đơn chọn ngẫu nhiên 1 mô hình đã lắp, kèm 1 điều kiện:
  - không dùng gợi ý;
  - không sai mảnh nào;
  - xong trong N giây.
- Đạt điều kiện thì được 30–50 xu (mô hình to được nhiều hơn).
- Lắp lại ngoài đơn: không có xu, chỉ để vui và lấy sao cao hơn.
- Kết quả là lắp lại có mục tiêu, có giới hạn, và hết bị cày Cây nấm.

### 5.6 Thua (hết mạng)

Có 3 lựa chọn:
- xem QC để hồi 1 mạng (1 lần mỗi màn);
- trả 50 xu để hồi 1 mạng;
- chơi lại từ đầu.

Sao vẫn tính theo số mạng còn lại, nên hồi mạng chỉ cho tối đa 1★.

## 6. Kết quả mô phỏng (2.000 người chơi ảo, giả định ≤ 4 màn mới mỗi ngày)

| | Hiện tại | Đề xuất, có xem QC | Đề xuất, không xem QC |
|---|---|---|---|
| Số ngày để đủ 16 mô hình | 1 buổi (chỉ cần bấm hộp) | **~6 ngày** (tối đa 7) | **~11 ngày** (tối đa 16) |
| Số hộp cần mở | ~127 | ~36 | ~36 |
| Có ngày nào kẹt không? | không, nhưng vì xu thừa | không: đăng nhập + đơn lắp lại ≥ 160 xu/ngày | không |
| Vòng in tiền? | có (hộp 100 → trùng 150) | không | không |

## 7. Các điểm khác cần chỉnh

- **Khóa bộ:** bỏ khóa theo bộ ở cửa hàng, hoặc cho cửa hàng chỉ bán mô hình đã từng thấy qua hộp. Hiện tại khóa bộ chỉ áp lên cửa hàng, không áp lên hộp, nên rất khó hiểu.
- **Gói nạp xu:** cần căn lại theo giá mới, ví dụ 25.000đ ≈ 3 hộp. Hiện tại 120 xu chỉ bằng 1 hộp và xu thì đang thừa.
- **Bộ Khủng Long (IAP):** đang bán 3 mô hình chưa có trong game. Khi làm thật cần 3 màn lắp, hoặc đổi thành gói "xu + hộp" cho tới khi có mô hình.
- **Sau khi đủ 16:** xu vẫn có chỗ tiêu nhờ nâng vàng kim, nhưng cần nội dung mới, ví dụ mỗi bộ mới ra theo mùa. Đây là việc cho bản Unity.
- **Tùy chọn sau này:** kệ trưng bày sinh xu theo giờ (kiểu bảo tàng có khách, tối đa 8 giờ) để có lý do mở game mỗi ngày. Chưa đưa vào đợt này để giữ đơn giản.

## 8. Cần bạn quyết

1. **Hộp tân thủ 3 hộp đầu chỉ ra bộ Khởi động:** đồng ý không? Hay bạn muốn hộp mở rộng dần theo số mô hình đã lắp?
2. **Bản trùng:** dùng "3 trùng = vàng kim + bán rẻ" như mục 5.4, hay chỉ bán rẻ?
3. **Giới hạn quảng cáo:** 2 hộp/ngày, ×2 thưởng mỗi màn, hồi mạng 1 lần mỗi màn. Bạn muốn chặt hơn hay lỏng hơn?

## 9. Phạm vi khi làm (sau khi duyệt)

Sửa trong `mobile.html`:
- số trong khối DỮ LIỆU;
- hộp: tân thủ, bảo hiểm, giới hạn QC;
- kho: đổi vàng kim;
- màn kết quả: nút QC ×2;
- màn thua: hồi mạng;
- màn chính: quà đăng nhập và 3 đơn lắp lại (gọn, không hiệu ứng).

Cập nhật `tests/check-econ.js` theo số mới, cộng thêm mô phỏng "không kẹt / không in tiền".
