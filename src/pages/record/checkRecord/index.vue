
<script setup lang="ts">
import { detailSignRecord, changeSignMsg } from '~/api/record/signRecord'
import { FormInstance } from 'vant'
import { getCurrentInstance } from 'vue'
const { eventHub } = getCurrentInstance()?.proxy
// 签到活动id
const route = useRoute()
const signId = route.query.id
/**
 * attend表示查询的是已签到列表还是未签到列表
 * attend=1已签到
 * attend=0未签到
 */
const attend = ref('1')
// 详细信息
const detailMsg = ref({
  signName: '',// 签到名
  signCode: '',// 签到码
  createTime: '',// 创建日期
  createUserName: '',// 创建人
  spaceName: '', // 所属空间 如果是非空间的签到则为null
})
// 跳转到辅助签到页面
const router = useRouter()
const jumpPage = () => {
  router.push({
    path: '/record/checkRecord/help',
    query: {
      id: signId,
      spaceName: detailMsg.value.spaceName
    }
  })
}
// 跳转到签到统计页面
const jumpPageToScorecard = () => {
  router.push(({
    path: '/space/manage/scorecard',
    query: {
      id: signId,
      type: 'sign'
    }
  }))
}
//改变是否可见
const changeRequest = ref({
  id: signId,
  signName: '',
  duration: 2,
  visible: 1
})
const isShow = ref('yes')
const changeShow = () => {
  if(isShow.value === 'yes') {
    changeRequest.value.visible = 1
  } else {
    changeRequest.value.visible = 0
  }
  changeRequest.value.signName = signName.value
  changeSignMsg(changeRequest.value).then((res: any) => {
    // 改变名字或是否可见后应该通知列表页面重新加载
    eventHub.$emit('refreshList','sign')
  }).catch((err: any) => {
    console.log(err)
  })
}
// 初始化数据
const showLoading = ref(true)
const totalRecord = ref(0)
onMounted(() => {
  window.scrollTo(0,0)
  detailSignRecord(signId).then((res: any) => {
    if(res.code === 200) {
      detailMsg.value = res.data
      signName.value = detailMsg.value.signName
      if(res.data.visible === 1) isShow.value = 'yes'
      else isShow.value = 'no'
      setTimeout(() => {
        showLoading.value = false
      }, 200)
    }
  }).catch((err) => {
    console.log(err)
  })
})
// 获取子组件传过来的值
const getTotal = (total: any) => {
  totalRecord.value = total
}
// 编辑签到名
const signName = ref('')
const showDialog = ref(false)
const changeDialogShow = () => {
  showDialog.value = true
}
// 表单验证
const nameForm = ref<FormInstance>()
const validatorMessage = (val: any) => {
  if( val === '') {
    return '提示：输入内容不能为空'
  } else if(!/^[\u4E00-\u9FA5A-Za-z0-9\,\(\)\[\]_\"\'\u2018\u2019\u201C\u201D\u3010\u3011\uFF08\uFF09\u3001\uFF0C]+$/.test(val)){
    return '提示：不能有空格等特殊符号'
  }
}
const onBeforeClose = async (action, done) => {
  if(action === 'confirm') {
    editSignName()
  } else {
    signName.value = detailMsg.value.signName
    showDialog.value = false
  }
}
const editSignName = async () => {
  // 验证是否符合规则
  nameForm.value?.validate().then(() => {
    // 更改名字与更改用户是否可见用的是同一个接口，直接调用更改名字的方法即可
    if(signName.value !== detailMsg.value.signName) {
      detailMsg.value.signName = signName.value
      changeShow()
    }
    showDialog.value = false
  })
}
</script>
<template>
  <div style="position: absolute; top: 40vh;left: 45vw; z-index: 10">
    <van-loading
      v-if="showLoading"
      type="spinner"
      size="24px"
      color="#666"
      vertical
    />
  </div>
  <div v-if="!showLoading" class="bg-gray-500/8 p-3 min-h-100vh">
    <!-- <div class="text-left text-hex-999 text-12px">
      <span class="mr-1 text-sm"><van-icon name="column" /></span>签到信息
    </div> -->
    <div class="bg-white border border-t-2 border-hex-D9DADB border-t-hex-41B062 rounded">
      <div
        class="flex justify-between h-3em border-b border-hex-DEDEDE p-2 items-center"
      >
        <span class="bg-hex-D7D7D7 text-hex-222 rounded px-2 py-1">
          <span><van-icon name="column" /></span>
          <span class="text-sm ml-2">签到信息</span>
        </span>
      </div>
      <div
        class="flex justify-between h-3em border-b border-hex-DEDEDE p-2 items-center"
      >
        <span>
          <span class="text-sm w-5em text-left inline-block">签到码</span>
          <span class="text-sm ml-10">{{detailMsg.signCode}}</span>
        </span>
        <span
          class="text-xl bg-hex-10AA62 text-white rounded-15px px-1 mr-3"
          @click="jumpPage"
        >
          <van-icon name="qr" />
        </span>
      </div>
      <div
        class="flex justify-between border-b border-hex-DEDEDE p-2 items-center"
      >
        <span class="flex items-center">
          <span class="text-sm w-5em text-left inline-block">签到名称</span>
          <span class="text-left text-sm ml-10 w-9em" style="word-break:break-all;">{{detailMsg.signName}}</span>
        </span>
        <span
          class="mr-3 text-xl border text-center text-hex-10AA62 h-28px w-28px rounded-14px"
          @click="changeDialogShow"
        >
          <van-icon name="edit" />
        </span>
      </div>
      <div
        class="flex justify-between h-3em border-b border-hex-DEDEDE p-2 items-center"
      >
        <span class="text-sm w-5em text-left inline-block">签到统计</span>
        <span
          class="text-xl bg-hex-10AA62 text-white rounded-15px px-1 mr-3"
          @click="jumpPageToScorecard"
        >
          <van-icon name="fire-o" />
        </span>
      </div>
      <div
        class="flex justify-between h-3em border-b border-hex-DEDEDE p-2 items-center"
      >
        <span>
          <span class="text-sm w-5em text-left inline-block">日期</span>
          <span class="text-sm ml-10">{{detailMsg.createTime}}</span>
        </span>
      </div>
      <div
        class="flex justify-between h-3em border-b border-hex-DEDEDE p-2 items-center"
      >
        <span>
          <span class="text-sm w-5em text-left inline-block">发起人</span>
          <span class="text-sm ml-10">{{detailMsg.createUserName}}</span>
        </span>
      </div>
      <div
        class="flex justify-between h-3em p-2 text-sm items-center"
      >
        <span style="display: flex; justify-content: space-around">
          <span class="text-sm w-5em text-left inline-block">用户可见</span>
          <span class="ml-10">
            <van-radio-group @change="changeShow()" v-model="isShow" direction="horizontal">
              <van-radio checked-color="#10AA62" name="yes">可见</van-radio>
              <van-radio checked-color="#10AA62" name="no">不可见</van-radio>
            </van-radio-group>
          </span>
        </span>
      </div>
    </div>
    <!-- 编辑签到名称的弹出框 -->
    <van-dialog
      v-model:show="showDialog"
      title="编辑签到名称"
      confirm-button-color="rgb(63,133,255)"
      show-cancel-button
      :before-close="onBeforeClose"
    >
      <van-form ref="nameForm" error-message-align="center">
        <van-field
          :rules="[{ validator: validatorMessage}]"
          v-model="signName"
          placeholder="请输入活动名称"
          input-align="center"
        />
      </van-form>
    </van-dialog>
    <div class="bg-hex-E1FBE3 border border-hex-8FC798 rounded mt-5 p-4">
      <span v-if="attend === '1' ">共成功签到了{{totalRecord}}次</span>
      <span v-if="attend === '0' ">还有{{totalRecord}}人未签到</span>
    </div>
    <van-tabs v-if="detailMsg.spaceName !== '无' " v-model:active="attend" class="mt-3" color="rgb(40,182,72)">
      <van-tab title="已签到" name="1">
      </van-tab>
      <van-tab title="未签到" name="0">
      </van-tab>
    </van-tabs>
    <stu-list @getTotal="getTotal" v-if="attend === '1' " :activityId="signId" attend="1" action="sign"></stu-list>
    <stu-list @getTotal="getTotal" v-if="attend === '0' " :activityId="signId" attend="0" action="sign"></stu-list>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 签到列表
</route>
<style scoped>

</style>
