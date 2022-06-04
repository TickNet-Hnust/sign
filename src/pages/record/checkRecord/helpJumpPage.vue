<!--
 * @Descipttion: 
 * @Author: 刘晴
 * @Date: 2022-05-07 15:08:29
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-06-04 21:12:15
-->
<script lang="ts" setup>
import { signByQRCode } from '~/api/record/index'
import { Toast } from 'vant'
const router = useRouter()
const route = useRoute()
import config from '~/config/index'
import { useUserStore } from '~/stores/user'
const user = useUserStore()
// 扫码后先登录一次
config.isLoginTest ? user.loginSignByTest() : user.loginSignByCode()
const request = reactive({
  ip: '',
  browser: '',
  os: '',
  signId: route.query.signId,
  code: route.query.code,
})
const helpSign = () => {
  Toast.loading({
    message: '签到中...',
    forbidClick: true,
    loadingType: 'spinner',
    position: 'top'
  });
  setTimeout(() => {
    signByQRCode(request).then((res: any) => {
      if(res.code === 200) {
        console.log('签到成功')
        Toast.success({
          message: '签到成功',
          position: 'top'
        })
        router.replace({
          path: '/join/sign/detail',
          query: { id: request.signId }
        })
      } else {
        Toast.fail({
          message: res.msg,
          position: 'top'
        })
        router.replace({
          path: '/'
        })
      }
    }).catch((err) => {
      console.log(err)
    })
    
  },2000)
}
helpSign()

</script>

<template>

</template>
<route lang="yaml">
meta:
  layout: home
</route>