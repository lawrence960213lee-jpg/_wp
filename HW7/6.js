// 6. JSON 處理 (Parsing JSON)
const jsonStr = '{"title": "Post 1", "tags": ["js", "node"]}';

// 將 JSON 字串轉換成 JavaScript 物件
const obj = JSON.parse(jsonStr);

// 印出 tags 陣列中的第二個元素
console.log("Second tag:", obj.tags[1]);