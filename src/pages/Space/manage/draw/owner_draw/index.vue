<script setup lang="ts">
import { addDrawRecord, drawRecordCount, getDrawNum } from '~/api/myJoin/draw'
import { getDraw } from '~/api/myJoin/record'
const route = useRoute()
const router = useRouter()
const loading = ref(true)
// 定义投票数据类型接口
interface DrawData {
  type: string // 抽签或者投票
  anonymity: number
  question: string
  allPollNum: number // 总票数
  drawingAlreadyNum: number // 已经抽签票数
  endTime: string
  createTime: string
  optionChecked: number // 被选择的选项id
  optionCheckedValue: string
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

const props = reactive({
  endDate: '',
  endTime: '',
  anonymity: 0,
})

// 根据路由获得抽签活动的id
const drawId = Number(route.query.id)

const drawData: DrawData = reactive({
  type: '抽签',
  anonymity: 0,
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
    let result = drawData.allPollNum
    drawData.option.forEach((item) => {
      result = result - item.lastPoll
    })
    return result
  }),
  endTime: '',
  createTime: '',
  optionChecked: 0,
  optionCheckedValue: '',
  isDrawing: 0,
  isVisible: 1,
  option: [{
    optionId: 0,
    optionValue: '',
    allPoll: 0,
    lastPoll: 0,
  }],
  text: computed(() => {
    if (drawData.status === 0)
      return drawData.isDrawing ? '已抽签' : '开始抽签'
    else
      return drawData.isDrawing ? '已抽签' : '已结束'
  }),
})

onMounted(() => {
  window.scrollTo(0, 0)
  getDraw(drawId).then((res) => {
    console.warn(res)
    drawData.question = res.data.drawName
    drawData.anonymity = res.data.anonymity
    drawData.createTime = res.data.createTime
    drawData.endTime = res.data.endTime
    props.endDate = drawData.endTime.split(' ')[0]
    props.endTime = `${drawData.endTime.split(' ')[1].split(':')[0]}:${drawData.endTime.split(' ')[1].split(':')[1]}`
    props.anonymity = drawData.anonymity
    drawData.status = res.data.status
    drawData.isVisible = res.data.visible
    drawData.isDrawing = res.data.attend
    drawData.optionChecked = res.data.attend ? res.data.optionName : 0
    drawData.option.pop()
    for (let i = 0; i < res.data.optionContent.length; i++) {
      const item = {
        optionId: i + 1,
        optionValue: res.data.optionContent[i],
        allPoll: 0,
        lastPoll: res.data.optionNum[i],
      }
      drawData.option.push(item)
    }
    for (let i = 0; i < res.data.optionContent.length; i++) {
      if (drawData.option[i].optionValue === res.data.optionName) {
        drawData.optionChecked = i + 1
        drawData.optionCheckedValue = drawData.option[i].optionValue
      }
    }
    drawRecordCount(drawId).then((res) => {
      for (let i = 0; i < res.data.length; i++)
        drawData.option[i].allPoll = drawData.option[i].lastPoll + res.data[i]
      loading.value = false
    })
  })
})

const show = ref(false)
const showChange = function() {
  show.value = !show.value
}

const resultShow = ref(false) // 控制结果展示
const isClick = () => {
  addDrawRecord(drawId).then((res) => {
    drawData.isDrawing = 1
    drawData.optionCheckedValue = res.data
    for (let i = 0; i < drawData.option.length; i++) {
      if (drawData.option[i].optionValue === res.data)
        drawData.optionChecked = drawData.option[i].optionId
    }
    resultShow.value = true
    getDrawNum(drawId).then((res) => {
      for (let i = 0; i < res.data.length; i++)
        drawData.option[i].lastPoll = res.data[i]
    })
  })
}

const normal = 'background-color: #ffffff;border-color: #E1E2E3;'// 普通选项的样式
const active = 'background-color:#C8E5C9;border-color: #1FA71F;'// 被选中后选项的样式

// 抽签记录跳转
const toDrawRecord = () => {
  router.push({
    path: '/record/sortitionRecord',
    query: {
      id: drawId,
    },
  })
}

</script>

<template>
  <div v-if="loading" class="bg-gray-500/8 w-screen h-screen p-3">
    <van-loading size="24px">
      加载中...
    </van-loading>
  </div>
  <div v-else class="bg-gray-500/8 w-screen h-screen p-3">
    <div class="border-gray-200 border p-3 bg-white text-left rounded">
      <div class="mb-3">
        {{ drawData.question }}
      </div>
      <van-tag size="medium" type="primary" :color="drawData.status?'#C9C9C9':'#66ccff'" class="mr-3">
        {{ drawData.status?'已结束':'进行中' }}
      </van-tag>
      <van-tag size="medium" type="primary" color="#28b648">
        {{ "已抽" + drawData.drawingAlreadyNum + " / " + drawData.allPollNum }}
      </van-tag>
    </div>
    <div v-if="drawData.isVisible">
      <div v-for="item in drawData.option" :key="item.optionId">
        <div class="mt-4 text-left border p-2.5 text-sm rounded" :name="item.optionId" :style="drawData.isDrawing&&item.optionId===drawData.optionChecked?active:normal" @click="drawData.isDrawing&&item.optionId===drawData.optionChecked?show = true:''">
          <div v-if="drawData.optionChecked !== item.optionId">
            <span>{{ item.optionValue }}</span>
            <span class="float-right text-gray-500 ">&times;{{ item.lastPoll }}</span>
          </div>
          <div v-else-if="drawData.optionChecked === item.optionId">
            <span>{{ item.optionValue }}</span>
            <span class="float-right text-gray-500">已抽中该项</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-for="item in drawData.option" :key="item.optionId">
        <div v-if="drawData.isDrawing === 0" class="mt-4 text-left border p-2.5 text-sm rounded" :name="item.optionId" :style="drawData.isDrawing&&item.optionId===drawData.optionChecked?active:normal" @click="drawData.isDrawing&&item.optionId===drawData.optionChecked?show = true:''">
          <div>
            <span>选项{{ item.optionId }}</span>
            <span class="float-right text-gray-500">&times;{{ item.lastPoll }}</span>
          </div>
        </div>
        <div v-else-if="drawData.optionChecked === item.optionId" class="mt-4 text-left border p-2.5 text-sm rounded" :name="item.optionId" :style="drawData.isDrawing&&item.optionId===drawData.optionChecked?active:normal" @click="drawData.isDrawing&&item.optionId===drawData.optionChecked?show = true:''">
          <div>
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
    </div>
    <div class="flex justify-center">
      <van-button type="primary" size="large" class="font-400" :disabled="drawData.status===1||drawData.isDrawing ===1" :color="drawData.status===1||drawData.isDrawing ===1?'#9DD49D':'#1FA71F'" @click="isClick()">
        {{ drawData.text }}
      </van-button>
    </div>
    <div class="flex justify-left my-5 text-sm">
      <div class="border-gray-300 bg-white p-4 w-30 border">
        <div @click="toDrawRecord()">
          <van-icon name="records" size="2rem" class="mb-2" />
          <div>抽签记录</div>
        </div>
      </div>
      <modify-draw :draw-date="props.endDate" :draw-id="drawId" :anonymity="drawData.anonymity" :draw-time="props.endTime" />
    </div>
    <van-dialog v-model:show="resultShow" title="抽取结果" confirm-button-color="#0033CC">
      <div class="my-1rem">
        {{ drawData.optionCheckedValue }}
      </div>
    </van-dialog>
    <records-list v-if="drawData.optionChecked&&drawData.anonymity" :show="show" :type="drawData.type" :active-id="drawId" :option-checked-value="drawData.option[drawData.optionChecked - 1].optionValue" @show-change="showChange()" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
  title: 进行抽签
</route>
