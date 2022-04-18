<script lang="ts" setup>
const signList = ref([
  {
    num: '1905020118',
    name: '张三',
    score: '31/36',
  },
  {
    num: '1905020118',
    name: '张三',
    score: '31/36',
  },
  {
    num: '1905020118',
    name: '张三',
    score: '31/36',
  },
  {
    num: '1905020118',
    name: '张三',
    score: '31/36',
  },
  {
    num: '1905020118',
    name: '张三',
    score: '31/36',
  },
])
const voteList = ref([
  {
    num: '1905020118',
    name: '李四',
    score: '31/36',
  },
  {
    num: '1905020118',
    name: '张三',
    score: '31/36',
  },
  {
    num: '1905020118',
    name: '李四',
    score: '31/36',
  },
  {
    num: '1905020118',
    name: '张三',
    score: '31/36',
  },
  {
    num: '1905020118',
    name: '张三',
    score: '31/36',
  },
])
const rollList = ref([
  {
    num: '1905020118',
    name: '王五',
    score: '31/36',
  },
  {
    num: '1905020118',
    name: '张三',
    score: '31/36',
  },
  {
    num: '1905020118',
    name: '王五',
    score: '31/36',
  },
  {
    num: '1905020118',
    name: '张三',
    score: '31/36',
  },
  {
    num: '1905020118',
    name: '张三',
    score: '31/36',
  },
])
const checkedList = ref()
const checkedTab = ref('signList')
const changeTab = () => {
  if (checkedTab.value === 'sign')
    checkedList.value = signList.value

  else if (checkedTab.value === 'vote')
    checkedList.value = voteList.value

  else
    checkedList.value = rollList.value
}
</script>

<template>
  <div class="bg-gray-100 p-3">
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
          每参与签到/投票/抽签一次，加一积分
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
    <div class="mt-3">
      <van-tabs
        v-model:active="checkedTab"
        color="rgb(40,182,72)"
        background="rgb(243,244,245)"
        @change="changeTab()"
      >
        <van-tab title="签到积分" name="sign" />
        <van-tab title="投票积分" name="vote" />
        <van-tab title="抽签积分" name="roll" />
      </van-tabs>
    </div>
    <ul class="bg-white mt-4 border border-t-2 border-hex-ccc border-t-hex-28B648 px-2">
      <li class="flex py-2">
        <span class="flex-1">学号/工号<van-icon name="sort" /></span>
        <span class="flex-1">姓名</span>
        <span class="flex-1">积分</span>
      </li>
      <li
        v-for="item in checkedList"
        :key="item"
        class="flex py-2 border-t border-hex-ccc"
      >
        <span class="flex-1">{{ item.num }}</span>
        <span class="flex-1">{{ item.name }}</span>
        <span class="flex-1">{{ item.score }}</span>
      </li>
    </ul>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 积分详情
</route>
