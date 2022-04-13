<template>
  <div class="p-3">
    <div
      class="p-3 text-xs text-left"
      style="
        background-color: rgb(224, 250, 251);
        color: rgb(0, 51, 153);
        line-height: 25px;
        border: 1px solid rgb(166, 222, 251);
      "
    >
      <div>辅助签到用法：</div>
      <div class="px-8">
        1.签到发起人可以通过直接补录未签到同学的信息来让其签到
        <br />
        2.签到发起人可以通过生成二维码让签到不成功的同学签到
      </div>
    </div>
    <div class="m-t-4">
      <van-tabs color="rgb(0,51,255)" title-active-color="rgb(0,51,255)">
        <van-tab title="直接补录">
          <div class="text-left mt-6 border-1 p-4 border-gray-500/50">
            <van-cell-group border="false">
              <van-field
                v-model="stuNum"
                label-width="3em"
                label="学号："
                placeholder="请输入需要补录学生的学号"
              />
              <van-field
                v-model="stuName"
                label-width="3em"
                label="姓名："
                placeholder="请输入需要补录学生的姓名"
              />
            </van-cell-group>
          </div>
          <div class="mt-8">
            <van-button type="success" size="large">补录</van-button>
          </div>
        </van-tab>
        <van-tab title="生成二维码">
          <div class="mt-6 border-1 p-4 border-gray-500/50 font-semibold">
            辅助扫码签到（
            <span style="color: rgb(0, 102, 255)">刷新</span>
            ）
            <img
              class="px-10 py-5"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff26f5ed0d000c3413c9a4250f2c22bcb86a9494e2b2a-Gw0bYT_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649495467&t=ce9ebbe0f7270b03850a7a05fa695c33"
            />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
