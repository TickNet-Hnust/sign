<!-- 老师端 -->

<script setup lang="ts">
const loading = ref(false)
const fininshed = ref(true)
const isShow = ref(false)
const checked = ref('1')
const class_checked = ref([])// 里面是空数组
const space_list = reactive([
  {
    title: '班级会议',
    time: '2022-01-03 17:34:38',
  },
  {
    title: 'ticknet会议',
    time: '2022-01-03 17:34:38',
  },
  {
    title: '班级会议',
    time: '2022-01-03 17:34:39',
  },
])
const changeShow = () => {
  isShow.value = !isShow.value
}
const classShow = ref(false)
const classSpaceshow = ref(false)
const choose = ref()
const onConfirm = () => {
  if (choose.value === 'no')
    classShow.value = true

  else if (choose.value === 'yes')
    classSpaceshow.value = true
}
const classList = reactive([
  { class: '19计算机一班' },
  { class: '19计算机二班' },
  { class: '19计算机三班' },
  { class: '19计算机四班' },
  { class: '19计算机五班' },
  { class: '19计算机六班' },
  { class: '19计算机七班' },
])
const checkboxGroup = ref()
const checkAll = () => {
  checkboxGroup.value.toggleAll(true)
}
const toggleAll = () => {
  checkboxGroup.value.toggleAll()
}

</script>

<template>
  <div class="p-3 bg-gray-500/8">
    <div class="flex justify-between items-center">
      <span class="px-3 py-1 flex items-center bg-hex-fff rounded w-xs">
        <span class="mr-3 text-2xl" style="color: rgb(156, 163, 175)"><van-icon class="font-700" name="search" /></span>
        <input placeholder="请输入要搜索的空间">
      </span>
      <span class="text-xl" @click="changeShow">
        <span
          class="
            color-hex-59B476
            border-3 border-hex-59B476
            rounded
            font-bold
            px-0.2
            mr-2
          "
        ><van-icon class="font-700 w-6" name="plus" /></span>
      </span>
    </div>
    <!-- 一级弹出框 -->
    <van-dialog
      v-model:show="isShow" title="设置" confirm-button-color="rgb(63,133,255)" show-cancel-button
      @confirm="onConfirm"
    >
      <div class="mx-4 border-t border-b border-hex-aaa mt-3 flex justify-left">
        <span class="p-2 mr-2">课堂空间</span>
        <span class="flex p-2">
          <van-radio-group v-model="choose" direction="horizontal">
            <van-radio name="yes" class="px-2">
              是
            </van-radio>
            <van-radio name="no" class="px-2">
              否
            </van-radio>
          </van-radio-group>
        </span>
      </div>
    </van-dialog>
    <!-- 不创建课堂空间弹出框 -->
    <van-dialog
      v-model:show="classShow" title="面对面建空间" confirm-button-color="rgb(63,133,255)" show-cancel-button
    >
      <div class="mt-5 px-10">
        <div class="text-14px text-hex-999">
          和身边的朋友输入同样的四个数字，进入同一个空间
        </div>
        <van-field class="border-b border-hex-ccc mb-3" type="digit" />
      </div>
    </van-dialog>
    <!-- 创建课堂空间弹出框 -->
    <van-dialog
      v-model:show="classSpaceshow" title="智能识别课堂" confirm-button-color="rgb(63,133,255)" show-cancel-button
    >
      <div class="mt-5 px-10">
        <div>
          老师：张三
        </div>
        <div class="p-2">
          课程：高等数学(上)
        </div>
        <div class="text-sm p-1">
          <div class="flex">
            <van-button type="primary" plain size="small" @click="checkAll">
              全选
            </van-button>
            <van-button type="primary" plain size="small" class="ml-1" @click="toggleAll">
              反选
            </van-button>
          </div>

          <van-checkbox-group ref="checkboxGroup" v-model="class_checked">
            <van-checkbox
              v-for="(item, index) in classList"
              :key="index"
              :name="item"
              shape="square"
            >
              <div class="text-sm p-1">
                班级：{{ item.class }}
              </div>
            </van-checkbox>
          </van-checkbox-group>
        </div>
      </div>
    </van-dialog>
    <div class="mt-8 border-1 border-hex-DEDEDE bg-hex-fff rounded py-3 px-5">
      <van-tabs v-model:active="active" color="rgb(40,182,72)">
        <van-tab title="我管理的">
          <van-pull-refresh v-model="refreshing" @refresh="onRefreh">
            <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              loading-text="——下拉加载更多——"
              @load="onLoad"
            >
              <ul
                v-for="item in space_list"
                :key="item"
                class="border-b border-b-hex-dedede mt-5"
              >
                <div class="text-left font-bold">
                  {{ item.title }}
                </div>
                <div class="text-left text-xs mt-1 mb-1 color-hex-999">
                  {{ item.time }}
                </div>
              </ul>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="我参与的">
          <van-pull-refresh v-model="unRefreshing" @refresh="onRefreh">
            <van-list
              v-model:loading="unLoading"
              :finished="unFinished"
              finished-text="没有更多了"
              loading-text="——下拉加载更多——"
              @load="onunLoad"
            >
              <ul
                v-for="item in space_list"
                :key="item"
                class="border-b border-b-hex-dedede mt-5"
              >
                <div class="text-left font-bold">
                  {{ item.title }}
                </div>
                <div class="text-left text-xs mt-1 mb-1 color-hex-999">
                  {{ item.time }}
                </div>
              </ul>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 我的空间
</route>
