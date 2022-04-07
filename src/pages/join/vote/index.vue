<template>
  <div class="bg-true-gray-50 w-screen h-screen">
    <div class="sticky top-0">
      <van-nav-bar title="我要投票" left-text="返回" left-arrow />
    </div>
    <div class="mx-20px">
      <div class="border-gray-200 border px-10px py-10px mt-20px bg-white">
        <div class="mb-10px">
          {{ data.question }}
        </div>
        <van-tag round type="primary" color="#4ade80">
          {{ data.type }}
        </van-tag>
      </div>
      <div class="mt-20px">
        <van-radio-group
          v-for="item in data.option"
          :key="item.name"
          v-model="checked"
        >
          <div
            v-if="data.isVote"
            class="mt-20px border-gray-200 border p-10px bg-white"
          >
            <van-radio
              :name="item.name"
              checked-color="#dde1e3"
              icon-size="16px"
            >
              {{ item.value }}
            </van-radio>
          </div>
          <div v-else>
            <div
              v-if="checked == item.name"
              class="mt-20px border-green-800 border h-42px"
            >
              <div
                class="border-none h-40px leading-40px"
                :style="{ width: item.width }"
                style="
                  white-space: nowrap;
                  background-color: rgb(157, 212, 157);
                "
              >
                <van-icon
                  name="checked"
                  color="green"
                  size="1.25em"
                  class="relative left-10px leading-40px"
                />
                <span class="text-dark-900 left-10px relative">{{
                  item.value
                }}</span>
                <span
                  class="absolute right-50px leading-40px text-sm text-cool-gray-400"
                >
                  {{ item.num + "票" }}
                </span>
              </div>
            </div>
            <div
              v-else-if="item.num > 0 && checked != item.name"
              class="mt-20px border-true-gray-200 border"
            >
              <div
                class="border-none h-40px bg-gray-300 leading-40px"
                :style="{ width: item.width }"
                style="white-space: nowrap"
              >
                <!-- <van-icon name="checked" color="green" size="1.25em" class="relative left-10px  leading-40px" /> -->
                <span class="text-dark-900 left-10px relative">{{
                  item.value
                }}</span>
                <span
                  class="absolute right-50px leading-40px text-sm text-cool-gray-400"
                >
                  {{ item.num + "票" }}
                </span>
              </div>
            </div>
            <div
              v-else-if="item.num == 0"
              class="mt-20px border-true-gray-200 border h-42px p-10px text-dark-900"
            >
              {{ item.value }}
              <span
                class="absolute right-50px inline-block leading-20px text-sm text-cool-gray-400"
              >
                {{ item.num + "票" }}
              </span>
            </div>
          </div>
        </van-radio-group>
      </div>
      <div class="text-cool-gray-500">
        <div class="text-xs mt-15px">
          {{ "截止时间：" + data.lastTime }}
        </div>
        <van-button
          v-if="data.isVote"
          type="primary"
          size="large"
          :color="data.color"
          class="my-10px"
          @click="isClick(data, checked)"
        >
          {{ data.text }}
        </van-button>
        <van-button
          v-else
          disabled
          type="primary"
          size="large"
          :color="data.color"
          class="my-10px"
          @click="isClick(data, checked)"
        >
          {{ data.text }}
        </van-button>
        <div class="text-xs">
          <div>投票规则</div>
          <div class="mt-5px">
            {{ "1.本次投票为" + data.type }}
          </div>
          <div class="mt-5px">2.投票之后无法撤回</div>
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
  question: "一天吃几顿饭",
  optionNum: 3,

  type: "单选",
  createTime: "2022-01-03 17:34:38",
  lastTime: "2022-01-17 01-17 12:23",
  isVote: true,
  color: "#4ade80",
  text: "开始投票",
  allNum: 6,
  option: [
    {
      name: 1, // 自动生成id
      value: "一顿",
      num: 1,
      width: "0",
    },
    {
      name: 2,
      value: "两顿",
      num: 4,
      width: "0",
    },
    {
      name: 3,
      value: "三顿",
      num: 0,
      width: "0",
    },
  ],
});

const isClick = (
  item: { isVote: boolean; color: string; text: string },
  checked: number
) => {
  if (checked !== 0) {
    data.value.option[checked - 1].num = data.value.option[checked - 1].num + 1;
    item.isVote = false;
    item.color = "rgb(157,212,157)";
    item.text = "已投票";
    data.value.allNum = data.value.allNum + 1;
    console.warn(checked);
    for (let i = 0; i < data.value.optionNum; i++) {
      data.value.option[i].width = `${
        (data.value.option[i].num * 100) / data.value.allNum
      }%`;
    }
  }
};
</script>
