let reportJSON = '{"math": 95, "english": 82, "history": 75}';
let report = JSON.parse(reportJSON);
let keys = Object.keys(report);
let avgTotal = 0;

for (let key of keys) {
    avgTotal += report[key];
}

let avg = avgTotal / keys.length;
let grade = "F";

if (avg >= 90) grade = "A";
else if (avg >= 80) grade = "B";
else if (avg >= 70) grade = "C";

console.log(`平均分數: ${avg.toFixed(2)}, 等級: ${grade}`);