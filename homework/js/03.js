let scores = [85, 92, 78, 90, 67];
let total = 0;
for (let i = 0; i < scores.length; i++) {
    total += scores[i];
}
let average = total / scores.length;
console.log(`總和: ${total}, 平均: ${average}`);