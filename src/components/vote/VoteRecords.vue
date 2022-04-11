<script setup lang="ts">

interface VoteInfo{
  id: number
  voteName: string
  voteTime: string
}
interface VoteOptionData{
  voteList: Array<VoteInfo> // 数组形式存储选项投票数据
}

// 父子组件传参，控制投票数据显示
defineProps({
  show: {
    type: Boolean,
  },
})
// 接受父组件方法，改变show的值
const emit = defineEmits(['showChange'])
const fun = function() {
  emit('showChange')
}

const voteOptionData: VoteOptionData = reactive({
  voteList: [
    {
      id: 1,
      voteTime: '01-15 10:15',
      voteName: '张三',
    },
    {
      id: 2,
      voteTime: '01-15 10:15',
      voteName: '李四',
    },
    {
      id: 3,
      voteTime: '01-15 10:16',
      voteName: '王五',
    },
  ],
})

const loading = ref(true)
const finished = ref(true)
const onLoad = () => {
}
</script>
<template>
  <van-overlay :show="$props.show">
    <div class="flex items-center justify-center h-full">
      <div class="bg-white w-4/5 h-5/7 p-4 rounded-lg">
        <div class="font-600 mb-5">
          <span>投票纪录</span>
          <van-icon name="cross" class="float-right text-base" @click="fun()" />
        </div>
        <div class="border rounded-lg h-4/5" style="border-color:#E4E4E4;background-color:#F6F7F9">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            @load="onLoad"
          >
            <van-cell v-for="item in voteOptionData.voteList" :key="item.id" style="border-bottom-color:#E4E4E4;background-color:#F6F7F9">
              <span class="">{{ item.voteName }}</span>
              <span class="float-right">{{ item.voteTime }}</span>
            </van-cell>
          </van-list>
        </div>
      </div>
    </div>
  </van-overlay>
</template>
