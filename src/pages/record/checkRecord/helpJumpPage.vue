<!--
 * @Descipttion: 
 * @Author: 刘晴
 * @Date: 2022-05-07 15:08:29
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-10 19:16:30
-->
<script lang="ts" setup>
import { sign } from '~/api/record/index'
import { Toast } from 'vant'
const router = useRouter()
const route = useRoute()
const request = reactive({
  longitude: null,
  latitude: null,
  signCode: '',
  ip: '',
  browser: '',
  os: '',
  signId: route.query.signId,
  code: route.query.code,
  userId: '',
  userName: ''
})
const helpSign = () => {
  Toast.loading({
    message: '签到中...',
    forbidClick: true,
    loadingType: 'spinner',
    position: 'top'
  });
  sign(request).then((res: any) => {
    if(res.code === 200) {
      console.log('签到成功')
    }
  }).catch((err) => {
    console.log(err)
  })
  setTimeout(() => {
    Toast.success({
      message: '签到成功',
      position: 'top'
    })
    router.push({
      path: '/record/checkRecord',
      query: { id: request.signId }
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