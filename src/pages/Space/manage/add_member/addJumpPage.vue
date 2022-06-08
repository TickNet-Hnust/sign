<!--
 * @Descipttion: 
 * @Author: 刘晴
 * @Date: 2022-05-07 15:08:29
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-06-08 17:36:22
-->
<script lang="ts" setup>
import { enterSpaceByCode } from '~/api/record/index'
import { getSignSpace } from '~/api/mySpace/index'
import { getSpaceId, getQRCode } from '~/utils/cookies'
import { Toast } from 'vant'
const router = useRouter()
const spaceId = getSpaceId()
const spaceMsg = ref({
  id: '',
  spaceName: '',
  count: '',
  createTime: '',
})
const request = reactive({
  spaceId: spaceId,
  code: getQRCode()
})
const joinSpace = () => {
  Toast.loading({
    message: '正在加入该空间',
    forbidClick: true,
     duration: 1000
  })
  setTimeout(() => {
    enterSpaceByCode(request).then((res: any) => {
      if(res.code === 200) {
        Toast.success({
          message: '加入成功',
          duration: 1000
        })
        router.replace({
          path: '/space/involve',
          query: {
            id: spaceId
          }
        })
      } else {
        Toast.fail({
          message: res.msg,
          duration: 1000
        })
        router.replace({
          path: '/'
        })
      }
    })
  },1000)
}
onMounted(() => {
  getSignSpace(Number(spaceId)).then((res: any) => {
    if(res.code === 200) {
      spaceMsg.value = res.data
      Toast.clear(true)
    }
  })
  Toast.loading({
    message: '加载中...',
     forbidClick: true,
     duration: 700
  })
})
</script>

<template>
  <div class="bg-gray-500/8 p-3 min-h-100vh">
    <div class="text-left text-hex-aaa text-xs ml-3">空间信息</div>
    <div class="bg-hex-fff rounded px-5 pt-2 text-hex-666 border border-hex-ccc">
      <div class="flex justify-between border-b border-hex-ccc text-14px py-2">
        <span>空间名称</span>
        <span>
          {{ spaceMsg.spaceName }}
        </span>
      </div>
      <div class="flex justify-between text-14px py-2">
        <span>发起人</span>
        <span>
          {{ spaceMsg.createUserName }}
        </span>
      </div>
    </div>
    <div class="p-2 bg-hex-41AA62 mt-10 rounded border border-hex-ccc text-white" @click="joinSpace">加入空间</div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 加入空间
</route>