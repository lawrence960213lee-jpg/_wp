// 8. 樣板字串中的邏輯運算 (Template Literals with Logic)
const user = "Guest";

// 使用樣板字串建立 HTML
const html = `<h1>Welcome, ${user ? user : "Stranger"}</h1>`;

console.log("HTML:", html);