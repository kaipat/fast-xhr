"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const XHR_1 = require("./XHR");
const xhr = new XHR_1.XHR({
    baseURL: "http://localhost:6060",
});
xhr.axios.interceptors.response.use(function (response) {
    const { data } = response;
    return response;
}, function (error) {
    return error;
});
xhr.post("/api/image/list")
    .withBody({
    pageIndex: 1,
    pageSize: 10,
})
    .setContentType("application/x-www-form-urlencoded")
    .setContentType("application/json")
    .setHeaders({
    username: "kaipat",
})
    .response((res) => {
    console.log(res.data.data.total);
}, (error) => {
    console.log(error.message);
});
xhr.request({
    method: "POST",
    url: "/api/image/list",
    data: {
        pageIndex: 1,
        pageSize: 10,
    },
}).then(res => {
    console.log(res.data.data.total);
});
let count = 10;
xhr.post("/api/image/list").withBody({
    pageIndex: "1",
    pageSize: 10,
}).setInterval(3000).response((res) => {
    console.log(`[${count}]-${res.data.data.total}`);
    count -= 1;
    return count > 0;
}, (error) => {
    console.log(`[${count}]-${error.message}`);
    count -= 1;
    return count > 0;
});
