"use strict";
exports.__esModule = true;
exports.XHR = void 0;
var axios_1 = require("axios");
// import qs from "qs";
var XHR = /** @class */ (function () {
    function XHR(config) {
        this.requestOptions = {};
        this.axios = axios_1["default"].create({
            baseURL: config.baseURL,
            timeout: config.timeout,
            withCredentials: config.withCredentials,
            headers: config.headers
        });
    }
    XHR.prototype.withParams = function (params) {
        this.requestOptions.params = params;
        return this;
    };
    XHR.prototype.withBody = function (data) {
        this.requestOptions.data = data;
        return this;
    };
    XHR.prototype.response = function (resolve, reject) {
        if (typeof resolve === "function") {
            this.axios.request(this.requestOptions).then(resolve)["catch"](reject);
        }
        else {
            return this.axios.request(this.requestOptions);
        }
    };
    XHR.prototype.get = function (url) {
        this.requestOptions = { method: "GET", url: url };
        return this;
    };
    XHR.prototype.post = function (url) {
        this.requestOptions = { method: "POST", url: url };
        return this;
    };
    return XHR;
}());
exports.XHR = XHR;
// transformRequest(data, headers) {
//   // if ("contentType" in headers) {
//   //   headers["Content-Type"] = headers.contentType;
//   // } else {
//   //   headers["Content-Type"] = CONTENT_TYPE.JSON;
//   // }
//   // if (headers["Content-Type"] === CONTENT_TYPE.FORM) {
//   //   data = qs.stringify(data);
//   // } else if (headers["Content-Type"] === CONTENT_TYPE.JSON) {
//   //   data = JSON.stringify(data);
//   // }
//   return data;
// }
