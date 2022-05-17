<!-- 学生端 -->

<script setup lang="ts">
import { Notify } from 'vant'
import { addAFTFSpace, signSpaceList } from '~/api/mySpace/index'
const showJoinSpace = ref(false)// 在我参与的选项卡中显示面对面建群
const showCreateSpace = ref(false)// 在我管理的选项卡中显示新增空间
const router = useRouter()
const isJoin = ref(false)// 控制用户点击是创建空间还是加入空间 TRUE为加入空间，FALSE为创建空间
const showPopover = ref(false) // 控制点击加号弹窗显示
const value = ref('123')
const errorInfo = ref('')
const showKeyboard = ref(false)

// 点击加号创建空间还是加入空间
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
// 请求列表参数
const request = ref({
  memberRank: active.value,
  spaceName: '',
  pageNum: 1,
  pageSize: 10,
})
// 请求列表的方法
const getsignSpaceList = () => {
  request.value.memberRank = active.value
  signSpaceList(request.value).then((res: any) => {
    if (res.code === 200)
      spaceList.value = spaceList.value.concat(res.rows)
    if (spaceList.value.length < res.total) {
      request.value.pageNum++
      getsignSpaceList()
    }
  })
}
getsignSpaceList()// 进入页面获取空间列表
// 搜索空间的方法，为什么搜索进了这个方法，但要切换之后才有效果
const searchList = () => {
  request.value.pageNum = 1
  spaceList.value = []
  getsignSpaceList()
}
const tabChange = () => {
  spaceList.value = []
  request.value.pageNum = 1
  request.value.spaceName = ''
  getsignSpaceList()
  console.log(active.value)
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
  join: isJoin.value,
  spaceName: '',
})
// 面对面加入或建空间的方法
const addFTFSpace = () => {
  if (isJoin.value === false) { // 创建空间
    addAFTFSpaceData.join = false
    if (!/^[\u4E00-\u9FA5A-Za-z0-9\,\(\)\[\]_\"\'\u2018\u2019\u201C\u201D\u3010\u3011\uFF08\uFF09\u3001\uFF0C]+$/.test(addAFTFSpaceData.spaceName)) {
      Notify({ type: 'warning', message: '只能包括逗号、顿号、括号、引号、减号、下划线、汉字、数字、字母！' })
      router.push('/Space')
      return
    }
    if (addAFTFSpaceData.code.length < 4) {
      Notify({ type: 'warning', message: '请输入四位正确的空间码' })
      router.push('/Space')
      return
    }
    addAFTFSpace(addAFTFSpaceData).then((res) => {
      console.log(addAFTFSpaceData)
      console.log(res)

      if (res.code === 200) {
        Notify({ type: 'success', message: '创建成功' })
        router.push('/Space')
        addAFTFSpaceData.code = ''
        addAFTFSpaceData.spaceName = ''
        active.value = 1
        spaceList.value = []
        request.value.pageNum = 1
        getsignSpaceList()
      }
      else {
        Notify({ type: 'warning', message: res.msg })
        addAFTFSpaceData.code = ''
        router.push('/Space')
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
      else {
        Notify({ type: 'warning', message: res.msg })
        addAFTFSpaceData.code = ''
        router.push('/Space')
      }
    })
  }
}
const onCancel = () => {
  addAFTFSpaceData.code = ''
  router.push('/Space')
}
const nameRules = [
  {
    required: true,
    message: '请输入空间名称',
  },
]

</script>

<template>
  <div class="container p-3 bg-gray-500/8 min-h-screen">
    <div class="py-1 flex items-center bg-hex-fff rounded justify-between">
      <span class="w-85vw">
        <van-search
          v-model="request.spaceName"
          placeholder="请输入搜索关键词"
          left-icon="search"
          @clear="clear"
          @search="searchList"
        />
      </span>
      <span>
        <van-popover
          v-model:show="showPopover"
          :actions="[{ text: '创建空间' }, { text: '加入空间' }]"
          placement="bottom-end"
          @select="popoverSelect"
        >
          <template #reference>
            <van-icon class="color-hex-59B476 font-600 w-6 mr-3 text-xl" name="plus" />
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
      @cancel="onCancel()"
      @confirm="addFTFSpace()"
    >
      <van-password-input
        class="mb-2 mt-2"
        :value="addAFTFSpaceData.code"
        :mask="false"
        info="请输入四位空间码用于加入空间"
        :error-info="errorInfo"
        :length="4"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
    </van-dialog>
    <!-- 面对面创建空间 -->
    <van-dialog
      v-model:show="showCreateSpace"
      title="面对面创建空间"
      confirm-button-color="rgb(63,133,255)"
      show-cancel-button
      @cancel="onCancel()"
      @confirm="addFTFSpace()"
    >
      <div class="createSpace mt-5 px-5">
        <van-form>
          <div class="text-14px text-hex-999">
            请输入要创建的空间名称
          </div>
          <van-field v-model.trim="addAFTFSpaceData.spaceName" :center="true" input-align="center" maxlength="20" class="border-b border-hex-ccc mb-3" :rules="nameRules" />

          <van-password-input
            class="mb-2"
            :value="addAFTFSpaceData.code"
            :mask="false"
            info="请输入四位空间码用于创建空间"
            :error-info="errorInfo"
            :length="4"
            :focused="showKeyboard"
            @focus="showKeyboard = true"
          />
        </van-form>
      </div>
    </van-dialog>
    <van-number-keyboard
      v-model="addAFTFSpaceData.code"
      :show="showKeyboard"
      safe-area-inset-bottom
      @blur="showKeyboard = false"
    />
    <div class="mt-3 border-1 border-hex-DEDEDE bg-hex-fff rounded py-3 px-5">
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
<style scoped>
  .van-number-keyboard{
    z-index: 2300 !important;
  }
  .container  :deep(.van-dialog){
    top:32% !important;
  }
  .createSpace :deep(.van-cell){
    width: 80%;
    margin: 0 auto !important;
    margin-bottom: 10px !important;
  }
</style>
<route lang="yaml">
meta:
  layout: default
  title: 我的空间
</route>
