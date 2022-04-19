<!-- 学生端 -->

<script setup lang="ts">
const loading = ref(false)
const fininshed = ref(true)
const isShow = ref(false)
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
const changeShow = () => {
  isShow.value = !isShow.value
}
</script>

<template>
  <div class="p-3 bg-gray-100/99">
    <div class="flex justify-between items-center">
      <span class="px-3 py-1 flex items-center bg-hex-fff rounded w-xs">
        <span class="mr-3 text-2xl" style="color: rgb(156, 163, 175)"><van-icon class="font-700" name="search" /></span>
        <input placeholder="请输入要搜索的空间">
      </span>
      <span class="text-xl" @click="changeShow">
        <span
          class="
            color-hex-59B476
            border-3 border-hex-59B476
            rounded
            font-bold
            px-0.2
            mr-2
          "
        ><van-icon class="font-700 w-6" name="plus" /></span>
      </span>
    </div>
    <!-- 弹出框 -->
    <van-dialog
      v-model:show="isShow" title="面对面建空间" confirm-button-color="rgb(63,133,255)" show-cancel-button
    >
      <div class="mt-5 px-10">
        <div class="text-14px text-hex-999">
          和身边的朋友输入同样的四个数字，进入同一个空间
        </div>
        <van-field class="border-b border-hex-ccc mb-3" type="digit" />
      </div>
    </van-dialog>
    <div class="mt-8 border-1 border-hex-DEDEDE bg-hex-fff rounded py-3 px-5">
      <van-tabs v-model:active="active" color="rgb(40,182,72)">
        <van-tab title="我管理的">
          <van-pull-refresh v-model="refreshing" @refresh="onRefreh">
            <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              loading-text="——下拉加载更多——"
              @load="onLoad"
            >
              <ul
                v-for="item in space_list"
                :key="item"
                class="border border-hex-dedede mt-3 p-3 rounded shadow-md"
              >
                <div class="text-left font-bold">
                  {{ item.title }}
                </div>
                <div class="text-left text-xs mt-1 color-hex-999">
                  {{ item.time }}
                </div>
              </ul>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="我参与的">
          <van-pull-refresh v-model="unRefreshing" @refresh="onRefreh">
            <van-list
              v-model:loading="unLoading"
              :finished="unFinished"
              finished-text="没有更多了"
              loading-text="——下拉加载更多——"
              @load="onunLoad"
            >
              <ul
                v-for="item in space_list"
                :key="item"
                class="border border-hex-dedede mt-3 p-3 rounded shadow-md"
              >
                <div class="text-left font-bold">
                  {{ item.title }}
                </div>
                <div class="text-left text-xs mt-1 color-hex-999">
                  {{ item.time }}
                </div>
              </ul>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
