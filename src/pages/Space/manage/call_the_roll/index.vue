<script setup lang="ts">
import { getSpaceMemberList } from '~/api/mySpace/spaceMember'
const route = useRoute()
const spaceId = route.query.id
// 班级成员列表
const name_list = ref([])
// 获取班级成员
const check_name = ref('')
onMounted(() => {
  getSpaceMemberList(Number(spaceId)).then((res: any) => {
    if(res.code === 200 ) {
      res.rows.forEach((item: any) => {
        name_list.value.push(item.name)
      })
      check_name.value = name_list.value[0]
    }
  }).catch((err) => {
    console.log(err)
  })
})
const checkTime = (i) => {
  if (i < 10)
    return `0${i}`
  else return i
}
const stop_roll = () => {
  pause()
  const mydate = new Date()
  const checked_item = {
    name: check_name.value,
    time: `${checkTime(mydate.getMonth() + 1)}-${checkTime(mydate.getDate())} ${checkTime(mydate.getHours())
    }:${checkTime(mydate.getMinutes())}:${checkTime(mydate.getSeconds())}`,
  }
  checked_list.splice(0,0,checked_item)
}
// 选中列表
const checked_list = reactive([])
const { pause, resume, isActive } = useIntervalFn(
  () => {
   let r = Math.round(Math.random() * (name_list.value.length - 1))
    check_name.value = name_list.value[r]
  },
  100,
  {
    immediate: false,
  },
)
</script>
<template>
  <div class="bg-gray-500/8 p-7 h-screen">
    <div
      class="bg-hex-93CEA6 mx-auto my-1 text-3xl text-white w-6em h-6em leading-6em rounded-1/2"
    >
      {{ check_name }}
    </div>
    <div class="flex justify-between">
      <div
        class="begin action_btn w-9em bg-white h-3em rounded leading-3em mt-5"
        @click="resume"
      >
        随机点名
      </div>
      <div
        class="stop action_btn w-9em bg-white h-3em rounded leading-3em mt-5"
        @click="stop_roll"
      >
        停止点名
      </div>
    </div>
    <div
      class="max-h-15em border border-hex-41AA62 mt-6 rounded bg-white px-3 mx-3 text-14px"
      style="overflow: scroll"
    >
      <div class="py-1">选中人名单</div>
      <van-empty v-if="checked_list.length === 0" class="py-2" description="暂时为空" :image-size="[120, 80]" />
      <div
        v-for="item in checked_list"
        :key="item"
        class="flex justify-between py-1 border-t border-hex-ccc"
      >
        <span>{{ item.name }}</span>
        <span>{{ item.time }}</span>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
  title: 发起点名
</route>
<style scoped>
.action_btn {
  color: rgb(65, 170, 98);
  border: 1px solid rgb(65, 170, 98);
}
.action_btn:hover {
  background-color: rgb(65, 170, 98);
  color: #fff;
}
</style>
