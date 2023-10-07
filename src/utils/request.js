import axios from "axios";

const http=axios.create({
    //通用请求地址
    baseURL: 'https://47.109.153.240:3000',
    // baseURL:'/api',
    timeout:10000,
})


// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


const visual=axios.create({
  //通用请求地址
  // baseURL: 'http://113.54.233.133:8081',
  baseURL:'/api',
  timeout:10000,
})


// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
visual.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export {visual,http}