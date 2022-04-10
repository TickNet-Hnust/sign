<script setup lang="ts">
import { Dialog } from 'vant'

interface SignData{
  tittleText: string|undefined
  userName: string
  signCode: string // 用户输入的签到码
  code: string // 正确的签到码
  isCheckCode: boolean // 比较用户输入的签到码是否正确
}

const pattern = /^\d{4}$/ // 用户输入的签到码正则匹配规则
const signData: SignData = reactive({
  userName: '秦豪远',
  signCode: '',
  code: '2000',
  isCheckCode: false,
  tittleText: computed(() => {
    if (!pattern.test(signData.signCode))
      return '请输入4位有效的签到码*^_^*'
    else if (pattern.test(signData.signCode) && signData.code !== signData.signCode)
      return '你的附近好像没有该签到码噢'
    else if (pattern.test(signData.signCode) && signData.code === signData.signCode)
      return signData.userName
  }),

})

const checkCode = function() {
  if (signData.code === signData.signCode) {
    signData.isCheckCode = true
  }
  else {
    Dialog.alert({
      message: '签到码错误，请重新输入！！！',
    }).then(() => {
      // on close
    })
  }
}

</script>
<template>
  <div class="bg-true-gray-50 py-5 px-4">
    <div class="bg-cyan-100  rounded-sm border-1 border-blue-300 p-2 text-xs" style="background-color:#DFF7FA;color:#003399">
      {{ signData.tittleText }}
    </div>
    <div class="my-6 flex justify-center">
      <van-cell-group inset class="border rounded-0.5 w-25" style="border-color:#999999">
        <van-field v-model="signData.signCode" placeholder="输入签到码" input-align="center" class="p-1" maxlength="4" />
      </van-cell-group>
    </div>
    <div class="flex justify-center">
      <van-button plain type="primary" class="w-30 font-600" :color="pattern.test(signData.signCode) && signData.code === signData.signCode? '#41AA62':'#99CDAC'" @click="checkCode()">
        确认签到
      </van-button>
    </div>
  </div>
  <div class="bg-white p-4 text-left">
    <div class="text-green-600 text-xs">
      怎么定位
    </div>
    <div class="m-3 text-dark-600 text-xs  leading-6">
      先打开WIFI(只需要打开，连不连接都可以)，然后点击上方签到
    </div>
    <div class="text-green-600 text-xs">
      定位失败怎么办
    </div>
    <div class="m-3 text-dark-600 text-xs leading-6">
      确保WIFI已经打开，且能够搜索到周围的WIFI信号，最好同时打开GPS
    </div>
    <div class="text-green-600 text-xs">
      多次定位失败怎么办
    </div>
    <div class="m-3 text-dark-600 text-xs leading-6">
      如果多次签到失败，请寻找签到发起人进行扫码签到或者补录
    </div>
    <div class="text-green-600 text-xs">
      有问题、意见、建议
    </div>
    <div class="m-3 text-dark-600 text-xs leading-6">
      如果在使用过程中有什么问题、意见或建议，并且在
      使用帮助中也无法找到想要的结果时，可以通过留言
      反馈联系我们，留言时请务必说明具体情况（如签到
      问题请说明当前时间、地点、签到方式等等具体问题
      描述）
    </div>
    <van-button type="primary" block color="#81B98A" class="h-2rem font-400">
      查看更多帮助
    </van-button>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 我要签到
</route>
