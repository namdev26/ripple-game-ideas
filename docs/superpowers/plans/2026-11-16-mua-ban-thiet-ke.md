# Mua bản thiết kế → mua gạch → lắp → phát lại — Kế hoạch triển khai

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thêm vòng kinh tế vào `001-game-xep-gach/mobile.html`. Người chơi mua bản thiết kế, mua gạch vào kho, đủ mảnh mới được lắp. Lắp xong có phát lại theo thứ tự người chơi, và mô hình lên kệ trưng bày.

**Architecture:**
- Giữ nguyên dạng 1 file.
- Các hàm kinh tế là hàm thuần (giá, danh sách mảnh, thiếu bao nhiêu, thưởng). Chúng nằm trong khối DỮ LIỆU, ngay sau `SERIES`, nên node đọc file là kiểm tra được.
- Giao diện mới là các lớp phủ `.ov`, theo cùng kiểu `#series` và `#setModal` hiện có.
- Logic lắp hiện tại chỉ bị can thiệp ở `loadLevel`, `commit` và `win`.

**Tech Stack:** HTML/CSS/JS thuần, three.js r128 + OrbitControls (CDN), localStorage. Kiểm tra bằng node và Chrome headless.

**Spec:** `docs/superpowers/specs/2026-11-16-mua-ban-thiet-ke-design.md`

## Global Constraints

- Vẫn 1 file `001-game-xep-gach/mobile.html`. Không thêm thư viện.
- localStorage key giữ `xepgach.v2`. Thêm trường mới vào `S` qua giá trị mặc định của `store.get`.
- Giá mảnh = `min(12, max(1, ceil(w*d*h/3/4)))`, cộng thêm +2 nếu `shape` không thuộc `box | slope | round`.
- Giá bản thiết kế = `round10(0.6 × tổng giá gạch)`. Bộ 0 (Khởi động) giá 0.
- Combo = `ceil(0.8 × tổng giá gạch)`, mua nguyên bộ mảnh.
- Bán lại = `floor(0.5 × giá mảnh)`, tối thiểu 0.
- Thưởng lần đầu = `ceil10((bản thiết kế + gạch) × {1:1.2, 2:1.35, 3:1.5}[sao])`.
- Lắp lại từ kệ: +15 xu.
- Xu khởi đầu: 200. Gợi ý vẫn 30 xu.
- Khóa: `levelOpen(i) = seriesOpen(seriesOf(i))`.
- `?all`: mở mọi bộ, sở hữu mọi bản thiết kế, `S.coins = 99999`. Chỉ áp trong phiên đó, không ghi đè dữ liệu đã lưu.
- Phát lại: khoảng cách giữa 2 mảnh bắt đầu 180 ms, giảm dần, tổng tối đa 9000 ms, có nút Bỏ qua.
- Chữ trong game bằng tiếng Việt.

## Review Focus

1. **Thoát hoặc chơi lại giữa chừng thì không mất mảnh.** Mảnh chỉ bị trừ trong `win()`. Kiểm ở Task 4.
2. **Lắp lại từ kệ khi kho trống.** Vẫn vào được, không trừ kho, thưởng +15. Kiểm ở Task 4.
3. **Mua khi không đủ xu.** Không mua một phần. Xu và kho giữ nguyên, hiện toast. Kiểm ở Task 1 (hàm `buy`) và Task 3.
4. **Dữ liệu cũ.** `best` theo số hoặc theo tên được chuyển sang: sở hữu bản thiết kế và mô hình lên kệ. Xu cũ giữ nguyên, không bị đặt lại 200. Kiểm ở Task 2.
5. **`order` hỏng hoặc thiếu.** Màn đã sửa nên `order` lệch số mảnh, hoặc màn chuyển từ dữ liệu cũ không có `order`. Khi đó phát lại dùng thứ tự gốc. Kiểm ở Task 5.

---

### Task 1: Hàm kinh tế thuần + tự kiểm

**Files:**
- Modify: `001-game-xep-gach/mobile.html`. Chèn ngay sau dòng `const seriesOf=...`, vẫn trước `// ====================== HÌNH HỌC`.
- Test: `<scratchpad>/check-econ.js`. Script node dùng cùng cách tách khối DỮ LIỆU như `check-levels.js`.

**Interfaces:**
- Produces:
  - `partPrice(key) -> number`
  - `bomOf(i) -> [{key, color, n}]`: gom `levelTargets(LEVELS[i])` theo `key|color`, giữ thứ tự xuất hiện đầu tiên.
  - `brickCost(i) -> number`
  - `bpPrice(i) -> number`
  - `comboPrice(i) -> number`
  - `missingOf(i, inv) -> [{key, color, n}]`: chỉ những mảnh có n > 0.
  - `missingCost(i, inv) -> number`
  - `rewardFor(i, stars) -> number`
  - `REBUILD_REWARD = 15`
  - `buy(st, items, cost) -> boolean`: hàm thuần trên object trạng thái `{coins, inv}`. Đủ xu thì trừ xu, cộng `inv['key|color'] += n` và trả true. Thiếu xu thì không đổi gì và trả false.
  - `sell(st, key, color) -> boolean`: kho phải có ≥ 1, cộng `floor(partPrice*0.5)`.

- [ ] **Step 1: Viết `check-econ.js`**
  Script lấy ra `{partPrice, bomOf, brickCost, bpPrice, comboPrice, missingOf, missingCost, rewardFor, buy, sell, LEVELS}` rồi assert:
  - `partPrice('plate_1x1')===1`, `partPrice('brick_2x4')===2`, `partPrice('base_12x12')===12`, `partPrice('flower_1x1')===3`, `partPrice('pine_2x2')===4`
  - brickCost: Kim tự tháp `===162`, Đền Artemis `===233`, Tượng Rhodes `===69`. Bốn màn đầu cộng lại `===160`.
  - bpPrice: Kim tự tháp `===100`, Cây nấm `===0`.
  - `comboPrice(idx Kim tự tháp)===Math.ceil(162*0.8)`
  - Với mọi i: `rewardFor(i,1) >= bpPrice(i)+brickCost(i)`. Thêm `rewardFor(0,1)===20`.
  - `missingOf(0,{})` có tổng n bằng `levelTargets(LEVELS[0]).length`. Nếu inv chứa đủ bom thì `missingOf` trả `[]`.
  - `buy({coins:5,inv:{}},[{key:'brick_2x4',color:'red',n:1}],10)` trả false, coins vẫn 5, inv vẫn `{}`.
  - Mua đủ xu thì inv tăng đúng. `sell` khi kho = 0 trả false.

- [ ] **Step 2: Chạy, xác nhận FAIL.**
  Lệnh: `node check-econ.js 001-game-xep-gach/mobile.html`. Mong đợi lỗi `partPrice is not defined`.

- [ ] **Step 3: Cài các hàm trên** theo đúng công thức ở Global Constraints. Thêm `console.assert` ngay trong file: mỗi màn đều có `rewardFor(i,1) >= tổng chi phí`.

- [ ] **Step 4: Chạy `check-econ.js` và `check-levels.js`.** Cả hai phải in OK.

- [ ] **Step 5: Commit** `mobile: hàm kinh tế (giá mảnh, bản thiết kế, combo, thưởng)`.

### Task 2: Trạng thái lưu, chuyển dữ liệu cũ, khóa theo bộ

**Files:**
- Modify: `mobile.html`, khối `store` và đoạn ngay sau `let S=store.get()`.

**Interfaces:**
- Produces:
  - Các trường mới của `S`: `bp:{}`, `inv:{}`, `order:{}`, `tut:0`.
  - `owned(i) -> bool`: true nếu `bpPrice(i)===0`, hoặc `S.bp[name]`, hoặc `best(i)>0`, hoặc `UNLOCK_ALL`.
  - `built(i) -> bool`: `best(i)>0`.
  - `levelOpen(i)`: viết lại thành `seriesOpen(seriesOf(i))`.
  - `cardState(i) -> 'buy'|'need'|'ready'|'built'`

- [ ] **Step 1: Test bằng Chrome headless.**
  Dùng script `<scratchpad>/state-test.html`: copy `mobile.html` rồi chèn một `<script>` chạy trước. Script này đặt sẵn localStorage, rồi ở cuối gán `document.title` = `OK` hoặc `ERR:<lý do>`. Cần chạy 3 tình huống:
  - (a) localStorage trống: `S.coins===200`, `cardState(0)==='need'`, `cardState(4)==='buy'`, `levelOpen(4)===false`.
  - (b) Dữ liệu cũ `{coins:77,best:{0:3,1:2,2:1,3:3}}`: `S.coins===77`, `built(0)`, `owned(3)`, `levelOpen(8)===true` (đã bỏ khóa từng màn), `cardState(4)==='buy'`.
  - (c) Có `?all`: `owned(15)` và `S.coins===99999`, nhưng localStorage vẫn lưu xu cũ.
- [ ] **Step 2: Chạy, xác nhận FAIL.**
- [ ] **Step 3: Cài đặt.**
  - Mặc định của `store.get` có `coins:200`.
  - Ở chế độ `?all`, hàm `save` lưu xu thật đã giữ lại trong biến `realCoins`, không lưu 99999.
- [ ] **Step 4: Chạy 3 tình huống, đều phải ra OK.** Sau đó chạy `check-levels.js` và `check-econ.js`.
- [ ] **Step 5: Commit.**

### Task 3: Home theo trạng thái + Bản thiết kế + Tiệm gạch + Kho

**Files:**
- Modify: `mobile.html`. Cần sửa HTML (thêm `#bpView`, `#shop`, `#invView`, và 2 nút `#shelfBtn` 🏛, `#invBtn` 📦 trên home), CSS, `renderHome`, và hành vi nút chính `#playBtn`.

**Interfaces:**
- Consumes: Task 1 và Task 2.
- Produces:
  - `openBlueprint(i)`
  - `openShop(i, tab='bp'|'shelf')`
  - `openInv()`
  - `startBuild(i, rebuild=false)`: thay cho các chỗ đang gọi thẳng `loadLevel` từ home.

Nội dung từng màn hình:
- **Thẻ màn:** biểu tượng và chữ theo `cardState`, đúng như bảng ở spec 5.3.
- **Nút chính trên home:** đổi theo trạng thái.
  - 'buy' → mua bản thiết kế bằng `buy(S,[],bpPrice)`, rồi đặt `S.bp[name]=true`.
  - 'need' → `openBlueprint`.
  - 'ready' → `startBuild`.
  - 'built' → `openShelf` (Task 5).
- **Bản thiết kế:**
  - Ảnh mô hình tới bước n (thumb của các target có `step<=n`, cache theo `i:n`), nút ◀ ▶ để lật bước.
  - Mảnh cần dùng của bước đang xem.
  - Danh sách tổng: mỗi dòng có ✓ hoặc "thiếu n".
  - 2 nút: Đi mua gạch, Lắp (mờ đi khi `missingOf(...).length > 0`; bấm vào thì toast "Còn thiếu n mảnh").
- **Tiệm gạch:**
  - Tab "Theo bản thiết kế": các dòng mảnh còn thiếu có −/+ (mặc định đúng số thiếu), nút "Mua phần thiếu – X🪙", nút "Túi combo −20% – Y🪙". Nút rẻ hơn có nhãn "Rẻ hơn".
  - Tab "Kệ hàng": 4 nhóm theo `shape` (box/tile → Cơ bản, slope → Dốc & mái, round/rcone/dome/arch/cone → Tròn & vòm, còn lại → Trang trí). Chỉ bày những `key|color` có xuất hiện trong `bomOf` của ít nhất một màn.
  - Thanh dưới cùng ghi "Còn thiếu cho <tên>: n mảnh".
- **Kho:** lưới mảnh, chạm vào → bán, có xác nhận giá bán.
- Mua không đủ xu: toast "Không đủ xu", không đổi gì.

- [ ] **Step 1: Test headless (dump-dom, tiêm script).**
  - Mới vào game, chọn Kim tự tháp: nút chính có chữ "Mua bản thiết kế · 100".
  - Bấm mua khi có 200 xu: còn 100, thẻ chuyển sang 'need'.
  - `openShop(4)`: nút combo hiện `comboPrice(4)`. Bấm mua khi chỉ có 100 xu: xu và kho giữ nguyên, có toast.
  - Đặt `S.coins=1000` rồi mua combo: `missingOf(4,S.inv)` rỗng, `cardState(4)==='ready'`.
- [ ] **Step 2: Chạy, xác nhận FAIL.**
- [ ] **Step 3: Cài đặt.**
- [ ] **Step 4: Chạy test, phải ra OK.** Chụp ảnh 432×768 các màn: home, bản thiết kế, tiệm (2 tab), kho. Xem bằng mắt: bố cục không tràn, chữ đọc được.
- [ ] **Step 5: Commit.**

### Task 4: Nối vào phần lắp (trừ kho, thưởng, lắp lại, ghi thứ tự)

**Files:**
- Modify: `mobile.html`, các hàm `loadLevel`, `commit`, `win`, `showResult`, và các nút `rAgain`, `rNext`, `sRestart`.

**Interfaces:**
- Consumes: `startBuild(i, rebuild)` (Task 3), `rewardFor`, `REBUILD_REWARD`.
- Produces:
  - Biến toàn cục `rebuild:boolean` và `placedOrder:number[]`. Lưu chỉ số target theo đúng thứ tự `levelTargets`, nên mỗi target cần có trường `idx`.
  - Khi thắng: `S.order[name]=placedOrder`.
  - Gọi `playReplay(onDone)` (Task 5) trước `showResult`.

Luật:
- Thưởng:
  - Lắp lần đầu (`!built` trước khi thắng): `rewardFor(i, stars)`, đồng thời trừ đúng bom khỏi `S.inv`.
  - Lắp lại (mô hình đã có): `REBUILD_REWARD`, không đụng tới kho.
- `rNext`: sang màn kế tiếp trong bộ, nhưng đi qua `cardState` của màn đó. Nếu chưa 'ready' hoặc 'built' thì mở home tại màn đó, không vào lắp.
- `rAgain` sau khi thắng = lắp lại, thưởng +15. `sRestart` giữa chừng thì không mất gì, vì kho chỉ bị trừ khi thắng.
- Bỏ đoạn tính thưởng cũ `20+stars*10`.

- [ ] **Step 1: Test headless.** Gọi `commit(t)` cho mọi target, theo thứ tự đảo trong từng bước nhưng vẫn đúng ràng buộc phụ thuộc.
  - (a) Màn 0 đủ kho, lắp lần đầu:
    - inv còn 0 cho mọi mảnh của bom;
    - xu tăng `rewardFor(0,3)`;
    - `S.order['Cây nấm']` đúng thứ tự đã commit.
  - (b) Lắp lại màn 0 khi kho trống: vào được, xu +15, inv vẫn `{}`.
  - (c) Gọi `loadLevel` rồi `toMenu` giữa chừng: inv không đổi.
- [ ] **Step 2: Chạy, xác nhận FAIL.**
- [ ] **Step 3: Cài đặt.** Tạm thời để `playReplay` là `cb => cb()`, Task 5 sẽ thay.
- [ ] **Step 4: Chạy lại test, phải ra OK.** Sau đó chạy cả 16 màn (load + commit hết) để chắc không có lỗi console.
- [ ] **Step 5: Commit.**

### Task 5: Phát lại + kệ trưng bày

**Files:**
- Modify: `mobile.html`. Thêm `playReplay(onDone, i=levelIdx)`, `openShelf(i?)`, lớp phủ `#shelf`, và nút `#skipBtn` hiện trong lúc phát lại.

**Interfaces:**
- Produces:
  - `replayOrder(i) -> number[]`: dùng `S.order[name]` nếu đó là một hoán vị hợp lệ của `0..n-1`, còn không thì dùng `[0..n-1]`.
  - `replayDelays(n) -> number[]`: thời điểm bắt đầu của từng mảnh, tính bằng ms. Khoảng cách giữa 2 mảnh đầu tiên là 180 ms, sau đó giảm dần. `delays[n-1] <= 9000 - 300`.
  - `playReplay(onDone, i)`: dựng lại toàn bộ mảnh của màn i, ẩn hết. Mỗi mảnh bay từ dưới lên vị trí của nó theo `replayOrder`, kèm `sfx.snap()`. Camera bật `autoRotate`. Bấm skip thì hiện hết mảnh ngay và gọi `onDone`.
  - Kệ: lưới thumb các màn có `built(i)`, chia theo bộ, có sao. Bấm vào thì có 2 nút "Xem phát lại" (gọi `playReplay` trên màn i ở chế độ xem, xong thì quay về kệ) và "Lắp lại" (gọi `startBuild(i,true)`).

- [ ] **Step 1: Test node** cho `replayOrder` và `replayDelays`. Đặt hai hàm này vào khối DỮ LIỆU để node chạy được.
  - Lấy `replayDelays(96)` (màn lớn nhất):
    - phần tử cuối ≤ 8700;
    - khoảng cách đầu tiên = 180;
    - dãy tăng dần.
  - `replayOrder` gặp `[0,0,1]` hoặc sai độ dài thì trả `[0..n-1]`.
- [ ] **Step 2: Chạy, xác nhận FAIL.**
- [ ] **Step 3: Cài đặt.**
- [ ] **Step 4: Chạy test node.** Sau đó chụp headless phát lại ở 3 thời điểm (0,5 s / 3 s / sau khi skip), xem mảnh có bay đúng chỗ không. Chụp màn kệ.
- [ ] **Step 5: Commit.**

### Task 6: Hướng dẫn màn 1 + README + đẩy lên

**Files:**
- Modify:
  - `mobile.html`: thêm bong bóng `#tip` và hàm `tutStep()`, chạy theo `S.tut` từ 0 đến 4.
  - `001-game-xep-gach/README.md`.

Các bước hướng dẫn: thẻ Cây nấm / nút chính → "Đi mua gạch" → nút combo → "Lắp". Xong thì `S.tut=4`, không hiện lại nữa. Bỏ toast cũ "Kéo mảnh vào đúng hình…" khỏi `loadLevel` cũ. Ta chuyển nó thành bong bóng hướng dẫn ở bước lắp.

- [ ] **Step 1: Test headless.**
  - Người chơi mới: `#tip` hiện, chỉ vào nút chính.
  - Đi qua các bước thì `S.tut` tăng đúng.
  - Khi `S.tut=4`: không có `#tip`.
- [ ] **Step 2: Chạy, xác nhận FAIL.**
- [ ] **Step 3: Cài đặt.** Cập nhật README: vòng chơi mới, kinh tế, `?all`. Đánh dấu "Quyết định hướng" → thư giãn (A).
- [ ] **Step 4: Chạy lại toàn bộ test:** `check-levels`, `check-econ`, các test headless Task 2–5. Chụp vòng chơi từ đầu.
- [ ] **Step 5: Commit + push** lên `namdev26/ripple-game-ideas` (người dùng đã cho phép commit và push sau khi code).
