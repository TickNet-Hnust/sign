<!--
 * @Descipttion: 
 * @Author: 刘晴
 * @Date: 2022-04-20 21:46:45
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-14 16:15:01
-->

<script setup lang="ts">
import { detailSignRecord } from '~/api/record/signRecord'
import stuList from '~/components/recordList/stuList.vue'
const route = useRoute()
const signId = route.query.id
const detailMsg = ref({})
onMounted( () => {
  detailSignRecord(signId).then((res: any) => {
    console.log(res)
    if(res.code === 200) {
      detailMsg.value = res.data
    }
  }).catch((err) => {
    console.log(err)
  })
})
</script>
<template>
  <div class="bg-gray-500/8 p-3 min-h-100ch">
    <div
      class="bg-white border border-t-2 border-hex-D9DADB border-t-hex-41B062 rounded">
      <div
        class="flex justify-between h-3em border-b border-hex-DEDEDE p-2 items-center"
      >
        <span class="bg-hex-D7D7D7 text-hex-222 rounded px-2 py-1">
          <span><van-icon name="setting" /></span>
          <span class="text-sm ml-2">基本配置</span>
        </span>
      </div>
      <div
        class="flex justify-between h-3em border-b border-hex-DEDEDE p-2 items-center"
      >
        <span>
          <span class="text-sm w-5em text-left inline-block">签到码</span>
          <span class="text-sm ml-10">{{detailMsg.signCode}}</span>
        </span>
      </div>
      <div
        class="flex justify-between h-3em border-b border-hex-DEDEDE p-2 items-center"
      >
        <span>
          <span class="text-sm w-5em text-left inline-block">日期</span>
          <span class="text-sm ml-10">{{detailMsg.createTime}}</span>
        </span>
      </div>
      <div
        class="flex justify-between h-3em p-2 items-center"
      >
        <span>
          <span class="text-sm w-5em text-left inline-block">发起人</span>
          <span class="text-sm ml-10">{{detailMsg.createUserName}}</span>
        </span>
      </div>
    </div>
    <div v-if="detailMsg.visible">
      <!-- 签到列表 -->
      <stu-list :activityId="signId" attend="1" action="sign"></stu-list>
    </div>
    <div v-if="!detailMsg.visible">
      <div class="p-2 bg-hex-FEF8F0 mt-5 border border-hex-F0E9E1">签到列表不可见</div>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 签到列表
</route>
