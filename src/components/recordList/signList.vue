<script setup lang="ts">
import { getSignList } from '~/api/record/signRecord'
interface RecordList{ // 定义记录列表
  id: Number, // 活动id
  attend: Number, // 用户是否参与过该活动
  status: Number, // 活动是否以及结束
  signName: String, //活动名称
  createTime: String, //开始时间
  endTime: String, //结束时间,
  spaceName: String, // 所属空间名称
  signCode: String // 签到码
}
var list: Array<RecordList> = reactive([]);
const loading = ref(false);
const finished = ref(false);
let pageCnt = ref(1);
// admin用来判断是用户发起的还是参与的
const props = defineProps({
  admin: Number
})
const request = reactive({
    pageNum: 1,
    pageSize: 10,
    signName: '',
    admin: props.admin
})
const getList = () => {
  request.pageNum = pageCnt.value
  getSignList(request).then((res: any) => {
    if(res.code === 200) {
      list.push(...res.rows)
      pageCnt.value++;
      loading.value = false
      if(list.length >= res.total) {
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
  // 判断admin的值，如果为1则跳转到签到记录页面，如果是0则跳转到我要签到页面
  if(props.admin == 1) {
    router.push({
      path: "/record/checkRecord",
      query: {
        id:  item.id,
        signName: item.signName,
        signCode: item.signCode,
        createTime: item.createTime,
        attend: item.attend
      }
    })
  } else {
    router.push({
      path: '/join/sign'
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
        <span class="text-base font-semibold">{{ item.signName }}</span>
        <span class="text-xs">
          <span class="bg-hex-41BD62 text-white px-2 py-1 rounded" v-if="item.status">签到中</span>
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
