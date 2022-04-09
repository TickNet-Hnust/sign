<script setup lang="ts">
const loading = ref(false)
const fininshed = ref(true)
const space_list = reactive([
  {
    title: '班级会议',
    time: '2022-01-03 17:34:38',
  },
  {
    title: 'ticknet会议',
    time: '2022-01-03 17:34:38',
  },
  {
    title: '班级会议',
    time: '2022-01-03 17:34:39',
  },
])
</script>

<template>
  <div class="p-3 bg-gray-100/99">
    <div class="flex justify-between items-center">
      <span class="px-3 py-1 flex items-center bg-hex-fff rounded">
        <span class="mr-3 text-2xl" style="color: rgb(156, 163, 175)"><van-icon class="font-700" name="search" /></span>
        <input placeholder="请输入要搜索的空间">
      </span>
      <span class="text-xl">
        <span
          class="
            color-hex-59B476
            border-3 border-hex-59B476
            rounded
            font-bold
            px-0.2
          "
        ><van-icon class="font-700" name="plus" /></span>
      </span>
    </div>
    <div class="mt-8 border-1 border-hex-DEDEDE bg-hex-fff rounded py-3 px-5">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
      >
        <ul
          v-for="item in space_list"
          :key="item"
          class="border-b border-b-hex-dedede mt-3"
        >
          <div class="text-left font-bold">
            {{ item.title }}
          </div>
          <div class="text-left text-xs mt-1 mb-1 color-hex-999">
            {{ item.time }}
          </div>
        </ul>
      </van-list>
    </div>
  </div>
</template>
