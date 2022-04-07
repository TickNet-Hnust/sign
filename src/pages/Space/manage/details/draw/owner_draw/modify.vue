<template>
  <div class="bg-gray-100 p-3">
    <div class="text-xs text-left mt-3 px-3" style="color: rgb(148, 149, 150)">
      修改部分设置
    </div>
    <div class="modify bg-white text-sm mt-1">
      <div class="modify_item p-3 flex justify-between">
        <span>截止时间</span>
        <span>2022-01-17 22:33</span>
      </div>
      <div class="modify_item p-3 flex justify-between">
        <span>抽签查看权限</span>
        <span>仅发起人可见</span>
      </div>
    </div>
    <div class="mt-5">
      <van-button color="rgb(31,167,31)" size="large">确定修改</van-button>
    </div>
  </div>
</template>

<style scoped>
.modify {
  border-top: 1px solid rgb(223, 223, 224);
}
.modify_item {
  border-bottom: 1px solid rgb(223, 223, 224);
}
</style>
