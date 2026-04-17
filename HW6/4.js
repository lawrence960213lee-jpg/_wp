// 4. 陣列參數的「破壞性修改」
function Data(arr) {
  arr.unshift("Start");
  arr.pop();
}

// 檢查命令行參數
if (process.argv.length < 3) {
  console.error("請提供陣列元素作為參數，例如: node 4.js 1 2 3");
  process.exit(1);
}

let myData = process.argv.slice(2).map(Number);  // 從參數轉成數字陣列
Data(myData);
console.log("修改後的 myData:", myData);