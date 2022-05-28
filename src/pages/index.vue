<!--
 * @Description:
 * @Autor: 张津瑞
 * @Date: 2022-04-20 16:18:10
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-18 12:54:32
-->
<script setup lang="ts">
// import { login } from '~/api/system'
import config from '../config/index'
import { useUserStore } from '~/stores/user'
const user = useUserStore()
const router = useRouter()
const route = useRoute()
user.CODE = String(route.query.code)

// 用户登录
if (config.isLoginTest)
  user.loginSignByTest()
else
  user.loginSignByCode()

// 获取code

// const corpid = 'ww0a8e41e741c02880'
// const redirect_uri = 'signff.ticknet.hnust.cn'
// if (user.CODE === 'undefined')
//   window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${corpid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
// console.warn(user.CODE)

const jumpTargetPage = (targetPath: any) => {
  router.push(targetPath.link)
}
const list = reactive([
  {
    name: '发起签到',
    icon: 'i-carbon-3d-cursor-alt',
    link: 'launch',
  },
  {
    name: '我要签到',
    icon: 'i-carbon-flash',
    link: 'joinCheck',
  },
  {
    name: '发起记录',
    icon: 'i-carbon-report',
    link: 'record',
  },
  {
    name: '我要参与',
    icon: 'i-carbon-arrival',
    link: 'join',
  },
  {
    name: '我的空间',
    icon: 'i-carbon-notebook',
    link: 'space',
  },
  {
    name: '在线帮助',
    icon: 'i-carbon-help',
    link: '',
  },
])

</script>

<template>
  <div grid="~ cols-2">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="mainBox"
      border="~ border green-500"
      rounded="lg"
      w="34vw"
      h="34vw"
      mx="auto"
      my="4"
      shadow="~ md gray-400/60"
      hover:bg="green-600/90"
      flex="~ col"
      justify="center"
      @click="jumpTargetPage(item)"
    >
      <div h="12" text="center">
        <div class="boxIcon" text="2xl" color="green-600" m="auto" :class="item.icon" />
      </div>
      <div text="center" class="boxTitle">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style>
.linear {
  background: linear-gradient(
    to top right, #41ac62, #41bf62, #41be62
  );
}
.mainBox:hover .boxIcon,
.mainBox:hover .boxTitle {
  color: #fff
}
.boxIcon,
.boxTitle {
  transition: all;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>

function beforeCreate() {
  throw new Error('Function not implemented.')
}
