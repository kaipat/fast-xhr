import { XHR, Result } from "./XHR";

interface images { total: number, list: { id: number, url: string, name: string }[] }

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
}).response<Result<images>>((res) => {
  console.log(res.data.total);
}, (error) => {
  console.log(error.message);
});

