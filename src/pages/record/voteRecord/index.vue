<script setup lang="ts">
import { getDetailVote, voteStuList } from '~/api/record/voteRecord'
import signList from '~/components/recordList/stuList.vue'
interface Choer {
  createUserId: String //学号
  createUserName: String //姓名
  createTime: String //投票
}
interface ChoList {
  choOption: String //选项名
  count: Number //票数
  isShow: Boolean //是否展开该列表
  choer: Array<Choer> //选中这个选项的人
}
// 已投票列表
const cho_list: Array<ChoList> = reactive([])
const voteCount = ref() // 已抽签人数
// 展示不同子列表
const changeShow = (item: any) => {
  if(!item.isShow) {
    item.isShow = true;
  } else {
    item.isShow = false;
  }
}
// 详细数据
const detailRecord = reactive({
  title: '',
  optionsList: [],
  optionsNum: [],
  visible: false
})
// 投票活动id
const route = useRoute()
const voteId = route.query.id
// 初始化数据
onMounted(() => {
  getDetailVote(voteId).then((res: any) => {
    if(res.code === 200) {
      detailRecord.title = res.data.voteName
      detailRecord.optionsList = res.data.voteOption
      detailRecord.optionsNum = res.data.optionCount
      voteCount.value = res.data.votedUsersCount
      const stuRequest = reactive({
        voteId: voteId,
        pageNum: 1,
        pageSize: 10,
        optionName: '',
        attend: 1
      })
      detailRecord.optionsList.forEach((item,index) => {
        let fItem:ChoList = {
          choOption: item,
          isShow: false,
          count: 0,
          choer: []
        }
        stuRequest.optionName = item
        voteStuList(stuRequest).then((res: any) => {
          fItem.count = res.data.total,
          fItem.choer = res.data.rows
          cho_list[index] = fItem
        })
      })
      console.log(cho_list)
    }
  }).catch((err) => {
    console.log(err)
  })
})
// 获取子组件传过来的未投票人数
const notSign = ref(0)
const getTotal = (total: any) => {
  notSign.value = total
}
</script>

<template>
  <div class="bg-gray-500/8 p-3 h-screen">
    <div>
      <div class="text-left ml-3">
        <span class="text-sm">票数统计</span>
        <span class="bg-hex-30B648 rounded-lg text-white text-xs py-0.5 px-2 ml-2">1 票</span>
      </div>
      <div class="text-left mt-2 p-5 text-sm bg-white rounded border-t-2 border-hex-30B648">
        <div class="text-16px font-700">投票标题：{{detailRecord.title}}</div>
        <div class="mt-2" v-for="(item ,index) in detailRecord.optionsList" :key="item">
          {{index+1}}. {{item}} （{{detailRecord.optionsNum[index]}} 票）
        </div>
      </div>
    </div>
    <div class="mt-3">
      <van-tabs color="rgb(40,182,72)" background="rgb(243,244,245)">
        <van-tab>
          <template #title>
            <span class="text-sm">已投票</span>
            <span class="bg-hex-30B648 rounded-lg text-white text-xs py-0.5 px-2 ml-2">{{voteCount}}人</span>
          </template>
          <div class="mt-3">
            <div
              v-for="item in cho_list"
              :key="item"
            >
              <div class="bg-white mt-3 rounded flex justify-between p-3 text-14px">
                 <div>
                    <span>投票：</span>
                    <span>{{item.choOption}}</span>
                  </div>
                  <div>
                    <span class="bg-hex-30B648 rounded-lg text-white text-xs py-0.5 px-2 mr-3">{{item.count}} 票</span>
                    <span @click="changeShow(item)">
                      <van-icon v-show=!item.isShow name="arrow-down" />
                      <van-icon v-show=item.isShow name="arrow-up" />
                    </span>
                  </div>
              </div>
              <div v-show="item.isShow" class="bg-white rounded border border-hex-ccc mt-3 px-5">
                <van-list>
                  <ul class="flex justify-around border-b border-hex-ccc py-3 text-sm">
                    <span class="flex-1">学号/工号<van-icon name="sort" /></span>
                    <span class="flex-1">姓名</span>
                    <span class="flex-1">时间</span
                    >
                  </ul>
                  <ul class="flex justify-around border-b border-hex-ccc py-3 text-sm" v-for="choerItem in item.choer" :key="choerItem">
                    <span class="flex-1">{{ choerItem.createUserId }}</span>
                    <span class="flex-1">{{ choerItem.createUserName }}</span>
                    <span class="flex-1">{{ choerItem.createTime }}</span>
                  </ul>
                  <ul class="text-xs py-3">
                    没有更多了
                  </ul>
                </van-list>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab>
          <template #title>
            <span class="text-sm">未投票</span>
            <span class="bg-hex-30B648 rounded-lg text-white text-xs py-0.5 px-2 ml-2">{{notSign}}人</span>
          </template>
          <stu-list @getTotal="getTotal" action="vote" :activityId="voteId" attend="0"></stu-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
  title: 投票记录
</route>

<style scoped>

</style>
