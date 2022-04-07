<template>
  <div class="ckeckIn_box">
    <div class="checkIn_top py-3">
      <div class="check_icon">
        <van-icon name="location-o" />
      </div>
      <div class="text-center mb-5">
        <span class="check_btn p-3">发起签到</span>
      </div>
    </div>
    <div class="checkIn_body mt-4 text-sm text-left p-4 leading-loose">
      <div class="title">怎么签到</div>
      <div class="content px-4">
        先打开WIFI（只需要打开，连不连接都可以），然后点击上方签到按钮
      </div>
      <div class="title">定位失败怎么办</div>
      <div class="content px-4">
        确保WIFI已经打开，且能够搜索到周围的WIFI信号，最好同时打开GPS
      </div>
      <div class="title">有问题、意见、建议</div>
      <div class="content px-4">
        如果在使用过程中有什么问题、意见或建议，并且在<a class="link"
          >使用帮助</a
        >中也无法找到想要的结果时 ，可以通过<a class="link">留言反馈</a
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

<script setup lang="ts"></script>

<style scoped>
.check_btn {
  height: 2em;
  width: 5em;
  border-radius: 3px;
  color: rgb(65, 170, 98);
  border: 1px solid rgb(65, 170, 98);
}
.checkIn_top {
  background-color: rgb(242, 239, 246);
}
.check_icon {
  font-size: 5em;
  color: rgb(65, 170, 98);
}
.checkIn_body {
  background-color: rgb(247, 247, 247);
}
.title {
  color: rgb(65, 170, 98);
}
.content {
  color: rgb(134, 134, 134);
}
.link {
  color: rgb(0, 102, 255);
}
.help_btn {
  border-radius: 3px;
  border: 1px solid rgb(129, 185, 138);
  background-color: rgb(129, 185, 138);
}
</style>
