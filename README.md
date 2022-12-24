## fast-xhr

### Install
```shell
npm install fast-xhr
```

### How to use
```javascript
import XHR from "fast-xhr";

const xhr = new XHR({
  baseURL: "https://xiejiapeng.cn",
  baseHeaders: { Authorization: "" },
  withCredentials: false,
});

xhr.instance.interceptors.request.use(function(config) {
  // console.log("xhr.instance.interceptors.request", config);
  return config;
}, function(error) {
  return Promise.reject(error);
});

xhr.instance.interceptors.response.use(function(response) {
  // console.log("xhr.instance.interceptors.response", response);
  const { data } = response;
  return Promise.resolve(data);
}, function(error) {
  return Promise.reject(error);
});

function getImages() {
  return xhr.interval({
    config: {
      method: "GET",
      url: "/images/get_one",
    },
    duration: 1000,
    onSuccess(res) {
      console.log(res);
      return true;
    },
  });
}

getImages();

```




