<template>
  <div class="p-3 bg-gray-100">
    <div class="draw_name bg-white border border-gray-300 text-left p-3">
      <div class="text-lg">
        冬奥会2022什么时候举办？
      </div>
      <div class="mt-3">
        <span
          class="text-0.8em rounded text-white py-1 px-2"
          style="background-color: rgb(102, 204, 255)"
        >进行中</span>
        <span
          class="text-0.8em rounded text-white ml-2 py-1 px-2"
          style="background-color: rgb(40, 182, 72)"
        >已抽 0 /8</span>
      </div>
    </div>
    <div
      class="bg-white border border-gray-300 flex justify-between text-left p-3 mt-5 text-sm"
    >
      <span>2月3号</span>
      <span style="color: rgb(128, 128, 128)">x4</span>
    </div>
    <div
      class="bg-white border border-gray-300 flex justify-between text-left p-3 mt-5 text-sm"
    >
      <span>2月4号</span>
      <span style="color: rgb(128, 128, 128)">x4</span>
    </div>
    <div class="mt-5">
      <van-button color="rgb(31,167,31)" size="large">
        开始抽签
      </van-button>
    </div>
    <div class="text-xs mt-3 ml-1 text-left text-hex-7B7C7D">
      截止时间：01-17 22:33
    </div>
    <div class="flex justify-left mt-5 text-sm">
      <span class="border border-gray-300 bg-white p-5">
        <div />
        <div>抽签记录</div>
      </span>
      <span class="border border-gray-300 bg-white p-5 ml-2">
        <div />
        <div>修改部分设置</div>
      </span>
    </div>
    <div class="text-0.8em text-gray-500 text-left mt-3 p-3 leading-loose">
      <div>抽签规则</div>
      <div>1.仅发起人查看抽签结果</div>
      <div>2.每人最多可参与1次抽签</div>
    </div>
    <div style="color: rgb(148, 149, 150)">
      —2022-01-03 18:12:49发起—
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 进行抽签
</route>
