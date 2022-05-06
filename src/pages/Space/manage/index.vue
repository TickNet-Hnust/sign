<script setup leng="ts">
import { onMounted } from 'vue'
import src from '~/assets/1.png'
import { getSignSpace } from '~/api/mySpace/index'
import { getSpaceMemberList } from '~/api/mySpace/spaceMember'
const route = useRoute()
const active = ref(0)
const number = ref(8)
const loading = ref(false)
const fininshed = ref(true)
const details_list = reactive([
  {
    title: '发起签到',
    icon: 'i-carbon-3d-cursor-alt',
    link: 'checkIn',
  },
  {
    title: '发起投票',
    icon: 'i-carbon-receipt',
    link: 'vote',
  },
  {
    title: '发起抽签',
    icon: 'i-carbon-align-box-middle-center',
    link: 'draw',
  },
  {
    title: '发起点名',
    icon: 'i-carbon-user-certification',
    link: 'call_the_roll',
  },
  {
    title: '成员追加',
    icon: 'i-carbon-user-follow',
    link: 'add_member',
  },
  {
    title: '积分',
    icon: 'i-carbon-report',
    link: 'scorecard',
  },
])
const member_list = reactive([

])
const router = useRouter()
const finished = ref(true)
const jumpPage = (path) => {
  router.push(`manage/${path}`)
}
const spaceList = reactive({
  id: '',
  spaceName: '',
  count: '',
  createTime: '',
})
const id = ref(route.query.id)
getSignSpace(id.value).then((res) => {
  spaceList.id = res.data.id
  spaceList.createTime = res.data.createTime
  spaceList.spaceName = res.data.spaceName
  spaceList.count = res.data.count
})
getSpaceMemberList(id.value).then((res) => {
  member_list.push(...res.rows)
  console.log(member_list)
})
// const changeRank = (member_list.memberRank) => {

// }
</script>
<template>
  <div class="bg-gray-500/8 p-3 h-screen">
    <div class="flex bg-hex-fff rounded justify-between px-5 pt-5">
      <div class="flex-col flex">
        <div>
          <span class="mt-6 mr-4 text-md">{{ spaceList.spaceName }}</span>
          <span><van-icon name="edit" /></span>
        </div>
        <span class="mt-3 text-xs text-left">成员：{{ spaceList.count }}</span>
      </div>
      <div class="rounded">
        <van-button type="danger" class="rounded" size="small">
          删除空间
        </van-button>
      </div>
    </div>
    <van-tabs v-model:active="active" color="rgb(0,51,255)">
      <van-tab title="概况">
        <div class="rounded flex flex-wrap justify-around">
          <div
            v-for="item in details_list"
            :key="item"
            class="mt-5 p-3 mx-5 inline-block border border-hex-41be62 text-hex-999 rounded w-25vw h-25vw bg-white"
            shadow="~ md gray-400/60"
            @click="jumpPage(item.link)"
          >
            <div class="mt-2" text="2xl" color="green-600" m="auto" :class="item.icon" />
            <div class="mt-3 text-14px">
              {{ item.title }}
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="成员">
        <div class="bg-white px-2">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div v-for="item in member_list" :key="item" class="flex text-sm py-2 border-b border-hex-ddd">
              <span class="flex-1">{{ item.userId }}</span>
              <span class="flex-1">{{ item.name }}</span>
              <span class="flex-1" @click="changeRank">:</span>
            </div>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 空间详情
</route>
