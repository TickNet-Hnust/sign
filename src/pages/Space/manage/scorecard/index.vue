<script lang="ts" setup>
import { Notify } from "vant";
import { getRecord } from "~/api/mySpace/index";
const route = useRoute();
const signList = ref([]);
const id = ref(route.query.id); // 接收路由跳转的空间id，需从字符串转换为数字
const idNumber = ref(0);
idNumber.value = parseInt(id.value);
getRecord(idNumber.value).then((res) => {
  if (res.code === 200) {
    signList.value = res.data;
  } else if (res.code === 401) {
    Notify({ type: "danger", message: "身份验证失败！" });
    router.push({ path: "/" });
  }
});
</script>

<template>
  <div class="bg-gray-500/8 p-3">
    <div class="bg-white mx-3 text-left p-4 pb-5 text-15px rounded">
      <li class="flex items-center">
        <div class="w-5.5em">• 活动名称</div>
        <div class="text-13px">班级会议</div>
      </li>
      <li class="mt-3 flex items-center">
        <div class="w-5.5em">• 积分规则</div>
        <div class="text-13px text-hex-41AA62">
          每参与签到/投票/抽签一次，加一积分
        </div>
      </li>
      <li class="mt-3 flex items-center">
        <div class="w-5.5em">• 说明</div>
        <div class="text-13px text-hex-41AA62">
          积分统计方式：成员积分/总积分
        </div>
      </li>
    </div>
    <div class="mt-3">
      <van-tabs color="rgb(40,182,72)" background="rgb(243,244,245)">
        <van-tab title="签到积分" name="sign" />
      </van-tabs>
    </div>
    <ul
      class="bg-white mx-3 mt-4 border border-t-2 border-hex-ccc border-t-hex-28B648 px-2"
    >
      <li class="flex py-2">
        <span class="flex-1">学号/工号<van-icon name="sort" /></span>
        <span class="flex-1">姓名</span>
        <span class="flex-1">积分</span>
      </li>
      <li
        v-for="item in signList"
        :key="item"
        class="flex py-2 border-t border-hex-ccc"
      >
        <span class="flex-1">{{ item.userId }}</span>
        <span class="flex-1">{{ item.userName }}</span>
        <span class="flex-1">{{ item.total }}/{{ item.number }}</span>
      </li>
    </ul>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 积分详情
</route>
