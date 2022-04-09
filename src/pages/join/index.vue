<script lang="ts" setup>
const list = ref([
  {
    id: 1,
    title: '冬奥会2022年什么时候举办',
    createTime: '2022-01-03 17:34:38',
    status: 1,
    type: '抽签',
    userName: '张志豪',
    spaceName: '班级会议',
    isShow: -1,
    iconName: 'arrow-down',
  },
  {
    id: 2,
    title: '冬奥会2022年什么时候举办',
    createTime: '2022-01-03 17:34:38',
    status: 1,
    type: '投票',
    userName: '张三',
    spaceName: '班级会议',
    isShow: -1,
    iconName: 'arrow-down',
  },
  {
    id: 3,
    title: '签到',
    createTime: '2022-01-03 17:34:38',
    status: 1,
    type: '签到',
    userName: '张志豪',
    spaceName: '班级会议',
    isShow: -1,
    iconName: 'arrow-down',
  },
  {
    id: 4,
    title: '签到',
    createTime: '2022-01-03 17:34:38',
    status: 0,
    type: '签到',
    userName: '张志豪',
    spaceName: '班级会议',
    isShow: -1,
    iconName: 'arrow-down',
  },
])

const isClick = (item: { isShow: number; iconName: string }) => {
  if (item.isShow === -1) {
    item.isShow = -item.isShow
    item.iconName = 'arrow-up'
  }
  else {
    item.isShow = -item.isShow
    item.iconName = 'arrow-down'
  }
}

const loading = ref(false)

const finished = ref(false)

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 2; i++) {
      list.value.push({
        id: 4,
        title: '签到',
        createTime: '2022-01-03 17:34:38',
        status: 0,
        type: '签到',
        userName: '张志豪',
        spaceName: '班级会议',
        isShow: -1,
        iconName: 'arrow-down',
      })
    }

    // 加载状态结束
    loading.value = false

    // 数据全部加载完成
    if (list.value.length >= 10)
      finished.value = true
  }, 1000)
}
</script>

<template>
  <div class="bg-true-gray-50">
    <div class="van-nav-bar">
      <van-nav-bar title="参与列表" left-text="返回" left-arrow />
    </div>
    <div class="mb-20px">
      <van-dropdown-menu>
        <van-dropdown-item title="时间排序" />
        <van-dropdown-item title="类型排序" />
      </van-dropdown-menu>
    </div>
    <div class="attendanceList">
<<<<<<< HEAD
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="item in list" :key="item.id">
          <div class="m-10px bg-white p-10px">
            <div class="justify-between flex">
              <span style="font-size: 16px; font-weight: 700">
                {{
                  item.title
                }}
              </span>
=======
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="item in list" :key="item.id">
          <div class="m-10px bg-white p-10px">
            <div class="justify-between flex">
              <span style="font-size: 16px; font-weight: 700">{{
                item.title
              }}</span>
>>>>>>> 7c35baa8e463b04ed4dc145ab1f908ba74564be0
              <van-tag v-if="item.status == 1" color="#22d3ee">
                {{ item.type + "中" }}
              </van-tag>
              <van-tag v-else color="#a1a1aa">
                已结束
              </van-tag>
            </div>
            <div class="text-xs thin text-gray-300 my-5px">
              {{ item.createTime }}
            </div>
            <van-divider class="bg-cool-gray-900 my-0px" />
            <div class="justify-between flex">
              <div>
<<<<<<< HEAD
                <span class="text-xs text-gray-300 my-5px">{{ item.userName + " 发起的 " }}</span>
                <span class="text-xs text-green-600 my-5px">{{ item.type }}</span>
=======
                <span class="text-xs text-gray-300 my-5px">
                  {{ item.userName + " 发起的 " }}
                </span>
                <span class="text-xs text-green-600 my-5px">
                  {{ item.type }}
                </span>
>>>>>>> 7c35baa8e463b04ed4dc145ab1f908ba74564be0
              </div>
              <div @click="isClick(item)">
                <van-icon :name="item.iconName" />
              </div>
            </div>
            <div v-if="item.isShow == 1" class="justify-between flex">
              <div>
                <span class="text-xs text-gray-300 my-5px">所属空间：</span>
<<<<<<< HEAD
                <span class="text-xs text-dark-900 my-5px">
                  {{
                    item.spaceName
                  }}
                </span>
=======
                <span class="text-xs text-dark-900 my-5px">{{
                  item.spaceName
                }}</span>
>>>>>>> 7c35baa8e463b04ed4dc145ab1f908ba74564be0
              </div>
              <div class="text-xs text-gray-300 my-5px">
                <van-icon name="cross" />删除
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
