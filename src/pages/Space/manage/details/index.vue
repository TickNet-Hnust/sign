<script setup leng="ts">
import src from '~/assets/1.png'
const active = ref(0)
const number = ref(8)
const loading = ref(false)
const fininshed = ref(true)
const details_list = reactive([
  {
    title: '发起签到',
    type: '发起签到',
  },
  {
    title: '发起投票',
    type: '发起投票',
  },
  {
    title: '发起抽签',
    type: '发起抽签',
  },
  {
    title: '发起点名',
    type: '发起点名',
  },
  {
    title: '微信推荐',
    type: '微信推荐',
  },
  {
    title: '成员追加',
    type: '成员追加',
  },
  {
    title: '删除群组',
    type: '删除群组',
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
  <div class="bg-hex-E7E7E7 p-3">
    <div class="flex bg-hex-fff rounded">
      <span>
        <img
          class="border-2 border-hex-DEDEDE mt-5 ml-3 w-70px h-70px"
          :src="src"
          alt=""
        >
      </span>
      <span class="flex-col flex ml-8">
        <span class="mt-6 mr-4 text-md">班级会议</span>
        <span class="mt-7 mr-7 text-sm">成员：{{ number }}</span>
      </span>
    </div>
    <van-tabs v-model:active="active" color="rgb(0,51,255)">
      <van-tab title="概况">
        <div>
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div
              v-for="item in details_list"
              :key="item"
              class="mt-3 p-3"
              style="background-color: #fff; border-radius: 0.3em"
            >
              <div class="flex bg-hex-fff">
                <span><img
                  class="w-70px h-70px border-2 border-hex-DEDEDE"
                  :src="src"
                  alt=""
                ></span>
                <div class="items-center justify-around flex w-full">
                  <div class="ml-3">
                    {{ item.title }}
                  </div>
                  <div class="ml-9 border p-1 text-xs">
                    {{ item.type }}
                  </div>
                </div>
              </div>
            </div>
          </van-list>
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
