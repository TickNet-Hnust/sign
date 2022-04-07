<template>
  <div class="container p-3">
    <div class="top">
      <span class="header">
        <img class="header_img mt-5 ml-3" :src="src" alt="" />
      </span>
      <span class="right ml-8">
        <span class="mt-6 mr-4 text-md">班级会议</span>
        <span class="mt-7 mr-7 text-sm">成员：{{ number }}</span>
      </span>
    </div>
    <van-tabs v-model:active="active" color="rgb(0,51,255)">
      <van-tab title="概况">
        <div>
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <ul
              v-for="item in details_list"
              :key="item"
              class="mt-3 p-3"
              style="background-color: #fff; border-radius: 0.3em"
            >
              <div class="survey_list">
                <span><img class="survey_img" :src="src" alt="" /></span>
                <span class="mt-9 ml-2">{{ item.title }}</span>
                <span class="ml-18 mt-9">{{ item.type }}</span>
              </div>
            </ul>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="成员">
        <div>
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <ul v-for="item in member_list" :key="item" class="detail_list">
              <span class="member_list">
                <span class="item_left">
                  <span class="text-sm">{{ item.user_id }}</span>
                  <span class="ml-10 text-sm">{{ item.member }}</span>
                </span>
                <span class="set_tag"
                  ><span class="ml-30"
                    ><van-tag color="#7232dd" plain>标签</van-tag></span
                  >
                </span>
              </span>
            </ul>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script setup leng="ts">
import src from "~/assets/1.png";
const active = ref(0);
const number = ref(8);
const loading = ref(false);
const fininshed = ref(true);
const details_list = ref([
  {
    title: "发起签到",
    type: "发起签到",
  },
  {
    title: "发起投票",
    type: "发起投票",
  },
  {
    title: "发起抽签",
    type: "发起抽签",
  },
  {
    title: "发起点名",
    type: "发起点名",
  },
  {
    title: "微信推荐",
    type: "微信推荐",
  },
  {
    title: "成员追加",
    type: "成员追加",
  },
  {
    title: "删除群组",
    type: "删除群组",
  },
]);
const member_list = ref([
  {
    user_id: 1905040117,
    member: "曹帅哥",
  },
  {
    user_id: "1234567890",
    member: "曹shuaige",
  },
]);

const finished = ref(true);
</script>
<style scoped>
.container {
  background-color: rgb(235, 231, 231);
}
.header_img {
  border: 2px solid rgb(222, 222, 222);
}
.survey_img {
  border: 2px solid rgb(222, 222, 222);
}

img {
  width: 70px;
}
.top {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-radius: 0.3em;
}
.right {
  display: flex;
  flex-direction: column;
}
.survey_list {
  display: flex;
  flex-direction: row;
  background-color: #fff;
}
.member_list {
  background-color: #fff;
}
.detail_list {
  display: flex;
  justify-content: space-between;
  height: 3em;
  line-height: 3em;
  border-bottom: 1px solid rgb(228, 228, 228);
  align-items: center;
}
</style>
