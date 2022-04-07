<template>
  <div class="bg-gray-100 p-7">
    <div
      class="show_name text-3xl text-white w-6em h-6em leading-6em rounded-1/2"
    >
      {{ check_name }}
    </div>
    <div
      class="begin action_btn bg-white h-3em rounded leading-3em mt-20"
      @click="resume"
    >
      随机点名
    </div>
    <div
      class="stop action_btn bg-white h-3em rounded leading-3em mt-5"
      @click="pause"
    >
      停止点名
    </div>
  </div>
</template>
<script setup lang="ts">
// import { useIntervalFn } from '@vueuse/core'
const check_name = ref("张三");
const name_list = ref([
  "冯大",
  "赵二",
  "张三",
  "李四",
  "周五",
  "赵六",
  "李七",
  "吴八",
  "王九",
  "孙十",
]);
const { pause, resume, isActive } = useIntervalFn(
  () => {
    const r = Math.round(Math.random() * 9);
    check_name.value = name_list.value[r];
  },
  100,
  {
    immediate: false,
  }
);
</script>

<style scoped>
.show_name {
  background-color: rgb(147, 206, 166);
  margin: 1em auto;
  margin-top: 0;
}
.action_btn {
  color: rgb(65, 170, 98);
  border: 1px solid rgb(65, 170, 98);
}
.action_btn:hover {
  background-color: rgb(65, 170, 98);
  color: #fff;
}
</style>
