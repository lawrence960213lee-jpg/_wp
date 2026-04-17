// 5. 函數回傳函數 (Higher-Order Function)
function multiplier(factor) {
  return n => n * factor;
}

// 檢查命令行參數
if (process.argv.length < 4) {
  console.error("請提供兩個數值作為參數，例如: node 5.js 2 10");
  process.exit(1);
}

const factor = parseInt(process.argv[2]);
const n = parseInt(process.argv[3]);

const multiplyFunc = multiplier(factor);
console.log(`multiplier(${factor})(${n}):`, multiplyFunc(n));