<template>
  <div class="bg-true-gray-50">
    <div class="sticky top-0">
      <van-nav-bar title="我要签到" left-text="返回">
        <template #left>
          <van-icon name="arrow-left" size="18" color="black" />
          <span>返回</span>
        </template>
        <template #right>
          <span>签到记录</span>
          <van-icon name="arrow" size="18" color="black" />
        </template>
      </van-nav-bar>
    </div>
    <div
      class="my-20px mx-10px items-center justify-center flex bg-cyan-100 h-25px rounded-sm border-1 border-blue-300"
    >
      <span class="text-xs text-blue-700">请输入四位4效签到码(*^_^*)</span>
    </div>
    <div class="mx-100px my-20px">
      <van-cell-group inset>
        <van-field placeholder="输入签到码" input-align="center" />
      </van-cell-group>
    </div>
    <div class="flex items-center justify-center my-20px">
      <van-button plain type="primary" color="green"> 确认签到 </van-button>
    </div>
  </div>
  <div class="bg-white px-20px">
    <div class="text-green-600 text-xs">怎么定位</div>
    <div class="m-10px text-dark-600 text-xs">
      先打开WIFI(只需要打开，连不连接都可以)，然后点击上方签到
    </div>
    <div class="text-green-600 text-xs">怎么定位</div>
    <div class="m-10px text-dark-600 text-xs">
      先打开WIFI(只需要打开，连不连接都可以)，然后点击上方签到
    </div>
    <div class="text-green-600 text-xs">怎么定位</div>
    <div class="m-10px text-dark-600 text-xs">
      先打开WIFI(只需要打开，连不连接都可以)，然后点击上方签到
    </div>
  </div>
</template>
