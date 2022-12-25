import XHR, { Result, Response } from "./XHR";
interface Images {
  total: number,
  list: { id: number, url: string, name: string }[]
}

type ImagesResponse = Response<Result<Images>>

let xhr: XHR<Response>;

beforeAll(() => {
  xhr = new XHR<Response>({
    baseURL: "http://localhost:6060",
  });
  xhr.axios.interceptors.response.use(function(response) {
    // const { data } = response;
    return response;
  }, function(error) {
    throw error;
  });
  // xhr.post("/api/image/list")
  //   .withBody({
  //     pageIndex: 1,
  //     pageSize: 10,
  //   })
  //   .setInterval(1000)
  //   .response<ImagesResponse>((res) => {
  //     console.log(res.data.data.total);
  //     return true;
  //   }, (error) => {
  //     console.log(error.message);
  //     return true;
  //   });
});

test("should return list correctly", () => {
  xhr.post("/api/image/list")
    .withBody({
      pageIndex: 1,
      pageSize: 10,
    })
    .setContentType("application/json")
    .response<ImagesResponse>((res) => {
      expect(res.data.code).toEqual(0);
    });
});

test("should contain correct contentType", () => {
  const contentType = "application/x-www-form-urlencoded";
  xhr.post("/api/image/list")
    .withBody({
      pageIndex: 1,
      pageSize: 10,
    })
    .setContentType(contentType)
    .response<ImagesResponse>((res) => {
      expect(res.request._header).toContain(contentType);
    }, (error) => {
      expect(error.request._header).toContain(contentType);
    });
});

test("should contain correct headers item", () => {
  xhr.post("/api/image/list")
    .withBody({
      pageIndex: 1,
      pageSize: 10,
    })
    .setHeaders({
      app: "fast-xhr",
    })
    .response<ImagesResponse>((res) => {
      expect(res.request._header).toContain("app: fast-xhr");
    }, (error) => {
      expect(error.request._header).toContain("app: fast-xhr");
    });
});





