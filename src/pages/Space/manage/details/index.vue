<script setup leng="ts">
import src from '~/assets/1.png'
const active = ref(0)
const number = ref(8)
const loading = ref(false)
const fininshed = ref(true)
const details_list = reactive([
  {
    title: '发起签到',
    icon: 'i-carbon-3d-cursor-alt',
  },
  {
    title: '发起投票',
    icon: 'i-carbon-receipt',
  },
  {
    title: '发起抽签',
    icon: 'i-carbon-align-box-middle-center',
  },
  {
    title: '发起点名',
    icon: 'i-carbon-user-certification',
  },
  {
    title: '成员追加',
    icon: 'i-carbon-user-follow',
  },
  {
    title: '积分',
    icon: 'i-carbon-report',
  },
])
const member_list = reactive([
  {
    user_id: 1905040117,
    member: '曹帅哥',
  },
  {
    user_id: '1234567890',
    member: '曹shuaige',
  },
])

const finished = ref(true)
</script>
<template>
  <div class="bg-hex-F6F7F9 p-3">
    <div class="flex bg-hex-fff rounded">
      <div class="flex-col flex ml-8">
        <div class="mt-2">
          <span class="mt-6 mr-4 text-md">班级会议</span>
          <span><van-icon name="edit" /></span>
        </div>
        <span class="mt-7 text-xs text-left">成员：{{ number }}</span>
      </div>
      <div class="rounded flex-1 mt-7 ml-7">
        <van-button type="danger" class="rounded" size="small">
          删除空间
        </van-button>
      </div>
    </div>
    <van-tabs v-model:active="active" color="rgb(0,51,255)">
      <van-tab title="概况">
        <div class="mt-5 flex flex-wrap justify-around">
          <div
            v-for="item in details_list"
            :key="item"
            class="mt-5 p-3 inline-block ml-3 border border-hex-41be62 text-hex-999 rounded w-30vw h-30vw"
            shadow="~ md gray-400/60"
          >
            <div class="boxIcon mt-2" text="2xl" color="green-600" m="auto" :class="item.icon" />
            <div class="mt-3 text-14px">
              {{ item.title }}
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="成员">
        <div class="bg-white px-2">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div v-for="item in member_list" :key="item" class="flex text-sm py-2 border-b border-hex-ddd">
              <span class="flex-1">{{ item.user_id }}</span>
              <span class="flex-1">{{ item.member }}</span>
              <span class="flex-1">:</span>
            </div>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
