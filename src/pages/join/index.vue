<template>
  <div class="bg-gray-500/8 p-3">
    <div class="top flex bg-white rounded">
      <span class="flex-2">
       <van-field
         v-model="value"
         placeholder="请输入要搜索的记录"
         left-icon="search"
         />
      </span>
      <span 
        class="
          flex-1
          text-13px
          flex
          items-center
          text-hex-666
          justify-center"
      >时间<van-icon name="arrow-down" /></span>
      <span
        class="flex items-center justify-end text-13px text-hex-666 flex-1 pr-3"
        id="showSelect"
      >
        <van-dropdown-menu active-color="#1989fa">
          <van-dropdown-item v-model="choValue" :options="choOptions" />
        </van-dropdown-menu> 
        <!-- 类型筛选<van-icon name="filter-o" /> -->
      </span>
    </div>
    <div class="record_list mt-4">
      <van-list
        v-model:loading="loading"
        :finished="dinished"
        loading-text="————下拉加载更多————"
        @load="onload"
      >
        <ul
          v-for="item in list"
          :key="item"
          class="mt-3 p-4 rounded"
          style="background-color: #fff; position: relative"
        >
          <div
            class="h-0 w-0"
            style="
               border: 11px solid transparent;
               border-left-color: #41BD62;
               border-top-color: #41BD62;
               position: absolute;
               top: 0;
               left: 0"
            v-if="!item.ended"
          ></div>
          <div
            class="w-54px h-54px"
            style="
              position: absolute;
              top: 0;
              right: 84px;
              background: url(../../../public/join.png);
              background-size: 100%"></div>
          <div
            class="h-0 w-0"
            style="
               border: 11px solid transparent;
               border-left-color: #C9C9C9;
               border-top-color: #C9C9C9;
               position: absolute;
               top: 0;
               left: 0"
            v-if="item.ended"
          ></div>
          <div style="display: flex; justify-content: space-between">
            <span class="text-base font-semibold">{{ item.title }}</span>
            <span class="text-xs">
              <span class="bg-hex-41BD62 text-white px-2 py-1 rounded" v-if="!item.ended">{{item.type}}中</span>
              <span class="bg-hex-C9C9C9 text-hex-7E7E7E px-2 py-1 rounded" v-if="item.ended">{{item.type}}中</span>
            </span>
          </div>
          <div class="text-xs text-gray-400 text-left mt-3">
            所属空间：学习部
            <span class="ml-3">{{ item.time }}</span>
          </div>
        </ul>
      </van-list>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 我要参与
</route>

<script setup lang="ts">
const isShow = ref(false)
const columns = ref(['全部','签到','投票','抽签'])
const choValue = ref('cho')
const choOptions = ref([
  { text: '类型筛选', value: 'cho' },
  { text: '全部', value: 'all' },
  { text: '签到', value: 'sign' },
  { text: '投票', value: 'vote' },
  { text: '抽签', value: 'roll' },
])
const list = ref([
  {
    title: "冬奥会2022年什么时候举办",
    status: "抽签中",
    time: "2022-01-03 17:34:38",
    user: "张智豪",
    type: "抽签",
    ended: false,
    color: "rgb(118,211,246)",
    space: "班级会议",
    unford_show: false,
    unford_icon: "arrow-down",
  },
  {
    title: "冬奥会2022年什么时候举办",
    status: "投票中",
    time: "2022-01-03 17:34:38",
    user: "张智豪",
    type: "投票",
    ended: false,
    color: "rgb(118,211,246)",
    space: "班级会议",
    unford_show: false,
    unford_icon: "arrow-down",
  },
  {
    title: "签到",
    status: "签到中",
    time: "2022-01-03 17:34:38",
    user: "张智豪",
    type: "签到",
    ended: false,
    color: "rgb(118,211,246)",
    space: "班级会议",
    unford_show: false,
    unford_icon: "arrow-down",
  },
  {
    title: "签到",
    status: "已结束",
    time: "2022-01-03 17:34:38",
    user: "张智豪",
    type: "签到",
    ended: true,
    color: "rgb(201,201,201)",
    space: "班级会议",
    unford_show: false,
    unford_icon: "arrow-down",
  },
  {
    title: "签到",
    status: "已结束",
    time: "2022-01-03 17:34:38",
    user: "张智豪",
    type: "签到",
    ended: true,
    color: "rgb(201,201,201)",
    space: "班级会议",
    unford_show: false,
    unford_icon: "arrow-down",
  }
]);
const loading = ref(false);
const finished = ref(false);
const onload = () => {
  // setTimeout(() => {
  //     loading.value = false;
  // }, 1000);
};

</script>
<style>
/* 修改组件库样式去掉scoped */
:root {
  --van-dropdown-menu-box-shadow: 0 0 0;
  --van-dropdown-menu-title-font-size: 13px;
  /* --van-dropdown-menu-title-padding: 1em; */
}
.van-dropdown-item {
  margin-left: 0.75rem;
  margin-right: 0.75rem;
}
</style>
