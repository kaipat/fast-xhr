## fast-xhr

### Install
```shell
npm install fast-xhr
```

### How to use
```typescript
import { XHR, Result, Response } from "fast-xhr";

interface Images {
  total: number,
    list: { id: number, url: string, name: string }[]
}

type ImagesResponse = Response<Result<Images>>

const xhr = new XHR<Response>({
  baseURL: "http://localhost:6060",
});

xhr.axios.interceptors.response.use(function(response) {
  // const { data } = response;
  return response;
}, function(error) {
  throw error;
});

xhr.post("/api/image/list")
  .withBody({
    pageIndex: 1,
    pageSize: 10,
  })
  .setHeaders({
    "custom-headers": "fast-xhr",
  })
  .setContentType("application/json")
  .response<ImagesResponse>((res) => {
    console.log(res.data.data.list);
  }, (error) => {
    console.log(error.message);
  });

```




