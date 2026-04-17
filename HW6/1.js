// 1. Callback 基礎實作
function mathTool(num1, num2, action) {
  return action(num1, num2);
}

// 檢查命令行參數
if (process.argv.length < 4) {
  console.error("請提供兩個數值作為參數，例如: node 1.js 10 5");
  process.exit(1);
}

const num1 = parseInt(process.argv[2]);
const num2 = parseInt(process.argv[3]);

console.log("相加:", mathTool(num1, num2, (a, b) => a + b));
console.log("相減:", mathTool(num1, num2, (a, b) => a - b));