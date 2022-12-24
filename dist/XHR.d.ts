import { CreateAxiosDefaults, AxiosInstance, AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
export type Response<T = any> = AxiosResponse<T>;
export type Result<T = any> = {
    code: number;
    data: T;
    message: string;
};
export type RequestOptions = AxiosRequestConfig & {
    duration?: number;
};
export declare class XHR<R> {
    axios: AxiosInstance;
    requestOptions: RequestOptions;
    constructor(config: CreateAxiosDefaults);
    withParams(params: any): this;
    withBody(data: any): this;
    setHeaders(headers: RawAxiosRequestHeaders): this;
    setContentType(contentType: string): this;
    setInterval(duration: number): this;
    response<T = R>(resolve?: (response: T) => any, reject?: (error: any) => any, requestOptions?: RequestOptions): Promise<T> | undefined;
    request<T = R>(options: RequestOptions): Promise<T>;
    get(url: string): this;
    post(url: string): this;
    patch(url: string): this;
    put(url: string): this;
}
