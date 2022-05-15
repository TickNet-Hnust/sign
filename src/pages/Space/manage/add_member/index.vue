<!--
 * @Descipttion: 
 * @Author: 刘晴
 * @Date: 2022-04-20 21:46:45
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-15 17:15:49
-->
<script setup lang="ts">
import { spaceQRcode } from '~/api/record/index'
// 空间id
const route = useRoute()
const spaceId = route.query.id
const QRUrl = ref('')
const loadingImg = ref(true)
// 获取空间二维码
onMounted(() => {
  spaceQRcode({
    spaceId: spaceId,
    path: 'http://localhost:3333/sign/space/manage/add_member/addJumpPage'
  }).then((res: any) => {
    if(res.code === 200) {
      QRUrl.value = res.data.url
      loadingImg.value = false
    }
  })
})
</script>
<template>
  <div class="bg-gray-500/8 p-3 h-screen">
    <div class="bg-white p-5 rounded">
      <div class="text-xs p-2 bg-hex-E0FAFB text-hex-003399 border border-hex-A6DEFB">签到发起人可以通过生成二维码来追加成员</div>
      <div
        class="mt-8 p-4 font-semibold rounded bg-gray-250 border border-gray-300"
      >
        <div>
          扫码追加成员（<span style="color: rgb(0, 102, 255)">刷新</span>）
        </div>
        <div>
          <div class="mt-5" v-if="loadingImg">
            <van-loading color="#999" type="spinner" size="30px" class="text-14px font-400">加载中...</van-loading>
          </div>
          <img
            class="mt-4 mx-auto w-240px"
            :src="QRUrl"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 成员追加
</route>