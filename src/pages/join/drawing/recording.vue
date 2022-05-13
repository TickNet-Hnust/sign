<script setup lang="ts">
const loading = ref(false);
const finished = ref(false);

const data = ref({
  question: "冬奥会2022年什么时候举办?",
  optionNum: 3,
  drawingAllNum: 10,
  isDrawing: true,
  drawingAlreadyNum: 5,
  option: [
    {
      name: 1, // 自动生成id
      value: "2月3号",
      num: 6,
    },
    {
      name: 2,
      value: "2月4号",
      num: 4,
    },
    {
      name: 3,
      value: "2月5号",
      num: 0,
    },
  ],
  list: [
    {
      key: 1,
      name: "张智豪",
      drawingTime: "01-16 11:45",
      value: "2月4号",
    },
    {
      key: 2,
      name: "张三",
      drawingTime: "01-17 11:45",
      value: "2月4号",
    },
    {
      key: 3,
      name: "李四",
      drawingTime: "01-18 11:45",
      value: "2月4号",
    },
    {
      key: 4,
      name: "王五",
      drawingTime: "01-19 11:45",
      value: "2月4号",
    },
    {
      key: 5,
      name: "赵六",
      drawingTime: "01-19 11:45",
      value: "2月3号",
    },
  ],
});

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      data.value.list.push({
        key: data.value.list.length + 1,
        name: "赵六",
        drawingTime: "01-19 11:45",
        value: "2月3号",
      });
    }

    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (data.value.list.length >= 10) finished.value = true;
  }, 1000);
};
</script>

<template>
  <div class="bg-true-gray-50 w-screen h-screen">
    <div class="sticky top-0">
      <van-nav-bar title="抽签记录">
        <template #left>
          <van-icon name="arrow-left" size="18" color="black" />
          <span>返回</span>
        </template>
      </van-nav-bar>
    </div>
    <div class="mx-20px">
      <div class="mt-10px">
        <div class="py-10px px-20px">
          <span>签数统计</span>
          <span class="ml-5px"
            ><van-tag type="primary" round size="large" color="#28B648">{{
              data.drawingAlreadyNum + "票"
            }}</van-tag></span
          >
        </div>
        <div class="bg-white py-10px px-20px text-true-gray-400 text-sm">
          <div class="mt-5px">
            {{ "抽签标题：" + data.question }}
          </div>
          <div v-for="item in data.option" :key="item.name">
            <div class="mt-5px">
              {{
                item.name +
                "." +
                item.value +
                "&nbsp;&nbsp;(" +
                item.num +
                "签)"
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10px">
        <div class="py-10px px-20px">
          <span>抽签记录</span>
          <span class="ml-5px"
            ><van-tag type="primary" round size="large" color="#28B648">{{
              data.drawingAlreadyNum + "人"
            }}</van-tag></span
          >
        </div>
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="item in data.list"
            :key="item.key"
            class="bg-white py-15px px-20px mb-20px"
          >
            <div class="text-16px">
              <span>{{ item.name }}</span>
              <span class="float-right">{{ item.drawingTime }}</span>
            </div>
            <van-divider class="my-15px" />
            <div class="text-16px">
              <span>{{ "投票：" + item.value }}</span>
            </div>
          </van-cell>
        </van-list>
      </div>
    </div>
  </div>
</template>
