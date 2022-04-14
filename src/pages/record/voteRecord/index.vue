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
const cho_list = reactive([
  {
    title: '2月3日',
    count: '2',
    isShow: false,
    choer: [
      {
        num: '2005010326',
        name: '刘晴',
        time: '11:40:41'
      },
      {
        num: '2005010329',
        name: '李四',
        time: '11:42:41'
      },
    ]
  },
  {
    title: '2月4日',
    count: '3',
    isShow: false,
    choer: [
      {
        num: '2005010327',
        name: '王五',
        time: '11:43:41'
      },
      {
        num: '2005010328',
        name: '赵六',
        time: '11:41:41'
      },
      {
        num: '2005010330',
        name: '张三',
        time: '11:39:41'
      },
    ]
  }
])
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
        <span class="text-sm">票数统计</span>
        <span class="bg-hex-30B648 rounded-lg text-white text-xs py-0.5 px-2 ml-2">1 票</span>
      </div>
      <div class="text-left mt-2 p-5 text-sm bg-white rounded border-t-2 border-hex-30B648">
        <div class="text-16px font-700">投票标题：冬奥会2022年什么时候举办</div>
        <div class="mt-3">1. 2月3号（0票）</div>
        <div class="mt-3">2. 2月4号（1票）</div>
      </div>
    </div>
    <div class="mt-3">
      <van-tabs color="rgb(40,182,72)" background="rgb(243,244,245)">
        <van-tab>
          <template #title>
            <span class="text-sm">已投票</span>
            <span class="bg-hex-30B648 rounded-lg text-white text-xs py-0.5 px-2 ml-2">1人</span>
          </template>
          <div class="mt-3">
            <div
              v-for="item in cho_list"
              :key="item"
            >
              <div class="bg-white mt-3 rounded flex justify-between p-3 text-14px">
                 <div>
                    <span>投票：</span>
                    <span>{{item.title}}</span>
                  </div>
                  <div>
                    <span class="bg-hex-30B648 rounded-lg text-white text-xs py-0.5 px-2 mr-3">{{item.count}}票</span>
                    <span @click="changeShow(item)">
                      <van-icon v-show=!item.isShow name="arrow-down" />
                      <van-icon v-show=item.isShow name="arrow-up" />
                    </span>
                  </div>
              </div>
              <div v-show="item.isShow" class="bg-white rounded border border-hex-ccc mt-3 px-5">
                <van-list>
                  <ul class="flex justify-around border-b border-hex-ccc py-3 text-sm">
                    <span class="flex-1">学号/工号<van-icon name="sort" /></span>
                    <span class="flex-1">姓名</span>
                    <span class="flex-1">时间</span
                    >
                  </ul>
                  <ul class="flex justify-around border-b border-hex-ccc py-3 text-sm" v-for="choerItem in item.choer" :key="choerItem">
                    <span class="flex-1">{{ choerItem.num }}</span>
                    <span class="flex-1">{{ choerItem.name }}</span>
                    <span class="flex-1">{{ choerItem.time }}</span>
                  </ul>
                  <ul class="text-xs py-3">
                    没有更多了
                  </ul>
                </van-list>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab>
          <template #title>
            <span class="text-sm">未投票</span>
            <span class="bg-hex-30B648 rounded-lg text-white text-xs py-0.5 px-2 ml-2">7人</span>
          </template>
          <div class="mt-4 bg-white rounded border border-hex-ccc px-5 py-2">
            <van-list>
              <ul class="flex justify-around border-b border-hex-ccc py-3 text-sm">
                <span class="flex-1">学号/工号<van-icon name="sort" /></span>
                <span class="flex-1">姓名</span>
                <span class="flex-1" style="color: rgb(55, 65, 81)"
                  >状态</span
                >
              </ul>
              <ul class="flex justify-around border-b border-hex-ccc py-3 text-sm" v-for="item in no_list" :key="item">
                <span class="flex-1">{{ item.num }}</span>
                <span class="flex-1">{{ item.name }}</span>
                <span class="flex-1">{{ item.status }}</span>
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
  title: 投票记录
</route>

<style scoped>

</style>
