<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const user = useUserStore()

const router = useRouter()

const jumpTargetPage = (targetPath: string) => {
  router.push(targetPath)
}
</script>

<template>
  <div grid="~ cols-2">
    <div
      border="~ green-500"
      rounded="lg"
      w="30vw"
      h="30vw"
      mx="auto"
      my="4"
      shadow="~ md gray-300"
      hover:bg="green-500/90"
      hover:text="white"
      flex="~ col"
      justify="center"
    >
      <div h="12" text="center">
        <div text="2xl" m="auto" class="i-carbon-plane" />
      </div>
      <div text="center">
        发起签到
      </div>
    </div>

    <div
      border="~ green-500"
      rounded="lg"
      w="30vw"
      h="30vw"
      mx="auto"
      my="4"
      shadow="~ md gray-300"
      hover:bg="green-500/90"
      hover:text="white"
      flex="~ col"
      justify="center"
    >
      <div h="12">
        <div text="2xl" m="auto" class="i-carbon-plane" />
      </div>
      <div text="center">
        我要签到
      </div>
    </div>

    <div
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
      @click="jumpTargetPage('record')"
    >
      <div h="12" text="center">
        <div text="2xl" m="auto" class="i-carbon-plane" />
      </div>
      <div text="center">
        发起记录
      </div>
    </div>

    <div
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
      @click="jumpTargetPage('join')"
    >
      <div h="12" text="center">
        <div text="2xl" m="auto" class="i-carbon-plane" />
      </div>
      <div text="center">
        我要参与
      </div>
    </div>

    <div
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
    >
      <div h="12" text="center">
        <div text="2xl" m="auto" class="i-carbon-plane" />
      </div>
      <div text="center">
        我的空间
      </div>
    </div>

    <div
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
    >
      <div h="12" text="center">
        <div text="2xl" m="auto" class="i-carbon-plane" />
      </div>
      <div text="center">
        在线帮助
      </div>
    </div>
  </div>
</template>
