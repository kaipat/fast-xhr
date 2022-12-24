import axios, { CreateAxiosDefaults, AxiosInstance, AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
// import qs from "qs";

export type Response<T = any> = AxiosResponse<T>;

export type Result<T = any> = { code: number, data: T, message: string };

export type RequestOptions = AxiosRequestConfig & { duration?: number }

export class XHR<R> {
  axios: AxiosInstance;

  requestOptions: RequestOptions = {};

  constructor(config: CreateAxiosDefaults) {
    this.axios = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout,
      withCredentials: config.withCredentials,
      headers: config.headers,
    });
  }

  withParams(params: any) {
    this.requestOptions.params = params;
    return this;
  }

  withBody(data: any) {
    this.requestOptions.data = data;
    return this;
  }

  setHeaders(headers: RawAxiosRequestHeaders) {
    this.requestOptions.headers =
      Object.assign({}, this.requestOptions.headers, headers);
    return this;
  }

  setContentType(contentType: string) {
    this.requestOptions.headers =
      Object.assign({}, this.requestOptions.headers, {
        "Content-Type": contentType,
      });
    return this;
  }

  setInterval(duration: number) {
    this.requestOptions.duration = duration;
    return this;
  }

  response<T = R>(
    resolve?: (response: T) => any,
    reject?: (error: any) => any,
    requestOptions?: RequestOptions,
  ): Promise<T> | undefined {
    const options = requestOptions || this.requestOptions;
    if (options.duration && options.duration > 0) {
      const resolveFun = resolve || function() {
        return true;
      };
      const rejectFun = reject || function() {
        return true;
      };
      this.axios.request<any, T>(options).then((response) => {
        if (resolveFun(response)) {
          setTimeout(() => this.response(resolveFun, rejectFun, options), options.duration);
        }
      }).catch((error) => {
        if (rejectFun(error)) {
          setTimeout(() => this.response(resolveFun, rejectFun, options), options.duration);
        }
      });
    } else if (typeof resolve === "function" && typeof reject === "function") {
      this.axios.request<any, T>(options).then(resolve).catch(reject);
    } else if (typeof resolve === "function") {
      this.axios.request<any, T>(options).then(resolve);
    } else {
      return this.request<T>(options);
    }
  }

  request<T = R>(options: RequestOptions): Promise<T> {
    this.requestOptions = options;
    return this.axios.request<any, T>(this.requestOptions);
  }

  get(url: string) {
    this.requestOptions = { method: "GET", url };
    return this;
  }

  post(url: string) {
    this.requestOptions = { method: "POST", url };
    return this;
  }

  patch(url: string) {
    this.requestOptions = { method: "PATCH", url };
    return this;
  }

  put(url: string) {
    this.requestOptions = { method: "PUT", url };
    return this;
  }
}











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




