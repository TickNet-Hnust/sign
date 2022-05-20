<!--
 * @Descipttion: 学生列表(应用在签到记录下的已签到、未签到学生列表以及抽签记录和投票记录下的学生列表)
 * @Author: 刘晴
 * @Date: 2022-05-13 17:40:33
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-20 14:31:04
-->
<script lang="ts" setup>
import { signStuList } from '~/api/record/signRecord'
import { drawStuList } from '~/api/record/drawRecord'
import { voteStuList } from '~/api/record/voteRecord'
interface StuList {
  createUserId: String // 学号/工号
  createUserName: String // 用户名
  createTime: String //时间
}
// 父组件传到子组件的查询参数
const props = defineProps({
  activityId: String, // 活动id
  attend: String, //1表示已签到，0表示未签到
  action: String,// sign：签到，draw：抽签，vote：投票
  optionName: String //选项名，用于抽签记录和投票记录的选中具体某个选项的学生列表
})
// 已签到学生列表
const clist:Array<StuList> = reactive([])
// 控制van-list加载
const loading = ref(false);
const finished = ref(false);
const pageNum = ref(1)
// 总记录条数
const totalRecord = ref(0)
// 请求学生列表
const getStuList = () => {
  // 签到
  if(props.action === 'sign') {
    const signRequest = reactive({
    // 签到请求参数
      signId: props.activityId,
      attend: props.attend,
      pageNum: pageNum.value,
      pageSize: 10
    })
    signStuList(signRequest).then((res: any) => {
      if(res.code === 200) {
        clist.push(...res.rows)
        totalRecord.value = res.total
        pageNum.value++
        loading.value = false
        if(clist.length >= res.total) {
          console.log('数据加载完毕')
          finished.value = true
        }
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  // 抽签
  else if(props.action === 'draw') {
    const drawRequest = reactive({
      // 抽签请求参数
      drawId: props.activityId,
      attend: props.attend,
      pageNum: pageNum.value,
      optionId: props.optionName,
      pageSize: 10
    })
    drawStuList(drawRequest).then((res: any) => {
      if(res.code === 200) {
        clist.push(...res.rows)
        totalRecord.value = res.total
        pageNum.value++
        loading.value = false
        if(clist.length >= res.total) {
          console.log('数据加载完毕')
          finished.value = true
        }
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }
  // 投票
  else if(props.action === 'vote') {
    const voteRequest = reactive({
      // 抽签请求参数
      voteId: props.activityId,
      attend: props.attend,
      pageNum: pageNum.value,
      pageSize: 10,
      optionName: props.optionName
    })
    voteStuList(voteRequest).then((res: any) => {
      if(res.code === 200) {
        clist.push(...res.rows)
        totalRecord.value = res.total
        pageNum.value++
        loading.value = false
        if(clist.length >= res.total) {
          console.log('数据加载完毕')
          finished.value = true
        }
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }
}
// 初始化页面时请求一次数据（van-list的一个bug）
onMounted(() => {
  getStuList()
})
const onLoad = () => {
  setTimeout(() => {
    getStuList()
  }, 500);
};
// 将总数据传给父组件
const emit = defineEmits(['getTotal'])
emit('getTotal', totalRecord)
</script>

<template>
  <div class="bg-white border border-hex-D9DADB rounded mt-5 p-3 border-t-2 border-t-hex-41B062">
    <van-list
      :immediate-check="false"
      v-model:loading="loading"
      :finished="finished"
      loading-text="——上拉加载更多——"
      @load="onLoad"
    >
      <ul class="flex py-2 text-sm">
        <span class="flex-1">学号/工号<van-icon name="sort" /></span>
        <span class="flex-1">姓名</span>
        <span class="flex-1" v-if="props.attend === '1' ">时间</span>
      </ul>
      <van-empty v-if="clist.length === 0" image-size="7rem" description="空~" />
      <ul v-for="item in clist" :key="item" class="flex items-center py-2 border-t border-hex-E4E4E4 text-sm">
        <span class="flex-1">{{ item.createUserId }}</span>
        <span class="flex-1">{{ item.createUserName }}</span>
        <span class="flex-1" v-if="props.attend === '1' ">{{ item.createTime }}</span>
      </ul>
    </van-list>
  </div>
</template>
