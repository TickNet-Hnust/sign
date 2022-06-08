/*
 * @Descripttion: 
 * @Author: 刘晴
 * @Date: 2022-06-07 14:48:06
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-06-07 22:11:41
 */

import { type UserModule } from "~/types"
import { getToken, setToken } from "~/utils/cookies"
import { loginByCode, loginByTest } from '~/api/system'
import config from '../config/index'
export const install: UserModule = ({ router }) => {
  router.beforeEach((to, from, next) => {
    const token = String(getToken())
    if(token!=='' && token!==null && token!=='undefined') {
      next()
    } else {
      //登录
      if(config.isLoginTest) { //测试环境
        //调用测试登录方法
        loginByTest().then((res: any) => {
          if(res.code === 200) {
            const newToken = res.data.access_token
            // 将token存储到cookie中
            setToken(newToken)
            next()
          }
        })
      } else { // 生产环境
        if(to.path === '/record/checkRecord/helpJumpPage') {
          //如果是扫码签到，带一个字段跳转到首页
          router.push({
            path: '/',
            query: {type: 'sign'}
          })
        } else if(to.path === '/space/manage/add_member/addJumpPage') {
          // 如果是扫码加入空间
          router.push({
            path: '/',
            query: {type: 'join'}
          })
        }
        if(to.path !=='/' ) router.push('/') // 先跳转到首页
        else {
          const code = String(to.query.code) //获取code
          if(code==='' || code===null || code==='undefined') {
            //如果获取不到code则跳转到企业微信提供的网址先登录
            const corpid = 'wx6219dbfa9b86489e'
            const redirect_uri = 'signff.ticknet.hnust.cn'
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${corpid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
          }
          else {
            loginByCode(code).then((res: any) => {
              if(res.code === 200) {
                const newToken = res.data.access_token
                setToken(newToken)
                if(to.query.type === 'sign') {
                  router.push('/record/checkRecord/helpJumpPage')
                } else if(to.query.type === 'join') {
                  router.push('/space/manage/add_member/addJumpPage')
                } else {
                  next()
                }
              }
            })
          }
        }
      }
    }
  })
}