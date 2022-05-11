<script setup lang="ts">
import { getDetailDraw, drawStuList, drawRecordCount } from '~/api/record/drawRecord'
interface Choer {
  createUserId: String //学号
  createUserName: String //姓名
  createTime: String //抽中时间
}

interface ChoList {
  title: String //选项名
  count: Number //签数
  isShow: Boolean //是否可见
  choer: Array<Choer> //抽中这个签的人
}
const no_list = reactive([
  {
    num: "1905020118",
    name: "张三",
    status: "",
  },
  {
    num: "1905020118",
    name: "张三",
    status: "",
  },
  {
    num: "1905020118",
    name: "张三",
    status: "",
  },
  {
    num: "1905020118",
    name: "张三",
    status: "请假",
  },
  {
    num: "1905020118",
    name: "张三",
    status: "",
  },
  {
    num: "1905020118",
    name: "张三",
    status: "",
  },
]);
// 如果抽签结果可见则展示这个数组
const cho_list: Array<ChoList> = reactive([])
// 如果抽签结果不可见则展示这个数组
let notSeeList: Array<Choer> = reactive([])
const drawCount = ref() // 已抽签人数
const changeShow = (item) => {
  if(!item.isShow) {
    item.isShow = true;
  } else {
    item.isShow = false;
  }
}
const detailRecord = reactive({
  title: '',
  optionsList: [],
  optionsNum: [],
  visible: false
})
const initData = () => {
  getDetailDraw(10026).then((res: any) => {
    if(res.code === 200) {
      detailRecord.title = res.data.drawName
      detailRecord.optionsList = res.data.optionContent
      detailRecord.optionsNum = res.data.optionNum
      detailRecord.visible = res.data.visible
      if(detailRecord.visible) {
        const stuRequest = reactive({
          drawId: 10026,
          pageNum: 1,
          pageSize: 10,
          optionId: ''
        })
        detailRecord.optionsList.forEach((item,index) => {
          let fItem:ChoList = {
            title: item,
            isShow: false,
            count: 0,
            choer: []
          }
          stuRequest.optionId = item
          drawStuList(stuRequest).then((res: any) => {
            fItem.count = res.total,
            fItem.choer = res.rows
            cho_list[index] = fItem
          })
        })
        console.log(cho_list)
      } else {
        const stuRequest = reactive({
          drawId: 10026,
          pageNum: 1,
          pageSize: 10
        })
        drawStuList(stuRequest).then((res: any) => {
          if(res.code === 200) {
            notSeeList.push(...res.rows)
          }
        })
      }
    }
  }).catch((err) => {
    console.log(err)
  })
  drawRecordCount(10026).then((res: any) => {
    if(res.code === 200) {
      drawCount.value = res.data
    }
  }).catch((err) => {
    console.log(err)
  })
}
initData()
</script>

<template>
  <div class="bg-gray-500/8 p-3 h-screen">
    <div>
      <div class="text-left ml-3">
        <span class="text-sm">签数统计</span>
        <span class="bg-hex-30B648 rounded-lg text-white text-xs py-0.5 px-2 ml-2">1 票</span>
      </div>
      <div class="text-left mt-2 p-5 text-sm bg-white rounded border-t-2 border-hex-30B648">
        <div class="text-16px font-700">抽签标题：{{detailRecord.title}}</div>
        <div class="mt-2" v-for="(item ,index) in detailRecord.optionsList" :key="item">
          {{index+1}}. {{item}} （{{detailRecord.optionsNum[index]}} 票）
        </div>
      </div>
    </div>
    <div class="mt-3">
      <van-tabs color="rgb(40,182,72)" background="rgb(243,244,245)">
        <van-tab>
          <template #title>
            <span class="text-sm">已抽签</span>
            <span class="bg-hex-30B648 rounded-lg text-white text-xs py-0.5 px-2 ml-2">{{drawCount}}人</span>
          </template>
          <div class="mt-3" v-if="detailRecord.visible">
            <div
              v-for="item in cho_list"
              :key="item"
            >
              <div class="bg-white mt-3 rounded flex justify-between p-3 text-14px">
                 <div>
                    <span>抽中：</span>
                    <span>{{item.title}}</span>
                  </div>
                  <div>
                    <span class="bg-hex-30B648 rounded-lg text-white text-xs py-0.5 px-2 mr-3">{{item.count}}票</span>
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
          <div class="mt-3 bg-white rounded border border-hex-ccc px-5 py-2" v-if="!detailRecord.visible">
            <van-list>
              <ul class="flex justify-around border-b border-hex-ccc py-3 text-sm">
                <span class="flex-1">学号/工号<van-icon name="sort" /></span>
                <span class="flex-1">姓名</span>
                <span class="flex-1">时间</span
                >
              </ul>
              <ul class="flex justify-around border-b border-hex-ccc py-3 text-sm" v-for="item in notSeeList" :key="item">
                <span class="flex-1">{{ item.createUserId }}</span>
                <span class="flex-1">{{ item.createUserName }}</span>
                <span class="flex-1">{{ item.createTime }}</span>
              </ul>
              <ul class="text-x py-3">
                没有更多了
              </ul>
            </van-list>
          </div>
        </van-tab>
        <van-tab>
          <template #title>
            <span class="text-sm">未抽签</span>
            <span class="bg-hex-30B648 rounded-lg text-white text-xs py-0.5 px-2 ml-2">7人</span>
          </template>
          <div class="mt-3 bg-white rounded border border-hex-ccc px-5 py-2">
            <van-list>
              <ul class="flex justify-around border-b border-hex-ccc py-3 text-sm">
                <span class="flex-1">学号/工号<van-icon name="sort" /></span>
                <span class="flex-1">姓名</span>
                <span class="flex-1">状态</span
                >
              </ul>
              <ul class="flex justify-around border-b border-hex-ccc py-3 text-sm" v-for="item in no_list" :key="item">
                <span class="flex-1">{{ item.num }}</span>
                <span class="flex-1">{{ item.name }}</span>
                <span class="flex-1" style="color: rgb(0,102,204)">{{ item.status }}</span>
              </ul>
              <ul class="text-x py-3">
                没有更多了
              </ul>
            </van-list>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
  title: 抽签记录
</route>

<style scoped>

</style>
