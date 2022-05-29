<script setup lang="ts">
import { Toast } from 'vant'
import { draw } from '~/api/myJoin/draw'

const route = useRoute()
const router = useRouter()

interface Draw{
  drawName: string
  drawNum: number
  anonymous: number
  visible: number
  describe: string
  duration: number
  option: Array<Option>
  spaceId: number
}
interface Option{
  optionId: number
  content: string
  num: number
}

const key = ref(3) // 记录选项的唯一值
const hide_checked = ref(false)
const timePopup = ref(false)
const currentTime = ref('00:30')

const columns = ['仅发起人可见', '参与人可见']
const anonymousPopup = ref(false)
const defaultIndex = ref(0)

const drawInitData: Draw = reactive({
  drawName: '',
  drawNum: 1,
  anonymous: 0,
  visible: computed(() => {
    return hide_checked.value ? 0 : 1
  }),
  describe: '',
  duration: 30,
  option: [{ // 设置初始值
    optionId: 1,
    content: '',
    num: 1,
  }, {
    optionId: 2,
    content: '',
    num: 1,
  }],
  spaceId: 0,
})

// 选项票数减法
const subtraction = (item: Option) => {
  if (item.num > 1)
    item.num = item.num - 1
}

// 选项票数加法
const addition = (item: Option) => {
  item.num = item.num + 1
}

// 增加选项
const addOption = () => {
  const option: Option = {
    optionId: key.value,
    content: '',
    num: 1,
  }
  drawInitData.option.push(option)
  key.value = key.value + 1
}

const subOption = (item: Option, index: number) => {
  console.warn(item)
  drawInitData.option.splice(index, 1)
}

// const subDrawNum = () => {
//   if (drawInitData.drawNum > 1)
//     drawInitData.drawNum = drawInitData.drawNum - 1
// }

// const addDrawNum = () => {
//   drawInitData.drawNum = drawInitData.drawNum + 1
// }

const confirmModifyTime = () => {
  const arr = currentTime.value.split(':')
  drawInitData.duration = Number(arr[0]) * 60 + Number(arr[1])
  timePopup.value = false
}

const cancleModifyTime = () => {
  const minute = drawInitData.duration % 60
  const hour = Math.floor(drawInitData.duration / 60)
  timePopup.value = false
  currentTime.value = `${hour}:${minute}`
}

const confirmAnonymous = (value: string, index: number) => {
  drawInitData.anonymous = index
  defaultIndex.value = index
  anonymousPopup.value = false
}

const commitDrawInfo = () => {
  const newDrawData = {
    drawName: drawInitData.drawName,
    visible: drawInitData.visible,
    duration: drawInitData.duration,
    spaceId: route.query.id,
    anonymity: drawInitData.anonymous,
    optionContent: [''],
    optionNum: [0],
  }
  newDrawData.optionContent.pop()
  newDrawData.optionNum.pop()
  drawInitData.option.forEach((item: Option) => {
    newDrawData.optionContent.push(item.content)
    newDrawData.optionNum.push(item.num)
  })
  draw(newDrawData).then((res: any) => {
    console.warn(res)
    if (res.code === 500 || res.code === 501) {
      Toast.fail(res.msg)
    }
    else if (res.code === 200) {
      const id = res.data
      Toast.success({
        message: res.msg,
        onClose() {
          router.push({
            path: '/space/manage/draw/owner_draw',
            query: {
              id,
            },
          })
        },
      })
    }
  })
}

</script>
<template>
  <div class="bg-gray-100 p-3">
    <div class="bg-white rounded p-3 text-sm">
      <div class="text-left text-lg font-bold">
        <input v-model="drawInitData.drawName" placeholder="抽签标题">
      </div>
      <div class="text-left mt-2 pt-1rem border-t-1 border-hex-C9C9C9">
        <input v-model="drawInitData.describe" placeholder="描述（选填）">
      </div>
    </div>
    <div class="bg-white rounded mt-3 p-3 text-sm">
      <div class=" flex justify-between items-center border-b-1 border-hex-C9C9C9 py-1">
        <span>设置抽签选项</span>
      </div>
      <div v-for="(item,index) in drawInitData.option" :key="item.optionId" class=" flex justify-between items-center border-b-1 border-hex-C9C9C9 py-3">
        <span class="inline-block w-140px">
          <i class="bg-red-500 rounded-1/2 text-white text-xs py-0.7 px-1 mr-2" @click="subOption(item,index)">
            <van-icon name="minus" />
          </i>
          <input v-model="item.content" :placeholder="`选项${index + 1}`" class="w-100px">
        </span>
        <span class="inline-block w-100px">
          <i class="bg-hex-D7D7D7 color-hex-633333 text-xs p-1" @click="subtraction(item)">
            <van-icon name="minus" />
          </i>
          <i class="bg-hex-D7D7D7 color-hex-633333 ml-2 py-0.7 px-3 text-sm">
            {{ item.num }}
          </i>
          <i class="bg-hex-D7D7D7 color-hex-633333 ml-2 text-xs p-1" @click="addition(item)">
            <van-icon name="plus" />
          </i>
        </span>
      </div>
      <div class=" flex justify-between items-center border-b-1 border-hex-C9C9C9 text-blue-800 py-3">
        <span @click="addOption()">
          <i class="bg-blue-700 rounded-1/2 text-white text-xs py-0.7 px-1 mr-2"><van-icon name="plus" /></i>
          添加选项
        </span>
      </div>
    </div>
    <div class="bg-white rounded mt-3 p-3 text-sm">
      <div class=" flex justify-between items-center border-b-1 border-hex-C9C9C9 py-1">
        <span>隐藏选项</span>
        <span><van-switch v-model="hide_checked" size="1.5em" /></span>
      </div>
      <!-- <div class=" flex justify-between items-center border-b-1 border-hex-C9C9C9 py-3">
        <span> 每人可参与抽签次数 </span>
        <span>
          <i class="bg-hex-D7D7D7 color-hex-633333 text-xs p-1" @click="subDrawNum()">
            <van-icon name="minus" />
          </i>
          <i class="bg-hex-D7D7D7 color-hex-633333 ml-2 py-0.7 px-3 text-sm">{{ drawInitData.drawNum }}</i>
          <i class="bg-hex-D7D7D7 color-hex-633333 ml-2 text-xs p-1" @click="addDrawNum()">
            <van-icon name="plus" />
          </i>
        </span>
      </div> -->
      <div class=" flex justify-between items-center border-b-1 border-hex-C9C9C9 py-3">
        <span> 持续时间(分钟) </span>
        <span>
          {{ drawInitData.duration }}
          <i>
            <van-icon name="arrow" @click="timePopup = true" />
          </i>
          <van-popup v-model:show="timePopup" position="bottom">
            <van-datetime-picker
              v-model="currentTime"
              type="time"
              title="选择持续时间"
              :min-hour="0"
              :max-hour="23"
              @confirm="confirmModifyTime()"
              @cancel="cancleModifyTime()"
            />
          </van-popup>
        </span>
      </div>
      <div class=" flex justify-between items-center border-b-1 border-hex-C9C9C9 py-3">
        <span>抽签结果查看权限</span>
        <span>
          {{ drawInitData.anonymous?'参与人可见':'仅发起人可见' }}
          <i>
            <van-icon name="arrow" @click="anonymousPopup = true" />
          </i>
          <van-popup v-model:show="anonymousPopup" position="bottom">
            <van-picker title="标题" :columns="columns" :default-index="1" @confirm="confirmAnonymous" @cancel="anonymousPopup = false" />
          </van-popup>
        </span>
      </div>
    </div>
    <div class="text-left text-xs mt-2" style="color: #999">
      1&lt;=每人可参与抽签次数&lt;抽签总数
    </div>
    <div class="my-5">
      <van-button type="primary" size="large" color="rgb(40,182,72)" @click="commitDrawInfo()">
        发起抽签
      </van-button>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 发起抽签
</route>
