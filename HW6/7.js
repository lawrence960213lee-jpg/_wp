// 7. 箭頭函數處理物件
const users = [{name: "Alice", age: 25}, {name: "Bob", age: 17}];
const adults = users.filter(u => u.age >= 18);
console.log("成年人:", adults);