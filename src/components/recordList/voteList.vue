<script setup lang="ts">
import { getVoteList } from '~/api/record/voteRecord'
interface RecordList{ // 定义记录列表
  id: Number, // 活动id
  attend: Number, // 用户是否参与过该活动
  status: Number, // 活动是否以及结束
  voteName: String, //活动名称
  createTime: String, //开始时间
  endTime: String, //结束时间,
  spaceName: String, // 所属空间名称
  signCode: String, // 签到码
  voteNums: String,
  voteType: Number
}
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
let pageCnt = ref(1);
const props = defineProps({
  admin: Number
})
const request = reactive({
    pageNum: 1,
    pageSize: 10,
    admin: props.admin,
    voteName: ''
})
const getList = () => {
  request.pageNum = pageCnt.value
  getVoteList(request).then((res: any) => {
    if(res.code === 200){
      const rows = res.data.rows
      list.value = list.value.concat(rows)
      pageCnt.value++;
      loading.value = false
      if(list.value.length >= res.data.total) {
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
  /**
   * 判断admin的值
   * 为1：跳转到空间内发起人进行投票
   * 为0：跳转到我要参与的投票
   */
  if(props.admin == 1) {

  } else {
    router.push({
      path: "/join/vote",
      query: {
        id:  item.id,
        voteType: item.voteType,
        endTime: item.endTime
      }
    })
  }
  
}
</script>

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
        <span class="text-base font-semibold">{{ item.voteName }}</span>
        <span class="text-xs">
          <span class="bg-hex-41BD62 text-white px-2 py-1 rounded" v-if="item.status">投票中</span>
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
