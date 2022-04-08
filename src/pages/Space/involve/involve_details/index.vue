<template>
  <div bg="gray-100" p="2">
    <div bg="white" p="1" display="flex" class=" border  border-gray-300" rounded="default">
      <div><img class="w-45px h-45px" src="https://www.bing.com/th?id=OIP.Fz_jwVT_HbyhaQ83m7h_IAHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2" alt=""></div>
      <div text="left">
        <span text="sm" mx="3" py="1">19级年级大会</span><br>
        <span text="sm" mx="3" py="1">成员：{{ member_list.length }}</span>
      </div>
    </div>
    <div text="left" ml="2" my="3" font="extralight">
      成员列表
    </div>
    <div mt="3" rounded="default" border="~ solid gray-200 3" bg="white">
      <ul v-for="item in member_list" :key="item" p="3" m="1" class="border-b-2">
        <div class="flex justify-between">
          <span>
            <span font="200">{{ item.id }}</span>
            <span font="medium" text="md" class="ml-10">{{ item.name }}</span>
          </span>
          <span v-if="item.status" text="xs" class="p-1 border rounded border-gray-300">{{ item.status }}</span>
        </div>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
const member_list = ref([
  {
    id: '1905040117',
    name: '曹俊',
    status: '管理员',
  },
  {
    id: '1905040110',
    name: '曹帅',
    status: '',
  },
])
</script>
<style scoped>

</style>
