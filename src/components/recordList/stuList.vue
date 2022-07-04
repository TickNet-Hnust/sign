<!--
 * @Descipttion: 学生列表(应用在签到记录下的已签到、未签到学生列表以及抽签记录和投票记录下的学生列表)
 * @Author: 刘晴
 * @Date: 2022-05-13 17:40:33
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-06-04 10:18:07
-->
<script lang="ts" setup>
import { signStuList } from '~/api/record/signRecord'
import { drawStuList } from '~/api/record/drawRecord'
import { voteStuList } from '~/api/record/voteRecord'
import { signByUser } from '~/api/record/index'
import { Toast } from 'vant'
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
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const isEmpty = ref(true)
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
        if(clist.length>0) {
          isEmpty.value = false
        }
        else {
          isEmpty.value = true
        }
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
      optionName: props.optionName,
      pageSize: 10
    })
    drawStuList(drawRequest).then((res: any) => {
      if(res.code === 200) {
        clist.push(...res.rows)
        totalRecord.value = res.total
        pageNum.value++
        loading.value = false
        if(clist.length>0) {
          isEmpty.value = false
        }
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
        if(clist.length>0) {
          isEmpty.value = false
        }
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
const choStuName = ref('')
const choStuId = ref('')
const isShow = ref(false)
const showDialog = (item: any) => {
  isShow.value = true
  choStuName.value = item.createUserName
  choStuId.value = item.createUserId
}
const helpSign = () => {
  // console.log(item)
  const request = reactive({
    signId: props.activityId,
    userId: choStuId.value,
    userName: choStuName.value
  })
  signByUser(request).then((res: any) => {
    if(res.code === 200){
      Toast.success({
        message: '补录成功',
        duration: 700
      })
      // 补录成功后重新请求数据
      onRefresh()
    } else {
      Toast.fail({
        message: res.msg,
        duration: 700
      })
    }
  }).catch((err) => {
    console.log(err)
  })
}
const onCancel = () => {
  choStuName.value = ''
  choStuId.value = ''
}
// 初始化页面时请求一次数据（van-list的一个bug）
onMounted(() => {
  getStuList()
})
const onLoad = () => {
  isLoading.value = true
  setTimeout(() => {
    if(refreshing.value) {
      refreshing.value = false
    }
    getStuList()
    isLoading.value = false
  }, 500);
};
const isLoading = ref(false)
const onRefresh = () => {
  if(!isLoading.value) {
    finished.value = false
    pageNum.value = 1
    clist.length = 0
    loading.value = true
    onLoad()
  }
}
// 将总数据传给父组件
const emit = defineEmits(['getTotal'])
emit('getTotal', totalRecord)
</script>

<template>
  <div class="bg-white border border-hex-D9DADB rounded p-3 border-t-2 border-t-hex-41B062 mt-5">
    <ul class="flex py-2 text-sm" style="position: relative">
      <span class="flex-1">学号/工号<van-icon name="sort" /></span>
      <span class="flex-1">姓名</span>
      <span class="flex-1" v-if="props.attend === '1' ">时间</span>
      <span class="flex-1" v-if="props.attend !=='1' && props.action === 'sign' ">补录</span>
      <span @click="onRefresh" style="position: absolute; top: -5px; right: -5px">
        <van-icon name="replay" :size="18" />
      </span>
    </ul>
    <van-list
      :immediate-check="false"
      v-model:loading="loading"
      :finished="finished"
      @load="onLoad"
    >
      <van-empty v-if="clist.length === 0 && isEmpty" image-size="7rem" description="空~" />
      <ul v-for="item in clist" :key="item" class="flex items-center py-2 border-t border-hex-E4E4E4 text-sm">
        <span class="flex-1">{{ item.createUserId }}</span>
        <span class="flex-1">{{ item.createUserName }}</span>
        <span class="flex-1" v-if="props.attend === '1' ">{{ item.createTime }}</span>
        <span class="flex-1" v-if="props.attend !=='1' && props.action === 'sign' ">
          <span class="text-hex-28B648 border border-hex-28B648 px-1.5 py-0.3 text-13px rounded" @click="showDialog(item)">补录</span>
          <!-- <van-button plain type="primary" color="rgb(40,182,72)" :size="15">补录</van-button> -->
        </span>
      </ul>
    </van-list>
  </div>
  <van-dialog v-model:show="isShow" title="补录" show-cancel-button @confirm="helpSign" @cancel="onCancel">
    <div class="my-5">确定将 <span class="text-hex-059669">{{choStuName}}</span> 设置为已签到吗？</div>
  </van-dialog>
</template>
