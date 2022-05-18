<!--
 * @Descipttion: 
 * @Author: 刘晴
 * @Date: 2022-04-20 21:46:45
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-18 16:08:28
-->
<script setup>
const router = useRouter()
const title = ref()
const keepAlive = ref()
const includeList = ref(['recordList','spaceList'])
watchEffect(() => {
  keepAlive.value = router.currentRoute.value.meta.keepAlive || 0
  title.value = router.currentRoute.value.meta.title || '默认标题'
})

</script>
<template>
  <main class=" text-center text-gray-700 dark:text-gray-200 h-100%">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="router.back()"
    />
    <router-view v-slot="{ Component }">
      <!-- <transition :name="route.meta.transition || 'fade'" mode="out-in"> -->
        <keep-alive :include="includeList">
          <suspense>
            <template #default>
              <component :is="Component"/>
            </template>
            <template #fallback> Loading... </template>
          </suspense>
        </keep-alive>
      <!-- </transition> -->
    </router-view>
  </main>
</template>
