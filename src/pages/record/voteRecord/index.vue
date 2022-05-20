<script setup lang="ts">
import { getDetailVote, voteStuList } from '~/api/record/voteRecord'
interface DetailRecord{
  title: String //投票标题
  optionsList: Array<String> // 选项列表
  optionsNum: Array<Number> // 选项票数列表
  isShow: Array<Boolean> // 是否展开某个选项列表
}
// 已投票列表
const cho_list: Array<ChoList> = reactive([])
const voteCount = ref() // 已投票人数
const notVote = ref() // 未投票人数
// 展示不同子列表
const changeShow = (index: any) => {
  // 如果当前列表为空则不展示
  if(!detailRecord.optionsNum[index]) {
    return 
  }
  if(!detailRecord.isShow[index]) {
    detailRecord.isShow[index] = true;
  } else {
    detailRecord.isShow[index] = false;
  }
}
// 详细数据
const detailRecord:DetailRecord = reactive({
  title: '',
  optionsList: [],
  optionsNum: [],
  isShow: []
})
// 投票活动id
const route = useRoute()
const voteId = route.query.id
// 初始化数据
onMounted(() => {
  window.scrollTo(0,0)
  getDetailVote(voteId).then((res: any) => {
    if(res.code === 200) {
      detailRecord.title = res.data.voteName
      detailRecord.optionsList = res.data.voteOption
      detailRecord.optionsNum = res.data.optionCount
      voteCount.value = res.data.votedUsersCount
      detailRecord.optionsList.forEach((item,index) => {
        detailRecord.isShow[index] = false
      })
    }
  }).catch((err) => {
    console.log(err)
  })
  // 获取未投票人数
  voteStuList({
    voteId: voteId,
    attend: 0,
    pageNum: 1,
    pageSize: 0
  }).then((res: any) => {
    if(res.code === 200) {
      notVote.value = res.total
    }
  })
})

</script>

<template>
  <div class="bg-gray-500/8 p-3 min-h-screen">
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
              v-for="(item, index) in detailRecord.optionsList"
              :key="item"
            >
              <div class="bg-white mt-3 rounded flex justify-between p-3 text-14px" @click="changeShow(index)">
                 <div>
                    <span>投票：</span>
                    <span>{{item}}</span>
                  </div>
                  <div>
                    <span class="bg-hex-30B648 rounded-lg text-white text-xs py-0.5 px-2 mr-3">
                      {{detailRecord.optionsNum[index]}} 票
                    </span>
                    <span>
                      <van-icon v-show="!detailRecord.isShow[index]" name="arrow-down" />
                      <van-icon v-show="detailRecord.isShow[index]" name="arrow-up" />
                    </span>
                  </div>
              </div>
              <div v-show="detailRecord.isShow[index]">
                <stu-list
                  action="vote"
                  :activityId="voteId"
                  attend="1"
                  :optionName="item"
                >
                </stu-list>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab>
          <template #title>
            <span class="text-sm">未投票</span>
            <span class="bg-hex-30B648 rounded-lg text-white text-xs py-0.5 px-2 ml-2">{{notVote}}人</span>
          </template>
          <stu-list action="vote" :activityId="voteId" attend="0"></stu-list>
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
