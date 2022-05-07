<!--
 * @Description: 
 * @Autor: 张津瑞
 * @Date: 2022-04-20 16:18:10
 * @LastEditors: 张津瑞
 * @LastEditTime: 2022-05-06 21:54:02
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

</script>
<template>
  <div class="p-3 h-screen">
    <div class="bg-hex-F2EFF6 py-3">
      <div v-show="signShow">
        <div class="text-5em color-hex-41AA62">
          <van-icon name="location-o" />
        </div>
        <div class="text-center mb-5 mt-2">
          <span
            class="rounded text-hex-41AA62 border-1 p-3 px-7 text-lg"
            v-if="locationLoading"
          >
            正在获取位置信息……
          </span>
          <span
            class="rounded text-hex-41AA62 border-1 p-3 px-7 text-xl"
            v-else
            @click="launchSign"
          >
            发起签到
          </span>
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
