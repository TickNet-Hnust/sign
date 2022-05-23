<!--
 * @Descipttion: 
 * @Author: 刘晴
 * @Date: 2022-04-20 21:46:45
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-22 16:20:18
-->
<script setup lang="ts">
import { getDetailDraw, drawStuList, drawRecordCount } from '~/api/record/drawRecord'
interface DetailRecord{
  title: String //抽签标题
  optionsList: Array<String> // 选项列表
  optionsNum: Array<Number> // 选项票数列表
  visible: Number // 是否为盲抽 0为盲抽
  isShow: Array<Boolean> // 是否展开某个选项列表
  currentNum: Array<Number> // 当前选中人数
}
// 如果抽签结果可见则展示这个数组
const drawCount = ref(0) // 已抽签人数
const notDraw = ref() // 未抽签人数
// 展示某个子菜单
const changeShow = (index: any) => {
  // 如果当前列表为空则不展示
  if(!detailRecord.currentNum[index]) {
    return 
  }
  if(!detailRecord.isShow[index]) {
    detailRecord.isShow[index] = true;
  } else {
    detailRecord.isShow[index] = false;
  }
}
const detailRecord: DetailRecord = reactive({
  title: '',
  optionsList: [],
  optionsNum: [],
  visible: 1,
  isShow: [],
  currentNum: []
})
// 抽签活动id
const route = useRoute()
const drawId = route.query.id
// 初始化数据
const showLoading = ref(true)
onMounted(() => {
  window.scrollTo(0,0)
  getDetailDraw(drawId).then((res: any) => {
    if(res.code === 200) {
      detailRecord.title = res.data.drawName
      detailRecord.optionsList = res.data.optionContent
      detailRecord.optionsNum = res.data.optionNum
      detailRecord.visible = res.data.visible
      detailRecord.optionsList.forEach((item, index) => {
        detailRecord.isShow[index] = false
      })
      setTimeout(() => {
        showLoading.value = false
      }, 100)
    }
  }).catch((err) => {
    console.log(err)
  })
  // 获取已抽签人数
  drawRecordCount({drawId: drawId}).then((res: any) => {
    if(res.code === 200) {
      detailRecord.currentNum = res.data
      detailRecord.currentNum.forEach((item) => {
        drawCount.value += Number(item)
      })
    }
  }).catch((err) => {
    console.log(err)
  })
  // 获取未抽签人数
  drawStuList({
    drawId: drawId,
    attend: 0,
    pageNum: 1,
    pageSize: 0
  }).then((res: any) => {
    if(res.code === 200) {
      notDraw.value = res.total
    }
  })
})
</script>

<template>
  <div style="position: absolute; top: 40vh;left: 45vw; z-index: 10">
    <van-loading
      v-if="showLoading"
      type="spinner"
      size="24px"
      color="#666"
      vertical
    />
  </div>
  <div v-if="!showLoading" class="bg-gray-500/8 p-3 min-h-100vh">
    <div>
      <div class="text-left ml-3">
        <span class="text-sm">签数统计</span>
      </div>
      <div class="text-left mt-2 p-5 text-sm bg-white rounded border-t-2 border-hex-30B648">
        <div class="text-16px font-700">抽签标题：{{detailRecord.title}}</div>
        <!-- <div class="mt-2" v-for="(item ,index) in detailRecord.optionsList" :key="item">
          {{index+1}}. {{item}} （{{detailRecord.optionsNum[index]}} 票）
        </div> -->
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
              v-for="(item, index) in detailRecord.optionsList"
              :key="item"
            >
              <div class="bg-white mt-3 rounded flex justify-between p-3 text-14px" @click="changeShow(index)">
                 <div>
                    <span>抽中：</span>
                    <span>{{item}}</span>
                  </div>
                  <div>
                    <span class="bg-hex-30B648 rounded-lg text-white text-xs py-0.5 px-2 mr-3">
                      {{detailRecord.currentNum[index]}} / {{detailRecord.optionsNum[index]}}
                    </span>
                    <span>
                      <van-icon v-show="!detailRecord.isShow[index]" name="arrow-down" />
                      <van-icon v-show="detailRecord.isShow[index]" name="arrow-up" />
                    </span>
                  </div>
              </div>
              <div v-show="detailRecord.isShow[index]">
                <stu-list
                  action="draw"
                  :activityId="drawId"
                  attend="1"
                  :optionName="item"
                >
                </stu-list>
              </div>
            </div>
          </div>
          <div v-if="!detailRecord.visible">
            <stu-list action="draw" :activityId="drawId" attend="1"></stu-list>
          </div>
        </van-tab>
        <van-tab>
          <template #title>
            <span class="text-sm">未抽签</span>
            <span class="bg-hex-30B648 rounded-lg text-white text-xs py-0.5 px-2 ml-2">{{notDraw}}人</span>
          </template>
          <stu-list action="draw" :activityId="drawId" attend="0"></stu-list>
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
