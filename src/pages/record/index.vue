<!--
 * @Descipttion: 
 * @Author: 刘晴
 * @Date: 2022-04-20 21:46:45
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-30 16:48:14
-->
<script lang="ts">
export default{
  name: 'recordList'
}
</script>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const { eventHub } = getCurrentInstance()?.proxy
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
onMounted(() => {
  eventHub.$on('refreshList', (type: any) => {
    search()
  })
})
onUnmounted(()=> {
  eventHub.$off('refreshList')
})
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
      <van-tabs color="rgb(40,182,72)" v-model:active="activeName" @change="changeTab" swipeable>
        <van-tab title="签到" name="sign">
          <sign-list ref="signlist" admin="1"></sign-list>
        </van-tab>
        <van-tab title="投票" name="vote">
          <vote-list ref="votelist" admin="1"></vote-list>
        </van-tab>
        <van-tab title="抽签" name="draw">
          <draw-list ref="drawlist" admin="1"></draw-list>
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
