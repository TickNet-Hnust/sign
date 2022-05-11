<!-- 学生端 -->

<script setup lang="ts">
import { Notify, Toast } from 'vant'
import { get } from 'vant/lib/utils'
import { addAFTFSpace, signSpaceList } from '~/api/mySpace/index'
const isShow = ref(false)
const router = useRouter()

// 点击加号创建空间
const changeShow = () => {
  isShow.value = !isShow.value
}
// sss

const active = ref(0)// 控制tab切换 0：我参与的 1：我管理的
const spaceList = ref([])
const request = ref({
  memberRank: active.value,
  spaceName: '',
  pageNum: 1,
  pageSize: 10,
})
const getsignSpaceList = () => {
  request.value.memberRank = active.value
  signSpaceList(request.value).then((res: any) => {
    if (res.code === 200)
      spaceList.value = spaceList.value.concat(res.rows)

    if (spaceList.value.length < res.total) {
      request.value.pageNum++
      getsignSpaceList()
    }
  }).catch((err) => {
    console.log(err)
  })
}
getsignSpaceList()// 进入页面获取空间列表
// 搜索空间的方法
const searchList = () => {
  spaceList.value = []
  getsignSpaceList()
}
const tabChange = () => {
  spaceList.value = []
  request.value.pageNum = 1
  getsignSpaceList()
  console.log(spaceList.value)
}
// 点击清除重新加载数据
const clear = () => {
  getsignSpaceList()
}
// 跳转指定空间
const goSpace = (item: any) => {
  if (active.value === 0) {
    router.push({
      path: '/Space/involve',
      query: {
        id: item.id,
      },
    })
  }
  else {
    router.push({
      path: '/Space/manage',
      query: {
        id: item.id,
      },
    })
  }
}
// 面对面建群的参数
const addAFTFSpaceData = reactive({
  code: '',
  longitude: 116.397128,
  latitude: 39.916527,
})
// 面对面建群的方法
const addFTFSpace = () => {
  addAFTFSpace(addAFTFSpaceData).then((res) => {
    if (res.code === 200) {
      Notify({ type: 'success', message: '创建成功' })
      router.push('/Space')
      active.value = 1
      spaceList.value = []
      request.value.pageNum = 1
      getsignSpaceList()
    }
  })
}

</script>

<template>
  <div class="p-3 bg-gray-500/8 min-h-screen">
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
      @confirm="addFTFSpace()"
    >
      <div class="mt-5 px-10">
        <div class="text-14px text-hex-999">
          和身边的朋友输入同样的四个数字，进入同一个空间
        </div>
        <van-field v-model="addAFTFSpaceData.code" class="border-b border-hex-ccc mb-3" type="digit" maxlength="4" />
      </div>
    </van-dialog>
    <div class="mt-8 border-1 border-hex-DEDEDE bg-hex-fff rounded py-3 px-5">
      <van-tabs
        v-model:active="active"
        color="rgb(40,182,72)"
        @change="tabChange"
      >
        <van-tab title="我参与的" />
        <van-tab title="我管理的" />
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
