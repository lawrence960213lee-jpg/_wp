function logicGate(a, b, gateType) {
    if (gateType === "AND") return a && b;
    if (gateType === "OR") return a || b;
    if (gateType === "XOR") return a !== b; // 不同為 true，相同為 false
    return "未知邏輯閘";
}
console.log(logicGate(1, 0, "XOR")); // 輸出: true
