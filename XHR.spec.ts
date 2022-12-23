import { XHR } from "./XHR";
interface Result { code: number, data: any, message: string }

const xhr = new XHR<Result>({
  baseURL: "http://localhost:6060",
});
xhr.axios.interceptors.response.use(function(response) {
  const { data } = response;
  return data;
}, function(error) {
  return error;
});
xhr.post("/api/image/list").withBody({
  pageIndex: 1,
  pageSize: 10,
}).response((res) => {
  console.log(res.data.code);
}, (error) => {
  console.log(error.message);
});

