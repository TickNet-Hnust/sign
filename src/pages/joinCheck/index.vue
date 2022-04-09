<script setup lang="ts"></script>
<template>
  <div class="p-3">
    <div class="bg-hex-F2EFF6 p-3">
      <div class="text-sm p-2 bg-hex-E0FAFB text-hex-003399 border border-hex-A6DEFB mt-3">请输入4位有效的签到码*^_^*</div>
      <div class="w-133px mt-6 mx-auto">
        <van-field v-model="value" placeholder="输入签到码" class="text-xl" />
      </div>
      <div class="my-6 border w-150px mx-auto py-3 text-xl rounded border-hex-4FC09C text-hex-4FC09C">确认签到</div>
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
      <div class="color-hex-41AA62 mt-2">多次定位失败怎么办</div>
      <div class="bg-hex-f7f7f7 px-4">
       如果多次签到失败，请寻找签到发起人进行扫码签到或者补录
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
  title: 我要签到
</route>
