function reverseString(str) {
    let reversed = "";
    let i = str.length - 1;
    while (i >= 0) {
        reversed += str[i];
        i--;
    }
    return reversed;
}
console.log(reverseString("Utopia")); // 輸出: aipotU