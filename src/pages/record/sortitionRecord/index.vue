<template>
  <div class="bg-gray-500/8 p-3">
    <div>
      <div class="text-left ml-3">
        <span class="text-sm">签数统计</span>
        <span class="count text-xs px-2 py-1">1票</span>
      </div>
      <div class="text-left mt-2 px-5 py-3 vote_count text-xs">
        <div>抽签标题：冬奥会2022年什么时候举办</div>
        <div>1. 2月3号（0票）</div>
        <div>2. 2月4号（1票）</div>
      </div>
    </div>
    <div class="mt-3">
      <van-tabs color="rgb(40,182,72)" background="rgb(243,244,245)">
        <van-tab>
          <template #title>
            <span class="text-sm">已抽签</span>
            <span class="count text-xs px-2 py-1 ml-1">1人</span>
          </template>
        </van-tab>
        <van-tab>
          <template #title>
            <span class="text-sm">未抽签</span>
            <span class="count text-xs px-2 py-1 ml-1">7人</span>
          </template>
          <div class="mt-4 list_box px-5 py-2">
            <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
            >
              <ul class="vote_list text-sm list_top">
                <span class="list_num">学号/工号</span>
                <span class="list_name">姓名</span>
                <span class="list_status" style="color: rgb(55, 65, 81)"
                  >状态</span
                >
              </ul>
              <ul v-for="item in list" :key="item" class="vote_list text-sm">
                <span class="list_num">{{ item.num }}</span>
                <span class="list_name">{{ item.name }}</span>
                <span class="list_status">{{ item.status }}</span>
              </ul>
            </van-list>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
const loading = ref(false);
const finished = ref(true);
const list = ref([
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
</script>

<style scoped>
.count {
  background-color: rgb(40, 182, 72);
  color: #fff;
  border-radius: 1em;
}
.vote_count {
  background-color: #fff;
  border-radius: 0.5em;
  color: rgb(128, 128, 128);
  line-height: 2em;
}
.list_box {
  background-color: #fff;
  border: 1px solid rgb(217, 218, 219);
  border-radius: 0.5em;
}
.vote_list {
  display: flex;
  justify-content: space-around;
  height: 3em;
  line-height: 3em;
  border-bottom: 1px solid rgb(228, 228, 228);
}
.list_num {
  display: inline-block;
  width: 6em;
}
.list_name {
  display: inline-block;
  width: 4em;
}
.list_status {
  color: rgb(0, 102, 214);
  display: inline-block;
  width: 2em;
}
</style>
