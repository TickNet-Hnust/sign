<template>
  <div class="index_box text-center">
    <div class="index_manage text-lg">
      <span class="manage_icon">
        <van-icon name="setting-o"> 我管理的 </van-icon>
      </span>
    </div>
    <div class="index_involve text-lg">
      <span class="involve_icon">
        <van-icon name="friends-o"> 我参与的 </van-icon>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.index_box {
  display: flex;
  flex-direction: column;
}

.index_manage {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 75px;
  background: rgb(65, 177, 98);
  border-radius: 6px;
  color: #fff;
  margin: 2em auto;
}
.index_involve {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 75px;
  border-radius: 6px;
  color: rgb(65, 170, 98);
  border: 1px solid rgb(65, 170, 98);
  margin: 2em auto;
}
</style>
