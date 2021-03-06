/*
 * @Descipttion:
 * @Author: 刘晴
 * @Date: 2022-05-01 19:32:33
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-06-08 13:01:17
 */
// 封装axios
import axios from 'axios'
// 引入vant组件
import { Toast } from 'vant'
import { getToken, removeToken } from './cookies'
// 创建axios实例
const service = axios.create({
  // 请求路由
  baseURL: 'http://signff.ticknet.hnust.cn/api',
  // 请求超时时间
  timeout: 10000,
})
// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    const token = getToken()
    if (token)
      config.headers.Authorization = token
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code === 401) {
      Toast.fail({
        message: '登录状态错误',
        position: 'top',
        duration: 1000,
      })
      removeToken()
      setTimeout(() => {
        location.href = '/'
      }, 1000)
    }
    // if (res.code !== 200) {
    //     // Message.error(res.heaser.msg || "Error")
    //     return Promise.reject(new Error(res.msg||"Error"))
    //                   .catch((error) => {
    //                     console.log(error)
    //                   })
    // }
    return res
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      removeToken()
      location.reload()
    }
    return Promise.reject(error)
      .catch((error) => {
        console.warn(error)
      })
  },
)

export default service
