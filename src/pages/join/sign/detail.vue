
<script setup lang="ts">
import { signStuList, detailSignRecord } from '~/api/record/signRecord'
const loading = ref(false);
const finished = ref(false);
const clist = ref([]);
const router = useRouter()
const route = useRoute()
const signId = route.query.id
const detailMsg = ref({})
const pageNum = ref(1)
const request = reactive({
  signId: signId,
  pageNum: pageNum.value,
  pageSize: 10
})
// 成功签到次数
const totalRecord = ref(0)
const getStuList = () => {
  signStuList(request).then((res: any) => {
    if(res.code === 200) {
      const rows = res.rows
      clist.value = clist.value.concat(rows)
      totalRecord.value = res.total
      pageNum.value++;
      loading.value = false
      if(clist.value.length >= res.total) {
        console.log('数据加载完毕')
        finished.value = true
      }
    }
  }).catch((err) => {
    console.log(err)
  })
}
const onLoad = () => {
  setTimeout(() => {
    getStuList()
  }, 500);
};
onMounted( () => {
  detailSignRecord(signId).then((res: any) => {
    console.log(res)
    if(res.code === 200) {
      detailMsg.value = res.data
      if(res.data.visible) {
        getStuList()
      }
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
      <div class="text-left bg-hex-E1FBE3 border border-hex-8FC798 rounded mt-5 p-4">
        <span>共成功签到了{{totalRecord}}次</span>
      </div>
      <div class="bg-white border border-hex-D9DADB rounded mt-5 p-3">
        <van-list
          :immediate-check="false"
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          loading-text="——上拉加载更多——"
          @load="onLoad"
        >
          <ul class="flex py-2 border-b border-hex-E4E4E4 text-sm">
            <span class="flex-1">学号/工号<van-icon name="sort" /></span>
            <span class="flex-1">姓名</span>
            <span class="flex-1">时间</span>
          </ul>
          <ul v-for="item in clist" :key="item" class="flex items-center py-2 border-b border-hex-E4E4E4 text-sm">
            <span class="flex-1">{{ item.createUserId }}</span>
            <span class="flex-1">{{ item.createUserName }}</span>
            <span class="flex-1">{{ item.createTime }}</span>
          </ul>
        </van-list>
      </div>
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
