// 10. 錯誤優先回呼模式 (Error-First Callback Pattern)
function checkAdmin(role, callback) {
  if (role !== "admin") {
    callback("Access Denied");
  } else {
    callback(null, "Welcome");
  }
}

// 測試：有錯誤的情況
checkAdmin("user", (err, msg) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Success:", msg);
  }
});

// 測試：沒錯誤的情況
checkAdmin("admin", (err, msg) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Success:", msg);
  }
});