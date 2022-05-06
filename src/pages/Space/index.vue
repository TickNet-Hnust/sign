<!-- 学生端 -->

<script setup lang="ts">
import { Toast } from 'vant'
import { get } from 'vant/lib/utils'
import { signSpaceList } from '~/api/mySpace/index'
const isShow = ref(false)
const router = useRouter()
const searchdata = reactive({

})
// 点击加号创建空间
const changeShow = () => {
  isShow.value = !isShow.value
}
// sss
const active = ref(0)// 控制tab切换
const spaceList = ref([])
const request = ref({
  status: active.value,
  spaceName: '',
  pageNum: 1,
  pageSize: 15,
  userId: 1905040121,
})
const getsignSpaceList = () => {
  request.value.status = active.value
  signSpaceList(request.value).then((res) => {
    if (res.code === 200)
      console.log(res)
    spaceList.value = res.rows
  }).catch((err) => {
    console.log(err)
  })
}
// getsignSpaceList()
const searchList = () => {
  getsignSpaceList()
}
const tabChange = () => {
  console.log(active.value)
  getsignSpaceList()
}
const clear = () => {
  getsignSpaceList()
}
const goSpace = (item: any) => {
  router.push({
    path: '/Space/manage',
    query: {
      id: item.id,
    },
  })
}

</script>

<template>
  <div class="p-3 bg-gray-500/8 h-screen">
    <div class="flex justify-between items-center">
      <span class="py-1 flex items-center bg-hex-fff rounded w-xs">
        <van-search
          v-model.trim="request.spaceName"
          class="w-full"
          show-action
          placeholder="请输入搜索关键词"
          @clear="clear"
        >
          <template #action>
            <div @click="searchList">搜索</div>
          </template>
        </van-search>
      </span>
      <span class="text-xl" @click="changeShow">
        <span
          class="
            color-hex-59B476
            border-3 border-hex-59B476
            rounded
            font-bold
            px-0.2
            mr-2
          "
        ><van-icon class="font-700 w-6" name="plus" /></span>
      </span>
    </div>
    <!-- 弹出框 -->
    <van-dialog
      v-model:show="isShow"
      title="面对面建空间"
      confirm-button-color="rgb(63,133,255)"
      show-cancel-button
    >
      <div class="mt-5 px-10">
        <div class="text-14px text-hex-999">
          和身边的朋友输入同样的四个数字，进入同一个空间
        </div>
        <van-field class="border-b border-hex-ccc mb-3" type="digit" />
      </div>
    </van-dialog>
    <div class="mt-8 border-1 border-hex-DEDEDE bg-hex-fff rounded py-3 px-5">
      <van-tabs
        v-model:active="active"
        color="rgb(40,182,72)"
        @change="tabChange"
        @rendered="getsignSpaceList()"
      >
        <van-tab title="我管理的" />
        <van-tab title="我参与的" />
      </van-tabs>
      <van-list>
        <ul
          v-for="item in spaceList"
          :key="item"
          class="border border-hex-dedede mt-3 p-3 rounded shadow-md"
          @click="goSpace(item)"
        >
          <div class="text-left font-bold">
            {{ item.spaceName }}
          </div>
          <div class="text-left text-xs mt-1 color-hex-999">
            {{ item.createTime }}
          </div>
        </ul>
        <div v-if=" spaceList.length===0 " class="text-sm text-hex-aaa mb-5 px-5 mt-10">
          空空如也~
        </div>
        <van-list />
      </van-list>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 我的空间
</route>
