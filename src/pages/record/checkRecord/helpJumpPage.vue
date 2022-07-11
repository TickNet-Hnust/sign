<!--
 * @Descipttion: 
 * @Author: 刘晴
 * @Date: 2022-05-07 15:08:29
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-06-08 13:28:37
-->
<script lang="ts" setup>
import { signByQRCode } from '~/api/record/index'
import { getSignId, getQRCode } from '~/utils/cookies'
import { Toast } from 'vant'
const router = useRouter()
const request = reactive({
  ip: '',
  browser: '',
  os: '',
  signId: getSignId(),
  code: getQRCode(),
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
        // console.log('签到成功')
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