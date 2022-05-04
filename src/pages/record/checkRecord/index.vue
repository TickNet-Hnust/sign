<template>
  <div class="bg-gray-500/8 p-3 min-h-100ch">
    <div class="bg-white border border-hex-D9DADB rounded">
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
          <span class="text-sm ml-10">{{fQuery.signCode}}</span>
        </span>
        <span
          class="text-xl bg-hex-10AA62 text-white rounded-15px px-1 mr-3"
          @click="jumpPage"
        >
          <van-icon name="qr" />
        </span>
      </div>
      <div
        class="flex justify-between h-3em border-b border-hex-DEDEDE p-2 items-center"
      >
        <span>
          <span class="text-sm w-5em text-left inline-block">日期</span>
          <span class="text-sm ml-10">{{fQuery.createTime}}</span>
        </span>
      </div>
      <div
        class="flex justify-between h-3em border-b border-hex-DEDEDE p-2 items-center"
      >
        <span>
          <span class="text-sm w-5em text-left inline-block">名称</span>
          <span class="text-sm ml-10">{{fQuery.signName}}</span>
        </span>
      </div>
      <div
        class="flex justify-between h-3em p-2 text-sm items-center"
      >
        <span style="display: flex; justify-content: space-around">
          <span class="text-sm w-5em text-left inline-block">用户可见</span>
          <span class="ml-10">
            <van-radio-group v-model="look_checked" direction="horizontal">
              <van-radio name="1">可见</van-radio>
              <van-radio name="2">不可见</van-radio>
            </van-radio-group>
          </span>
        </span>
      </div>
    </div>
    <div class="text-left bg-hex-E1FBE3 border border-hex-8FC798 rounded mt-5 p-4">
      <span>共成功签到了8次</span>
    </div>
    <div class="bg-white border border-hex-D9DADB rounded mt-5 p-3">
      <van-list
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
</template>
<route lang="yaml">
meta:
  layout: default
  title: 签到列表
</route>

<script setup lang="ts">
import { detailSignRecord } from '~/api/record/signRecord'
const look_checked = ref("1");
const loading = ref(false);
const finished = ref(false);
const clist = ref([]);
const router = useRouter()
const route = useRoute()
const fQuery = route.query
const totalRecord = ref(0)
const jumpPage = () => {
  router.push('checkRecord/help')
}
const pageNum = ref(1)
const getStuList = () => {
  detailSignRecord({
    signId: fQuery.id,
    isSidnIned: fQuery.attend,
    pageNum: pageNum.value,
    pageSize: 10
  }).then((res: any) => {
    if(res.code === 200) {
      const rows = res.rows
      if(rows.length < 10) {
        console.log('数据加载完毕')
        finished.value = true
      }
      if(pageNum.value === 1) {
        clist.value = rows
      } else {
        clist.value = clist.value.concat(rows)
      }
    }
  }).catch((err) => {
    console.log(err)
  })
}
const onLoad = () => { 
  // 后面会有异步请求，此处先用setTimeout()代替
  if(!finished.value) {
    setTimeout(() => {
      getStuList()
      loading.value = false
      pageNum.value = pageNum.value + 1
    }, 1000);
  }
};
</script>

<style scoped>

</style>
