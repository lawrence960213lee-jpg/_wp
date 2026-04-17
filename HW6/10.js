// 10. 綜合應用：計算總價
function calculateTotal(cart, discountFunc) {
  let sum = cart.reduce((a, b) => a + b, 0);
  return discountFunc(sum);
}

// 檢查命令行參數
if (process.argv.length < 3) {
  console.error("請提供陣列元素作為參數，例如: node 10.js 100 200 300");
  process.exit(1);
}

let cart = process.argv.slice(2).map(Number);  // 從參數轉成數字陣列
console.log("總價扣除50:", calculateTotal(cart, s => s - 50));