# 部落格系統 (blgg)

一個使用 Express + SQLite 建立的部落格應用程式。

## 功能

- 使用者註冊/登入
- 發布文章（公開/私人）
- 個人資料頁面
- 搜尋用戶並加為好友
- 刪除文章

## 技術堆疊

- **後端**：Express.js
- **資料庫**：SQLite (better-sqlite3)
- **模板引擎**：EJS
- **認證**：bcrypt + express-session
- **檔案上傳**：multer

## 依賴套件

- bcrypt
- better-sqlite3
- ejs
- express
- express-session
- multer

## 啟動方式

```bash
cd myweb/blgg
npm install
npm start
```

伺服器會在 http://localhost:3000 啟動
