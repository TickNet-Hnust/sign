<script setup lang="ts">
import { Dialog } from 'vant'
// 定义投票数据类型接口
interface DrawData {
  type: string // 抽签或者投票
  question: string
  optionNum: number // 选项总个数
  status: string // 当前抽签进行状态
  allPollNum: number // 总票数
  drawingAlreadyNum: number // 已经抽签票数
  lastTime: string
  optionChecked: number // 被选择的选项id
  isDrawing: boolean // 是否投票，true表示没有投票
  permissions: boolean // 是否所有人可见权限
  option: Array<OptionData> // 选项具体数据
  text: string // 按钮的文本
}

// 定义投票选项数据类型接口
interface OptionData{
  name: number // id进项选项的识别
  optionValue: string
  poll: number
}

const drawData: DrawData = reactive({
  type: '抽签',
  question: '冬奥会2022年什么时候举办?',
  optionNum: 3,
  status: '进行中',
  allPollNum: 8,
  drawingAlreadyNum: 5,
  lastTime: '01-17 12:23',
  optionChecked: 0,
  isDrawing: false,
  permissions: true,
  option: [
    {
      name: 1, // 自动生成id
      optionValue: '2月3号',
      poll: 1,
    },
    {
      name: 2,
      optionValue: '2月4号',
      poll: 4,
    },
    {
      name: 3,
      optionValue: '2月5号',
      poll: 0,
    },
  ],
  text: computed(() => {
    return drawData.isDrawing ? '开始抽签' : '已抽签'
  }),
})

// 参数数据
// const params = reactive({
//   type: drawData.type,
//   show: false,
// })
const show = ref(false)
const showChange = function() {
  show.value = !show.value
}

const isClick = () => {
  drawData.optionChecked = Math.floor(Math.random() * 3 + 1)
  drawData.option[drawData.optionChecked - 1].poll = drawData.option[drawData.optionChecked - 1].poll + 1
  drawData.isDrawing = true
  drawData.drawingAlreadyNum = drawData.drawingAlreadyNum + 1
  Dialog.alert({
    title: '抽取结果',
    message: drawData.option[drawData.optionChecked - 1].optionValue,
    confirmButtonColor: '#0033D1',
  }).then(() => {
  // on close
  })
}

const normal = 'background-color: #ffffff;border-color: #E1E2E3;'// 普通选项的样式
const active = 'background-color:#C8E5C9;border-color: #1FA71F;'// 被选中后选项的样式

</script>

<template>
  <div class="bg-true-gray-50 w-screen h-screen p-6">
    <div class="border-gray-200 border p-3 bg-white text-left">
      <div class="mb-3">
        {{ drawData.question }}
      </div>
      <van-tag size="large" type="primary" color="#66ccff" class="mr-3">
        {{ drawData.status }}
      </van-tag>
      <van-tag size="large" type="primary" color="#28b648">
        {{ "已抽" + drawData.drawingAlreadyNum + " / " + drawData.allPollNum }}
      </van-tag>
    </div>
    <div>
      <div v-for="item in drawData.option" :key="item.name">
        <div class="mt-5 text-left border p-2 text-base" :name="item.name" :style="drawData.isDrawing&&item.name===drawData.optionChecked?active:normal" @click="drawData.isDrawing&&item.name===drawData.optionChecked?show = true:''">
          <div>
            <span>{{ item.optionValue }}</span>
            <span class="float-right text-gray-500">&times;1</span>
          </div>
        </div>
      </div>
    </div>
    <div class="text-cool-gray-500">
      <div class="text-xs my-3 text-left px-2">
        {{ "截止时间：" + drawData.lastTime }}
      </div>
      <div class="flex justify-center">
        <van-button type="primary" size="large" class="font-400" :disabled="drawData.isDrawing" :color="drawData.isDrawing?'#9DD49D':'#1FA71F'" @click="isClick()">
          {{ drawData.text }}
        </van-button>
      </div>
    </div>
    <records-list :show="show" :type="drawData.type" @show-change="showChange()" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
  title: 我要抽签
</route>
