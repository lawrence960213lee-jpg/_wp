// 5. 實作「錯誤優先」的回呼函數 (Error-First Callback)
function fetchData(id, callback) {
    // 建立資料
    const fakeData = {
        id: id,
        status: "success"
    };
    // 回傳結果：第一個參數 null（無錯誤），第二個參數 fakeData
    callback(null, fakeData);
}

// 執行 fetchData 並處理回傳的結果
fetchData(101, (err, data) => {
    if (err) {
        console.log("發生錯誤：" + err);
    } else {
        console.log("成功取得資料：", data);
    }
});