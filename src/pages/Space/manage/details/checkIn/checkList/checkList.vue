<template>
  <div class="bg-gray-500/8 p-3">
    <div class="box">
      <div class="set_item p-2">
        <span class="set_tag px-2 py-1">
          <span> <van-icon name="setting" /></span>
          <span class="setting text-sm ml-2">基本配置</span>
        </span>
        <span class="set_status"
          ><van-switch
            v-model="status_checked"
            size="1.5em"
            class="m-3"
            @click="change_status"
        /></span>
        <span class="font-semibold text-sm ml-3">{{ check_status }}</span>
      </div>
      <div class="set_item p-2">
        <span>
          <span class="text-sm item_left">签到码</span>
          <span class="text-sm ml-10">2000</span>
        </span>
        <span class="set_tag px-2 py-1 font-semibold text-xs">辅助签到</span>
      </div>
      <div class="set_item p-2">
        <span>
          <span class="text-sm item_left">日期</span>
          <span class="text-sm ml-10">2022-03-13</span>
        </span>
      </div>
      <div class="set_item p-2">
        <span>
          <span class="text-sm item_left">名称</span>
          <span class="text-sm ml-10">曹帅哥</span>
        </span>
      </div>
      <div class="set_item">
        <span>
          <span class="item_left text-sm ml-2">空间</span>
          <span class="text-sm ml-10">班级会议</span>
        </span>
        <span class="set_tag px-2 py-1 font-semibold text-xs mr-2"
          >添加至空间</span
        >
      </div>
      <div class="set_item">
        <span>
          <span class="item_left text-sm ml-2">班级</span>
          <span class="text-sm ml-10">暂无关联</span>
        </span>
        <span class="set_tag px-2 py-1 font-semibold text-xs mr-2"
          >导入名单</span
        >
      </div>
      <div class="set_item set_item_bottom p-2 text-sm">
        <span class="choose">
          <span class="item_left">用户可见</span>
          <span class="ml-10">
            <van-radio-group v-model="look_checked" direction="horizontal">
              <van-radio name="1">可见</van-radio>
              <van-radio name="2">不可见</van-radio>
            </van-radio-group>
          </span>
        </span>
      </div>
    </div>
    <div class="summary mt-5 p-4">
      <span>共成功签到了1次</span>
      <span class="set_tag px-2 py-1.5 ml-5 text-xs font-semibold">下载</span>
      <span class="set_tag px-2 py-1.5 ml-3 text-xs font-semibold">邮件</span>
    </div>
    <div class="box mt-5 p-3">
      <van-tabs v-model:active="active" color="rgb(40,182,72)">
        <van-tab title="已签到">
          <van-pull-refresh v-model="refreshing" @refresh="onRefreh">
            <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              loading-text="——下拉加载更多——"
              @load="onLoad"
            >
              <ul class="check_list text-sm list_top">
                <span class="list_num">学号/工号</span>
                <span class="list_name">姓名</span>
                <span class="list_time">时间</span>
              </ul>
              <ul v-for="item in clist" :key="item" class="check_list text-sm">
                <span class="list_num">{{ item.num }}</span>
                <span class="list_name">{{ item.name }}</span>
                <span class="list_time">{{ item.time }}</span>
              </ul>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="未签到">
          <van-pull-refresh v-model="unRefreshing" @refresh="onRefreh">
            <van-list
              v-model:loading="unLoading"
              :finished="unFinished"
              finished-text="没有更多了"
              loading-text="——下拉加载更多——"
              @load="onunLoad"
            >
              <ul class="check_list text-sm list_top">
                <span class="list_num">学号/工号</span>
                <span class="list_name">姓名</span>
                <span class="list_time">状态</span>
              </ul>
              <ul v-for="item in unlist" :key="item" class="check_list text-sm">
                <span class="list_num">{{ item.num }}</span>
                <span class="list_name">{{ item.name }}</span>
                <span class="list_time">{{ item.status }}</span>
              </ul>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
const status_checked = ref(true);
const look_checked = ref("1");
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const unLoading = ref(false);
const unFinished = ref(false);
const unRefreshing = ref(false);
const clist = ref([]);
const unlist = ref([]);
const check_status = ref("签到中");
const change_status = () => {
  if (check_status.value === "签到中") check_status.value = "已结束";
  else check_status.value = "签到中";
};
const onLoad = () => {
  // 后面会有异步请求，此处先用setTimeout()代替
  setTimeout(() => {
    if (refreshing.value) {
      clist.value = [];
      refreshing.value = false;
    }
    for (let i = 0; i < 5; i++) {
      clist.value.push({
        num: "2005010326",
        name: "张三",
        time: "11:40:43",
      });
    }
    loading.value = false;
    if (clist.value.length >= 20) finished.value = true;
  }, 1000);
};
const onunLoad = () => {
  // 后面会有异步请求，此处先用setTimeout()代替
  setTimeout(() => {
    if (refreshing.value) {
      unlist.value = [];
      refreshing.value = false;
    }
    for (let i = 0; i < 5; i++) {
      unlist.value.push({
        num: "2005010326",
        name: "张三",
        status: "请假",
      });
    }
    loading.value = false;
    if (clist.value.length >= 20) finished.value = true;
  }, 1000);
};
</script>

<style scoped>
.box {
  background-color: #fff;
  border: 1px solid rgb(217, 218, 219);
  border-radius: 0.5em;
}
.set_tag {
  border: 1px solid rgb(215, 215, 215);
  background-color: rgb(215, 215, 215);
  border-radius: 0.3em;
}
.set_item {
  display: flex;
  justify-content: space-between;
  height: 3em;
  align-items: center;
  border-bottom: 1px solid rgb(222, 222, 222);
}
.item_left {
  display: inline-block;
  width: 5em;
  text-align: left;
}
.setting {
  border: 1px solid rgb(215, 215, 215);
  background-color: rgb(215, 215, 215);
  border-radius: 0.3em;
}
.set_item_bottom {
  border: 0;
}
.choose {
  display: flex;
  justify-content: space-between;
}
.summary {
  background-color: rgb(225, 251, 227);
}
.check_list {
  display: flex;
  justify-content: space-around;
  height: 3em;
  line-height: 3em;
  border-bottom: 1px solid rgb(228, 228, 228);
}
.list_num {
  display: inline-block;
  width: 6em;
}
.list_name {
  display: inline-block;
  width: 4em;
}
.list_time {
  display: inline-block;
  width: 5em;
}
</style>
