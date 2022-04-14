<script setup lang="ts">
const no_list = reactive([
  {
    num: "1905020118",
    name: "张三",
    status: "",
  },
  {
    num: "1905020118",
    name: "张三",
    status: "",
  },
  {
    num: "1905020118",
    name: "张三",
    status: "",
  },
  {
    num: "1905020118",
    name: "张三",
    status: "请假",
  },
  {
    num: "1905020118",
    name: "张三",
    status: "",
  },
  {
    num: "1905020118",
    name: "张三",
    status: "",
  },
]);
const yes_list = reactive([
  {
    num: "1905020118",
    name: "张三",
    time: '11:40:43'
  },
  {
    num: "1905020118",
    name: "张三",
    time: '11:40:43'
  },
  {
    num: "1905020118",
    name: "张三",
    time: '11:40:43'
  },
  {
    num: "1905020118",
    name: "张三",
    time: '11:40:43'
  },
  {
    num: "1905020118",
    name: "张三",
    time: '11:40:43'
  },
  {
    num: "1905020118",
    name: "张三",
    time: '11:40:43'
  },
]);
const changeShow = (item) => {
  if(!item.isShow) {
    item.isShow = true;
  } else {
    item.isShow = false;
  }
}
</script>

<template>
  <div class="bg-gray-500/8 p-3">
    <div>
      <div class="text-left ml-3">
        <span class="text-sm">签数统计</span>
        <span class="bg-hex-30B648 rounded-lg text-white text-xs py-0.5 px-2 ml-2">1 票</span>
      </div>
      <div class="text-left mt-2 p-5 text-sm bg-white rounded border-t-2 border-hex-30B648">
        <div class="text-16px font-700">抽签标题：冬奥会2022年什么时候举办</div>
        <div class="mt-3">1. 2月3号（0票）</div>
        <div class="mt-3">2. 2月4号（1票）</div>
      </div>
    </div>
    <div class="mt-3">
      <van-tabs color="rgb(40,182,72)" background="rgb(243,244,245)">
        <van-tab>
          <template #title>
            <span class="text-sm">已抽签</span>
            <span class="bg-hex-30B648 rounded-lg text-white text-xs py-0.5 px-2 ml-2">1人</span>
          </template>
          <div class="mt-4 bg-white rounded border border-hex-ccc px-5 py-2">
            <van-list>
              <ul class="flex justify-around border-b border-hex-ccc py-3 text-sm">
                <span class="flex-1">学号/工号</span>
                <span class="flex-1">姓名</span>
                <span class="flex-1">时间</span
                >
              </ul>
              <ul class="flex justify-around border-b border-hex-ccc py-3 text-sm" v-for="item in yes_list" :key="item">
                <span class="flex-1">{{ item.num }}</span>
                <span class="flex-1">{{ item.name }}</span>
                <span class="flex-1">{{ item.time }}</span>
              </ul>
              <ul class="text-x py-3">
                没有更多了
              </ul>
            </van-list>
          </div>
        </van-tab>
        <van-tab>
          <template #title>
            <span class="text-sm">未抽签</span>
            <span class="bg-hex-30B648 rounded-lg text-white text-xs py-0.5 px-2 ml-2">7人</span>
          </template>
          <div class="mt-4 bg-white rounded border border-hex-ccc px-5 py-2">
            <van-list>
              <ul class="flex justify-around border-b border-hex-ccc py-3 text-sm">
                <span class="flex-1">学号/工号</span>
                <span class="flex-1">姓名</span>
                <span class="flex-1">状态</span
                >
              </ul>
              <ul class="flex justify-around border-b border-hex-ccc py-3 text-sm" v-for="item in no_list" :key="item">
                <span class="flex-1">{{ item.num }}</span>
                <span class="flex-1">{{ item.name }}</span>
                <span class="flex-1" style="color: rgb(0,102,204)">{{ item.status }}</span>
              </ul>
              <ul class="text-x py-3">
                没有更多了
              </ul>
            </van-list>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
  title: 抽签记录
</route>

<style scoped>

</style>
