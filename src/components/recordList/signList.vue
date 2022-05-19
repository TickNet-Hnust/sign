<script setup lang="ts">
import { getSignList } from '~/api/record/signRecord'
interface RecordList{ // 定义记录列表
  id: Number // 活动id
  attend: Number // 用户是否参与过该活动
  status: Number // 活动是否以及结束
  activityName: String //活动名称
  createTime: String //开始时间
  endTime: String //结束时间,
  spaceName: String // 所属空间名称
  signCode: String // 签到码
  createUserName: String //发起人
}
// admin用来判断是用户发起的还是参与的
const props = defineProps({
  admin: Number
})
var list: Array<RecordList> = reactive([]);
const loading = ref(false);
const finished = ref(false);
const pageCnt = ref(1);
const request = reactive({
    pageNum: 1,
    pageSize: 10,
    signName: '',
    admin: props.admin
})
const showLoading = ref(true)
const getList = () => {
  request.pageNum = pageCnt.value
  getSignList(request).then((res: any) => {
    if(res.code === 200) {
      list.push(...res.rows)
      showLoading.value = false
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
// 初始化页面时请求一次数据（van-list的一个bug）
onMounted(() => {
  getList()
})
const onload = () => {
  setTimeout(() => {
    getList()
  }, 1000)
}
// 关键词搜索
const search = (signName: any) => {
  request.signName = signName
  list.length = 0
  pageCnt.value = 1
  getList()
}
defineExpose({search})
// 点击某条记录跳转
const router = useRouter()
const jumpDetail = (item: any) => {
  /**
   * 首先判断用户身份
   * 如果是发起者, 则跳转到发起记录下的签到记录
   * 如果是参与者，则判断用户是否已经参与过该活动
   *   如果没有参与过，则跳转到我要参与下的我要签到
   *   如果已经参与了，则跳转到我要参与下的签到记录
   */
  if( Number(props.admin) === 1 ) {
    // if(item.spaceName === '无' || item.spaceName === '') {
    //   router.push({
    //     path: "/record/checkRecord",
    //     query: {
    //       id:  item.id,
    //     }
    //   })
    // } else {
      router.push({
        path: "/record/checkRecord",
        query: {
          id:  item.id,
        }
      })
    // }
    
    
  } else {
    if( item.attend ) {
      router.push({
      path: "/join/sign/detail",
      query: {
        id:  item.id,
      }
    })
    } else {
      router.push({
      path: "/joinCheck",
    })
    }
  }
}

</script>

<template>
  <van-loading
    color="#666"
    type="spinner"
    class="mt-5"
    size="24px"
    v-if="showLoading"
    vertical>加载中...</van-loading>
  <van-empty v-if="list.length === 0" description="" />
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
           border: 10px solid transparent;
           border-left-color: #41BD62;
           border-top-color: #41BD62;
           position: absolute;
           top: 0;
           left: 0"
        v-if="!item.status"
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
           border: 10px solid transparent;
           border-left-color: #C9C9C9;
           border-top-color: #C9C9C9;
           position: absolute;
           top: 0;
           left: 0"
        v-if="item.status"
      ></div>
      <div style="display: flex; justify-content: space-between">
        <span
          class="text-base font-semibold w-48vw text-left"
           style="word-break:break-all;"
        >
          {{ item.activityName }}
        </span>
        <span class="text-xs w-5em">
          <span class="bg-hex-41BD62 text-white px-2 py-1 rounded" v-if="!item.status">签到中</span>
          <span class="bg-hex-C9C9C9 text-hex-7E7E7E px-2 py-1 rounded" v-if="item.status">已结束</span>
        </span>
      </div>
      <div class="text-xs text-gray-400 text-left mt-3">
        <span v-if="Number(props.admin) === 1">
          所属空间：{{ item.spaceName }}
          <span v-if="item.spaceName === '' "> --- </span>
        </span>
        <span v-if="Number(props.admin) !== 1">
          发起人：{{ item.createUserName }}
          <span v-if="item.createUserName === '' "> --- </span>
        </span>
        <span class="ml-3">{{ item.createTime }}</span>
      </div>
    </ul>
  </van-list>
</template>
