<script setup lang="ts">
const checked = ref(true)
const hide_checked = ref(false)
const draw_count1 = ref(1)
const draw_count2 = ref(1)
const add = (flag) => {
  if (flag)
    draw_count1.value = draw_count1.value + 1
  else if (flag == 0)
    draw_count2.value = draw_count2.value + 1
}
const sub = (flag) => {
  if (flag && draw_count1.value > 1)
    draw_count1.value = draw_count1.value - 1
  else if (flag == 0 && draw_count2.value > 1)
    draw_count2.value = draw_count2.value - 1
}
</script>
<template>
  <div class="bg-gray-100 p-3">
    <div class="bg-white rounded p-3 text-sm">
      <div class="text-left text-lg font-bold">
        <input placeholder="抽签标题">
      </div>
      <div class="text-left mt-2 pt-1rem border-t-1 border-hex-C9C9C9">
        <input placeholder="描述（选填）">
      </div>
    </div>
    <div class="bg-white rounded mt-3 p-3 text-sm">
      <div
        class="
          flex
          justify-between
          items-center
          border-b-1 border-hex-C9C9C9
          py-1
        "
      >
        <span>设置抽签选项可抽次数</span>
        <span><van-switch v-model="checked" size="1.5em" /></span>
      </div>
      <div
        class="
          flex
          justify-between
          items-center
          border-b-1 border-hex-C9C9C9
          py-3
        "
      >
        <span>
          <i class="bg-red-500 rounded-1/2 text-white text-xs py-0.7 px-1 mr-2"><van-icon name="minus" /></i>
          <input placeholder="选项1">
        </span>
        <span>
          <i
            class="bg-hex-D7D7D7
color-hex-633333 text-xs p-1" @click="sub(1)"
          >
            <van-icon name="minus" />
          </i>
          <i
            class="bg-hex-D7D7D7
color-hex-633333 ml-2 py-0.7 px-3 text-sm"
          >{{ draw_count1 }}</i>
          <i
            class="bg-hex-D7D7D7
color-hex-633333 ml-2 text-xs p-1" @click="add(1)"
          >
            <van-icon name="plus" />
          </i>
        </span>
      </div>
      <div
        class="
          flex
          justify-between
          items-center
          border-b-1 border-hex-C9C9C9
          py-3
        "
      >
        <span>
          <i class="bg-red-500 rounded-1/2 text-white text-xs py-0.7 px-1 mr-2"><van-icon name="minus" /></i>
          <input placeholder="选项2">
        </span>
        <span>
          <i
            class="bg-hex-D7D7D7
color-hex-633333 text-xs p-1" @click="sub(0)"
          >
            <van-icon name="minus" />
          </i>
          <i
            class="bg-hex-D7D7D7
color-hex-633333 ml-2 py-0.7 px-3 text-sm"
          >{{ draw_count2 }}</i>
          <i
            class="bg-hex-D7D7D7
color-hex-633333 ml-2 text-xs p-1" @click="add(0)"
          >
            <van-icon name="plus" />
          </i>
        </span>
      </div>
      <div
        class="
          flex
          justify-between
          items-center
          border-b-1 border-hex-C9C9C9
          text-blue-800
          py-3
        "
      >
        <span>
          <i class="bg-blue-700 rounded-1/2 text-white text-xs py-0.7 px-1 mr-2"><van-icon name="plus" /></i>
          添加选项
        </span>
      </div>
    </div>
    <div class="bg-white rounded mt-3 p-3 text-sm">
      <div
        class="
          flex
          justify-between
          items-center
          border-b-1 border-hex-C9C9C9
          py-1
        "
      >
        <span>隐藏选项</span>
        <span><van-switch v-model="hide_checked" size="1.5em" /></span>
      </div>
      <div
        class="
          flex
          justify-between
          items-center
          border-b-1 border-hex-C9C9C9
          py-3
        "
      >
        <span> 每人可参与抽签次数 </span>
        <span>
          <i
            class="bg-hex-D7D7D7
color-hex-633333 text-xs p-1" @click="sub(1)"
          >
            <van-icon name="minus" />
          </i>
          <i
            class="bg-hex-D7D7D7
color-hex-633333 ml-2 py-0.7 px-3 text-sm"
          >{{ draw_count1 }}</i>
          <i
            class="bg-hex-D7D7D7
color-hex-633333 ml-2 text-xs p-1" @click="add(1)"
          >
            <van-icon name="plus" />
          </i>
        </span>
      </div>
      <div
        class="
          flex
          justify-between
          items-center
          border-b-1 border-hex-C9C9C9
          py-3
        "
      >
        <span>结束时间</span>
        <span>2022-01-17 22:33</span>
      </div>
      <div
        class="
          flex
          justify-between
          items-center
          border-b-1 border-hex-C9C9C9
          py-3
        "
      >
        <span>抽签结果查看权限</span>
        <span>仅发起人可见</span>
      </div>
    </div>
    <div class="text-left text-xs mt-2" style="color: #999">
      1&lt;=每人可参与抽签次数&lt;抽签总数
    </div>
    <div class="my-5">
      <van-button type="primary" size="large" color="rgb(40,182,72)">
        发起抽签
      </van-button>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 发起抽签
</route>
