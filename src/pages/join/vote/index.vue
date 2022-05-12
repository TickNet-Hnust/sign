<script setup lang="ts">
// 定义投票数据类型接口
import { onMounted } from 'vue'
import { getVote } from '~/api/myJoin/record'
import { addVoteRecord } from '~/api/myJoin/vote'

const route = useRoute()
const voteId = Number(route.query.id)

// 定义投票页面数据接口
interface VoteData {
  type: string // 活动类型
  question: string // 投票问题
  voteNumLimit: number // 选择票数的数量
  endTime: string // 投票结束时间
  optionChecked: Array<number> // 被选择的选项id
  isVote: number // 是否投票，1表示已参与，0表示未参与
  option: Array<OptionData> // 选项具体数据
  allPollNum: number
  optionWidth: Array<string> // 确定选项染色的宽度
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
  voteNumLimit: 1,
  endTime: '',
  isVote: 0,
  optionChecked: [],
  option: [],
  optionWidth: computed(() => {
    const arr: Array<string> = []
    voteData.option.forEach((item) => {
      arr.push(`${(item.poll * 100) / voteData.allPollNum}%`)
    })
    return arr
  }),
  allPollNum: computed(() => {
    let result = 0
    voteData.option.forEach((item) => {
      result = result + item.poll
    })
    return result
  }),
})

onMounted(() => {
  getVote(voteId).then((res) => {
    console.warn(res.data)
    voteData.question = res.data.voteName
    voteData.endTime = res.data.endTime
    voteData.isVote = res.data.attend
    let i = 1
    voteData.option.pop()
    for (const key in res.data.voteNums) {
      const item: OptionData = {
        id: i,
        optionValue: key,
        poll: res.data.voteNums[key],
      }
      voteData.option.push(item)
      i = i + 1
    }
    i = 1
    if (res.data.presentChoices !== null) {
      res.data.presentChoices.forEach((key: string) => {
        for (const item of voteData.option) {
          if (item.optionValue === key)
            voteData.optionChecked.push(item.id)
        }
      })
    }
  })
})

// 是否显示投票详细数据
const show = ref(false)
const showChange = function() {
  show.value = !show
}

// 检查选项是否选中，选中返回true，未选中返回false
const optionCheck = function(optionId: number) {
  let result = false
  voteData.optionChecked.forEach((item) => {
    if (item === optionId)
      result = true
  })
  return result
}

// 投票按钮
const isClick = () => {
  const voteOption: Array<string> = []
  console.warn(voteData.optionChecked)
  voteData.optionChecked.forEach((item) => {
    const option = voteData.option[item - 1].optionValue
    voteOption.push(option)
  })
  addVoteRecord(voteId, voteOption).then((res) => {
    voteData.isVote = 1
  })
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
          {{ voteData.voteNumLimit>1?'多选':'单选' }}
        </van-tag>
      </div>
      <!-- 遍历选项 -->
      <div>
        <van-checkbox-group
          v-for="item in voteData.option"
          :key="item.id"
          v-model="voteData.optionChecked"
          :max="voteData.voteNumLimit"
        >
          <!-- 判断是否已经投票 -->
          <!-- 未投票 -->
          <div
            v-if="voteData.isVote === 0"
            class="mt-6 border-gray-200 border p-10px bg-white"
          >
            <van-checkbox
              :name="item.id"
              checked-color="#dde1e3"
              icon-size="16px"
            >
              {{ item.optionValue }}
            </van-checkbox>
          </div>
          <!-- 已投票 -->
          <div v-else>
            <!-- 被选中的选项样式 -->
            <div
              v-if="optionCheck(item.id)"
              class="mt-6 h-42px bg-light-50 border"
              style="border-color:#1FA71F"
              @click="show = true"
            >
              <div
                class="border-none h-40px leading-40px text-left flex"
                :style="{ width: voteData.optionWidth[item.id-1] }"
                style="
                  white-space: nowrap;
                  background-color: #C8E5C9;
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
              v-else-if="item.poll > 0 && !optionCheck(item.id)"
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
              v-else-if="item.poll === 0"
              class="mt-6 border-true-gray-200 border h-42px  text-dark-900 text-left bg-light-50"
            >
              <span class="leading-40px m-10px">{{ item.optionValue }}</span>
              <span
                class="absolute right-50px leading-20px text-sm text-cool-gray-400 pt-10px"
              >
                {{ item.poll + "票" }}
              </span>
            </div>
          </div>
        </van-checkbox-group>
      </div>
      <div class="text-cool-gray-500">
        <div class="text-xs mt-15px text-left">
          {{ "截止时间：" + voteData.endTime }}
        </div>
        <van-button
          type="primary"
          size="large"
          :color="voteData.isVote?'#9DD49D':'#1FA71F'"
          class="my-10px"
          :disabled="voteData.isVote===1"
          @click="isClick()"
        >
          {{ voteData.isVote?'已投票':'开始投票' }}
        </van-button>
      </div>
    </div>
  </div>
  <records-list :show="show" :type="voteData.type" :active-id="voteId" @show-change="showChange()" />
</template>

<route lang="yaml">
meta:
  layout: default
  title: 我要投票
</route>
