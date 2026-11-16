# Mua bản thiết kế → mua gạch → lắp → phát lại

- **Game:** `001-game-xep-gach/mobile.html`
- **Ngày:** 2026-11-16
- **Trạng thái:** chờ duyệt

## 1. Ý định và lý do

Người chơi đóng vai **dân chơi lego**. Trước khi lắp, họ phải đi qua các bước sau:

1. Mua **bản thiết kế** (sách hướng dẫn).
2. Nhìn bản thiết kế để biết cần mảnh gì, bao nhiêu.
3. Ra **tiệm gạch** mua đủ số mảnh đó.
4. Đủ mảnh mới được vào chế độ lắp.
5. Lắp xong thì game **phát lại** cả quá trình: các mảnh bay lên rồi ghép vào đúng thứ tự người chơi đã lắp. Mô hình sau đó lên kệ trưng bày.

Mục đích là cho xu có chỗ tiêu, và để người chơi có cảm giác sưu tầm như ngoài đời: chọn mô hình, gom đủ gạch, lắp, rồi ngắm thành quả.

**Hướng đã chốt: A, thư giãn và sưu tầm.** Phần mua sắm không phải câu đố.
- Bản thiết kế có sẵn danh sách mảnh.
- Mua gạch giống tick danh sách đi chợ.

Chốt hướng này cũng trả lời luôn câu "thư giãn hay giải đố" còn để ngỏ trong README.

## 2. Mục tiêu / Không làm / Cấm

**Mục tiêu**
- Đủ vòng chơi: tiệm bản thiết kế → bản thiết kế → tiệm gạch → kho mảnh → lắp → phát lại → kệ trưng bày.
- Khóa theo **bộ**, bỏ khóa từng màn.
  - Bộ mới mở khi lắp xong tất cả mô hình của bộ trước.
  - Trong bộ đã mở, người chơi mua bản thiết kế nào trước cũng được.
- Bộ **Khởi động** tặng sẵn bản thiết kế.
  - Màn 1 (Cây nấm) dắt tay người chơi đi mua gạch lần đầu.
- Phát lại theo đúng thứ tự lắp của người chơi. Xem lại được từ kệ trưng bày.

**Không làm (lúc này)**
- Hướng B: giá dao động, khuyến mãi theo giờ.
- Hướng C: chế độ "đọc bản vẽ", ẩn danh sách mảnh. Để làm sau thành chế độ chuyên gia.
- Tách file, đổi công nghệ, có máy chủ, nạp tiền thật.
- Tháo mô hình để lấy mảnh dùng cho mô hình khác.

**Cấm (làm ra mà dính những cái này là hỏng)**
- **Kẹt tiền:** người chơi không còn đường nào kiếm xu để đi tiếp.
- Mua nhầm bị phạt nặng. Hướng A là thư giãn.
- Phải bấm quá nhiều mới mua đủ một mô hình 90 mảnh. Phải có cách mua cả bộ trong 1–2 chạm.
- Làm hỏng phần lắp hiện tại: tượng đất sét, kéo thả, gợi ý, sao, 16 màn.

## 3. Ràng buộc

- Vẫn là **1 file HTML** (`mobile.html`). Dùng three.js r128 từ CDN. Chạy trên GitHub Pages, mở link là chơi.
- Khung điện thoại 9:16, kích thước theo đơn vị `cqw`. Giữ phong cách nút và màu hiện có.
- Lưu bằng `localStorage`, key `xepgach.v2`. Mở rộng object `S` có sẵn, thêm trường có giá trị mặc định. Không đổi key.
- Dữ liệu màn (`LEVELS`, `SERIES`, `PARTS`, `COLORS`) giữ nguyên định dạng. Danh sách mảnh của một bản thiết kế tính tự động từ `levelTargets(lv)`, gom theo `key|color`, giống cách khay đang làm.
- Công cụ kiểm tra màn `check-levels.js` vẫn phải chạy được. Nó đọc đoạn giữa hai dấu `// ====================== DỮ LIỆU` và `// ====================== HÌNH HỌC`.

## 4. Các cách làm đã cân nhắc

| Cách | Được | Mất |
|---|---|---|
| **1. Sửa thẳng mobile.html, vẫn 1 file** ✅ | Link giữ nguyên, mở là chơi. Theo đúng cấu trúc đang có. Bản cũ còn trong git. | File dài từ khoảng 1360 lên khoảng 2000 dòng. |
| 2. Tách nhiều file JS | Về sau dễ sửa hơn. | Mất cái tiện 1 file mở là chạy. Phải sửa công cụ kiểm tra. Lúc này chưa cần. |
| 3. File mới `mobile-shop.html` | Giữ bản cũ để so sánh. | Sửa màn phải sửa 2 nơi, dễ lệch nhau. |

Người dùng chọn **cách 1**.

## 5. Thiết kế

### 5.1 Trạng thái lưu (mở rộng `S`)

```js
S = {
  coins, best, snd, vib,          // đã có
  bp:    { [tênMàn]: true },      // bản thiết kế đã sở hữu
  inv:   { ['key|color']: n },    // kho mảnh rời
  order: { [tênMàn]: [i0,i1,...] } // thứ tự lắp lần thắng gần nhất (chỉ số trong levelTargets)
}
```

- Mô hình đã lắp (`best[tên] > 0`) **giữ luôn mảnh của nó**. Mảnh trong mô hình không nằm trong `inv`.
- **Chuyển dữ liệu cũ.** Màn nào đã có `best > 0` thì coi như đã sở hữu bản thiết kế và mô hình đã nằm trên kệ.
  - Những màn đó không có `order`. Khi phát lại, dùng thứ tự gốc của level.
- Xu khởi đầu cho người chơi mới đổi từ **100 → 200**.

### 5.2 Giá (tự tính, không nhập tay)

**Giá 1 mảnh** = `min(12, max(1, ceil(w·d·h/3/4)))`, cộng thêm **+2** nếu là mảnh tạo hình. Mảnh tạo hình là các shape không thuộc `box`, `slope`, `round`.

Vài ví dụ:

| Mảnh | Giá |
|---|---|
| plate 1x1 | 1 |
| brick 2x4 | 2 |
| plate 8x8 | 6 |
| base 12x12 | 12 |
| hoa | 3 |
| cây thông | 4 |

- **Giá bản thiết kế** = 60% tổng giá gạch của mô hình, làm tròn 10. Bộ Khởi động giá 0, tặng sẵn.
- **Túi combo** (người dùng chốt) = **nguyên bộ** mọi mảnh của mô hình, **giảm 20%**: giá = tổng giá gạch × 0,8. Mua 1 chạm.
  - Túi chứa cả những mảnh kho đã có. Mảnh dư vào kho.
  - Khi kho đã có sẵn nhiều mảnh, mua lẻ phần thiếu có thể rẻ hơn combo. Tiệm hiện cả hai giá và gắn nhãn "Rẻ hơn" vào lựa chọn rẻ hơn, để người chơi khỏi phải tự tính (hướng A).
- **Bán lại** mảnh trong kho được hoàn **50%** giá.
  - Không hoàn 100%, vì như vậy sẽ lách được: mua combo giảm 20% rồi bán mảnh dư giá đầy đủ để kiếm lời.
  - Chống kẹt tiền không dựa vào bán lại, mà dựa vào nút "Lắp lại" (bên dưới).
- **Thưởng lần lắp đầu** = (giá bản thiết kế + giá gạch) × hệ số sao, **làm tròn lên** bội số 10 (để màn rẻ như Cây nấm vẫn lời).
  - Hệ số: 1★ = 1,2; 2★ = 1,35; 3★ = 1,5.
  - Lắp xong lần đầu là luôn lời.

Con số tính thử trên 16 màn hiện có:

| Màn | Mảnh | Gạch | Bản thiết kế | Tổng | Thưởng 3★ |
|---|---|---|---|---|---|
| Cây nấm / Ngôi nhà / Dưa hấu / Lâu đài | 10 / 17 / 20 / 81 | 11 / 18 / 21 / 110 | tặng | 160 cả bộ | khoảng 240 cả bộ |
| Kim tự tháp Giza | 79 | 162 | 100 | 262 | khoảng 390 |
| Đền Artemis (đắt nhất) | 96 | 233 | 140 | 373 | khoảng 560 |
| Tượng Rhodes (rẻ nhất) | 35 | 69 | 40 | 109 | khoảng 160 |

Diễn biến điển hình:
- Bắt đầu với 200 xu.
- Mua combo cho cả bộ Khởi động hết 128 xu (160 × 0,8). Lắp xong 3★ được thưởng khoảng 240, nên còn khoảng 310 xu.
- Số đó đủ mua trọn Kim tự tháp, hoặc chọn Rhodes cho rẻ.

**Chống kẹt tiền.** Ở kệ trưng bày có nút **"Lắp lại"** cho mô hình đã có.
- Không tốn xu, vì mô hình giữ sẵn mảnh của nó.
- Thắng được thưởng cố định **+15 xu**, và lưu sao cao hơn nếu có.
- Vì luôn có nguồn xu này, người chơi không bao giờ hết đường.
- Gợi ý vẫn giá 30 xu như cũ.

### 5.3 Màn hình và luồng

Dùng lại màn **home** và **bộ sưu tập** đang có. Thêm 4 lớp phủ: Bản thiết kế, Tiệm gạch, Kệ trưng bày, Phát lại.

```
HOME (bộ đang chọn)                 BẢN THIẾT KẾ (mở khi bấm thẻ màn)
┌───────────────────────────┐       ┌───────────────────────────┐
│📚 Kỳ quan cổ đại   🪙 280 │       │ ✕   Kim tự tháp Giza      │
│                           │       │  [ảnh 3D xoay]  79 mảnh   │
│     [ảnh mô hình chọn]    │       │ ◀ Bước 3/12 ▶  (lật trang)│
│     Kim tự tháp Giza      │       │  cần: ▣×4 ◩×8 ◢×4         │
│  ┌──┐┌──┐┌──┐┌──┐┌──┐     │       │───────────────────────────│
│  │🛒││📘││✓ ││★★││🛒│    │       │ Tổng: 23 loại · thiếu 61  │
│  │100││-12││   ││   ││40 │       │ ▣ đen 2x4 ×6   ✓          │
│  └──┘└──┘└──┘└──┘└──┘     │       │ ◢ cát dốc ×20  thiếu 20   │
│ [ 🏛 KỆ ] [ 📦 KHO ]       │       │ ...                       │
│ [   NÚT CHÍNH theo trạng thái ] │ │ [🛒 Đi mua gạch] [▶ LẮP]  │
└───────────────────────────┘       └───────────────────────────┘
```

Mỗi thẻ màn trên home có 4 trạng thái. Nút chính đổi theo trạng thái:

| Trạng thái | Trên thẻ | Nút chính |
|---|---|---|
| Chưa mua | 🛒 + giá | "Mua bản thiết kế · 100🪙" |
| Đã mua, thiếu mảnh | 📘 + số mảnh thiếu | "Xem bản thiết kế" |
| Đủ mảnh | ✓ | "Lắp ngay" |
| Đã lắp | ★ sao | "Xem / Lắp lại" |

**Bản thiết kế**
- Phần trên là sách lật từng bước. Mỗi trang hiện ảnh mô hình tới bước đó và "mảnh cần dùng ở bước này".
- Phần dưới là danh sách tổng: ảnh mảnh, màu, số cần, ✓ hoặc "thiếu n".
- Nút **Đi mua gạch** mở tiệm gạch, lọc sẵn theo bản thiết kế này.
- Nút **Lắp** chỉ sáng khi đủ mảnh. Nếu chưa đủ, bấm vào sẽ báo đang thiếu gì.

**Tiệm gạch**
- Tab **"Theo bản thiết kế"** (mặc định khi mở từ bản thiết kế):
  - Liệt kê mảnh còn thiếu, mỗi dòng có nút −/+ và giá.
  - Có 2 nút lớn: **"Mua phần thiếu – X🪙"** (giá lẻ) và **"Túi combo −20% – Y🪙"** (nguyên bộ). Nút nào rẻ hơn thì có nhãn "Rẻ hơn".
- Tab **"Kệ hàng"**:
  - Duyệt theo nhóm: Cơ bản (brick/plate/tile), Dốc & mái, Tròn & vòm, Trang trí (mảnh tạo hình).
  - Chọn mảnh → chọn màu → chọn số lượng.
  - Chỉ bày những `key|color` có xuất hiện trong ít nhất một màn (hiện có 166 tổ hợp), để không bị loãng.
- Thanh dưới luôn hiện "Còn thiếu cho <mô hình đang xem>: n mảnh".

**Kho mảnh**
- Lưới các mảnh đang có kèm số lượng.
- Bấm vào mảnh thì bán lại được.

**Lắp**
- Giữ nguyên phần lắp hiện tại.
- Lúc thắng: trừ mảnh khỏi `inv` (lắp lại từ kệ thì không trừ), cộng thưởng, đánh dấu đã lắp, lưu `order`.
- Bỏ giữa chừng hoặc chơi lại thì không mất mảnh.

**Phát lại** (chạy ngay sau khi thắng, trước màn kết quả)
- Ẩn toàn bộ mảnh. Các mảnh lần lượt bay từ dưới lên vị trí đúng, theo `order`, mỗi mảnh kêu "tách".
- Khoảng cách giữa hai mảnh lúc đầu khoảng 180 ms, nhanh dần, tổng không quá khoảng 9 giây.
- Camera tự xoay chậm quanh mô hình.
- Có nút **Bỏ qua**, bấm là nhảy tới cuối.
- Chỉ ghi các lần lắp đúng.
- Lưu theo lần thắng gần nhất.
- Ở kệ trưng bày: bấm mô hình → nút **Xem phát lại**.

**Kệ trưng bày**
- Lưới ảnh các mô hình đã lắp, chia theo bộ, có sao.
- Bấm vào thì có 2 nút: Xem phát lại, Lắp lại.

**Hướng dẫn màn 1 (Cây nấm)** là lần đầu người chơi vào game.
1. Mũi tên chỉ thẻ Cây nấm → "Mở bản thiết kế".
2. Chỉ danh sách mảnh → "Đi mua gạch".
3. Chỉ nút "Túi combo".
4. Quay lại bản thiết kế → "Lắp".

Mỗi bước là một bong bóng chữ cạnh nút cần bấm. Xong thì lưu cờ để không hiện lại.

### 5.4 Khóa bộ

- `seriesOpen(s)`: giữ nguyên logic. Bộ trước phải có mọi màn với `best > 0`.
- `levelOpen(i)`: chỉ cần bộ của màn đó đang mở. Bỏ điều kiện "màn trước đã xong".
- Bộ chưa mở vẫn hiện trong bộ sưu tập, có ổ khóa như bây giờ.
- `?all`: mở mọi bộ, tặng mọi bản thiết kế, và cho 99999 xu. Để test.

## 6. Phần người làm tự quyết

- Bố cục chi tiết, kích thước và hiệu ứng của các lớp phủ mới, miễn hợp phong cách hiện có.
- Cách vẽ ảnh mô hình "tới bước n" trong sách. Có thể dùng lại `renderThumb` với các mảnh `step ≤ n`, và cache lại.
- Đường bay và easing của phát lại.
- Âm thanh cho mua, bán, phát lại. Dùng lại `sfx` có sẵn.
- Hàm kiểm tra kinh tế:
  - assert mỗi màn có thưởng 1★ ≥ tổng chi phí;
  - assert xu khởi đầu cộng thưởng bộ Khởi động đủ mua được ít nhất 1 bản thiết kế bộ 2 kèm gạch.

## 7. Quyết định Claude tự đưa ra (người dùng kiểm tra lại)

- Mảnh nằm trong mô hình đã lắp thì giữ luôn trong mô hình, không tháo ra dùng chỗ khác.
- Bán lại hoàn 50% giá, để mua combo rồi bán mảnh dư không thành cách kiếm lời.
- Xu khởi đầu 200.
- Công thức giá mảnh, giá bản thiết kế (60%) và hệ số thưởng như mục 5.2.
- "Lắp lại" từ kệ: miễn phí, thưởng +15 xu. Đây là van chống kẹt tiền.
- Dữ liệu cũ: màn đã xong coi như đã sở hữu và đã lên kệ.
- Phát lại chạy trước màn kết quả. Chỉ ghi lần lắp đúng.
- Tiệm chỉ bày 166 tổ hợp mảnh và màu có trong các màn.
- Combo là nguyên bộ (kể cả mảnh kho đã có). Người dùng chỉ chốt "combo giảm 20%", phần nguyên bộ là Claude chọn. Tiệm tự gắn nhãn lựa chọn rẻ hơn.
