<script setup lang="ts">
import { getVoteList } from '~/api/record/voteRecord'
interface RecordList{ // 定义记录列表
  id: Number // 活动id
  attend: Number // 用户是否参与过该活动
  status: Number // 活动是否以及结束
  activityName: String // 活动名称
  createTime: String // 开始时间
  endTime: String // 结束时间
  spaceName: String // 所属空间名称
  signCode: String // 签到码
  voteNums: String
  voteType: Number
  createUserName: String // 发起人
}
// admin用来判断是用户发起的还是参与的
const props = defineProps({
  admin: Number,
})
const list: Array<RecordList> = reactive([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const pageCnt = ref(1)
const request = reactive({
  pageNum: 1,
  pageSize: 10,
  admin: props.admin,
  voteName: '',
})
const showLoading = ref(true)
const getList = () => {
  request.pageNum = pageCnt.value
  getVoteList(request).then((res: any) => {
    if (res.code === 200) {
      showLoading.value = false
      if(request.pageNum === 1 && list.length) {
        list.length = 0
      }
      list.push(...res.rows)
      pageCnt.value++
      loading.value = false
      if (list.length >= res.total) {
        console.log('数据加载完毕')
        finished.value = true
      }
    }
  }).catch((err) => {
    console.log(err)
  })
}
// 初始化页面时请求一次数据（van-list的一个bug）
onMounted(() => {
  getList()
})
const onload = () => {
  setTimeout(() => {
    if(refreshing.value) {
      refreshing.value = false
    }
    getList()
  }, 700)
}
const onRefresh = () => {
  finished.value = false
  pageCnt.value = 1
  loading.value = true
  onload()
}
const search = (voteName: any) => {
  request.voteName = voteName
  list.length = 0
  pageCnt.value = 1
  getList()
}
defineExpose({ search })
const router = useRouter()
const jumpDetail = (item: any) => {
  /**
   * 判断admin的值
   * 为1：跳转到空间内发起人进行投票
   * 为0：跳转到我要参与的投票
   */
  if (Number(props.admin) === 1) {
    router.push({
      path: '/space/manage/vote/owner_vote',
      query: {
        id: item.id,
      },
    })
  }
  else {
    router.push({
      path: '/join/vote',
      query: {
        id: item.id,
      },
    })
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
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :immediate-check="false"
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
          v-if="!item.status"
          class="h-0 w-0"
          style="
             border: 10px solid transparent;
             border-left-color: #41BD62;
             border-top-color: #41BD62;
             position: absolute;
             top: 0;
             left: 0"
        />
        <div
          v-if="item.attend === 1"
          class="w-54px h-54px"
          style="
            position: absolute;
            top: 0;
            right: 84px;
            background: url(join.png);
            background-size: 100%"
        />
        <div
          v-if="item.status"
          class="h-0 w-0"
          style="
             border: 10px solid transparent;
             border-left-color: #C9C9C9;
             border-top-color: #C9C9C9;
             position: absolute;
             top: 0;
             left: 0"
        />
        <div style="display: flex; justify-content: space-between">
          <span
            class="text-base font-semibold w-48vw text-left"
            style="word-break:break-all;"
          >{{ item.activityName }}</span>
          <span class="text-xs w-5em">
            <span v-if="!item.status" class="bg-hex-41BD62 text-white px-2 py-1 rounded">进行中</span>
            <span v-if="item.status" class="bg-hex-C9C9C9 text-hex-7E7E7E px-2 py-1 rounded">已结束</span>
          </span>
        </div>
        <div class="flex justify-between items-center text-xs text-gray-400 text-left mt-3">
          <span class="w-43vw" v-if="Number(props.admin) === 1">
            所属空间：{{ item.spaceName }}
            <span v-if="item.spaceName === '' "> --- </span>
          </span>
          <span class="w-43vw" v-if="Number(props.admin) !== 1">
            发起人：{{ item.createUserName }}
            <span v-if="item.createUserName === '' "> --- </span>
          </span>
          <span>{{ item.createTime }}</span>
        </div>
      </ul>
    </van-list>
  </van-pull-refresh>
</template>
