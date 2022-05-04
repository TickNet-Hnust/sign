<template>
  <van-list
    :immediate-check="false"
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
      @click="jumpDetail(item)"
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
let pageCnt = ref(1);
const request = reactive({
    pageNum: 1,
    pageSize: 10
})
const getList = () => {
  request.pageNum = pageCnt.value
  getDrawList(request).then((res: any) => {
      if(res.code === 200) {
        list.value = list.value.concat(res.rows)
        pageCnt.value++;
        loading.value = false
        if(list.value.length >= res.total) {
          console.log('数据加载完毕')
          finished.value = true
        }
      }
  }).catch(err => {
    console.log(err)
  })
}
getList()
const onload = () => {
  setTimeout(() => {
    getList()
  }, 1000)
}
const router = useRouter()
const jumpDetail = (item: any) => {
  // 应该是跳转到空间里面的抽签
  router.push({
    path: "/join/drawing",
    query: {
      id:  item.id
    }
  })
}
</script>
