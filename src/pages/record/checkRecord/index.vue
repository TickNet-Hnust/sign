<script setup lang="ts">
import {
  signStuList,
  detailSignRecord,
  changeSignMsg,
} from "~/api/record/signRecord";

// 已签到学生列表
const clist = ref([]);
//签到活动id
const route = useRoute();
const signId = route.query.id;
const detailMsg = ref({
  signName: "", // 签到名
  signCode: "", // 签到码
  createTime: "", // 创建日期
  createUserName: "", // 创建人
});

// 跳转到辅助签到页面
const router = useRouter();
const jumpPage = () => {
  router.push({
    path: "/record/checkRecord/help",
    query: {
      id: signId,
    },
  });
};
// 改变是否可见
const changeRequest = ref({
  // 请求参数
  id: signId,
  signName: "",
  duration: 2,
  visible: 1,
});
const isShow = ref("yes");
const changeShow = () => {
  if (isShow.value === "yes") {
    changeRequest.value.visible = 1;
  } else {
    changeRequest.value.visible = 0;
  }
  changeRequest.value.signName = signName.value;
  changeSignMsg(changeRequest.value)
    .then((res: any) => {
      console.log(res);
    })
    .catch((err: any) => {
      console.log(err);
    });
};
// 请求已签到学生列表
const loading = ref(false);
const finished = ref(false);
const pageNum = ref(1);
const request = reactive({
  //请求参数
  signId: signId,
  pageNum: pageNum.value,
  pageSize: 10,
});
const getStuList = () => {
  signStuList(request)
    .then((res: any) => {
      if (res.code === 200) {
        const rows = res.rows;
        clist.value = clist.value.concat(rows);
        pageNum.value++;
        loading.value = false;
        if (clist.value.length >= res.total) {
          console.log("数据加载完毕");
          finished.value = true;
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const onLoad = () => {
  setTimeout(() => {
    getStuList();
  }, 500);
};
// 初始化数据
onMounted(() => {
  detailSignRecord(signId)
    .then((res: any) => {
      if (res.code === 200) {
        detailMsg.value = res.data;
        signName.value = detailMsg.value.signName;
        if (res.data.visible === 1) isShow.value = "yes";
        else isShow.value = "no";
      }
    })
    .catch((err) => {
      console.log(err);
    });
  getStuList();
});
// 编辑签到名
const signName = ref("");
const showDialog = ref(false);
const changeDialogShow = () => {
  showDialog.value = true;
};
const editSignName = () => {
  // 更改名字与更改用户是否可见用的是同一个接口，直接调用更改名字的方法即可
  if (signName.value !== detailMsg.value.signName) {
    detailMsg.value.signName = signName.value;
    changeShow();
  }
};
const onCancel = () => {
  signName.value = detailMsg.value.signName;
};
</script>
<template>
  <div class="bg-gray-500/8 p-3 min-h-100%">
    <div
      class="bg-white border border-t-2 border-hex-D9DADB border-t-hex-41B062 rounded"
    >
      <div
        class="flex justify-between h-3em border-b border-hex-DEDEDE p-2 items-center"
      >
        <span class="bg-hex-D7D7D7 text-hex-222 rounded px-2 py-1">
          <span><van-icon name="setting" /></span>
          <span class="text-sm ml-2">基本配置</span>
        </span>
      </div>
      <div
        class="flex justify-between h-3em border-b border-hex-DEDEDE p-2 items-center"
      >
        <span>
          <span class="text-sm w-5em text-left inline-block">签到码</span>
          <span class="text-sm ml-10">{{ detailMsg.signCode }}</span>
        </span>
        <span
          class="text-xl bg-hex-10AA62 text-white rounded-15px px-1 mr-3"
          @click="jumpPage"
        >
          <van-icon name="qr" />
        </span>
      </div>
      <div
        class="flex justify-between h-3em border-b border-hex-DEDEDE p-2 items-center"
      >
        <span>
          <span class="text-sm w-5em text-left inline-block">签到名称</span>
          <span class="text-sm ml-10">{{ detailMsg.signName }}</span>
        </span>
        <span
          class="mr-3 text-xl border text-center text-hex-10AA62 h-28px w-28px rounded-14px"
          @click="changeDialogShow"
        >
          <van-icon name="edit" />
        </span>
      </div>
      <div
        class="flex justify-between h-3em border-b border-hex-DEDEDE p-2 items-center"
      >
        <span>
          <span class="text-sm w-5em text-left inline-block">日期</span>
          <span class="text-sm ml-10">{{ detailMsg.createTime }}</span>
        </span>
      </div>
      <div
        class="flex justify-between h-3em border-b border-hex-DEDEDE p-2 items-center"
      >
        <span>
          <span class="text-sm w-5em text-left inline-block">发起人</span>
          <span class="text-sm ml-10">{{ detailMsg.createUserName }}</span>
        </span>
      </div>
      <div class="flex justify-between h-3em p-2 text-sm items-center">
        <span style="display: flex; justify-content: space-around">
          <span class="text-sm w-5em text-left inline-block">用户可见</span>
          <span class="ml-10">
            <van-radio-group
              @change="changeShow()"
              v-model="isShow"
              direction="horizontal"
            >
              <van-radio name="yes">可见</van-radio>
              <van-radio name="no">不可见</van-radio>
            </van-radio-group>
          </span>
        </span>
      </div>
    </div>
    <!-- 编辑签到名称的弹出框 -->
    <van-dialog
      v-model:show="showDialog"
      title="编辑签到名称"
      confirm-button-color="rgb(63,133,255)"
      show-cancel-button
      @confirm="editSignName"
      @cancel="onCancel"
    >
      <van-field v-model="signName" placeholder="请输入活动名称" />
    </van-dialog>
    <div
      class="text-left bg-hex-E1FBE3 border border-hex-8FC798 rounded mt-5 p-4"
    >
      <span>共成功签到了{{ totalRecord }}次</span>
    </div>
    <div
      class="bg-white border border-hex-D9DADB rounded mt-5 p-3 border-t-2 border-t-hex-41B062"
    >
      <van-list
        :immediate-check="false"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        loading-text="——上拉加载更多——"
        @load="onLoad"
      >
        <ul class="flex py-2 border-b border-hex-E4E4E4 text-sm">
          <span class="flex-1">学号/工号<van-icon name="sort" /></span>
          <span class="flex-1">姓名</span>
          <span class="flex-1">时间</span>
        </ul>
        <ul
          v-for="item in clist"
          :key="item"
          class="flex items-center py-2 border-b border-hex-E4E4E4 text-sm"
        >
          <span class="flex-1">{{ item.createUserId }}</span>
          <span class="flex-1">{{ item.createUserName }}</span>
          <span class="flex-1">{{ item.createTime }}</span>
        </ul>
      </van-list>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 签到列表
</route>
<style scoped></style>
