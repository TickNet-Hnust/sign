<!--
 * @Description: 
 * @Autor: 张津瑞
 * @Date: 2022-04-20 16:18:10
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-11 14:46:34
-->
<script setup lang="ts">
import { Notify } from 'vant';
import {sign} from '~/api/launchSign/index'
const router = useRouter()

//百度地图获取定位方法
//经度
let longitude =ref(0)
//纬度
let latitude = ref(0)
let locationLoading = ref(true)
const getLocationByBaidumap = function(){
  let geolocation = new BMapGL.Geolocation();
  geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == BMAP_STATUS_SUCCESS){
          //为啥总是112.95046418 27.83570223(湘潭市政府的位置)
          //破防了，chrome如果不使用https定位就不精确，看来到时候开发环境下只能用火狐测试定位了
          //正确的位置为 112.92667632467,27.905932201717(科大逸夫楼)
          longitude.value = r.point.lng
          latitude.value = r.point.lat
          locationLoading.value = false
      }
      else {
          alert('failed' + this.getStatus());
      }        
  },
  function(err:any){
    console.warn('ERROR(' + err.code + '): ' + err.message);
  },
  {
    enableHighAccuracy: true,
  } 
  );
}
getLocationByBaidumap()


//点击签到功能
const signShow = ref(true)
//发起签到请求数据初始值
const signRequestData = reactive({
    longitude:0,
    latitude:0,
    //目前是随机名字
    signName:`signName${parseInt(Math.random()*1000 as any)}`,
    //下面的数据都是默认写好
    os:'windows10',
    browser:'chrome',
    ip:'127.0.0.1',
    duration:1,
    visible:1,
    spaceId:0
})
//签到请求返回数据
let signResponseData = reactive({
  attend:null,
  createTime:'',
  id:0,
  signCode:'',
  signName:'',
  spaceName:null,
  status:null
})
//发起签到方法
const  launchSign = function(){
  //赋值经纬度
  signRequestData.longitude = longitude.value
  signRequestData.latitude = latitude.value
  console.log(signRequestData,'发起签到接口请求的数据')
  sign(signRequestData).then(res=>{
    signResponseData.attend = res.data.attend
    signResponseData.createTime = res.data.createTime
    signResponseData.id = res.data.id
    signResponseData.signCode = res.data.signCode
    signResponseData.signName = res.data.signName
    signResponseData.spaceName = res.data.spaceName
    signResponseData.status = res.data.status
    console.log(signResponseData,'发起签到接口返回的数据')
    signShow.value=!signShow.value
  })
  Notify({
    message: '60分钟后自动结束签到',
    color: '#fff',
    background: 'rgba(0,0,0,.7)',
    // 展示时长
    duration: 700,
  })
}


//跳转到签到记录
//跳转时通过query参数带上相关数据
const jumpRecord = function() {
  router.push({ path: `/record/checkRecord`,query: { 
    id:signResponseData.id,
    } 
  })
}
// 用户是否可见
const canSee = ref('yes')
// 弹出层控制
const popShow = ref(false)
const changePopShow = () => {
  popShow.value = true
}

// 时间选择器
const durationTime = ref('2分钟')
const timePicker = ref([
  // 天数
  {
    values: ['0天','1天','2天','3天','4天','5天','6天'],
    defaultIndex: 0
  },
  {
    values: ['0小时','1小时','2小时','3小时','4小时','5小时','6小时','7小时','8小时'
    ,'9小时','10小时','11小时','12小时','13小时','14小时','15小时','16小时','17小时','18小时'
    ,'19小时','20小时','21小时','22小时','23小时'],
    defaultIndex: 0
  },
  {
    values: ['0分钟','1分钟','2分钟','3分钟','4分钟','5分钟','6分钟','7分钟','8分钟',
    '9分钟','10分钟','11分钟','12分钟','13分钟','14分钟','15分钟','16分钟','17分钟',
    '18分钟','19分钟','20分钟','21分钟','22分钟','23分钟','24分钟','25分钟','26分钟',
    '27分钟','28分钟','29分钟','30分钟','31分钟','32分钟','33分钟','34分钟','35分钟',
    '36分钟','37分钟','38分钟','39分钟','40分钟','41分钟','42分钟','43分钟','44分钟',
    '45分钟','46分钟','47分钟','48分钟','49分钟','50分钟','51分钟','52分钟','53分钟',
    '54分钟','55分钟','56分钟','57分钟','58分钟','59分钟',],
    defaultIndex: 2
  },
])
const onCancel = () => {
  popShow.value = false
}
const onConfirm = (currentValue: any) => {
  durationTime.value = ''
  for(var i=0;i<3;i++) {
    if(currentValue[i].charAt(0) !=='0' )
    durationTime.value += currentValue[i]
  }
  popShow.value = false
}
</script>
<template>
  <div class="p-3 h-screen">
    <div class="bg-hex-F2EFF6 p-3">
      <div v-show="signShow">
        <div class="text-sm">
          <div>
            <input class="w-100% p-3" placeholder="请输入标题（可不填）" />
          </div>
          <div class="bg-white border-t border-hex-ccc flex justify-between p-3">
            <span>签到列表是否可见</span>
            <van-radio-group v-model="canSee" direction="horizontal">
              <van-radio name="yes">可见</van-radio>
              <van-radio name="no">不可见</van-radio>
            </van-radio-group>
          </div>
          <div class="bg-white border-t border-hex-ccc flex justify-between p-3">
            <span>活动时长</span>
            <span class="text-hex-1989FA" @click="changePopShow">{{durationTime}}<van-icon name="arrow-down" /></span>
            <van-popup
              v-model:show="popShow"
              position="bottom"
              :style="{ height: '50%' }"
            >
              <van-picker
                title="活动时长"
                :columns="timePicker"
                @confirm="onConfirm"
                @cancel="onCancel"
              />
            </van-popup>
          </div>
        </div>
        <div class="text-center mb-5 mt-5">
          <span
            class="rounded bg-hex-41AA62 text-white p-3 px-7"
            v-if="locationLoading"
          >
            正在获取位置信息……
          </span>
          <div
            class="rounded bg-hex-41AA62 text-white p-3 px-7"
            v-else
            @click="launchSign"
          >
            发起签到
          </div>
        </div>
      </div>
      <div v-show="!signShow">
        <div class="text-sm p-2 bg-hex-E0FAFB text-hex-003399 border border-hex-A6DEFB mt-3 mx-5">{{signResponseData.signName}}</div>
        <div class="text-3xl mt-5">{{signResponseData.signCode}}</div>
        <div class="text-center mb-5 mt-8">
          <span
            class="rounded text-hex-41AA62 border-1 py-3 px-4 text-xl"
            @click="jumpRecord"
          >
            查看签到记录
          </span>
        </div>
      </div>
    </div>
    <div class="bg-hex-F7F7F7 mt-4 text-sm text-left p-4 leading-loose">
      <div class="color-hex-41AA62">怎么签到</div>
      <div class="bg-hex-f7f7f7 px-4">
        先打开WIFI（只需要打开，连不连接都可以），然后点击上方签到按钮
      </div>
      <div class="color-hex-41AA62 mt-2">定位失败怎么办</div>
      <div class="bg-hex-f7f7f7 px-4">
        确保WIFI已经打开，且能够搜索到周围的WIFI信号，最好同时打开GPS
      </div>
      <div class="color-hex-41AA62 mt-2">有问题、意见、建议</div>
      <div class="bg-hex-f7f7f7 px-4">
        如果在使用过程中有什么问题、意见或建议，并且在<a class="color-hex-0066FF"
          >使用帮助</a
        >中也无法找到想要的结果时 ，可以通过<a class="color-hex-0066FF">留言反馈</a
        >联系我们，留言时请务必说明具体情况（如签到问题请说明当前时间、地点、签到方式等等具体问题描述）
      </div>
      <div class="mt-5">
        <van-button size="large" color="rgb(129,185,138)">
          查看更多帮助
        </van-button>
      </div>
    </div>
  </div>
</template>




<route lang="yaml">
meta:
  layout: default
  title: 发起签到
</route>
