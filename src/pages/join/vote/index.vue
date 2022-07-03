<script setup lang="ts">
// 定义投票数据类型接口
import { onMounted } from 'vue'
import { Dialog, Toast } from 'vant'
import { addVoteRecord, getAllVoteRecord } from '~/api/myJoin/vote'
import { getVote } from '~/api/myJoin/record'
import { debounce } from '~/utils/shake'

const route = useRoute()
const voteId = Number(route.query.id)
const loading = ref(true) // 控制数据加载完成，界面显示

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
  status: number // 1表示已经结束
  text: string
  anonymity: number // 是否匿名 1表示匿名，0表示不匿名
  optionWidth: Array<string> // 确定选项染色的宽度
}

// 定义投票选项数据类型接口
interface OptionData{
  id: number // id进项选项的识别
  optionValue: string
  poll: number
}

// 修改时间组件的父传子参数
const props = reactive({
  endDate: '',
  endTime: '',
})

// 投票的初始化数据
const voteData: VoteData = reactive({
  type: '投票',
  status: 1,
  question: '',
  voteNumLimit: 1,
  endTime: '',
  isVote: 0,
  optionChecked: [],
  option: [],
  anonymity: 0,
  text: computed(() => {
    if (voteData.isVote) {
      return '已投票'
    }
    else {
      if (voteData.status)
        return '已结束'
      else
        return '开始投票'
    }
  }),
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

// 数据初始化
onMounted(() => {
  window.scrollTo(0, 0)
  getVote(voteId).then((res: any) => {
    console.warn(res.data)
    voteData.question = res.data.voteName
    voteData.status = res.data.status
    voteData.endTime = res.data.endTime
    voteData.isVote = res.data.attend
    voteData.voteNumLimit = res.data.voteNumLimit
    voteData.anonymity = res.data.anonymity
    props.endDate = voteData.endTime.split(' ')[0]
    props.endTime = `${voteData.endTime.split(' ')[1].split(':')[0]}:${voteData.endTime.split(' ')[1].split(':')[1]}`
    console.warn(props)
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
    loading.value = false
  })
})

// 是否显示投票详细数据
const show = ref(false)
const optionCheckedValue = ref('') // 被点击的选项的值
// 修改投票名单的展示
const showChange = function() {
  show.value = !show.value
}
// 监听投票人员名单展示函数
const handleClickOption = (id: number) => {
  show.value = true
  optionCheckedValue.value = voteData.option[id - 1].optionValue
  console.warn(optionCheckedValue.value)
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
const isClick = debounce(() => {
  console.warn('vote click函数被执行')
  const voteOption: Array<string> = []
  console.warn(voteData.optionChecked)
  if (voteData.optionChecked.length === 0) {
    Dialog.alert({
      message: '请至少选择一个选项！',
    }).then(() => {
    })
  }
  else {
    voteData.optionChecked.forEach((item) => {
      const option = voteData.option[item - 1].optionValue
      voteOption.push(option)
    })
    addVoteRecord(voteId, voteOption).then((res: any) => {
      getAllVoteRecord(voteId).then((res: any) => {
        console.warn(res)
        for (let i = 0; i < res.data.optionCount.length; i++) {
          for (let j = 0; j < res.data.optionCount.length; j++) {
            if (res.data.voteOption[i] === voteData.option[j].optionValue)
              voteData.option[j].poll = res.data.optionCount[i]
          }
        }
        voteData.isVote = 1
      })
    })
  }
}, 500)

const refreshLoading = ref(false)
const onRefresh = () => {
  // loading.value = true
  loading.value = true
  // voteData.option.length = 0
  console.warn('刷新')
  getVote(voteId).then((res: any) => {
    console.warn(res)
    voteData.status = res.data.status
    voteData.isVote = res.data.attend
    voteData.option.forEach((optionItem: any) => {
      for (const key in res.data.voteNums) {
        if (key === optionItem.optionValue)
          optionItem.poll = res.data.voteNums[key]
      }
    })
    if (res.data.presentChoices !== null) {
      res.data.presentChoices.forEach((key: string) => {
        for (const item of voteData.option) {
          if (item.optionValue === key)
            voteData.optionChecked.push(item.id)
        }
      })
    }
    voteData.optionChecked = Array.from(new Set(voteData.optionChecked))
    loading.value = false
    Toast.success('刷新成功')
    refreshLoading.value = false
  })
}
</script>

<template>
  <div v-if="loading" class="bg-gray-500/8 p-3 h-full">
    <van-loading size="24px">
      加载中...
    </van-loading>
  </div>
  <div v-else class="bg-gray-500/8 h-full">
    <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
      <div class="p-3">
        <div class="p-3 text-left border border-gray-200 bg-white rounded">
          <div class="mb-2">
            {{ voteData.question }}
          </div>
          <van-tag type="primary" color="#28B648" size="medium" class="mr-3">
            {{ voteData.voteNumLimit > 1 ? "多选" : "单选" }}
          </van-tag>
          <van-tag type="primary" color="#66CCFF" size="medium" class="mr-3">
            {{ `${voteData.optionChecked.length} / ${voteData.voteNumLimit}` }}
          </van-tag>
          <van-tag type="warning" size="medium" v-if="voteData.anonymity">匿名</van-tag>
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
              v-if="voteData.isVote === 0 && voteData.status === 0"
              class="mt-4 border-gray-200 border p-10px bg-white rounded text-sm"
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
                class="mt-4 h-42px bg-light-50 rounded flex items-center border"
                style="border-color: #1fa71f"
                @click="handleClickOption(item.id)"
              >
                <div
                  class="h-42px leading-42px text-left flex rounded checkedBorder border"
                  :style="{ width: voteData.optionWidth[item.id - 1]}"
                  style="white-space: nowrap; background-color: #c8e5c9;;"
                  :class="voteData.optionWidth[item.id - 1]==='100%'?'':'checkedOption'"
                >
                  <div
                    class="
                    text-dark-900
                    left-3
                    relative
                    leading-40px
                    text-sm
                  "
                  >
                    {{ item.optionValue }}
                  </div>
                  <span
                    class="
                    absolute
                    right-50px
                    leading-40px
                    text-cool-gray-400 text-sm
                  "
                  >
                    {{ item.poll + "票" }}
                  </span>
                </div>
              </div>
              <!-- 没有选上但是有票数的选项 -->
              <div
                v-else-if="item.poll > 0 && !optionCheck(item.id)"
                class="mt-4 border-true-gray-200 border rounded bg-white h-42px flex items-center border"
                @click="handleClickOption(item.id)"
              >
                <div
                  class="
                  border
                  h-42px
                  bg-gray-300
                  leading-40px
                  text-left
                  flex
                  rounded
                  uncheckedBorder
                "
                  :class="voteData.optionWidth[item.id - 1]==='100%'?'':'checkedOption'"
                  :style="{ width: voteData.optionWidth[item.id - 1] }"
                  style="white-space: nowrap"
                >
                  <!-- <van-icon name="checked" color="green" size="1.25em" class="relative left-10px  leading-40px" /> -->
                  <div
                    class="
                    text-dark-900
                    left-10px
                    relative
                    w-40px
                    leading-40px
                    text-sm
                  "
                  >
                    {{ item.optionValue }}
                  </div>
                  <span
                    class="
                    absolute
                    right-50px
                    leading-40px
                    text-sm text-cool-gray-400
                  "
                  >
                    {{ item.poll + "票" }}
                  </span>
                </div>
              </div>
              <div
                v-else-if="item.poll === 0"
                class="
                mt-4
                border-true-gray-200 border
                h-42px
                text-dark-900 text-left
                bg-light-50
                rounded
              "
                @click="handleClickOption(item.id)"
              >
                <span class="leading-40px m-10px text-sm">{{
                  item.optionValue
                }}</span>
                <span
                  class="
                  absolute
                  right-50px
                  leading-20px
                  text-sm text-cool-gray-400
                  pt-10px
                "
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
            :color="voteData.isVote || voteData.status ? '#9DD49D' : '#1FA71F'"
            class="my-10px rounded"
            :disabled="voteData.isVote === 1 || voteData.status === 1"
            @click="isClick()"
          >
            {{ voteData.text }}
          </van-button>
        </div>
      </div>
      <records-list
        v-if="show==true&&voteData.anonymity===1"
        :show="show"
        :type="voteData.type"
        :active-id="voteId"
        :option-checked-value="optionCheckedValue"
        @show-change="showChange()"
      />
    </van-pull-refresh>
  </div>
</template>

<style scoped>
.checkedOption{
  border-bottom-right-radius:0px;
  border-top-right-radius:0px
}
.uncheckedBorder{
  border-top-style:solid ;
  border-bottom-style:solid;
  border-left-style:none ;
  border-right-style:none;
  border-color: rgba(229, 229, 229, var(--un-border-opacity));
}

.checkedBorder{
  border-top-style:solid ;
  border-bottom-style:solid;
  border-left-style:none ;
  border-right-style:none;
  border-color:  #1fa71f;
}
</style>
<route lang="yaml">
meta:
  layout: default
  title: 进行投票
</route>
