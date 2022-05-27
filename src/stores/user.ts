/*
 * @Descipttion:
 * @Author: 刘晴
 * @Date: 2022-04-20 21:46:45
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-16 13:48:03
 */
import { acceptHMRUpdate, defineStore } from 'pinia'
import { login } from '~/api/system'
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
  const CODE = ref('')
  const corpid = 'wx6219dbfa9b86489e'
  const redirect_uri = 'signff.ticknet.hnust.cn'
  function loginSign() {
    return new Promise((resolve, reject) => {
      console.warn(CODE)
      if (String(CODE.value) === 'undefined') {
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${corpid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        console.warn('第一次的CODE:', CODE)
      }
      console.warn('loginSign')
      login(String(CODE.value)).then((res: any) => {
        console.warn(res)
        console.warn('code', CODE.value)
        if (res.code === 200) {
          token.value = res.data.access_token
          userName.value = res.data.userName
          userId.value = res.data.userId
          // 将token存储到cookie中
          setToken(token.value)
        }
        else {
          // 弹出出错信息
        }
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  }
  return {
    setNewName,
    otherNames,
    savedName,
    login,
    loginSign,
    token,
    userName,
    userId,
    CODE,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
