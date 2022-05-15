<!--
 * @Descipttion: 
 * @Author: 刘晴
 * @Date: 2022-05-07 15:08:29
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-15 17:08:06
-->
<script lang="ts" setup>
import { enterSpaceByCode } from '~/api/record/index'
import { getSignSpace } from '~/api/mySpace/index'
import { getSpaceMemberList } from '~/api/mySpace/spaceMember'
import { Toast } from 'vant'
const router = useRouter()
const route = useRoute()
const spaceId = route.query.spaceId
const member_list = reactive([])
const spaceList = ref({
  id: '',
  spaceName: '',
  count: '',
  createTime: '',
})
const request = reactive({
  spaceId: spaceId,
  code: route.query.code
})
const joinSpace = () => {
  Toast.loading({
    message: '正在加入该空间',
    forbidClick: true,
     duration: 1000
  })
  setTimeout(() => {
    enterSpaceByCode(request).then((res: any) => {
      if(res.code === 200) {
        Toast.success({
          message: '加入成功',
          duration: 1000
        })
        router.replace({
          path: '/space/involve',
          query: {
            id: spaceId
          }
        })
      } else {
        Toast.fail({
          message: '加入失败，请重试',
          duration: 1000
        })
        router.replace({
          path: '/'
        })
      }
    })
  },1000)
}
onMounted(() => {
  Toast.loading({
    message: '加载中...',
     forbidClick: true,
     duration: 700
  })
  getSignSpace(Number(spaceId)).then((res: any) => {
    if(res.code === 200) {
      spaceList.value = res.data
    }
  })
  getSpaceMemberList(Number(spaceId)).then((res: any) => {
    if(res.code === 200) {
      member_list.push(...res.rows)
    }
  })
})
</script>

<template>
  <div class="bg-gray-500/8 p-3 min-h-100vh">
    <div class="text-left text-hex-aaa text-xs ml-3">空间信息</div>
    <div class="bg-hex-fff rounded px-5 pt-2 text-hex-666 border border-hex-ccc">
      <div class="flex justify-between border-b border-hex-ccc text-14px py-2">
        <span>空间名称</span>
        <span>
          {{ spaceList.spaceName }}
        </span>
      </div>
      <div class="flex justify-between text-14px py-2">
        <span>成员</span>
        <span>
          {{ member_list.length }}人
        </span>
      </div>
    </div>
    <div class="text-left mt-5 text-hex-aaa text-xs ml-3 mt-3">成员</div>
    <div
      class="bg-hex-fff px-2 border border-hex-ccc rounded h-20em"
      style="overflow: scroll"
    >
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
    <div class="p-2 bg-white mt-3 rounded border border-hex-ccc text-hex-10AA62 font-600" @click="joinSpace">加入空间</div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 加入空间
</route>