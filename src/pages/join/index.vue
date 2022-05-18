<!--
 * @Descipttion: 
 * @Author: 刘晴
 * @Date: 2022-04-20 21:46:45
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-18 16:06:51
-->
<script lang="ts">
export default{
  name: 'recordList'
}
</script>

<script setup lang="ts">

const searchValue = ref('')
const activeName = ref('sign')
const signlist = ref(null)
const drawlist = ref(null)
const votelist = ref(null)

const route = useRoute()
const search = () => {
  if(activeName.value === 'sign') {
    (signlist as any).value.search(searchValue.value)
  } else if(activeName.value === 'vote') {
    (votelist as any).value.search(searchValue.value)
  } else {
    (drawlist as any).value.search(searchValue.value)
  }
}
const changeTab = () => {
  if(searchValue.value !== '') {
    searchValue.value = '';
    search()
  }
}
</script>
<template>
  <div class="bg-gray-500/8 p-3 min-h-100vh">
    <div class="flex top bg-white rounded justify-between">
      <span class="w-100vw">
       <van-search
         v-model="searchValue"
         placeholder="请输入要搜索的记录"
         left-icon="search"
         @search="search"
         />
      </span>
    </div>
    <div class="record_list mt-2">
      <van-tabs color="rgb(40,182,72)" v-model:active="activeName" @change="changeTab">
        <van-tab title="签到" name="sign">
        </van-tab>
        <van-tab title="投票" name="vote">
        </van-tab>
        <van-tab title="抽签" name="draw">
        </van-tab>
        <keep-alive>
          <div>
            <vote-list v-if="activeName==='vote'" ref="votelist" admin="0"></vote-list>
            <draw-list v-if="activeName==='draw'" ref="drawlist" admin="0"></draw-list>
            <sign-list v-if="activeName==='sign'" ref="signlist" admin="0"></sign-list>
          </div>
        </keep-alive>
      </van-tabs>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 参与列表
</route>
