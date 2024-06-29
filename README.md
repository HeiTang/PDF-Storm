# PDF Storm

PDF Storm 是一個強大的 Userscript，用於批量下載當前頁面上的所有 PDF 文件。此腳本會在頁面上添加一個按鈕，點擊後自動下載所有 PDF 並顯示下載成功和失敗的列表。

## 功能
- 自動檢測並下載頁面上的所有 PDF 文件

- 顯示下載成功和失敗的列表

- 支援使用 CORS Unblock 擴充功能繞過 CORS 限制

## 安裝
1. 安裝 [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) 或其他支援 Userscript 的瀏覽器擴充功能。

2. 安裝 [CORS Unblock](https://chromewebstore.google.com/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino) 擴充功能來繞過 CORS 限制。

3. 點擊「[PDF-Storm.user.js](https://github.com/HeiTang/PDF-Storm/raw/main/PDF-Storm.user.js)」並選擇安裝。

4. 若上述無法正常安裝，也可在 Tampermonkey 中創建一個新腳本，並將 PDF Storm 的程式碼貼上。

## 使用方法
1. 打開任何包含 PDF 連結的網頁。

2. 點擊右上角的綠色圓形按鈕顯示/隱藏下載狀態列表。

3. 點擊藍色「Download All PDFs」按鈕下載所有 PDF 文件。

4. 成功和失敗的下載列表將顯示在狀態面板中。

## 注意事項
- 使用 CORS Unblock 擴充功能來繞過 CORS 限制，使用完畢記得關閉。

- 如果需要更穩定的服務，可以考慮設置自己的代理伺服器。

## 授權
此腳本遵循 MIT 授權條款。詳情請參閱 [LICENSE](https://github.com/HeiTang/PDF-Storm/blob/main/LICENSE)。
