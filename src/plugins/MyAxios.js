import axios from 'axios';
// 注册自定义axios插件
const MyAxios = {};
MyAxios.install = function(Vue) {
  const instance = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
  });
  // Add a request interceptor
  instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 获取token
    const token = sessionStorage.getItem('token');
    if (config.url.toLowerCase() !== 'login') {
      config.headers.Authorization = token;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
  Vue.prototype.$http = instance;
};
export default MyAxios;
