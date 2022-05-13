<script setup lang="ts">
import { Notify } from "vant";
import { getSignSpace, quitSignSpace } from "~/api/mySpace/index";
import { getSpaceMemberList } from "~/api/mySpace/spaceMember";
const loading = ref(false);
const finished = ref(true);
const route = useRoute();
const router = useRouter();
// 初始化成员列表
const member_list = reactive([]);
// 初始化一个空间列表
const spaceList = reactive({
  id: "",
  spaceName: "",
  count: "",
  createTime: "",
});
const id = ref(route.query.id);
// 退出空间的参数
const quitData = reactive({
  userId: "1905040121",
  spaceId: 0,
});
// 获取我参与的空间的列表
getSignSpace(id.value).then((res) => {
  spaceList.id = res.data.id;
  spaceList.createTime = res.data.createTime;
  spaceList.spaceName = res.data.spaceName;
  spaceList.count = res.data.count;
  quitData.spaceId = res.data.id;
  console.log(spaceList);
});
getSpaceMemberList(id.value).then((res: any) => {
  member_list.push(...res.rows);
});
// 退出空间的方法
const quitSpace = () => {
  quitSignSpace(quitData).then((res) => {
    if (res.code === 200) {
      Notify({ type: "primary", message: "退出成功" });
      router.push("/Space");
    }
  });
};
const showQuit = ref(false); // 是否显示退出空间的弹窗
</script>
<template>
  <div class="bg-gray-500/8 p-3 min-h-100vh">
    <div class="bg-hex-fff py-3 border-hex-ccc border rounded">
      <div class="flex justify-around">
        <div class="row">
          <div class="text-sm">
            {{ spaceList.spaceName }}
          </div>
          <div class="text-xs my-1 text-left">
            成员：{{ member_list.length }}
          </div>
        </div>
        <div class="rounded items-center flex">
          <van-button
            type="danger"
            class="rounded"
            size="small"
            @click="showQuit = true"
          >
            退出空间
          </van-button>
          <van-dialog
            v-model:show="showQuit"
            title="是否删除空间"
            confirm-button-color="rgb(63,133,255)"
            show-cancel-button
            @confirm="quitSpace()"
          />
        </div>
      </div>
    </div>
    <div class="bg-hex-fff mt-5 px-2 border-t-2 border-hex-41BD62">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        loading-text="——下拉加载更多——"
        @load="onLoad"
      >
        <ul
          class="flex justify-around h-3em leading-12 border-b border-b-hex-E4E4E4 text-sm list_top"
        >
          <span class="inline-block w-6em">学号/工号</span>
          <span class="inline-block w-4em">姓名</span>
        </ul>
        <ul
          v-for="item in member_list"
          :key="item"
          class="flex justify-around h-3em leading-12 border-b border-b-hex-E4E4E4 text-sm"
        >
          <span class="inline-block w-6em">{{ item.userId }}</span>
          <span class="inline-block w-4em">{{ item.name }}</span>
        </ul>
      </van-list>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 空间详情
</route>
