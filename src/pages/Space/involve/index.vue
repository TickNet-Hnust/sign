<script setup lang="ts">
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const student_list = reactive([
  { num: '2005010326', name: '张三' },
  { num: '2005010327', name: '李四' },
  { num: '2005010328', name: '王五' },
  { num: '2005010329', name: '赵六' },
  { num: '2005010330', name: '钱七' },
  { num: '2005020101', name: '孙八' },
  { num: '2005020102', name: '周九' },
  { num: '2005020103', name: '吴十' },
])

</script>
<template>
  <div class="bg-hex-F6F7F9 p-2">
    <div class="bg-hex-fff p-2 border-hex-C9C9C9 border rounded">
      <div class="flex justify-around">
        <div class="row">
          <div class="text-sm">
            19计算机二班
          </div>
          <div class="text-xs my-1 text-left">
            成员：520
          </div>
        </div>
        <div class="rounded items-center flex">
          <van-button type="danger" class="rounded" size="small">
            退出空间
          </van-button>
        </div>
      </div>
    </div>
    <div
      class="bg-hex-fff mt-5"
    >
      <van-pull-refresh v-model="refreshing" @refresh="onRefreh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          loading-text="——下拉加载更多——"
          @load="onLoad"
        >
          <ul
            class="
      flex
      justify-around
      h-3em
      leading-12
      border-b border-b-hex-E4E4E4
      text-sm
      list_top
      "
          >
            <span class="inline-block w-6em">学号/工号</span>
            <span class="inline-block w-4em">姓名</span>
          </ul>
          <ul
            v-for="item in student_list"
            :key="item"
            class="
                  flex
                  justify-around
                  h-3em
                  leading-12
                  border-b border-b-hex-E4E4E4
                  text-sm
                "
          >
            <span class="inline-block w-6em">{{ item.num }}</span>
            <span class="inline-block w-4em">{{ item.name }}</span>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
