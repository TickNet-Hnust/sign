<script setup lang="ts">
import { signByUser, signQRCode } from '~/api/record/index'
import { Toast } from 'vant'
const stuMsg = reactive({
  stuNum: '',
  stuName: ''
})
const route = useRoute()
const signId = route.query.id
const spaceName = route.query.spaceName
const QRUrl = ref('')
const helpSign = () => {
  const request = reactive({
    signId: signId,
    userId: stuMsg.stuNum,
    userName: stuMsg.stuName
  })
  signByUser(request).then((res: any) => {
    if(res.code === 200){
      Toast.success({
        message: '补录成功',
        duration: 700
      })
      stuMsg.stuNum = '',
      stuMsg.stuName = ''
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
const QRRequest = reactive({
  signId: signId,
  path: 'http://localhost:3333/sign/record/checkRecord/helpJumpPage'
})
const loadingImg = ref(true)
const getQRCode = () => {
  signQRCode(QRRequest).then((res: any) => {
    if(res.code === 200) {
      QRUrl.value = res.data.url
      loadingImg.value = false
    }
  }).catch((err) => {
    console.log(err)
  })
}
const refresh = () => {
  getQRCode()
}
const activeTab = ref('byName')
const changeTab = () => {
  if(activeTab.value === 'byCode') {
    refresh()
  } else {
    stuMsg.value.stuNum = ''
    stuMsg.value.stuName = ''
  }
}
</script>
<template>
  <div class="p-3 bg-gray-100 min-h-100vh">
    <div
      class="p-3 text-xs text-left rounded"
      style="
        background-color: rgb(224, 250, 251);
        color: rgb(0, 51, 153);
        line-height: 25px;
        border: 1px solid rgb(166, 222, 251);
      "
    >
      <div>辅助签到用法：</div>
      <div class="px-8">
        1.签到发起人可以通过直接补录未签到同学的信息来让其签到
        <br />
        2.签到发起人可以通过生成二维码让签到不成功的同学签到
      </div>
    </div>
    <div class="m-t-4">
      <van-tabs color="rgb(0,51,255)" title-active-color="rgb(0,51,255)" @change="changeTab()" v-model:active="activeTab">
        <!-- 如果是非空间的签到则不展示学号姓名补录 -->
        <van-tab v-if="spaceName !== '无' " title="直接补录" name="byName">
          <div class="text-left mt-6 border-1 p-4 border-gray-500/50 rounded bg-white">
            <van-cell-group border="false">
              <van-field
                v-model="stuMsg.stuNum"
                label-width="3em"
                label="学号："
                placeholder="请输入需要补录学生的学号"
              />
              <van-field
                v-model="stuMsg.stuName"
                label-width="3em"
                label="姓名："
                placeholder="请输入需要补录学生的姓名"
              />
            </van-cell-group>
          </div>
          <div class="mt-8">
            <van-button type="success" size="large" @click="helpSign()">补录</van-button>
          </div>
        </van-tab>
        <van-tab title="生成二维码" name="byCode">
          <div class="mt-6 border-1 p-4 border-gray-500/50 font-semibold rounded bg-white">
            辅助扫码签到（
            <span style="color: rgb(0, 102, 255)" @click="refresh()">刷新</span>
            ）
            <div class="mt-5" v-if="loadingImg">
              <van-loading color="#999" type="spinner" size="30px" class="text-14px font-400">加载中...</van-loading>
            </div>
            <img
              class="px-10 py-5"
              :src="QRUrl"
            />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 辅助签到
</route>
