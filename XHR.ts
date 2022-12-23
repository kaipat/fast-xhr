import axios, { CreateAxiosDefaults, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
// import qs from "qs";

export class XHR<R> {
  axios: AxiosInstance;

  requestOptions: AxiosRequestConfig = {};

  constructor(config: CreateAxiosDefaults) {
    this.axios = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout,
      withCredentials: config.withCredentials,
      headers: config.headers,
    });
  }

  withParams(params: any): XHR<R> {
    this.requestOptions.params = params;
    return this;
  }

  withBody(data: any): XHR<R> {
    this.requestOptions.data = data;
    return this;
  }

  response<T = R>(
    resolve?: (response: AxiosResponse<T>) => any,
    reject?: (error: any) => any,
  ): Promise<AxiosResponse<T>> | undefined {
    if (typeof resolve === "function") {
      this.axios.request(this.requestOptions).then(resolve).catch(reject);
    } else {
      return this.axios.request(this.requestOptions);
    }
  }

  get(url: string): XHR<R> {
    this.requestOptions = { method: "GET", url };
    return this;
  }

  post(url: string): XHR<R> {
    this.requestOptions = { method: "POST", url };
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




