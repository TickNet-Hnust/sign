<template>
  <div class="bg-gray-500/8 p-3">
    <div class="bg-white border border-hex-D9DADB rounded">
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
          <span class="text-sm ml-10">2000</span>
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
          <span class="text-sm w-5em text-left inline-block">日期</span>
          <span class="text-sm ml-10">2022-01-03</span>
        </span>
      </div>
      <div
        class="flex justify-between h-3em border-b border-hex-DEDEDE p-2 items-center"
      >
        <span>
          <span class="text-sm w-5em text-left inline-block">名称</span>
          <span class="text-sm ml-10">张智豪</span>
        </span>
      </div>
      <div
        class="flex justify-between h-3em p-2 text-sm items-center"
      >
        <span style="display: flex; justify-content: space-around">
          <span class="text-sm w-5em text-left inline-block">用户可见</span>
          <span class="ml-10">
            <van-radio-group v-model="look_checked" direction="horizontal">
              <van-radio name="1">可见</van-radio>
              <van-radio name="2">不可见</van-radio>
            </van-radio-group>
          </span>
        </span>
      </div>
    </div>
    <div class="text-left bg-hex-E1FBE3 border border-hex-8FC798 rounded mt-5 p-4">
      <span>共成功签到了8次</span>
    </div>
    <div class="bg-white border border-hex-D9DADB rounded mt-5 p-3">
      <van-pull-refresh v-model="refreshing" @refresh="onRefreh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          loading-text="——下拉加载更多——"
          @load="onLoad"
        >
          <ul class="flex py-2 border-b border-hex-E4E4E4 text-sm">
            <span class="flex-1">学号/工号<van-icon name="sort" /></span>
            <span class="flex-1">姓名</span>
            <span class="flex-1">时间</span>
          </ul>
          <ul v-for="item in clist" :key="item" class="flex py-2 border-b border-hex-E4E4E4 text-sm">
            <span class="flex-1">{{ item.num }}</span>
            <span class="flex-1">{{ item.name }}</span>
            <span class="flex-1">{{ item.time }}</span>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 签到列表
</route>

<script setup lang="ts">
const look_checked = ref("1");
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const clist = ref([]);
const router = useRouter()
const jumpPage = () => {
  router.push('/record/checkRecord/help')
}
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
</script>

<style scoped>

</style>
