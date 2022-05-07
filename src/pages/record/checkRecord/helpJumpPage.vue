<script lang="ts" setup>
import { sign } from '~/api/record/index'
const route = useRoute()
const request = ref({
  signId: route.query.signId,
  code: route.query.code
})
</script>

<template>

</template>
<route lang="yaml">
meta:
  layout: default
  title: 签到中
</route>