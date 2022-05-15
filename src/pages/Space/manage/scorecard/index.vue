<!--
 * @Descipttion: 
 * @Author: 刘晴
 * @Date: 2022-04-20 21:46:45
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-15 11:13:30
-->
<script lang="ts" setup>
import { spaceSignRecord, spaceSignList } from '~/api/record/index'
interface RecordList {
  userId: String //学号/工号
  userName: String //用户名
  number: String //用户当前获取积分
  total: String //总积分
}
interface SignList {
  name: String //签到名
  id: String // 签到活动id
  createTime: String //签到发起时间
}
// 获取空间id
const route = useRoute()
const spaceId = route.query.id
const recordList: Array<RecordList> = reactive([])
// 获取签到统计列表
const recordRequest = reactive({
  spaceId: spaceId,
  signId: ''
})
const getSpaceSignRecord = () => {
  // 先将列表数据清零
  recordList.length = 0
  spaceSignRecord(recordRequest).then((res: any) => {
    if(res.code === 200) {
      recordList.push(...res.data)
    }
  }).catch((err) => {
    console.log(err)
  })
}
// 该空间发起过的签到列表
const signList: Array<SignList> = reactive([])
// 初始化数据
onMounted(() => {
  // 获取所有签到统计
  getSpaceSignRecord()
  // 获取该空间发起过的签到列表
  spaceSignList({
    spaceId: spaceId
  }).then((res: any) => {
    if(res.code === 200) {
      signList.push(...res.data)
      console.log(signList)
      if(signList.length !==0 ) {
        signList.push({
          name: '所有记录',
          id: '',
          createTime: ''
        })
      }
    }
  })
})

// 筛选签到
const dialogShow = ref(false)
const changeShow = () => {
  // 弹出框
  dialogShow.value = true
}
const checkedId = ref('') // 选中的签到id
const onCancel = () => {
  // 点击取消按钮
  checkedId.value = recordRequest.signId
}
const searchSign = () => {
  // 点击确定按钮
  recordRequest.signId = checkedId.value
  getSpaceSignRecord()
}
</script>

<template>
  <div class="bg-gray-500/8 p-3 min-h-100%">
    <div class="bg-white text-left p-4 pb-5 text-15px rounded">
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
          • 统计规则
        </div>
        <div class="text-13px text-hex-41AA62">
          统计签到记录
        </div>
      </li>
      <li class="mt-3 flex items-center">
        <div class="w-5.5em">
          • 说明
        </div>
        <div class="text-13px text-hex-41AA62">
          统计方式：成员积分/总积分
        </div>
      </li>
    </div>
    <div class="mt-2 bg-hex-10AA62 text-white py-2 rounded" @click="changeShow">筛选(某一次或多次签到记录)</div>
    <ul class="bg-white mt-2 border border-t-2 border-hex-ccc border-t-hex-28B648 px-2">
      <li class="flex py-2">
        <span class="flex-1">学号/工号<van-icon name="sort" /></span>
        <span class="flex-1">姓名</span>
        <span class="flex-1">统计</span>
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
    <!-- 筛选某几次签到 -->
    <van-dialog
      v-model:show="dialogShow"
      title="筛选"
      show-cancel-button
      confirm-button-color="rgb(63,133,255)"
      @confirm="searchSign"
      @cancel="onCancel"
    >
      <van-empty v-if="signList.length===0" description="该空间暂时没有发起过签到" />
      <van-radio-group class="p-3" v-model="checkedId" checked-color="#10AA62">
        <van-radio
          v-for="item in signList" 
          :key="item" :name="item.id" shape="square" icon-size="15px"
          class="flex items-center"
        >
          <div class="my-2 text-left">
            <span class="text-14px text-hex-666">{{item.name}}</span>
            <span v-if="item.createTime!=='' " class="text-12px text-hex-999">（{{item.createTime}}）</span>
          </div>
        </van-radio>
      </van-radio-group>
    </van-dialog>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 签到统计
</route>
