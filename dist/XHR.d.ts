import { CreateAxiosDefaults, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
export type Response = AxiosResponse;
export type Result<T = any> = {
    code: number;
    data: T;
    message: string;
};
export declare class XHR<R> {
    axios: AxiosInstance;
    requestOptions: AxiosRequestConfig;
    constructor(config: CreateAxiosDefaults);
    withParams(params: any): this;
    withBody(data: any): this;
    response<T = R>(resolve?: (response: T) => any, reject?: (error: any) => any): Promise<T> | undefined;
    get(url: string): this;
    post(url: string): this;
}
