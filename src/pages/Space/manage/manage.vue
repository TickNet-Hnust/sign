<template>
  <div class="p-3 container">
    <div class="header">
      <span class="px-3 py-1 search_input">
        <span class="mr-3 text-2xl" style="color: rgb(156, 163, 175)"
          ><van-icon name="search"
        /></span>
        <input placeholder="请输入要搜索的空间" />
      </span>
      <span class="text-xl">
        <span class="plus_btn font-bold px-0.2"><van-icon name="plus" /></span>
      </span>
    </div>
    <div class="mt-8 space_list py-3 px-5">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
      >
        <ul v-for="item in space_list" :key="item" class="list_item mt-3">
          <div class="text-left font-bold">
            {{ item.title }}
          </div>
          <div class="text-left text-xs mt-1 mb-1 item_time">
            {{ item.time }}
          </div>
        </ul>
      </van-list>
    </div>
  </div>
</template>
<script setup lang="ts">
const loading = ref(false);
const fininshed = ref(true);
const space_list = ref([
  {
    title: "班级会议",
    time: "2022-01-03 17:34:38",
  },
  {
    title: "ticknet会议",
    time: "2022-01-03 17:34:38",
  },
  {
    title: "班级会议",
    time: "2022-01-03 17:34:39",
  },
]);
</script>

<style scoped>
.container {
  background-color: rgb(246, 247, 249);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search_input {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 0.3em;
}
.van-icon {
  font-weight: 700;
}
.plus_btn {
  color: rgb(89, 180, 118);
  border: 3px solid rgb(89, 180, 118);
  border-radius: 0.2em;
}
.space_list {
  border: 1px solid rgb(222, 222, 222);
  background-color: #fff;
  border-radius: 0.3em;
}
.list_item {
  border-bottom: 1px solid rgb(222, 222, 222);
}
.item_time {
  color: #999;
}
</style>
