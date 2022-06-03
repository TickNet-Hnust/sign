<!--
 * @Descripttion: 
 * @Author: 刘晴
 * @Date: 2022-05-30 12:08:41
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-30 16:35:43
-->
<script setup lang="ts">
const activeNames = ref([])
onMounted(() => {
  window.scrollTo(0,0)
})
</script>
<template>
  <div class="text-left bg-gray-500/8 p-3 min-h-100vh">
    <van-collapse v-model="activeNames" class="border border-hex-ccc">
      <van-collapse-item name="1">
        <template #right-icon></template>
        <template #title>
          <van-icon
            name="play"
            class="mr-1"
            :style="{transform:activeNames.indexOf('1')!==-1?'rotate(90deg)':'rotate(0)'}"
          />
          访问方式
        </template>
        <div class="text-hex-656565  leading-loose text-12px">
          <div class="color-hex-41AA62">方式一：</div>
          <div class="ml-3">微信—>通讯录—>湖南科技大学—>面对面活动</div>
          <div class="color-hex-41AA62">方式二：</div>
          <div class="ml-3">企业微信—>工作台—>面对面活动</div>
        </div>
      </van-collapse-item>
      <van-collapse-item name="2">
        <template #right-icon></template>
        <template #title>
          <div>
            <van-icon
              name="play"
              class="mr-1"
              :style="{transform:activeNames.indexOf('2')!==-1?'rotate(90deg)':'rotate(0)'}"
            />
            发起签到
          </div>
        </template>
        <div class="text-hex-656565 leading-loose text-12px">
          <div class="color-hex-41AA62">发起签到</div>
          <div class="ml-3">
            只能发起非空间的签到，发起签到时可设置标题，用户是否能见签到列表和活动时长
          </div>
        </div>
      </van-collapse-item>
      <van-collapse-item name="3">
        <template #right-icon></template>
        <template #title>
          <div >
            <van-icon
              name="play"
              class="mr-1"
              :style="{transform:activeNames.indexOf('3')!==-1?'rotate(90deg)':'rotate(0)'}"
            />
            我要签到
          </div>
        </template>
        <div class="text-hex-656565 leading-loose text-12px">
          只能参与非空间的签到，签到时请输入四位签到码。参与后的记录会在我要参与中显示
          <div class="color-hex-41AA62">如果签到失败</div>
          <div class="ml-3">1）“该记录不存在”表示没有该签到码，请向签到发起人重新确认输入签到码；</div>
          <div class="ml-3">2）“已经参加过该活动”表示已经签到过了，不用再签到了；</div>
          <div class="ml-3">3）“超出距离范围”表示距离发起人位置太远，未在发起人发起签到范围内，请前往发起人附近进行签到；</div>
          <div class="color-hex-41AA62">如果多次签到失败</div>
          <div class="ml-3">如果多次签到失败，请寻找签到发起人进行扫码签到</div>
        </div>
      </van-collapse-item>
      <van-collapse-item name="4">
        <template #right-icon></template>
        <template #title>
          <div >
            <van-icon
              name="play"
              class="mr-1"
              :style="{transform:activeNames.indexOf('4')!==-1?'rotate(90deg)':'rotate(0)'}"
            />
            辅助签到
          </div>
        </template>
        <div class="text-hex-656565 leading-loose text-12px">
          <div class="color-hex-41AA62">辅助签到</div>
          <div class="ml-3">
            在发起签到记录中，点击签到码右侧二维码，进入辅助签到页面。非空间签到只能通过扫码来辅助签到。
            空间签到可以通过扫码和补录来辅助签到
          </div>
        </div>
      </van-collapse-item>
      <van-collapse-item name="5">
        <template #right-icon></template>
        <template #title>
          <div >
            <van-icon
              name="play"
              class="mr-1"
              :style="{transform:activeNames.indexOf('5')!==-1?'rotate(90deg)':'rotate(0)'}"
            />
            查看发起记录
          </div>
        </template>
        <div class="text-hex-656565 leading-loose text-12px">
          显示所有的发起记录（非空间和空间签到，投票，抽签）
          <div class="color-hex-41AA62">发起非空间签到记录：</div>
          <div class="ml-3">
            显示已签到人员列表，可对未签到人员进行扫码签到，
            可更改签到记录名称，可设置签到列表可见性
          </div>
          <div class="color-hex-41AA62">发起空间签到记录：</div>
          <div class="ml-3">
            显示已签到成员列表和未签到成员列表，可对未签到成员进行扫码签到或者补录，
            可更改签到记录名称，可设置签到列表可见性
          </div>
          <div class="color-hex-41AA62">发起投票记录：</div>
          <div class="ml-3">发起投票记录：投票记录中显示已投票和未投票成员列表，可修改投票时间</div>
          <div class="color-hex-41AA62">发起抽签记录：</div>
          <div class="ml-3">发起抽签记录：抽签记录中显示已抽签和未抽签成员列表，可修改抽签截止时间和查看权限</div>
        </div>
      </van-collapse-item>
      <van-collapse-item name="6">
        <template #right-icon></template>
        <template #title>
          <div >
            <van-icon
              name="play"
              class="mr-1"
              :style="{transform:activeNames.indexOf('6')!==-1?'rotate(90deg)':'rotate(0)'}"
            />
            查看参与记录
          </div>
        </template>
        <div class="text-hex-656565 leading-loose text-12px">
          显示所有的参与记录，同时可参与所有的空间活动
          <div class="color-hex-41AA62">我要签到（空间）：</div>
          <div class="ml-3">
            在我要参与中点开还未参与的空间签到，输入四位签到码
          </div>
          <div class="color-hex-41AA62">签到记录：</div>
          <div class="ml-3">
            在我要参与中点开已参与的签到记录（非空间和空间），签到记录中签到列表可见性由发起人设置
          </div>
          <div class="color-hex-41AA62">我要投票：</div>
          <div class="ml-3">
            在我要参与中点开投票记录。若未投票，点击投票选项即可进行投票。
            若已投票，点击选项可查看与自己投同一票的成员。
            匿名情况下则无法查看</div>
          <div class="color-hex-41AA62">我要抽签：</div>
          <div class="ml-3">
            在我要参与中点开抽签记录。若未抽签，点击抽签选项即可进行抽签。
            若已抽签，当抽签权限为参与人可见时，则点击选项可查看与自己抽中同一签的成员。
            当抽签权限为仅发起人可见或隐藏选项情况下，则无法查看</div>
        </div>
      </van-collapse-item>
      <van-collapse-item name="7">
        <template #right-icon></template>
        <template #title>
          <div >
            <van-icon
              name="play"
              class="mr-1"
              :style="{transform:activeNames.indexOf('7')!==-1?'rotate(90deg)':'rotate(0)'}"
            />
            我的空间
          </div>
        </template>
        <div class="text-hex-656565 leading-loose text-12px">
          空间里面包含签到、投票、抽签、点名、成员追加和签到统计等功能，
          空间里面发布的活动只有该空间内所有成员可参与，
          空间活动可以自动统计参与成员和未参与成员
          <div class="color-hex-41AA62">创建空间：</div>
          <div class="ml-3">
            输入空间名称和四位空间码即可创建空间
          </div>
          <div class="color-hex-41AA62">加入空间：</div>
          <div class="ml-3">
            在空间负责人创建空间后的3分钟内，输入和空间负责人一样的四位空间码即可加入空间
          </div>
          <div class="color-hex-41AA62">空间发起签到：</div>
          <div class="ml-3">发起空间签到，发起签到时可设置标题，用户是否能见签到列表和活动时长。</div>
          <div class="color-hex-41AA62">空间发起投票：</div>
          <div class="ml-3">发起空间投票，发起投票时需填写好标题和选项</div>
          <div class="ml-3">1） 投票类型包括单选和多选，多选最多可选不超过选项数</div>
          <div class="ml-3">2） 匿名情况下，发起人只能知道已投票成员，不能知道哪位成员投了哪个选项；
            成员则也不能查看其他成员投的选项</div>
          <div class="color-hex-41AA62">空间发起抽签：</div>
          <div class="ml-3">发起空间抽签，发起抽签时需填写好标题和选项</div>
          <div class="ml-3">1） 抽签权限包括仅发起人可见和参与人可见；仅发起人可见即仅发起人知道已抽签和未抽签成员；
            参与人可见即所有参与的成员均可查看每个签的抽中成员</div>
          <div class="ml-3">2）隐藏选项，则发起人和成员抽签时均看不见签，发起人抽签后只能知道已抽签成员，不能知道哪位成员抽了哪个签；
            成员则也不能查看其他成员抽中的签；开启隐藏选项，则抽签权限默认仅发起人可见，不能更改</div>
          <div class="color-hex-41AA62">空间发起点名：</div>
          <div class="ml-3">可随机点名空间内所有成员</div>
          <div class="color-hex-41AA62">空间签到统计：</div>
          <div class="ml-3">进行该空间发布过的所有签到统计</div>
          <div class="ml-3">1）筛选签到：可筛选该空间发布的所有空间签到，统计任意几次签到的签到记录</div>
          <div class="ml-3">2）筛选班级：筛选签到记录中可能存在的班级，当签到记录中有某个班级三分之一的成员签到，则识别出该班级</div>
        </div>
      </van-collapse-item>
      <van-collapse-item name="8">
        <template #right-icon></template>
        <template #title>
          <div >
            <van-icon
              name="play"
              class="mr-1"
              :style="{transform:activeNames.indexOf('8')!==-1?'rotate(90deg)':'rotate(0)'}"
            />
            问题反馈
          </div>
        </template>
        <div class="text-hex-656565 leading-loose text-12px">
          各位用户在使用面对面活动的过程中如遇任何问题，欢迎到面对面活动QQ答疑群中直接反馈。
          <div class="color-hex-41AA62">qq群号码：</div>
          <div class="ml-3">
            137861282
          </div>
          <div class="color-hex-41AA62">群二维码：</div>
          <div class="ml-3 w-150px">
            <img src="QRCode.png" />
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 在线帮助
</route>