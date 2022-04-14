<script setup lang="ts">
import { Notify } from 'vant';
const signShow = ref(true)
const router = useRouter()
const launchSign = () => {
  signShow.value=!signShow.value
  Notify({
    message: '60分钟后自动结束签到',
    color: '#fff',
    background: 'rgba(0,0,0,.7)'
  })
}
const jumpRecord = () => {
  router.push('checkIn/checkList')
}
</script>
<template>
  <div class="p-3">
    <div class="bg-hex-F2EFF6 py-3">
      <div v-show="signShow">
        <div class="text-5em color-hex-41AA62">
          <van-icon name="location-o" />
        </div>
        <div class="text-center mb-5 mt-2">
          <span
            class="rounded text-hex-41AA62 border-1 p-3 px-7 text-xl"
            @click="launchSign"
          >
            发起签到
          </span>
        </div>
      </div>
      <div v-show="!signShow">
        <div class="text-sm p-2 bg-hex-E0FAFB text-hex-003399 border border-hex-A6DEFB mt-3 mx-5">张智豪</div>
        <div class="text-3xl mt-5">2 0 0 0</div>
        <div class="text-center mb-5 mt-8">
          <span
            class="rounded text-hex-41AA62 border-1 py-3 px-4 text-xl"
            @click="jumpRecord"
          >
            查看签到记录
          </span>
        </div>
      </div>
    </div>
    <div class="bg-hex-F7F7F7 mt-4 text-sm text-left p-4 leading-loose">
      <div class="color-hex-41AA62">怎么签到</div>
      <div class="bg-hex-f7f7f7 px-4">
        先打开WIFI（只需要打开，连不连接都可以），然后点击上方签到按钮
      </div>
      <div class="color-hex-41AA62 mt-2">定位失败怎么办</div>
      <div class="bg-hex-f7f7f7 px-4">
        确保WIFI已经打开，且能够搜索到周围的WIFI信号，最好同时打开GPS
      </div>
      <div class="color-hex-41AA62 mt-2">有问题、意见、建议</div>
      <div class="bg-hex-f7f7f7 px-4">
        如果在使用过程中有什么问题、意见或建议，并且在<a class="color-hex-0066FF"
          >使用帮助</a
        >中也无法找到想要的结果时 ，可以通过<a class="color-hex-0066FF">留言反馈</a
        >联系我们，留言时请务必说明具体情况（如签到问题请说明当前时间、地点、签到方式等等具体问题描述）
      </div>
      <div class="mt-5">
        <van-button size="large" color="rgb(129,185,138)">
          查看更多帮助
        </van-button>
      </div>
    </div>
  </div>
</template>




<route lang="yaml">
meta:
  layout: default
  title: 发起签到
</route>
