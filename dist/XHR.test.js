"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const XHR_1 = require("./XHR");
const xhr = new XHR_1.XHR({
    baseURL: "http://localhost:6060",
});
xhr.axios.interceptors.response.use(function (response) {
    const { data } = response;
    return data;
}, function (error) {
    return error;
});
xhr.post("/api/image/list").withBody({
    pageIndex: 1,
    pageSize: 10,
}).response((res) => {
    console.log(res.data.total);
}, (error) => {
    console.log(error.message);
});
