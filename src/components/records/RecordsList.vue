<script setup lang="ts">
import { getDrawRecordList } from '~/api/myJoin/draw'
interface RecordInfo{ // 定义单个数据类型
  id: number
  createUserId: string
  createTime: string // 参与时间
  createUserName: string // 参加者姓名
}

// 父子组件传参，控制详细数据显示
const props = defineProps({
  drawId: {
    type: Number,
  },
  show: {
    type: Boolean,
  },
  type: { // 抽签或者投票等类型
    type: String,
  },
  optionCheckedValue: {
    type: String,
  },
})

// 接受父组件方法，改变show的值
const emit = defineEmits(['showChange'])
const fun = function() {
  emit('showChange')
}

const recordList: Array<RecordInfo> = reactive([])

// 控制分功能实现
const loading = ref(false)
const finished = ref(false)
const pageNum = ref(1)
const pageSize = 10
const onLoad = () => {
  if (props.type === '抽签') {
    getDrawRecordList(Number(props.drawId), pageNum.value, pageSize, String(props.optionCheckedValue)).then((res: any) => {
      recordList.push(...res.rows)
      if (res.rows.length < pageSize)
        finished.value = true
      else
        pageNum.value = pageNum.value + 1
      loading.value = false
    })
  }
}

</script>
<template>
  <van-overlay :show="props.show">
    <div class="flex items-center justify-center h-full">
      <div class="bg-white w-4/5 h-5/7 p-4 rounded-lg">
        <div class="font-600 mb-5">
          <span>{{ props.type }}记录</span>
          <van-icon name="cross" class="float-right text-base" @click="fun()" />
        </div>
        <div class="border rounded-lg h-4/5" style="border-color:#E4E4E4;background-color:#F6F7F9">
          <van-list v-model:loading="loading" :finished="finished" @load="onLoad">
            <van-cell v-for="item in recordList" :key="item.id" style="border-bottom-color:#E4E4E4;background-color:#F6F7F9">
              <span class="">{{ item.createUserName }}</span>
              <span class="float-right">{{ item.createTime }}</span>
            </van-cell>
          </van-list>
        </div>
      </div>
    </div>
  </van-overlay>
</template>
