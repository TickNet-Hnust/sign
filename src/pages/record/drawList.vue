<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    loading-text="————下拉加载更多————"
    finished-text="没有更多了"
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
        v-if="item.status"
      ></div>
      <div
        class="w-54px h-54px"
        style="
          position: absolute;
          top: 0;
          right: 84px;
          background: url(../../../public/join.png);
          background-size: 100%"
        v-if="item.attend"
      ></div>
      <div
        class="h-0 w-0"
        style="
           border: 11px solid transparent;
           border-left-color: #C9C9C9;
           border-top-color: #C9C9C9;
           position: absolute;
           top: 0;
           left: 0"
        v-if="!item.status"
      ></div>
      <div style="display: flex; justify-content: space-between">
        <span class="text-base font-semibold">{{ item.drawName }}</span>
        <span class="text-xs">
          <span class="bg-hex-41BD62 text-white px-2 py-1 rounded" v-if="item.status">抽签中</span>
          <span class="bg-hex-C9C9C9 text-hex-7E7E7E px-2 py-1 rounded" v-if="!item.status">已结束</span>
        </span>
      </div>
      <div class="text-xs text-gray-400 text-left mt-3">
        <span>所属空间：{{item.spaceName}}</span>
        <span class="ml-3">{{ item.createTime }}</span>
      </div>
    </ul>
  </van-list>
</template>
<script setup lang="ts">
import { getDrawList } from '~/api/record/drawRecord'
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
var pageCnt = 1;
const signList = () => {
  getDrawList({
    pageNum: pageCnt,
    pageSize: 10
  }).then((res: any) => {
    console.log(res)
    if(res.code === 200) {
      if(res.rows.length < 10) {
        finished.value = true
      }
      if( pageCnt === 1 ) {
        list.value = res.rows
      } else {
        list.value = list.value.concat(res.rows)
      }
    }
  }).catch((err) => {
    console.log(err)
  })
}
const onload = () => {
  if(!finished.value) {
    setTimeout(() => {
      signList()
      loading.value = false
      pageCnt++
    }, 1000)
  }
  
}
</script>
