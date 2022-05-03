<template>
  <div class="bg-gray-500/8 p-3 min-h-100vh">
    <div class="top flex bg-white rounded justify-between">
      <span>
       <van-field
         v-model="value"
         placeholder="请输入要搜索的记录"
         left-icon="search"
         />
      </span>
      <span 
        class="
          text-13px
          flex
          items-center
          text-hex-666
          justify-center
          mr-5"
      >时间<van-icon name="sort" /></span>
    </div>
    <div class="record_list mt-2">
      <van-tabs color="rgb(40,182,72)">
        <van-tab title="签到" name="sign">
          <sign-list></sign-list>
        </van-tab>
        <van-tab title="投票" name="vote">
          <vote-list></vote-list>
        </van-tab>
        <van-tab title="抽签" name="draw">
          <draw-list></draw-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 发起列表
</route>

<script setup lang="ts">
import signList from './signList.vue'
import drawList from './drawList.vue'
import voteList from './voteList.vue'

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
