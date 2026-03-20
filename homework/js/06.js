let numbers = [12, 5, 8, 130, 44, 7];
let evens = [];
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
        evens.push(numbers[i]);
    }
}
console.log(evens); // 輸出: [12, 8, 130, 44]