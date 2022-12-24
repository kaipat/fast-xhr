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
    setHeaders(headers) {
        this.requestOptions.headers =
            Object.assign({}, this.requestOptions.headers, headers);
        return this;
    }
    setContentType(contentType) {
        this.requestOptions.headers =
            Object.assign({}, this.requestOptions.headers, {
                "Content-Type": contentType,
            });
        return this;
    }
    setInterval(duration) {
        this.requestOptions.duration = duration;
        return this;
    }
    response(resolve, reject, requestOptions) {
        const options = requestOptions || this.requestOptions;
        if (options.duration && options.duration > 0) {
            const resolveFun = resolve || function () {
                return true;
            };
            const rejectFun = reject || function () {
                return true;
            };
            this.axios.request(options).then((response) => {
                if (resolveFun(response)) {
                    setTimeout(() => this.response(resolveFun, rejectFun, options), options.duration);
                }
            }).catch((error) => {
                if (rejectFun(error)) {
                    setTimeout(() => this.response(resolveFun, rejectFun, options), options.duration);
                }
            });
        }
        else if (typeof resolve === "function" && typeof reject === "function") {
            this.axios.request(options).then(resolve).catch(reject);
        }
        else if (typeof resolve === "function") {
            this.axios.request(options).then(resolve);
        }
        else {
            return this.request(options);
        }
    }
    request(options) {
        this.requestOptions = options;
        return this.axios.request(this.requestOptions);
    }
    get(url) {
        this.requestOptions = { method: "GET", url };
        return this;
    }
    post(url) {
        this.requestOptions = { method: "POST", url };
        return this;
    }
    patch(url) {
        this.requestOptions = { method: "PATCH", url };
        return this;
    }
    put(url) {
        this.requestOptions = { method: "PUT", url };
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
