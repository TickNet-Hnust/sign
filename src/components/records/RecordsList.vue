<script setup lang="ts">
import { getDrawRecordList } from '~/api/myJoin/draw'
import { getVoteRecordList } from '~/api/myJoin/vote'
interface RecordInfo{ // 定义单个数据类型
  id: number
  createUserId: string
  createTime: string // 参与时间
  createUserName: string // 参加者姓名
}

// 父子组件传参，控制详细数据显示
const props = defineProps({
  activeId: {
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
interface ListPage {
  loading: boolean
  finished: boolean
  pageNum: number
  pageSize: number
}
const listPage: ListPage = reactive({
  loading: false,
  finished: false,
  pageNum: 1,
  pageSize: 10,
})

// const optionCheckedValue = computed(() => {
//   return props.optionCheckedValue
// })
// let flag = 1
// watch(optionCheckedValue, (newVal: string) => {
//   console.warn('optionCheckedValue被更改')
//   console.warn(newVal)
//   recordList.length = 0
//   // eslint-disable-next-line no-empty
//   if (flag === 1) { flag = flag + 1}
//   else onLoad()
// })
const onLoad = () => {
  console.warn('onload')
  if (String(props.type) === '抽签') {
    console.warn('查看抽签人员名单')
    getDrawRecordList(Number(props.activeId), listPage.pageNum, listPage.pageSize, String(props.optionCheckedValue), 1).then((res: any) => {
      let i = 1
      console.warn(res)
      res.rows.forEach((item: any) => {
        const recordInfo: RecordInfo = {
          id: i,
          createUserId: item.createUserId,
          createUserName: item.createUserName,
          createTime: item.createTime,
        }
        recordList.push(recordInfo)
        i = i + 1
      })
      if (res.rows.length < listPage.pageSize)
        listPage.finished = true
      else
        listPage.pageNum = listPage.pageNum + 1
      listPage.loading = false
    })
  }
  else if (String(props.type) === '投票') {
    console.warn('查看投票人员名单')
    getVoteRecordList(Number(props.activeId), listPage.pageNum, listPage.pageSize, String(props.optionCheckedValue), 1).then((res: any) => {
      let i = 1
      console.warn(res)
      res.rows.forEach((item: any) => {
        const recordInfo: RecordInfo = {
          id: i,
          createUserId: item.createUserId,
          createUserName: item.createUserName,
          createTime: item.createTime,
        }
        recordList.push(recordInfo)
        i = i + 1
      })
      if (res.rows.length < listPage.pageSize)
        listPage.finished = true
      else
        listPage.pageNum = listPage.pageNum + 1
      listPage.loading = false
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
          <van-list v-model:loading="listPage.loading" :finished="listPage.finished" @load="onLoad">
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
