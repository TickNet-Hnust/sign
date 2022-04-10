<script setup lang="ts">
const router = useRouter()
// 定义投票数据类型接口
interface VoteData {
  question: string
  optionNum: number
  type: string
  lastTime: string
  color: string
  text: string
  isVote: boolean
  option: Array<OptionData>
  allPollNum: number
}
// 定义投票选项数据类型接口
interface OptionData{
  name: number // id进项选项的识别
  optionValue: string
  poll: number
  optionWidth: string // 确定选项染色的宽度
}
const optionChecked = ref(0)// 投票被选择选项的name|id
const voteData: VoteData = reactive({
  question: '一天吃几顿饭',
  optionNum: 3,
  type: '单选',
  lastTime: '01-17 12:23',
  isVote: true,
  color: '#4ade80',
  text: '开始投票',
  allPollNum: 6,
  option: [
    {
      name: 1, // 自动生成id
      optionValue: '一顿',
      poll: 1,
      optionWidth: '0',
    },
    {
      name: 2,
      optionValue: '两顿',
      poll: 4,
      optionWidth: '0',
    },
    {
      name: 3,
      optionValue: '三顿',
      poll: 0,
      optionWidth: '0',
    },
  ],
})

// 投票按钮
const isClick = (
  item: { isVote: boolean; color: string; text: string },
  optionChecked: number,
) => {
  if (optionChecked !== 0) {
    voteData.option[optionChecked - 1].poll = voteData.option[optionChecked - 1].poll + 1
    item.isVote = false
    item.color = 'rgb(157,212,157)'
    item.text = '已投票'
    voteData.allPollNum = voteData.allPollNum + 1
    console.warn(optionChecked)
    for (let i = 0; i < voteData.optionNum; i++) {
      voteData.option[i].optionWidth = `${
        (voteData.option[i].poll * 100) / voteData.allPollNum
      }%`
    }
  }
}

// 点击选择项进行查看投票纪录

</script>

<template>
  <div class=" w-screen h-screen bg-true-gray-50">
    <div class="p-6">
      <div class="p-4 text-left border border-gray-200 bg-white  ">
        <div class="mb-2">
          {{ voteData.question }}
        </div>
        <van-tag type="primary" color="#28B648" size="medium">
          {{ voteData.type }}
        </van-tag>
      </div>
      <!-- 遍历选项 -->
      <div>
        <van-radio-group
          v-for="item in voteData.option"
          :key="item.name"
          v-model="optionChecked"
        >
          <!-- 判断是否已经投票 -->
          <!-- 未投票 -->
          <div
            v-if="voteData.isVote"
            class="mt-6 border-gray-200 border p-10px bg-white"
          >
            <van-radio
              :name="item.name"
              checked-color="#dde1e3"
              icon-size="16px"
            >
              {{ item.optionValue }}
            </van-radio>
          </div>
          <!-- 已投票 -->
          <div v-else>
            <!-- 被选中的选项样式 -->
            <div
              v-if="optionChecked == item.name"
              class="mt-6 border h-42px"
              style="border-color:#23A923"
              @click="router.push('/join/vote/detail')"
            >
              <div
                class="border-none h-40px leading-40px text-left flex"
                :style="{ width: item.optionWidth }"
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
                <span class="text-dark-900 left-3 relative flex">{{
                  item.optionValue
                }}</span>
                <span
                  class="absolute right-50px leading-40px text-sm text-cool-gray-400"
                >
                  {{ item.poll + "票" }}
                </span>
              </div>
            </div>
            <!-- 没有选上但是有票数的选项 -->
            <div
              v-else-if="item.poll > 0 && optionChecked != item.name"
              class="mt-6 border-true-gray-200 border"
            >
              <div
                class="border-none h-40px bg-gray-300 leading-40px text-left"
                :style="{ width: item.optionWidth }"
                style="white-space: nowrap"
              >
                <!-- <van-icon name="checked" color="green" size="1.25em" class="relative left-10px  leading-40px" /> -->
                <span class="text-dark-900 left-10px relative">{{
                  item.optionValue
                }}</span>
                <span
                  class="absolute right-50px leading-40px text-sm text-cool-gray-400"
                >
                  {{ item.poll + "票" }}
                </span>
              </div>
            </div>
            <div
              v-else-if="item.poll == 0"
              class="mt-6 border-true-gray-200 border h-42px  text-dark-900 text-left"
            >
              <span class="leading-40px m-10px">{{ item.optionValue }}</span>
              <span
                class="absolute right-50px leading-20px text-sm text-cool-gray-400 pt-10px"
              >
                {{ item.poll + "票" }}
              </span>
            </div>
          </div>
        </van-radio-group>
      </div>
      <div class="text-cool-gray-500">
        <div class="text-xs mt-15px text-left">
          {{ "截止时间：" + voteData.lastTime }}
        </div>
        <van-button
          v-if="voteData.isVote"
          type="primary"
          size="large"
          :color="voteData.color"
          class="my-10px"
          @click="isClick(voteData, optionChecked)"
        >
          {{ voteData.text }}
        </van-button>
        <van-button
          v-else
          disabled
          type="primary"
          size="large"
          :color="voteData.color"
          class="my-10px"
          @click="isClick(voteData, optionChecked)"
        >
          {{ voteData.text }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
  title: 我要投票
</route>
