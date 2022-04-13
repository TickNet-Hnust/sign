<script setup lang="ts">
const active = ref(0)

const value = ref('')
</script>

<template>
  <div class="bg-true-gray-50 w-screen h-screen">
    <div class="sticky top-0">
      <van-nav-bar title="辅助签到">
        <template #left>
          <van-icon name="arrow-left" size="18" color="black" />
          <span>返回</span>
        </template>
      </van-nav-bar>
    </div>
    <div
      class="mx-10px my-15px border p-5px text-xs leading-20px"
      style="background-color: #e0fafb; border-color: #a6defb; color: #003399"
    >
      <div>辅助签到用法：</div>
      <div class="px-8">
        1.签到发起人可以通过直接补录未签到同学的信息来让其签到
      </div>
      <div class="px-8">
        2.签到发起人可以通过生成二维码让签到不成功的同学签到
      </div>
    </div>
    <div class="mx-10px">
      <van-tabs
        v-model:active="active"
        background="#FAFAFA"
        color="#0033FF"
        title-active-color="#0033FF"
      >
        <van-tab title="直接补录">
          <div class="mt-6 border bg-white py-4" style="border-color: #bcbcbc">
            <van-cell-group inset>
              <van-field
                v-model="value"
                label-width="3em"
                label="学号："
                placeholder="请输入需要补录学生的学号"
              />
              <van-field
                v-model="value"
                label-width="3em"
                label="姓名："
                placeholder="请输入需要补录学生的姓名"
              />
            </van-cell-group>
          </div>
          <div class="mt-6">
            <van-button type="primary" size="large" color="#28B648">
              补录
            </van-button>
          </div>
        </van-tab>
        <van-tab title="生成二维码">
          <div class="mt-6 border px-12" style="background-color: #f2f2f2">
            <div class="my-4 text-center font-600">
              辅助扫码签到（刷新)
            </div>
            <div class="mb-4">
              <img
                src="https://qr.api.cli.im/newqr/create?data=ticknet&level=H&transparent=false&bgcolor=%23FFFFFF&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&logoshape=no&size=500&kid=cliim&key=98aa02e15a0a3a15145eff50a09ccec8"
                alt=""
              >
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
