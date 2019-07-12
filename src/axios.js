import Axios from 'axios'

let uploadPath = 'others/uploadFiles';
let apiUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1/' : 'http://qbt.qubaotang.cn/api/';
let imgUrl = process.env.NODE_ENV === 'development' ? 'http://qbt.qubaotang.cn/' : 'http://qbt.qubaotang.cn/';

//响应时间
Axios.defaults.timeout = 3000;
//携带Cookie，否则权限框架无法取到授权信息
Axios.defaults.withCredentials = true;

const axios = Axios.create();

//请求拦截器，加入授权token
axios.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use((res) => {
  //若响应状态码不是200，就抛出异常
  if (Vue.prototype.isEmpty(res) || res.status !== 200) {
    return Promise.reject(res);
  } else {
    return res;
  }
}, (error) => {
  return Promise.reject(error);
});

export {
  axios,
  uploadPath,
  apiUrl,
  imgUrl
}
