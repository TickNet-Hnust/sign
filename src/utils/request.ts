// 封装axios
import axios from 'axios'
// import { Message } from 'element-ui';
import { getToken, removeAvatar, removeName, removeRoles, removeToken } from './cookies'
// 创建axios实例
const service = axios.create({
  // 请求路由
  baseURL: 'http://112.74.96.217:8282',
  // 请求超时时间
  timeout: 5000,
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
        const res = response.data;
        // if (res.code !== 200) {
        //     // Message.error(res.heaser.msg || "Error") 
        //     return Promise.reject(new Error(res.msg||"Error"))
        //                   .catch((error) => {
        //                     console.log(error)
        //                   })
        // }
        return res;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            removeToken()
            removeRoles()
            removeName()
            removeAvatar()
            location.reload()
          }
        return Promise.reject(error)
        .catch((error) => {
          console.log(error)
        })
    }
)

export default service
