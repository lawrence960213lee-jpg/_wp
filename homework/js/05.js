let vrDevice = {
    name: "Vision Pro",
    price: 3499,
    stock: 5
};

function checkStock(item) {
    if (item.stock > 0) {
        return `${item.name} 目前有貨`;
    } else {
        return "暫時缺貨";
    }
}
console.log(checkStock(vrDevice));