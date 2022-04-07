<template>
  <div class="bg-true-gray-50 w-screen h-screen">
    <div class="sticky top-0">
      <van-nav-bar title="投票记录" left-text="返回" left-arrow />
    </div>
    <div
      class="border border-green-700 my-10px mx-15px py-15px text-center bg-green-100"
    >
      {{ "已有" + data.num + "人投票" }}
    </div>
    <div class="bg-white py-10px px-15px my-10px mx-15px text-sm">
      <div>
        <span>{{ data.user }}</span>
        <span class="float-right">{{ data.voteTime }}</span>
      </div>
      <van-divider class="my-10px" />
      <div>
        {{ data.message + data.option }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const data = ref({
  user: "张志豪",
  voteTime: "01-15 10:45",
  message: "投票：",
  option: "两顿",
  num: 1,
});
</script>
