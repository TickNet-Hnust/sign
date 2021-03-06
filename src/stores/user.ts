/*
 * @Descipttion:
 * @Author: 刘晴
 * @Date: 2022-04-20 21:46:45
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-06-08 13:00:56
 */
import { acceptHMRUpdate, defineStore } from 'pinia'
import { loginByCode, loginByTest } from '~/api/system'
import { setToken } from '~/utils/cookies'

export const useUserStore = defineStore('user', () => {
  /**
   * Current name of the user.
   */
  const savedName = ref('')
  const previousNames = ref(new Set<string>())

  const usedNames = computed(() => Array.from(previousNames.value))
  const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value))

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param name - new name to set
   */
  function setNewName(name: string) {
    if (savedName.value)
      previousNames.value.add(savedName.value)

    savedName.value = name
  }

  /**
   * 用户登录及token设置
   */
  const token = ref('')
  const userName = ref('')
  const userId = ref('')
  // const CODE = ref('')
  // const corpid = 'wx6219dbfa9b86489e'
  // let redirect_uri = 'signff.ticknet.hnust.cn'

  // 测试登录方法
  function loginSignByTest() {
    return new Promise((resolve, reject) => {
      loginByTest().then((res: any) => {
        console.warn('生产环境')
        console.warn(res)
        if (res.code === 200) {
          token.value = res.data.access_token
          userName.value = res.data.userName
          userId.value = res.data.userId
          // 将token存储到cookie中
          setToken(token.value)
          console.warn('存储token')
        }
        else {
          // 弹出出错信息
        }
        resolve(res)
      }).catch((error: any) => {
        reject(error)
      })
    })
  }

  function loginSignByCode(code: any) {
    return new Promise((resolve, reject) => {
      console.warn(code)
      // if (String(CODE.value) === 'undefined' || String(CODE.value) === '' || String(CODE.value) === null) {
      //   if(url!=='') redirect_uri = redirect_uri + url
      //   window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${corpid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
      //   console.warn('第一次的CODE:', CODE)
      // }
      console.warn('loginSign')
      loginByCode(String(code)).then((res: any) => {
        console.warn(res)
        console.warn('code', code)
        if (res.code === 200) {
          token.value = res.data.access_token
          userName.value = res.data.userName
          userId.value = res.data.userId
          // 将token存储到cookie中
          setToken(token.value)
          console.warn('存储token')
        }
        else {
          // 弹出出错信息
        }
        resolve(res)
      }).catch((error: any) => {
        reject(error)
      })
    })
  }

  return {
    setNewName,
    otherNames,
    savedName,
    loginSignByCode,
    loginSignByTest,
    token,
    userName,
    userId,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
