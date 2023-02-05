// import 'nprogress/nprogress.css';

// import { message } from 'antd';
// import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
// import axiosRetry from 'axios-retry';
// import NProgress from 'nprogress'; // Progress 进度条

// import { contentType, dataName, messageName, requestTimeout, statusName, successName } from '@/config/network';
// import { AjaxRes } from '@/types/common';

// NProgress.configure({ showSpinner: false });

// //* ************************axios配置  拦截器*****************************//
// axios.defaults.baseURL = process.env.REACT_APP_BASE_API;
// // 前端超时限制
// axios.defaults.timeout = requestTimeout;
// axios.defaults.headers['Content-Type'] = contentType;
// const token = '';
// // http请求拦截器
// axios.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     NProgress.start();
//     if (token) {
//       config.headers = {
//         Authorization: token,
//       };
//     }
//     return config;
//   },
//   (error: AxiosError) => {
//     return Promise.reject(error);
//   }
// );
// // http响应拦截器
// axios.interceptors.response.use(
//   (response: AxiosResponse) => {
//     NProgress.done(); // 结束Progress
//     switch (response.data[statusName]) {
//       case 500:
//         if (response.data[messageName] && !response.data[successName])
//           message.error(response.data[messageName]).then(() => {});
//         break;
//       default:
//         if (response.data[messageName] && response.data[successName] && !response.data[dataName])
//           message.success(response.data[messageName]).then(() => {});
//         if (response.data[messageName] && !response.data[successName])
//           message.error(response.data[messageName]).then(() => {});
//         break;
//     }
//     return response;
//   },
//   (error: AxiosError) => {
//     NProgress.done(); // 结束Progress
//     // 判断请求异常信息中是否含有超时timeout字符串
//     if (error.message.includes('timeout')) {
//       message.error('网络请求已经超时，请检查当前网络是否正常！').then(() => {});
//     }
//     if (error.message.includes('Network Error')) {
//       message.error('当前网络环境错误，请及时联系IT人员！').then(() => {});
//     }
//     // 登录失效
//     // if (error.response && error.response.status === 401) {
//     //
//     // }
//     // 403 无权限
//     // if (error.response && error.response.status === 403) {
//     // }
//     // 404请求不存在
//     if (error.response && error.response.status === 404) {
//       message.warning(error.response.statusText).then(() => {});
//     }
//     // 405 请求方法不允许
//     if (error.response && error.response.status === 405) {
//       message.warning(error.response.statusText).then(() => {});
//     }
//     // 415 Unsupported Media Type code
//     if (error.response && error.response.status === 415) {
//       message.warning(error.response.statusText).then(() => {});
//     }
//     if (error.response && [504, 502, 500, 400].includes(error.response.status))
//       message.error('接口服务器出现系统性错误，请联系管理员！').then(() => {});
//     return Promise.reject(error);
//   }
// );
// //* ************************axios配置  拦截器*****************************//

// axiosRetry(axios, {
//   retries: 3,
//   retryDelay: retryCount => {
//     return retryCount * 1500; // 重复请求延迟(毫秒)
//   },
//   shouldResetTimeout: true, //  重置超时时间
//   retryCondition: (error: AxiosError) => {
//     //true为打开自动发送请求，false为关闭自动发送请求
//     return error.message.includes('timeout') || error.message.includes('Network Error');
//   },
// });

// // const params = new URLSearchParams();
// // params.append('param1', 'value1');
// // params.append('param2', 'value2');

// /**
//  *  封装 axios 自定义请求
//  * @param url
//  * @param Method
//  * @param params
//  * @param data
//  */
// export const ajax = ({
//   url,
//   method = 'GET',
//   params = {},
//   data = {},
//   baseURL = undefined,
//   headers = {},
//   responseType = 'json',
// }: AxiosRequestConfig): Promise<AjaxRes> => {
//   return new Promise((resolve, reject) => {
//     axios({
//       url,
//       method,
//       params,
//       baseURL,
//       headers,
//       data,
//       withCredentials: false, // 跨域请求时发送Cookie
//       responseType, // default json  options are: 'arraybuffer', 'document', 'json', 'text', 'stream'  browser only: 'blob'
//       // eslint-disable-next-line no-unused-vars
//       onUploadProgress: function () {
//         // `onUploadProgress` allows handling of progress events for uploads  browser only
//         // Do whatever you want with the native progress event
//       },
//       // eslint-disable-next-line no-unused-vars
//       onDownloadProgress: function () {
//         // `onDownloadProgress` allows handling of progress events for downloads  browser only
//         // Do whatever you want with the native progress event
//       },
//       validateStatus: function (status) {
//         return status >= 200 && status < 300; // default
//       },
//     })
//       .then((response: AxiosResponse) => {
//         resolve(response.data);
//       })
//       .catch((error: AxiosError) => {
//         // 错误信息reject出去 在catch中接受
//         reject(error.response);
//       });
//   });
// };

// //  Promise.all([getUserAccount(), getUserPermissions()]).then(function (results) {
// //       const acct = results[0];
// //       const perm = results[1];
// //     });

// // const CODE_MESSAGE = {
// // 	200: "服务器成功返回请求数据",
// // 	201: "新建或修改数据成功",
// // 	202: "一个请求已经进入后台排队(异步任务)",
// // 	204: "删除数据成功",
// // 	400: "发出信息有误",
// // 	401: "用户没有权限(令牌、用户名、密码错误)",
// // 	403: "用户得到授权，但是访问是被禁止的",
// // 	404: "访问资源不存在",
// // 	406: "请求格式不可得",
// // 	410: "请求资源被永久删除，且不会被看到",
// // 	500: "服务器发生错误",
// // 	502: "网关错误",
// // 	503: "服务不可用，服务器暂时过载或维护",
// // 	504: "网关超时"
// // };
