<script setup lang="ts">
import { Dialog } from 'vant'
import { getDrawNum } from '~/api/myJoin/draw'
import { getDraw } from '~/api/myJoin/record'
const route = useRoute()
// 定义投票数据类型接口
interface DrawData {
  type: string // 抽签或者投票
  question: string
  allPollNum: number // 总票数
  drawingAlreadyNum: number // 已经抽签票数
  endTime: string
  optionChecked: number // 被选择的选项id
  status: number // 当前抽签进行状态,进行状态(0未结束，1已结束)
  isDrawing: number // 是否投票，true表示没有投票(1已参与，0未参与)
  isVisible: number // 是否可见(0不可见，1可见)
  option: Array<OptionData> // 选项具体数据
  text: string // 按钮的文本
}

// 定义投票选项数据类型接口
interface OptionData{
  optionId: number // 选项的识别
  optionValue: string
  allPoll: number // 所有票数集合
  lastPoll: number // 剩余的票数
}

// 根据路由获得抽签活动的id
const drawId = Number(route.query.id)

const drawData: DrawData = reactive({
  type: '抽签',
  question: '',
  status: 0,
  allPollNum: computed(() => {
    let result = 0
    drawData.option.forEach((item) => {
      result = result + item.allPoll
    })
    return result
  }),
  drawingAlreadyNum: computed(() => {
    let result = 0
    drawData.option.forEach((item) => {
      result = result + item.lastPoll
    })
    return drawData.allPollNum - result
  }),
  endTime: '',
  optionChecked: 0,
  isDrawing: 0,
  isVisible: 1,
  option: [],
  text: computed(() => {
    return drawData.isDrawing ? '已抽签' : '开始抽签'
  }),
})

onMounted(() => {
  console.warn('发送axios请求')
  getDraw(drawId).then((res) => {
    console.warn('获取数据')
    console.warn(res)
    drawData.question = res.data.drawName
    drawData.endTime = res.data.endTime
    drawData.status = res.data.status
    drawData.isVisible = res.data.visible
    drawData.isDrawing = res.data.attend
    for (let i = 0; i < res.data.optionContent.length; i++) {
      const item = {
        optionId: i + 1,
        optionValue: res.data.optionContent[i],
        allPoll: res.data.optionNum[i],
        lastPoll: 0,
      }
      drawData.option.push(item)
    }
    getDrawNum(drawId).then((res) => {
      for (let i = 0; i < res.data.length; i++)
        drawData.option[i].lastPoll = res.data[i]
    })
  })
  console.warn(drawData.option)
})

const show = ref(false)
const showChange = function() {
  show.value = !show.value
}

const isClick = () => {
  getDrawNum(drawId).then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      drawData.option[i].lastPoll = res.data[i]
      console.warn('****')
    }
  })
  drawData.optionChecked = Math.floor(Math.random() * 3 + 1)
  drawData.option[drawData.optionChecked - 1].lastPoll = drawData.option[drawData.optionChecked - 1].lastPoll - 1
  drawData.isDrawing = 1
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
  <div class="bg-gray-500/8 w-screen h-screen p-6">
    <div class="border-gray-200 border p-3 bg-white text-left">
      <div class="mb-3">
        {{ drawData.question }}
      </div>
      <van-tag size="large" type="primary" color="#66ccff" class="mr-3">
        {{ drawData.status?'已结束':'进行中' }}
      </van-tag>
      <van-tag size="large" type="primary" color="#28b648">
        {{ "已抽" + drawData.drawingAlreadyNum + " / " + drawData.allPollNum }}
      </van-tag>
    </div>
    <div>
      <div v-for="item in drawData.option" :key="item.optionId">
        <div class="mt-5 text-left border p-2 text-base" :name="item.optionId" :style="drawData.isDrawing&&item.optionId===drawData.optionChecked?active:normal" @click="drawData.isDrawing&&item.optionId===drawData.optionChecked?show = true:''">
          <div v-if="drawData.optionChecked !== item.optionId && drawData">
            <span>{{ item.optionValue }}</span>
            <span class="float-right text-gray-500">&times;{{ item.lastPoll }}</span>
          </div>
          <div v-else>
            <span>{{ item.optionValue }}</span>
            <span class="float-right text-gray-500">已抽中该项</span>
          </div>
        </div>
      </div>
    </div>
    <div class="text-cool-gray-500">
      <div class="text-xs my-3 text-left px-2">
        {{ "截止时间：" + drawData.endTime }}
      </div>
      <div class="flex justify-left my-5 text-sm">
        <span class="border border-gray-300 bg-white p-5">
          <div />
          <div>抽签记录</div>
        </span>
        <span class="border border-gray-300 bg-white p-5 ml-2">
          <div />
          <div>修改部分设置</div>
        </span>
      </div>
      <div class="flex justify-center">
        <van-button type="primary" size="large" class="font-400" :disabled="drawData.isDrawing===1" :color="drawData.isDrawing?'#9DD49D':'#1FA71F'" @click="isClick()">
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
  title: 进行抽签
</route>
