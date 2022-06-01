<script setup lang="ts">
import { Notify,Toast } from 'vant'
import { getSignSpace, quitSignSpace } from '~/api/mySpace/index'
import { getSpaceMemberList } from '~/api/mySpace/spaceMember'
import { getUserId } from '~/utils/cookies'
const route = useRoute()
const router = useRouter()
const showLoading = ref(true)
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
  userId: getUserId(),
  spaceId: parseInt(id.value),
})
// 获取我参与的空间的列表
const getSpace = () => {
  getSignSpace(id.value).then((res) => {
    if (res.code === 200) {
      setTimeout(() => {
        showLoading.value = false
      }, 300)
      spaceList.id = res.data.id
      spaceList.createTime = res.data.createTime
      spaceList.spaceName = res.data.spaceName
      spaceList.count = res.data.count
      quitData.spaceId = res.data.id
    }
  })
}
getSpace()//初始化列表

getSpaceMemberList(id.value).then((res: any) => {
  if(res.code === 200)
  member_list.push(...res.rows)
})
// 退出空间的方法
const quitSpace = () => {
  quitSignSpace(quitData).then((res) => {
    console.log(getUserId(), 111)
    if (res.code === 200) {
      Notify({ type: 'primary', message: '退出成功' })
      router.replace({
        path: '/space',
        query: { quitSpace: true }
      })
    } else if(res.code == 501) {
      Notify({
        message: res.msg
      })
    }
  })
}
const showQuit = ref(false)// 是否显示退出空间的弹窗
const refreshing = ref(false)
const onRefresh = () =>{
  setTimeout(() =>{
    getSpaceMemberList(id.value).then((res) => {
  if (res.code === 200){
    member_list.value = res.rows
    Toast('刷新成功');
    refreshing.value = false;
      }
    })
  },1000)
}
</script>
<template>
  <div style="position: absolute; top: 40vh;left: 45vw; z-index: 10">
    <van-loading
      v-if="showLoading"
      type="spinner"
      size="24px"
      color="#666"
      vertical
    />
  </div>
  <div v-if="!showLoading" class="bg-gray-500/8 p-3 min-h-100vh">
    <div class="text-left text-hex-aaa text-xs ml-3">
      空间信息
    </div>
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
          {{ spaceList.count }}人
        </span>
      </div>
      <van-dialog
        v-model:show="showQuit"
        title="是否退出空间"
        confirm-button-color="rgb(63,133,255)"
        show-cancel-button
        @confirm="quitSpace()"
      />
    </div>
    <div class="text-left mt-5 text-hex-aaa text-xs ml-3 mt-3">
      成员
    </div>
    <div
      class="bg-hex-fff px-2 border border-hex-ccc rounded"
    >
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list>
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
          <span class="flex-1">角色</span>
        </ul>
        <ul
          v-for="item in member_list"
          :key="item"
          class="flex justify-around h-3em leading-12 border-b border-b-hex-E4E4E4 text-sm"
        >
          <span class="flex-1">{{ item.userId }}</span>
          <span class="flex-1">{{ item.name }}</span>
          <span class="flex-1">
            <van-tag v-if="item.memberRank===2" color="#38bdf8">负责人</van-tag>
            <van-tag v-if="item.memberRank===1" color="#10b981">管理员</van-tag>
            <van-tag v-if="item.memberRank===0" plain color="#78716c">成员</van-tag>
          </span>
        </ul>
      </van-list>
    </van-pull-refresh>
    </div>
    <div class="p-2 bg-white mt-3 rounded border border-hex-ccc text-red font-600" @click="showQuit = true">
      退出空间
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 空间详情
</route>
