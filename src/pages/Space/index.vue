<!-- 学生端 -->
<script lang="ts">
export default {
  name: 'spaceList',
  
}
</script>

<script setup lang="ts">
import { Notify, Toast } from 'vant'
import { addAFTFSpace, signSpaceList } from '~/api/mySpace/index'
import { getCurrentInstance } from 'vue'
const { eventHub } = getCurrentInstance()?.proxy
const showJoinSpace = ref(false)// 在我参与的选项卡中显示面对面建群
const showCreateSpace = ref(false)// 在我管理的选项卡中显示新增空间
const router = useRouter()
const route = useRoute()
const isJoin = ref(false)// 控制用户点击是创建空间还是加入空间 TRUE为加入空间，FALSE为创建空间
const showPopover = ref(false) // 控制点击加号弹窗显示
const value = ref('123')
const errorInfo = ref('')
const showKeyboard = ref(false)
const showLoading = ref(true)
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
  pageSize: 100,
})
// 请求列表的方法
const getsignSpaceList = () => {
  request.value.memberRank = active.value
  signSpaceList(request.value).then((res: any) => {
    if (res.code === 200) {
      showLoading.value = false
      spaceList.value = spaceList.value.concat(res.rows)
    }

    if (spaceList.value.length < res.total) {
      request.value.pageNum++
      getsignSpaceList()
    }
  })
}

getsignSpaceList()// 进入页面获取空间列表

onUpdated(() =>{
  if(route.query.quitSpace) {// 成员或管理员退出空间重新加载页面
    request.value.pageNum = 1
    spaceList.value = []
    getsignSpaceList()
    router.replace('/space')
    router.back()
  }
  else if(route.query.dismissSpace){// 负责人解散空间重新加载页面
    active.value = 1
    request.value.pageNum = 1
    spaceList.value = []
    getsignSpaceList()
    router.replace('/space')
    router.back()
  }
})
// 搜索空间的方法，为什么搜索进了这个方法，但要切换之后才有效果
const searchList = () => {
  showLoading.value = true
  request.value.pageNum = 1
  spaceList.value = []
  getsignSpaceList()
}
const tabChange = () => {
  showLoading.value = true
  spaceList.value = []
  request.value.pageNum = 1
  request.value.spaceName = ''
  getsignSpaceList()
}
// 点击清除重新加载数据
const clear = () => {
  showLoading.value = true
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
      Notify({ type: 'warning', message: '空间名不能包括空格等特殊符号！' })
      router.push('/Space')
      return
    }
    if (addAFTFSpaceData.code.length !== 4) {
      Notify({ type: 'warning', message: '请输入四位正确的空间码' })
      router.push('/Space')
      return
    }
    addAFTFSpace(addAFTFSpaceData).then((res) => {
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
//下拉刷新空间列表
const refreshing = ref(false)
const onRefresh = () =>{
  setTimeout(() =>{
    getsignSpaceList()
    Toast('刷新成功');
    refreshing.value = false;
  },1000)
}

const isShow = ref(false)//控制回到顶部的箭头的展示
//点击按钮回到顶部
const toTop = () => {
    window.scrollTo({
    top: 0,
    behavior: "smooth"
})
}
const handleScroll = () => {
    if (document.documentElement.scrollTop > 20) {
        isShow.value = true
      } else {
        isShow.value = false
      }
      //往下滑超过20则显示 否则则不显示按钮
  }
onMounted(()=>{
  window.addEventListener('scroll', handleScroll )
  eventHub.$on('refreshSpaceList', () => {
    searchList()
  })
}) 
onUnmounted (()=>{
  window.removeEventListener('scroll', handleScroll )
  eventHub.$off('refreshSpaceList')
}) 
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
          theme="dark"
          @select="popoverSelect"
        >
          <template #reference>
            <van-icon class="color-hex-59B476 font-600 w-6 mr-3 text-xl" name="plus" />
          </template>
        </van-popover>
      </span>
    </div>
    <!-- 弹出框 -->
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
        info="请输入四位空间码用于您加入空间"
        :error-info="errorInfo"
        :length="4"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
    </van-dialog>

    <van-number-keyboard
      v-model="addAFTFSpaceData.code"
      :show="showKeyboard"
      safe-area-inset-bottom
      maxlength="4"
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
      <div v-show="isShow" class="fixed right-5px bottom-5px pt-2 mr-1" >
        <van-sticky>
        <svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic color-hex-0C75A1 b-hex-0C75A1" width="25" height="30" @click="toTop" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M11.41 2.87a.99.99 0 0 1 1.18 0c1.22.88 3.91 3.59 3.91 10.13c0 2.16-.78 4.76-1.36 6.35c-.14.39-.51.65-.93.65H9.8c-.42 0-.8-.26-.94-.65C8.28 17.76 7.5 15.16 7.5 13c0-6.54 2.69-9.25 3.91-10.13zM14 11c0-1.1-.9-2-2-2s-2 .9-2 2s.9 2 2 2s2-.9 2-2zm-6.31 9.52c-.48-1.23-1.52-4.17-1.67-6.87l-1.13.75c-.56.38-.89 1-.89 1.67v4.45c0 .71.71 1.19 1.37.93l2.32-.93zm12.31 0v-4.45c0-.67-.33-1.29-.89-1.66l-1.13-.75c-.15 2.69-1.2 5.64-1.67 6.87l2.32.93c.66.25 1.37-.23 1.37-.94z"></path></svg>
      </van-sticky>
      </div>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list>
        <van-loading
          v-if="showLoading"
          color="#666"
          type="spinner"
          class="mt-5"
          size="24px"
          vertical
        >
          加载中...
        </van-loading>
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
      </van-list>
      </van-pull-refresh>
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
