let cart = [
    { name: "滑鼠", price: 500 },
    { name: "鍵盤", price: 1200 }
];

let sum = 0;
for (let i = 0; i < cart.length; i++) {
    sum += cart[i].price;
}

if (sum > 1000) {
    sum *= 0.9; // 打九折
}
console.log(`應付金額: ${sum}`);