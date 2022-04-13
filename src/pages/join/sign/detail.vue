<script setup lang="ts">
const signSwitchChecked = ref(true) // 控制签到结束、开启

const signRadioChecked = ref('1') // 设置用户可见不可见

const signLoading = ref(false)
const signFinished = ref(false)

interface SignData {
  userName: string
  createSignTime: string
  signCode: number
  space: string
  signClass: Array<string>
  isWatch: true
  status: string
  signPersonList: Array<SignPersonList>
  signPersonNum: number
}

interface SignPersonList {
  signPersonId: string
  signPersonName: string
  signTime: string
}

const signData: SignData = {
  userName: '张智豪',
  createSignTime: '2022-01-03',
  signCode: 2000,
  space: '班级会议',
  signClass: [''],
  isWatch: true,
  status: '暂无关联',
  signPersonNum: 8,
  signPersonList: [
    {
      signPersonId: '2005050101',
      signPersonName: '张三',
      signTime: '11:40:43',
    },
    {
      signPersonId: '2005050102',
      signPersonName: '李四',
      signTime: '11:40:45',
    },
    {
      signPersonId: '2005050103',
      signPersonName: '王五',
      signTime: '11:40:46',
    },
  ],
}

const onLoadSignInfo = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 2; i++) {
      signData.signPersonList.push({
        signPersonId: `20050501${
          signData.signPersonList.length < 10
            ? `0${signData.signPersonList.length}`
            : signData.signPersonList.length
        }`,
        signPersonName: '王五',
        signTime: '11:40:46',
      })

      // 加载状态结束
      signLoading.value = false

      // 数据全部加载完成
      if (signData.signPersonList.length >= signData.signPersonNum)
        signFinished.value = true
    }
  }, 1000)
}
</script>

<template>
  <div class="bg-true-gray-50 w-screen h-screen">
    <div class="sticky top-0">
      <van-nav-bar title="签到列表">
        <template #left>
          <van-icon name="arrow-left" size="18" color="black" />
          <span>返回</span>
        </template>
      </van-nav-bar>
    </div>
    <div class="bg-white m-15px">
      <div class="signInfoItem justify-between flex">
        <div
          class="flex justify-center align-center rounded-sm"
          style="background-color: #d7d7d7"
        >
          <MdiCog class="block m-auto" style="color: #8a8a8a" />
          <span style="color: #8a8a8a" class="m-auto text-xs">&nbsp;&nbsp;基本配置&nbsp;&nbsp;</span>
        </div>
        <div class="flex">
          <van-switch v-model="signSwitchChecked" class="m-auto" size="1em" />
          <span class="text-dark-800 font-600 m-auto text-xs">&nbsp;&nbsp;&nbsp;&nbsp;签到中</span>
        </div>
      </div>
      <div class="signInfoItem">
        <span class="signInfoItemField">签到码</span>
        <span class="text-sm">{{ signData.signCode }}</span>
        <span
          class="text-dark-800 font-600 text-xs p-3px rounded-sm float-right w-66px text-center"
          style="background-color: #d7d7d7"
        >辅助签到</span>
      </div>
      <div class="signInfoItem">
        <span class="signInfoItemField">日期</span>
        <span class="text-sm">{{ signData.createSignTime }}</span>
      </div>
      <div class="signInfoItem">
        <span class="signInfoItemField">名称</span>
        <span class="text-sm">{{ signData.userName }}</span>
      </div>
      <div class="signInfoItem">
        <span class="signInfoItemField">空间</span>
        <span class="text-sm">{{ signData.space }}</span>
        <span
          class="text-dark-800 font-600 text-xs p-3px rounded-sm float-right"
          style="background-color: #d7d7d7"
        >添加至群组</span>
      </div>
      <div class="signInfoItem">
        <span class="signInfoItemField">班级</span>
        <span class="text-sm">{{ signData.status }}</span>
        <span
          class="text-dark-800 font-600 text-xs p-3px rounded-sm float-right w-66px text-center"
          style="background-color: #d7d7d7"
        >导入名单</span>
      </div>
      <div class="border border-solid p-10px h-45px flex">
        <span class="signInfoItemField flex"> 用户可见 </span>
        <van-radio-group
          v-model="signRadioChecked"
          direction="horizontal"
          class="flex text-sm"
        >
          <van-radio name="1" icon-size="0.875rem">
            可见
          </van-radio>
          <van-radio name="2" icon-size="0.875rem">
            不可见
          </van-radio>
        </van-radio-group>
      </div>
    </div>
    <div
      class="border my-10px mx-15px py-15px"
      style="background-color: #e1fbe3; border-color: #8fc798"
    >
      <span class="mx-25px">{{
        "共成功签到" + signData.signPersonNum + "次"
      }}</span>
      <span
        class="text-dark-800 font-600 text-xs p-3px rounded-sm text-center mr-10px"
        style="background-color: #d7d7d7"
      >下载</span>
      <span
        class="text-dark-800 font-600 text-xs p-3px rounded-sm text-center"
        style="background-color: #d7d7d7"
      >邮件</span>
    </div>
    <div class="border my-10px mx-15px px-10px bg-white text-sm">
      <div
        class="px-10px flex justify-between py-15px text-center"
        style="
          border-style: none none solid;
          border-width: 1px;
          border-color: #d9dad8;
        "
      >
        <span class="w-24">学号/工号</span>
        <span class="w-12">姓名</span>
        <span class="w-20">时间</span>
      </div>
      <van-list
        v-model:loading="signLoading"
        :finished="signFinished"
        finished-text="没有更多了"
        class="p-0px"
        @load="onLoadSignInfo"
      >
        <div
          v-for="signPersonInfo in signData.signPersonList"
          :key="signPersonInfo.signPersonId"
          class="signListInfoItem justify-between flex py-15px px-10px text-center"
        >
          <span class="w-24">{{ signPersonInfo.signPersonId }}</span>
          <span class="w-12">{{ signPersonInfo.signPersonName }}</span>
          <span class="w-20">{{ signPersonInfo.signTime }}</span>
        </div>
      </van-list>
    </div>
  </div>
</template>

<style scoped>
.signInfoItem {
  border-style: solid solid none solid;
  border-width: 1px;
  border-color: #d9dad8;
  padding: 10px;
  height: 45px;
}

.signInfoItemField {
  display: inline-block;
  width: 7rem;
  font-size: 0.875rem;
}

.signListInfoItem {
  border-style: none none solid none;
  border-color: #d9dad8;
  border-width: 1px;
}
</style>
