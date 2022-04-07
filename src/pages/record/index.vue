<template>
  <div class="bg-gray-500/8 p-3">
    <div class="top mt-3">
      <van-dropdown-menu>
        <van-dropdown-item title="时间排序"> </van-dropdown-item>
        <van-dropdown-item title="类型筛选"> </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <div class="record_list mt-6">
      <van-list
        v-model:loading="loading"
        :finished="dinished"
        loading-text="————下拉加载更多————"
        @load="onload"
      >
        <ul
          v-for="item in list"
          :key="item"
          class="mt-3 p-4"
          style="background-color: #fff"
        >
          <div style="display: flex; justify-content: space-between">
            <span class="text-base font-semibold">{{ item.title }}</span>
            <span class="text-xs">
              <van-tag text-color="#666666" :color="item.color">{{
                item.status
              }}</van-tag>
            </span>
          </div>
          <div class="text-xs text-gray-500 text-left mt-2">
            {{ item.time }}
          </div>
          <van-divider :style="{ borderColor: '#000' }"></van-divider>
          <div style="display: flex; justify-content: space-between">
            <div>
              <span class="text-xs text-gray-500/66"
                >{{ item.user }} 发起的
              </span>
              <span class="text-green-500 text-sm">{{ item.type }}</span>
            </div>
            <div id="unford" @click="unford(item)">
              <van-icon :name="item.unford_icon" />
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between"
            class="mt-3"
            v-if="item.unford_show"
          >
            <div>
              <span class="text-xs text-gray-500/66">所属空间：</span>
              <span class="text-sm font-semibold">{{ item.space }}</span>
            </div>
            <div class="text-xs text-gray-500/66">
              <van-icon name="cross" size="1.2em" /> 删除
            </div>
          </div>
        </ul>
      </van-list>
    </div>
  </div>
</template>
<script setup lang="ts">
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
]);
const loading = ref(false);
const finished = ref(false);
const onload = () => {
  // setTimeout(() => {
  //     loading.value = false;
  // }, 1000);
};
// 下拉框图标转换

const unford = (item) => {
  if (item.unford_icon === "arrow-down") {
    item.unford_icon = "arrow-up";
    item.unford_show = true;
  } else {
    item.unford_icon = "arrow-down";
    item.unford_show = false;
  }
};
</script>
<style scoped></style>
