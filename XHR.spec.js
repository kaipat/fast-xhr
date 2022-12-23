"use strict";
exports.__esModule = true;
var XHR_1 = require("./XHR");
var xhr = new XHR_1.XHR({
    baseURL: "http://localhost:6060"
});
xhr.axios.interceptors.response.use(function (response) {
    var data = response.data;
    return data;
}, function (error) {
    return error;
});
xhr.post("/api/image/list").withBody({
    pageIndex: 1,
    pageSize: 10
}).response(function (res) {
    console.log(res.data.code);
}, function (error) {
    console.log(error.message);
});
