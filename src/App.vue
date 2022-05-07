<!--
 * @Description: 
 * @Autor: 张津瑞
 * @Date: 2022-04-20 16:18:10
 * @LastEditors: 张津瑞
 * @LastEditTime: 2022-05-02 16:15:23
-->
<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: '面对面活动',
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template' },
  ],
})
</script>

<template>
  <router-view />
</template>
