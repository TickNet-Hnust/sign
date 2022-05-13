<!--
 * @Descipttion: 已签到学生列表
 * @Author: 刘晴
 * @Date: 2022-05-13 17:40:33
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-13 18:06:31
-->
<script lang="ts" setup>
import { signStuList } from '~/api/record/signRecord'
interface StuList {
  createUserId: String // 学号/工号
  createUserName: String // 用户名
  createTime: String //签到时间
}
// 签到活动id
const props = defineProps({
  signId: String
})
// 已签到学生列表
const clist:Array<StuList> = reactive([])
// 控制van-list加载
const loading = ref(false);
const finished = ref(false);
const pageNum = ref(1)
// 总记录条数
const totalRecord = ref(0)
// 请求已签到学生列表
const request = reactive({
  // 请求参数
  signId: props.signId,
  pageNum: pageNum.value,
  pageSize: 10
})
const getStuList = () => {
  signStuList(request).then((res: any) => {
    if(res.code === 200) {
      clist.push(...res.rows)
      totalRecord.value = res.total
      pageNum.value++
      loading.value = false
      if(clist.length >= res.total) {
        console.log('数据加载完毕')
        finished.value = true
      }
    }
  }).catch((err) => {
    console.log(err)
  })
}
// 初始化页面时请求一次数据（van-list的一个bug）
onMounted(() => {
  getStuList()
})
const onLoad = () => {
  setTimeout(() => {
    getStuList()
  }, 500);
};
</script>

<template>
  <div class="text-left bg-hex-E1FBE3 border border-hex-8FC798 rounded mt-5 p-4">
    <span>共成功签到了{{totalRecord}}次</span>
  </div>
  <div class="bg-white border border-hex-D9DADB rounded mt-5 p-3 border-t-2 border-t-hex-41B062">
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
</template>
