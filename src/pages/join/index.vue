<script setup lang="ts">
import signList from '~/components/recordList/signList.vue'
import drawList from '~/components/recordList/drawList.vue'
import voteList from '~/components/recordList/voteList.vue'

</script>
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
          <sign-list admin="0"></sign-list>
        </van-tab>
        <van-tab title="投票" name="vote">
          <vote-list admin="0"></vote-list>
        </van-tab>
        <van-tab title="抽签" name="draw">
          <draw-list admin="0"></draw-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 参与列表
</route>

