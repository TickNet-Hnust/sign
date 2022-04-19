<script setup lang="ts">
const show = ref(false)
const checked = ref(true)
const showPopup = () => {
  show.value = true
}
</script>
<template>
  <div class="bg-hex-F6F7F9 p-3">
    <div class="bg-hex-fff rounded p-3">
      <div
        class="
          flex
          justify-between
          h-3em
          items-center
          border-b-1 border-hex-C9C9C9
          bg-hex-ffffff
          pl-0.5em
        "
      >
        <span class="text-lg font-bold text-left mt-1">
          <input type="text" placeholder="投票标题">
        </span>
      </div>
      <div
        class="
          flex
          justify-between
          h-3em
          items-center
          border-b-1 border-hex-C9C9C9
          bg-hex-ffffff
          pl-0.5em
        "
      >
        <span class="text-sm mt-1">
          <input type="text" placeholder="描述 (选填)">
        </span>
      </div>
      <div
        class="
          flex
          justify-between
          items-center
          h-3em
          border-b-1 border-hex-C9C9C9
          py-2
        "
      >
        <span>
          <i class="bg-red-500 rounded-1/2 text-white text-xs py-0.7 px-1 mr-2"><van-icon name="minus" /></i>
          <input placeholder="选项1">
        </span>
      </div>
      <div
        class="
          flex
          justify-between
          items-center
          h-3em
          border-b-1 border-hex-C9C9C9
          py-2
        "
      >
        <span>
          <i class="bg-red-500 rounded-1/2 text-white text-xs py-0.7 px-1 mr-2"><van-icon name="minus" /></i>
          <input placeholder="选项2">
        </span>
      </div>
      <div
        class="
          flex
          justify-between
          items-center
          h-3em
          border-b-1 border-hex-C9C9C9
          py-2
        "
      >
        <span>
          <i class="bg-blue-700 rounded-1/2 text-white text-xs py-0.7 px-1 mr-2"><van-icon name="plus" /></i>
          添加选项
        </span>
      </div>
    </div>
    <div class=" pt-4">
      <div class="bg-white">
        <div
          class="
            flex
            justify-between
            h-3em
            items-center
            border-b-1 border-hex-C9C9C9
            bg-hex-ffffff
          "
        >
          <div class="text-sm ml-1 flex justify-between items-center w-full">
            <span class="ml-3">投票类型</span>
            <span>
              <van-cell is-link @click="showPopup">
                单选
              </van-cell>
              <van-popup
                v-model:show="show"
                closeable
                position="bottom"
                :style="{ height: '30%' }"
              >
                内容
              </van-popup>
            </span>
          </div>
        </div>
        <div
          class="
            flex
            justify-between
            h-3em
            items-center
            border-b-1 border-hex-C9C9C9
            bg-hex-ffffff
          "
        >
          <div class="text-sm ml-1 flex justify-between items-center w-full">
            <span class="ml-3">结束时间</span>
            <span>
              <van-cell is-link @click="showPopup">
                {{ Date.now() }}
              </van-cell>
              <van-popup
                v-model:show="show"
                closeable
                position="bottom"
                :style="{ height: '30%' }"
              >
                内容
              </van-popup>
            </span>
          </div>
        </div>
        <div
          class="
            flex
            justify-between
            h-3em
            items-center
            border-b-1 border-hex-C9C9C9
            bg-hex-ffffff
          "
        >
          <div class="text-sm ml-1 flex justify-between items-center w-full">
            <span class="ml-3">匿名</span>
            <span class="text-sm mr-6">
              <van-switch
                v-model="checked"
                size="1.5em"
                class=""
                @click="change_status"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8">
      <van-button type="success" size="large">
        发起投票
      </van-button>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 发起投票
</route>
