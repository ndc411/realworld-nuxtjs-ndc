/**
 Created by dechuan on 2021/02/26 01
 */

/**
 * 基于axios 封装请求模块
 */
import axios from 'axios'

export const request = new axios.create({
  baseURL: "https://conduit.productionready.io/api"
})

// 插件导出函数必须作为 default 成员
export default ({ store }) => {
  // 添加请求拦截器
  request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    // console.log(error)
    return Promise.reject(error);
  });

}

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log(response)
  return response;
}, function (error) {
  // 对响应错误做点什么
  // console.dir(error)

  return Promise.reject(error);
});
