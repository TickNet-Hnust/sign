<script setup lang="ts">

import { Toast } from 'vant'
import { modifyVoteTime } from '~/api/myJoin/vote'

// 投票日期修改 数据类型
interface VoteTime{
  nowTime: string
  // 日期选择器
  voteDate: string
  maxDate: Date
  minDate: Date
  // 时间选择器
  voteTime: string
  minHour: string|number
  maxHour: string|number
  minMinute: string|number
  maxMinute: string|number
}

// 接受父组件相关参数
const props = defineProps({
  voteDate: String,
  voteTime: String,
  voteId: Number,
})

// 控制遮罩层是否显示
const dialogShow = ref(false)

// 控制日期选择器弹出层
const datePopupShow = ref(false)
const currentDate = ref(new Date(2022, 5, 12))

// 控制时间选择器弹出层
const currentTime = ref(' ')
const timePopupShow = ref(false)

const voteTime: VoteTime = reactive({
  nowTime: '',
  voteDate: '',
  maxDate: new Date(2025, 0, 1),
  minDate: new Date(2021, 10, 1),
  voteTime: '',
  minHour: computed(() => {
    return voteTime.voteDate === voteTime.nowTime ? voteTime.minDate.getHours() : 0
  }),
  maxHour: 23,
  minMinute: computed(() => {
    return voteTime.voteDate === voteTime.nowTime ? voteTime.minDate.getMinutes() : 0
  }),
  maxMinute: 59,
})

const init = () => {
  const dateArr = String(props.voteDate).split('-')
  const nowTime = new Date()
  const year = nowTime.getFullYear()
  let month: number|string = nowTime.getMonth() + 1
  let day: number|string = nowTime.getDate()
  if (month >= 1 && month <= 9)
    month = `0${month}`
  if (day >= 1 && day <= 9)
    day = `0${day}`
  voteTime.nowTime = `${year}-${month}-${day}`
  voteTime.voteDate = String(props.voteDate)
  voteTime.voteTime = String(props.voteTime)
  voteTime.minDate = new Date()
  currentTime.value = String(props.voteTime)
  currentDate.value = new Date(Number(dateArr[0]), Number(dateArr[1]) - 1, Number(dateArr[2]))
  dialogShow.value = true
}

const formatter = (type: string, val: number) => {
  if (type === 'year')
    return `${val}年`

  if (type === 'month')
    return `${val}月`

  if (type === 'day')
    return `${val}日`

  if (type === 'hour')
    return `${val}时`

  else if (type === 'minute')
    return `${val}分`

  return val
}

// 日期格式化
const confirmPickerDate = (val: any) => {
  const year = val.getFullYear()
  let month = val.getMonth() + 1
  let day = val.getDate()
  if (month >= 1 && month <= 9)
    month = `0${month}`
  if (day >= 1 && day <= 9)
    day = `0${day}`
  voteTime.voteDate = `${year}-${month}-${day}`
  datePopupShow.value = false
}

const confirmPickerTime = () => {
  voteTime.voteTime = currentTime.value
  timePopupShow.value = false
}

// 提交信息
const modifyTime = () => {
  const time = `${voteTime.voteDate} ${voteTime.voteTime}:00`
  console.warn(time, Number(props.voteId))
  modifyVoteTime(Number(props.voteId), time).then((res: any) => {
    console.warn(res)
    if (res.code === 200) {
      Toast.success({
        message: '修改成功',
        onClose() {
          location.reload()
        },
      })
    }
    else {
      Toast.fail({
        message: '修改失败，请重试',
      })
    }
  })
}

</script>

<template>
  <div class="border border-gray-300 bg-white p-4 ml-2 w-30" @click="init()">
    <van-icon name="setting-o" size="2rem" class="mb-2" />
    <div>修改投票时间</div>
  </div>
  <van-dialog v-model:show="dialogShow" show-cancel-button confirm-button-color="#0066CC" @confirm="modifyTime()">
    <div class="p-1rem font-600 text-lg">
      修改投票结束时间
    </div>
    <van-cell
      title="截止日期"
      is-link
      :value="voteTime.voteDate?voteTime.voteDate:props.voteDate"
      @click="datePopupShow = true"
    />
    <van-cell
      title="截止时间"
      is-link
      :value="voteTime.voteTime?voteTime.voteTime:props.voteTime"
      @click="timePopupShow = true"
    />
  </van-dialog>
  <van-popup v-model:show="datePopupShow" position="bottom">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择截止日期"
      :min-date="voteTime.minDate"
      :max-date="voteTime.maxDate"
      :formatter="formatter"
      @cancel="datePopupShow = false"
      @confirm="confirmPickerDate"
    />
  </van-popup>
  <van-popup v-model:show="timePopupShow" position="bottom">
    <van-datetime-picker
      v-model="currentTime"
      type="time"
      title="选择时间"
      :min-hour="voteTime.minHour"
      :max-hour="voteTime.maxHour"
      :min-minute="voteTime.minMinute"
      :max-minute="voteTime.maxMinute"
      @cancel="timePopupShow = false"
      @confirm="confirmPickerTime"
    />
  </van-popup>
</template>
