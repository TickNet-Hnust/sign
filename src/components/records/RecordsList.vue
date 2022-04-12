<script setup lang="ts">

interface RecordInfo{ // 定义单个数据类型
  id: number
  time: string // 参与时间
  name: string // 参加者姓名
}

// 父子组件传参，控制详细数据显示
defineProps({
  show: {
    type: Boolean,
  },
  type: { // 抽签或者投票等类型
    type: String,
  },
})

// 接受父组件方法，改变show的值
const emit = defineEmits(['showChange'])
const fun = function() {
  emit('showChange')
}

const recordList: Array<RecordInfo> = reactive([
  {
    id: 1,
    time: '01-15 10:15',
    name: '张三',
  },
  {
    id: 2,
    time: '01-15 10:15',
    name: '李四',
  },
  {
    id: 3,
    time: '01-15 10:16',
    name: '王五',
  },
])

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
          <span>{{ $props.type }}记录</span>
          <van-icon name="cross" class="float-right text-base" @click="fun()" />
        </div>
        <div class="border rounded-lg h-4/5" style="border-color:#E4E4E4;background-color:#F6F7F9">
          <van-list v-model:loading="loading" :finished="finished" @load="onLoad">
            <van-cell v-for="item in recordList" :key="item.id" style="border-bottom-color:#E4E4E4;background-color:#F6F7F9">
              <span class="">{{ item.name }}</span>
              <span class="float-right">{{ item.time }}</span>
            </van-cell>
          </van-list>
        </div>
      </div>
    </div>
  </van-overlay>
</template>
