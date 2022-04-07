<template>
  <div class="container p-3">
    <div class="vote_top p-3">
      <div class="set_item">
        <span class="text-lg font-bold text-left mt-1">
          <input type="text" placeholder="投票标题" />
        </span>
      </div>
      <div class="set_item">
        <span class="text-sm mt-1">
          <input type="text" placeholder="描述(选填)" />
        </span>
      </div>
      <div class="set_choice mt-3">
        <span class="set_tag p-1"
          ><span><van-icon name="minus" /></span
        ></span>
        <span class="choice text-sm">
          <input type="text" placeholder="选项1" />
        </span>
      </div>
      <div class="set_choice mt-3">
        <span class="set_tag p-3"
          ><span><van-icon name="add" size="1.5em" /></span
        ></span>
        <span class="choice text-sm ml-1">
          <input type="text" placeholder="选项2" />
        </span>
      </div>
      <div class="set_choice mt-3">
        <span class="set_tag p-3"
          ><span><van-icon name="add" color="rgb(6,14,187)" /></span
        ></span>
        <span class="text-md ml-1">
          <input type="text" placeholder="添加选项" />
        </span>
      </div>
    </div>
    <div class="vote_set pt-4">
      <div class="bg-white">
        <div class="set_setting">
          <span class="text-sm ml-1">
            <van-cell is-link @click="showPopup">投票类型</van-cell>
            <van-popup
              v-model:show="show"
              closeable
              position="bottom"
              :style="{ height: '30%' }"
              >内容</van-popup
            >
          </span>
        </div>
        <div class="set_setting">
          <span class="text-sm ml-1">
            <van-cell is-link @click="showPopup">结束时间</van-cell>
            <van-popup
              v-model:show="show"
              closeable
              position="bottom"
              :style="{ height: '30%' }"
              >内容</van-popup
            >
          </span>
        </div>
        <div class="set_setting">
          <span class="text-sm ml-1">
            <van-switch
              v-model="checked"
              size="1.5em"
              class=""
              @click="change_status"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const show = ref(false);
const checked = ref(true);
const showPopup = () => {
  show.value = true;
};
</script>
<style scoped>
.container {
  background-color: rgb(246, 247, 249);
}
.vote_top {
  background-color: #fff;
  border-radius: 0.2em;
}
.set_item {
  display: flex;
  justify-content: space-between;
  height: 3em;
  align-items: center;
  border-bottom: 2px solid rgb(201, 201, 201);
  background: rgb(255, 255, 255);
  padding-left: 0.5em;
}
.set_choice {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid rgb(201, 201, 201);
}

.set_setting {
  display: flex;
  justify-content: space-between;
  height: 3em;
  align-items: center;
  border-bottom: 2px solid rgb(201, 201, 201);
  background: rgb(255, 255, 255);
}
.set_tag {
  background-color: red;
  border-radius: 50%;
  color: #fff;
}
</style>
