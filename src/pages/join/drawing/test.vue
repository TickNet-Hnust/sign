<script setup lang="ts">
import { createDraw } from '~/api/draw'

const data = {
  drawName: '抽签测试',
  visiable: 0,
  duration: 3,
  optionContent: ['选项a', '选项a', '选项c'],
  optionNum: [1, 2, 3],
  spaceID: 83,
}

const onclick = function() {
  createDraw(data).then((res) => {
    console.warn(res)
  })
}

</script>

<template>
  <div>
    <button @click="onclick()">
      发送数据
    </button>
  </div>
</template>
