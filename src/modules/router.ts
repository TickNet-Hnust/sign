/*
 * @Descripttion: 
 * @Author: 刘晴
 * @Date: 2022-06-07 14:48:06
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-06-08 17:45:21
 */

import { type UserModule } from "~/types"
import { getToken, removeToken, setQRCode, setSignId, setSpaceId, setToken } from "~/utils/cookies"
import { loginByCode, loginByTest } from '~/api/system'
import config from '../config/index'
const sign = (code: string, path: string) => {
  return new Promise((resolve, reject) => {
    if(code==='' || code===null || code==='undefined') {
      //未登录
      const corpid = 'wx6219dbfa9b86489e'
      const redirect_uri = 'signff.ticknet.hnust.cn'+ path;
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${corpid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
    } else {
      loginByCode(code).then((res: any) => {
        if(res.code === 200) {
          const newToken = res.data.access_token
          setToken(newToken)
          resolve('登录成功')
        } else {
          resolve('登录失败')
        }
      })
    }
  })
}
const signTest = () => {
  return new Promise((resolve, reject) => {
    loginByTest().then((res: any) => {
      if(res.code === 200) {
        const newToken = res.data.access_token
        // 将token存储到cookie中
        setToken(newToken)
        resolve('登录成功')
      } else {
        resolve('登录失败')
      }
    })
  })
}
export const install: UserModule = ({ router }) => {
  removeToken()
  router.beforeEach((to, from, next) => {
    if(to.path === '/record/checkRecord/helpJumpPage') {
      const signId = String(to.query.signId)
      const qrCode = String(to.query.qrCode)
      if(signId !== 'undefined' || qrCode !== 'undefined') {
        setSignId(signId)
        setQRCode(qrCode)
      }
    } else if(to.path === '/Space/manage/add_member/addJumpPage') {
      const spaceId = String(to.query.spaceId)
      const qrCode = String(to.query.qrCode)
      if(spaceId !== 'undefined' || qrCode !== 'undefined') {
        setSpaceId(spaceId)
        setQRCode(qrCode)
      }
    }
    const token = String(getToken())
    if(token!=='' && token!==null && token!=='undefined') {
      next()
    } else {
      //登录
      if(config.isLoginTest) { //测试环境
        //调用测试登录方法
        signTest().then(() => {
          next()
        })
      } else { // 生产环境
        const code = String(to.query.code)
        sign(code, to.path).then(() => {
          next()
        })
      }
    }
  })
}