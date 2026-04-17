// 2. 物件解構賦值 (Object Destructuring)
const req = { body: { title: "JS教學", content: "內容在此", author: "Gemini" } };

// 用一行程式碼從 req.body 中取出 title 和 content
const { title, content } = req.body;

console.log("Title:", title);
console.log("Content:", content);