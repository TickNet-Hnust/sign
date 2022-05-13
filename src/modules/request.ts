import { type UserModule } from "~/types";
// 封装axios
import { Toast } from "vant";
import axios from "axios";
// import { Message } from 'element-ui';
import {
  getToken,
  removeAvatar,
  removeName,
  removeRoles,
  removeToken,
} from "../utils/cookies";
// 创建axios实例
const service = axios.create({
  // 请求路由
  baseURL: "http://112.74.96.217:8282",
  // 请求超时时间
  timeout: 5000,
});

export const install: UserModule = ({ router }) => {
  console.log("install axios");
  // 请求拦截器
  service.interceptors.request.use(
    (config: any) => {
      const token = getToken();
      if (token) config.headers.Authorization = token;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // 响应拦截器
  service.interceptors.response.use(
    (response) => {
      const res = response.data;
      console.log(res.code == 501)
      if(res.code == 501|| res.code == 401) {
        Toast('现在可以保持弹窗弹出来的同事跳转路由了');
        router.push('/')
      } else {

      }
      return res;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        removeToken();
        removeRoles();
        removeName();
        removeAvatar();
        location.reload();
      }
      return Promise.reject(error).catch((error) => {
        console.log(error);
      });
    }
  );
};

export {
  service
};
