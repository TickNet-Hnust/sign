<script lang="ts" setup>
import { Toast } from 'vant'
import { modifyDraw } from '~/api/myJoin/draw'

const router = useRouter()
const route = useRoute()
const drawId = Number(route.query.id)

interface ModifyDrawData {
  modifyDuration: number
  anonymity: number
}

const modifyDrawData: ModifyDrawData = reactive({
  modifyDuration: 30,
  anonymity: Number(route.query.anonymity),
})

const timePopup = ref(false)
const currentTime = ref('00:30')

const confirmModifyTime = () => {
  const arr = currentTime.value.split(':')
  modifyDrawData.modifyDuration = Number(arr[0]) * 60 + Number(arr[1])
  timePopup.value = false
}

const cancleModifyTime = () => {
  const minute = modifyDrawData.modifyDuration % 60
  const hour = Math.floor(modifyDrawData.modifyDuration / 60)
  timePopup.value = false
  currentTime.value = `${hour}:${minute}`
}

const anonymousPopup = ref(false)
const defaultIndex = ref(Number(route.query.anonymity))
const columns = ['仅发起人可见', '参与人可见']
const confirmAnonymous = (value: string, index: number) => {
  modifyDrawData.anonymity = index
  defaultIndex.value = index
  anonymousPopup.value = false
}

const commitModifyInfo = () => {
  modifyDraw(drawId, modifyDrawData.modifyDuration, modifyDrawData.anonymity).then((res: any) => {
    if (res.code === 200) {
      Toast.success({
        message: '抽签信息修改成功',
        onClose() {
          router.push({
            path: '/space/manage/draw/owner_draw',
            query: { id: drawId },
          })
        },
      })
    }
    else {
      Toast({
        message: '修改失败',
      })
    }
  })
}
</script>

<template>
  <div class="bg-gray-100 p-3 h-full">
    <div class="text-xs text-left mt-3 px-3" style="color: rgb(148, 149, 150)">
      修改部分设置
    </div>
    <div class="border-t-1 border-hex-DFDFE0 bg-white text-sm mt-1">
      <div class="border-b-1 border-hex-DFDFE0 p-3 flex justify-between">
        <span>持续时间(分钟)</span>
        <span>
          {{ modifyDrawData.modifyDuration }}
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
      <div class="border-b-1 border-hex-DFDFE0 p-3 flex justify-between">
        <span>抽签查看权限</span>
        <span>
          {{ modifyDrawData.anonymity?'参与人可见':'仅发起人可见' }}
          <i>
            <van-icon name="arrow" @click="anonymousPopup = true" />
          </i>
          <van-popup v-model:show="anonymousPopup" position="bottom">
            <van-picker title="标题" :columns="columns" :default-index="defaultIndex" @confirm="confirmAnonymous" @cancel="anonymousPopup = false" />
          </van-popup>
        </span>
      </div>
    </div>
    <div class="mt-5">
      <van-button color="rgb(31,167,31)" size="large" @click="commitModifyInfo()">
        确定修改
      </van-button>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 抽签管理
</route>
