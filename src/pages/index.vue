<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const user = useUserStore()

const router = useRouter()

const jumpTargetPage = (targetPath: string) => {
  router.push(targetPath)
}
const list = ref([
  {
    name: '发起签到',
    icon: 'i-carbon-plane',
    link: '',
  },
  {
    name: '我要签到',
    icon: 'i-carbon-plane',
    link: '',
  },
  {
    name: '发起记录',
    icon: 'i-carbon-plane',
    link: 'record',
  },
  {
    name: '我要参与',
    icon: 'i-carbon-plane',
    link: 'join',
  },
  {
    name: '我的空间',
    icon: 'i-carbon-plane',
    link: 'space',
  },
  {
    name: '在线帮助',
    icon: 'i-carbon-plane',
    link: '',
  },
])
</script>

<template>
  <div grid="~ cols-2">
    <div
      v-for="(item, index) in list"
      :key="index"
      border="~ green-500"
      rounded="lg"
      w="30vw"
      h="30vw"
      mx="auto"
      my="4"
      shadow="~ md gray-300"
      hover:bg="green-500/90"
      flex="~ col"
      justify="center"
      @click="jumpTargetPage(item.link)"
    >
      <div h="12" text="center">
        <div text="2xl" m="auto" :class="item.icon" />
      </div>
      <div text="center">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
