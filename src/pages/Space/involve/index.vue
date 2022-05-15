<script setup lang="ts">
import { Notify } from 'vant'
import { getSignSpace, quitSignSpace } from '~/api/mySpace/index'
import { getSpaceMemberList } from '~/api/mySpace/spaceMember'
const loading = ref(false)
const finished = ref(true)
const route = useRoute()
const router = useRouter()
// 初始化成员列表
const member_list = reactive([

])
// 初始化一个空间列表
const spaceList = reactive({
  id: '',
  spaceName: '',
  count: '',
  createTime: '',
})
const id = ref(route.query.id)
// 退出空间的参数
const quitData = reactive({
  userId: '1905040121',
  spaceId: 0,
})
// 获取我参与的空间的列表
getSignSpace(id.value).then((res) => {
  spaceList.id = res.data.id
  spaceList.createTime = res.data.createTime
  spaceList.spaceName = res.data.spaceName
  spaceList.count = res.data.count
  quitData.spaceId = res.data.id
  console.log(spaceList)
})
getSpaceMemberList(id.value).then((res: any) => {
  member_list.push(...res.rows)
})
// 退出空间的方法
const quitSpace = () => {
  quitSignSpace(quitData).then((res) => {
    if (res.code === 200) {
      Notify({ type: 'primary', message: '退出成功' })
      router.push('/Space')
    }
  })
}
const showQuit = ref(false)// 是否显示退出空间的弹窗

</script>
<template>
  <div class="bg-gray-500/8 p-3 min-h-100vh">
    <div class="text-left text-hex-aaa text-xs ml-3">空间信息</div>
    <div class="bg-hex-fff rounded px-5 pt-2 text-hex-666 border border-hex-ccc">
      <div class="flex justify-between border-b border-hex-ccc text-14px py-2">
        <span>空间名称</span>
        <span>
          {{ spaceList.spaceName }}
          <span v-if="rank ===2" @click="showUpdate = true"><van-icon name="arrow" /></span>
        </span>
      </div>
      <div class="flex justify-between text-14px py-2">
        <span>成员</span>
        <span>
          {{ member_list.length }}人
        </span>
      </div>
      <van-dialog
        v-model:show="showQuit"
        title="是否删除空间"
        confirm-button-color="rgb(63,133,255)"
        show-cancel-button
        @confirm="quitSpace()"
      />
    </div>
    <div class="text-left mt-5 text-hex-aaa text-xs ml-3 mt-3">成员</div>
    <div
      class="bg-hex-fff px-2 border border-hex-ccc rounded"
    >
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        loading-text="——下拉加载更多——"
        @load="onLoad"
      >
        <ul
          class="
            flex
            justify-around
            h-3em
            leading-12
            border-b border-b-hex-E4E4E4
            text-sm
            list_top
            "
        >
          <span class="flex-1">学号/工号</span>
          <span class="flex-1">姓名</span>
          <span class="flex-1">身份</span>
        </ul>
        <ul
          v-for="item in member_list"
          :key="item"
          class="flex justify-around h-3em leading-12 border-b border-b-hex-E4E4E4 text-sm"
        >
          <span class="flex-1">{{ item.userId }}</span>
          <span class="flex-1">{{ item.name }}</span>
          <span class="flex-1">
            <van-tag plain v-if="item.memberRank===2" color="#ef4444">负责人</van-tag>
            <van-tag plain v-if="item.memberRank===1" color="#10b981">管理员</van-tag>
            <van-tag plain v-if="item.memberRank===0" color="#78716c">成员</van-tag>
          </span>
        </ul>
      </van-list>
    </div>
    <div class="p-2 bg-white mt-3 rounded border border-hex-ccc text-red font-600">退出空间</div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 空间详情
</route>
