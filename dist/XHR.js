"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XHR = void 0;
const axios_1 = __importDefault(require("axios"));
class XHR {
    constructor(config) {
        this.requestOptions = {};
        this.axios = axios_1.default.create({
            baseURL: config.baseURL,
            timeout: config.timeout,
            withCredentials: config.withCredentials,
            headers: config.headers,
        });
    }
    withParams(params) {
        this.requestOptions.params = params;
        return this;
    }
    withBody(data) {
        this.requestOptions.data = data;
        return this;
    }
    response(resolve, reject) {
        if (typeof resolve === "function") {
            this.axios.request(this.requestOptions).then(resolve).catch(reject);
        }
        else {
            return this.axios.request(this.requestOptions);
        }
    }
    get(url) {
        this.requestOptions = { method: "GET", url };
        return this;
    }
    post(url) {
        this.requestOptions = { method: "POST", url };
        return this;
    }
}
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
