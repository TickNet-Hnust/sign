<script setup lang="ts">

import { Toast } from 'vant'
import { getCurrentInstance } from 'vue'
import { modifyDraw } from '~/api/myJoin/draw'
import { getDraw } from '~/api/myJoin/record'
// 投票日期修改 数据类型
interface ModifyDrawData{
  nowTime: string
  // 日期选择器
  drawDate: string
  maxDate: Date
  minDate: Date
  // 时间选择器
  drawTime: string
  minHour: string|number
  maxHour: string|number
  minMinute: string|number
  maxMinute: string|number
  // 权限查看
  visible: number
}

// 接受父组件相关参数
const props = defineProps({
  drawDate: String,
  drawTime: String,
  drawId: Number,
  visible: Number,
})

const emit = defineEmits([
  'modifyConfig',
])

const { eventHub } = getCurrentInstance()?.proxy
// 控制遮罩层是否显示
const dialogShow = ref(false)

// 控制日期选择器弹出层
const datePopupShow = ref(false)
const currentDate = ref(new Date(2022, 5, 12))

// 控制时间选择器弹出层
const currentTime = ref(' ')
const timePopupShow = ref(false)

// 控制查看权限选项器弹出层
const visiblePopupShow = ref(false)

const modifyDrawData: ModifyDrawData = reactive({
  nowTime: '',
  drawDate: '',
  maxDate: new Date(2025, 0, 1),
  minDate: new Date(2021, 10, 1),
  drawTime: '',
  minHour: computed(() => {
    return modifyDrawData.drawDate === modifyDrawData.nowTime ? modifyDrawData.minDate.getHours() : 0
  }),
  maxHour: 23,
  minMinute: computed(() => {
    return modifyDrawData.drawDate === modifyDrawData.nowTime ? modifyDrawData.minDate.getMinutes() : 0
  }),
  maxMinute: 59,
  visible: 0,
})

const init = () => {
  const dateArr = String(props.drawDate).split('-')
  const nowTime = new Date()
  const year = nowTime.getFullYear()
  let month: number|string = nowTime.getMonth() + 1
  let day: number|string = nowTime.getDate()
  if (month >= 1 && month <= 9)
    month = `0${month}`
  if (day >= 1 && day <= 9)
    day = `0${day}`
  modifyDrawData.nowTime = `${year}-${month}-${day}`
  modifyDrawData.drawDate = String(props.drawDate)
  modifyDrawData.drawTime = String(props.drawTime)
  modifyDrawData.minDate = new Date()
  modifyDrawData.visible = Number(props.visible)
  currentTime.value = String(props.drawTime)
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
  modifyDrawData.drawDate = `${year}-${month}-${day}`
  datePopupShow.value = false
}

const confirmPickerTime = () => {
  modifyDrawData.drawTime = currentTime.value
  timePopupShow.value = false
}

// 查看选线选择器参数设置
const defaultIndex = ref(Number(props.visible))
const columns = ['仅发起人可见', '参与人可见']
const confirmAnonymous = (value: string, index: number) => {
  modifyDrawData.visible = index
  defaultIndex.value = index
  visiblePopupShow.value = false
}
const cancelAnonymous = () => {
  visiblePopupShow.value = false
}
// 提交信息
const modifyTime = () => {
  const time = `${modifyDrawData.drawDate} ${modifyDrawData.drawTime}:00`
  console.warn(time, Number(props.drawId), modifyDrawData.visible)
  modifyDraw(Number(props.drawId), time, modifyDrawData.visible).then((res: any) => {
    console.warn(res)
    if (res.code === 200) {
      Toast.success({
        message: '修改成功',
        onClose() {
          getDraw(Number(props.drawId)).then((res: any) => {
            console.warn(res)
            if (res.code === 200) {
              emit('modifyConfig')
              eventHub.$emit('refreshList', 'draw')
            }
          }).catch(() => {

          })
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
    <div>修改部分设置</div>
  </div>
  <van-dialog v-model:show="dialogShow" show-cancel-button confirm-button-color="#0066CC" @confirm="modifyTime()">
    <div class="p-1rem font-600 text-lg">
      修改抽签部分设置
    </div>
    <van-cell
      title="截止日期"
      is-link
      :value="modifyDrawData.drawDate?modifyDrawData.drawDate:props.drawDate"
      title-style="text-align: left"
      @click="datePopupShow = true"
    />
    <van-cell
      title="截止时间"
      is-link
      :value="modifyDrawData.drawTime?modifyDrawData.drawTime:props.drawTime"
      title-style="text-align: left"
      @click="timePopupShow = true"
    />
    <van-cell
      title="抽签查看权限"
      is-link
      :value="modifyDrawData.visible?'参与人可见':'仅发起人可见'"
      title-style="text-align: left"
      @click="visiblePopupShow = true"
    />
  </van-dialog>
  <van-popup v-model:show="datePopupShow" position="bottom">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择截止日期"
      :min-date="modifyDrawData.minDate"
      :max-date="modifyDrawData.maxDate"
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
      :min-hour="modifyDrawData.minHour"
      :max-hour="modifyDrawData.maxHour"
      :min-minute="modifyDrawData.minMinute"
      :max-minute="modifyDrawData.maxMinute"
      @cancel="timePopupShow = false"
      @confirm="confirmPickerTime"
    />
  </van-popup>
  <van-popup v-model:show="visiblePopupShow" position="bottom">
    <van-picker title="抽签查看权限" :columns="columns" :default-index="defaultIndex" @confirm="confirmAnonymous" @cancel="cancelAnonymous" />
  </van-popup>
</template>
