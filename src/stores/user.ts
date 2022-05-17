/*
 * @Descipttion: 
 * @Author: 刘晴
 * @Date: 2022-04-20 21:46:45
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-16 13:48:03
 */
import { acceptHMRUpdate, defineStore } from 'pinia'
import { loginTest } from '~/api/system'
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
  function login() {
    return new Promise((resolve, reject) => {
      loginTest().then((res: any) => {
        if (res.code == 200) {
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
    token,
    userName,
    userId
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
