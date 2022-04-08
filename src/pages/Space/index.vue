<script setup lang="ts"></script>
<template>
  <div
    class="
      flex-col
      h-screen
      w-full
      bg-gray-100
      overflow-hidden
  "
  >
    <div
      class="
      m-2rem
      w-250px
      h-75px
      flex
      border-1
      bg-white
      text-green-500
      items-center
      border-hex-#41AA62
      mx-auto
      justify-center
      rounded-lg
      text-lg"
    >
      <div class="manage_icon">
        <van-icon name="setting-o">
          我管理的
        </van-icon>
      </div>
    </div>
    <div
      class="
      m-2rem
      w-250px
      h-75px
      flex
      border-1
      bg-white
      text-green-500
      items-center
      border-hex-#41AA62
      mx-auto
      justify-center
      rounded-lg
      text-lg"
    >
      <div class="involve_icon">
        <van-icon name="friends-o">
          我参与的
        </van-icon>
      </div>
    </div>
  </div>
</template>
