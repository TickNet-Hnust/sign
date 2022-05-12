<!-- 学生端 -->

<script setup lang="ts">
import { Notify, Popover } from 'vant'
import { get } from 'vant/lib/utils'
import { addAFTFSpace, signSpaceList } from '~/api/mySpace/index'
const showJoinSpace = ref(false)// 在我参与的选项卡中显示面对面建群
const showCreateSpace = ref(false)// 在我管理的选项卡中显示新增空间
const router = useRouter()
const isJoin = ref(false)// 控制用户点击是创建空间还是加入空间 TRUE为加入空间，FALSE为创建空间
const showPopover = ref(false) // 控制弹窗显示

// 点击加号创建空间
const popoverSelect = (action: any) => {
  if (action.text === '创建空间') {
    isJoin.value = false
    showCreateSpace.value = !showCreateSpace.value
  }

  else if (action.text === '加入空间') {
    isJoin.value = true
    addAFTFSpaceData.spaceName = null
    showJoinSpace.value = !showJoinSpace.value
  }
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
// 面对面加入群的参数
const addAFTFSpaceData = reactive({
  code: '',
  longitude: 116.397128,
  latitude: 39.916527,
  addAFTFSpaceData: isJoin.value,
  spaceName: '',
})
// 面对加入建群的方法
const addFTFSpace = () => {
  if (isJoin.value === false) { // 创建空间
    addAFTFSpaceData.join = false
    addAFTFSpace(addAFTFSpaceData).then((res) => {
      console.log(addAFTFSpaceData)
      console.log(res)

      if (res.code === 200) {
        Notify({ type: 'success', message: '创建成功' })
        router.push('/Space')
        addAFTFSpaceData.code = ''
        active.value = 0
        spaceList.value = []
        request.value.pageNum = 1
        getsignSpaceList()
      }
      else if (res.code === 501) {
        if (res.msg === '该空间名已存在，请勿重复命名！') {
          addAFTFSpaceData.code = ''
          Notify({ type: 'warning', message: '该空间名已存在，请勿重复命名！' })
        }

        else if (res.msg === '该空间码已存在！') {
          addAFTFSpaceData.code = ''
          Notify({ type: 'warning', message: '该空间码已存在！' })
        }
      }
      else if (res.code === 500) {
        if (res.msg === '只能包括逗号、下划线、汉字、数字、字母！') {
          addAFTFSpaceData.code = ''
          Notify({ type: 'warning', message: '只能包括逗号、下划线、汉字、数字、字母！' })
        }
      }
    })
  }
  else if (isJoin.value === true) { // 加入空间
    addAFTFSpaceData.join = true
    addAFTFSpace(addAFTFSpaceData).then((res) => {
      console.log(addAFTFSpaceData)
      console.log(res)
      if (res.code === 200) {
        Notify({ type: 'success', message: '加入成功' })
        router.push('/Space')
        addAFTFSpaceData.code = ''
        active.value = 0
        spaceList.value = []
        request.value.pageNum = 1
        getsignSpaceList()
      }
      else if (res.code === 501) {
        if (res.msg === '该空间不存在！') {
          Notify({ type: 'warning', message: '该空间不存在！' })
          addAFTFSpaceData.code = ''
          router.push('/Space')
        }
        else {
          Notify({ type: 'warning', message: '您已经在空间里了，请勿重复加入' })
          addAFTFSpaceData.code = ''
          router.push('/Space')
        }
      }
      else if (res.code === 500) {
        Notify({ type: 'warning', message: '空间码不能为空' })
        addAFTFSpaceData.code = ''
        router.push('/Space')
      }
    })
  }
}
// // 面对面建群的参数
// const createSpaceData = reactive({
//   spaceName: '',
// })
// // 面对面建群的方法
// const createASpace = () => {
//   createSignSpace(createSpaceData).then((res) => {
//     if (res.code === 200) {
//       Notify({ type: 'success', message: '创建成功' })
//       router.push('/Space')
//       active.value = 1
//       spaceList.value = []
//       request.value.pageNum = 1
//       createSpaceData.spaceName = ''
//       getsignSpaceList()
//     }
//   })
// }

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
      <span class="text-xl">
        <van-popover
          v-model:show="showPopover"
          :actions="[{ text: '创建空间' }, { text: '加入空间' }]"
          placement="bottom-end"
          @select="popoverSelect"
        >
          <template #reference>
            <span
              class="
              color-hex-59B476
              border-3 border-hex-59B476
              rounded
              font-bold
              px-0.2
              mr-2
            "
            >
              <van-icon class="font-700 w-6" name="plus" />
            </span>
          </template>
        </van-popover>
      </span>
    </div>
    <!-- 弹出框 -->
    <!-- 面对面加入空间 -->
    <van-dialog
      v-model:show="showJoinSpace"
      title="面对面加入空间"
      confirm-button-color="rgb(63,133,255)"
      show-cancel-button
      @confirm="addFTFSpace()"
    >
      <div class="mt-5 px-10">
        <div class="text-14px text-hex-999">
          和身边的朋友输入同样的四个数字，进入同一个空间
        </div>
        <van-field v-model.trim="addAFTFSpaceData.code" class="border-b border-hex-ccc mb-3" type="digit" maxlength="4" />
      </div>
    </van-dialog>
    <!-- 面对面创建空间 -->
    <van-dialog
      v-model:show="showCreateSpace"
      title="面对面创建空间"
      confirm-button-color="rgb(63,133,255)"
      show-cancel-button
      @confirm="addFTFSpace()"
    >
      <div class="mt-5 px-5">
        <div class="text-14px text-hex-999">
          请输入要创建的空间名称
        </div>
        <van-field v-model.trim="addAFTFSpaceData.spaceName" class="border-b border-hex-ccc mb-3" />
        <div class="text-14px text-hex-999">
          请输入四位空间码供他人加入你创建的空间(空间码的有效时间为30分钟！)
        </div>
        <van-field v-model.trim="addAFTFSpaceData.code" class="border-b border-hex-ccc mb-3" type="digit" maxlength="4" />
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
