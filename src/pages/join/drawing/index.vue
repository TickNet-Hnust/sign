<template>
  <div class="bg-true-gray-50 w-screen h-screen">
    <div class="sticky top-0">
      <van-nav-bar title="进行抽签" left-text="返回">
        <template #left>
          <van-icon name="arrow-left" size="18" color="black" />
          <span>返回</span>
        </template>
        <template #right>
          <span>抽签记录</span>
          <van-icon name="arrow" size="18" color="black" />
        </template>
      </van-nav-bar>
    </div>
    <div class="mx-20px">
      <div class="border-gray-200 border px-10px py-10px mt-20px bg-white">
        <div class="mb-10px">
          {{ data.question }}
        </div>
        <van-tag size="large" type="primary" color="#66ccff" class="mr-10px">
          {{ data.status }}
        </van-tag>
        <van-tag size="large" type="primary" color="#28b648">
          {{ "已抽" + data.drawingAlreadyNum + " / " + data.drawingAllNum }}
        </van-tag>
      </div>
      <div class="mt-20px">
        <div v-for="item in data.option" :key="item.name">
          <div
            v-if="data.isDrawing"
            class="mt-20px border-gray-200 border p-10px bg-white"
          >
            <div :name="item.name" checked-color="#dde1e3" icon-size="16px">
              <span>{{ item.value }}</span>
              <span class="float-right text-gray-500">&times;1</span>
            </div>
          </div>
          <div v-else>
            <div
              v-if="checked == item.name"
              class="mt-20px border-lime-800 border p-10px"
              style="background-color: #c8e5c9"
            >
              <div :name="item.name">
                <span>{{ item.value }}</span>
                <span class="float-right text-gray-500">抽中该项</span>
              </div>
            </div>
            <div
              v-else
              class="mt-20px border-true-gray-200 border p-10px bg-white"
            >
              <div :name="item.name">
                <span>{{ item.value }}</span>
                <span class="float-right text-gray-500">&times;1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-cool-gray-500">
        <van-button
          v-if="data.isDrawing"
          type="primary"
          size="large"
          :color="data.color"
          class="my-10px mt-20px"
          @click="isClick(data)"
        >
          {{ data.text }}
        </van-button>
        <van-button
          v-else
          disabled
          type="primary"
          size="large"
          :color="data.color"
          class="my-10px mt-20px"
          @click="isClick(data)"
        >
          {{ data.text }}
        </van-button>
        <div class="text-xs">
          <div>抽签规则</div>
          <div class="mt-5px">1.仅发起人查看抽签结果</div>
          <div class="mt-5px">2.每人最多可参与1次抽签</div>
          <div class="mt-5px">
            {{ "3.请在" + data.lastTime + "之前完成" }}
          </div>
        </div>
        <div class="text-center mt-10px">
          {{ data.createTime + " 发起" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const checked = ref(0);

const data = ref({
  question: "冬奥会2022年什么时候举办?",
  optionNum: 3,
  status: "进行中",
  drawingAllNum: "8",
  createTime: "2022-01-03 17:34:38",
  lastTime: "2022-01-17 01-17 12:23",
  isDrawing: true,
  color: "#1FA71F",
  text: "开始抽签",
  drawingAlreadyNum: 5,
  option: [
    {
      name: 1, // 自动生成id
      value: "2月3号",
      num: 1,
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
});

const isClick = (item: { isDrawing: boolean; color: string; text: string }) => {
  checked.value = Math.floor(Math.random() * 3 + 1);
  data.value.option[checked.value - 1].num =
    data.value.option[checked.value - 1].num + 1;
  item.isDrawing = false;
  item.color = "rgb(157,212,157)";
  item.text = "已抽签";
  data.value.drawingAlreadyNum = data.value.drawingAlreadyNum + 1;
  console.warn(checked);
};
</script>
