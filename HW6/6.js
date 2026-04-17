// 6. Callback 篩選器
function myFilter(arr, callback) {
  let result = [];
  for (let item of arr) {
    if (callback(item)) {
      result.push(item);
    }
  }
  return result;
}

// 檢查命令行參數
if (process.argv.length < 3) {
  console.error("請提供陣列元素作為參數，例如: node 6.js 1 5 8 12");
  process.exit(1);
}

let arr = process.argv.slice(2).map(Number);  // 從參數轉成數字陣列
console.log("大於7的數字:", myFilter(arr, x => x > 7));