<script setup lang="ts">
// 定义投票数据类型接口
import { onMounted } from 'vue'
import { voteRecord } from '~/api/myJoin/record'

// 定义投票页面数据接口
interface VoteData {
  type: string // 活动类型
  question: string
  optionNum: number
  optionType: string // 多选或者单选
  endTime: string
  color: string
  text: string // 按钮的文本
  optionChecked: number // 被选择的选项id
  isVote: boolean // 是否投票，true表示没有投票
  option: Array<OptionData> // 选项具体数据
  optionWidth: Array<string> // 确定选项染色的宽度
  allPollNum: number // 总票数
}

// 定义投票选项数据类型接口
interface OptionData{
  id: number // id进项选项的识别
  optionValue: string
  poll: number
}

const voteData: VoteData = reactive({
  type: '投票',
  question: '',
  optionNum: -1,
  optionType: '',
  endTime: '',
  isVote: true, // true 表示没有投票
  color: '#4ade80',
  text: '开始投票',
  optionChecked: -1,
  allPollNum: -1,
  option: [],
  optionWidth: computed(() => {
    const arr: Array<string> = []
    voteData.option.forEach((item) => {
      arr.push(`${(item.poll * 100) / voteData.allPollNum}%`)
    })
    return arr
  }),
})

onMounted(() => {
  const id = 3019
  voteRecord(id).then((res) => {
    console.warn(res.data)
    voteData.question = res.data.voteName
    voteData.endTime = res.data
  })
})

// 是否显示投票详细数据
const show = ref(false)
const showChange = function() {
  show.value = !show
}

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
  }
}
</script>

<template>
  <div class=" w-screen h-screen bg-gray-500/8">
    <div class="p-6">
      <div class="p-4 text-left border border-gray-200 bg-white  ">
        <div class="mb-2">
          {{ voteData.question }}
        </div>
        <van-tag type="primary" color="#28B648" size="medium">
          {{ voteData.optionType }}
        </van-tag>
      </div>
      <!-- 遍历选项 -->
      <div>
        <van-radio-group
          v-for="item in voteData.option"
          :key="item.id"
          v-model="voteData.optionChecked"
        >
          <!-- 判断是否已经投票 -->
          <!-- 未投票 -->
          <div
            v-if="voteData.isVote"
            class="mt-6 border-gray-200 border p-10px bg-white"
          >
            <van-radio
              :name="item.id"
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
              v-if="voteData.optionChecked == item.id"
              class="mt-6 border h-42px"
              style="border-color:#23A923"
              @click="show = true"
            >
              <div
                class="border-none h-40px leading-40px text-left flex"
                :style="{ width: voteData.optionWidth[item.id-1] }"
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
              v-else-if="item.poll > 0 && voteData.optionChecked != item.id"
              class="mt-6 border-true-gray-200 border"
            >
              <div
                class="border-none h-40px bg-gray-300 leading-40px text-left"
                :style="{ width: voteData.optionWidth[item.id-1] }"
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
          {{ "截止时间：" + voteData.endTime }}
        </div>
        <van-button
          v-if="voteData.isVote"
          type="primary"
          size="large"
          :color="voteData.color"
          class="my-10px"
          @click="isClick(voteData, voteData.optionChecked)"
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
          @click="isClick(voteData, voteData.optionChecked)"
        >
          {{ voteData.text }}
        </van-button>
      </div>
    </div>
  </div>
  <records-list :show="show" :type="voteData.type" @show-change="showChange()" />
</template>

<route lang="yaml">
meta:
  layout: default
  title: 我要投票
</route>

function mounted() {
  throw new Error('Function not implemented.')
}
