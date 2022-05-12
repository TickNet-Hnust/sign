<!--
 * @Descipttion: 
 * @Author: 刘晴
 * @Date: 2022-04-20 21:46:45
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-12 16:58:05
-->
<script lang="ts" setup>
import { getRecord } from '~/api/record/index'
interface RecordList {
  userId: String //学号/工号
  userName: String //用户名
  number: String //用户当前获取积分
  total: String //总积分
}
// 获取空间id
const route = useRoute()
const spaceId = route.query.id
const recordList: Array<RecordList> = reactive([])
// 初始化数据
onMounted(() => {
  getRecord({
    spaceId: spaceId
  }).then((res: any) => {
    if(res.code === 200) {
      recordList.push(...res.data)
    }
  }).catch((err) => {
    console.log(err)
  })
})
</script>

<template>
  <div class="bg-gray-500/8 p-3 min-h-100%">
    <div class="bg-white mx-3 text-left p-4 pb-5 text-15px rounded">
      <li class="flex items-center">
        <div class="w-5.5em">
          • 活动名称
        </div>
        <div class="text-13px">
          班级会议
        </div>
      </li>
      <li class="mt-3 flex items-center">
        <div class="w-5.5em">
          • 积分规则
        </div>
        <div class="text-13px text-hex-41AA62">
          每参与签到一次，加一积分
        </div>
      </li>
      <li class="mt-3 flex items-center">
        <div class="w-5.5em">
          • 说明
        </div>
        <div class="text-13px text-hex-41AA62">
          积分统计方式：成员积分/总积分
        </div>
      </li>
    </div>
    <ul class="bg-white mx-3 mt-4 border border-t-2 border-hex-ccc border-t-hex-28B648 px-2">
      <li class="flex py-2">
        <span class="flex-1">学号/工号<van-icon name="sort" /></span>
        <span class="flex-1">姓名</span>
        <span class="flex-1">积分</span>
      </li>
      <li
        v-for="item in recordList"
        :key="item"
        class="flex py-2 border-t border-hex-ccc"
      >
        <span class="flex-1">{{ item.userId }}</span>
        <span class="flex-1">{{ item.userName }}</span>
        <span class="flex-1">{{ item.number }} / {{ item.total }}</span>
      </li>
    </ul>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 积分详情
</route>
