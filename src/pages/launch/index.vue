<!--
 * @Description: 
 * @Autor: 张津瑞
 * @Date: 2022-04-20 16:18:10
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-31 16:53:31
-->
<script setup lang="ts">
import { Notify, Toast } from 'vant';
import {sign} from '~/api/launchSign/index'
//nanoid产生唯一id
import { customAlphabet } from  'nanoid'
const nanoid = customAlphabet('1234567890abcdef', 5)
const router = useRouter()
const route = useRoute()

//触发事件总线例子
// const { eventHub } = getCurrentInstance().proxy;
// onMounted(() => {
//   eventHub.$emit('zhangjinruiTestEvent', 'some params');
// });

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
    signName:'',
    //下面的数据都是默认写好
    os:'windows10',
    browser:'chrome',
    ip:'127.0.0.1',
    duration:10,
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

//用户输入签到名
let inputName = ref('')
// 用户是否可见
let canSee = ref(1)
//实际请求的持续时间
let requestDurationTime = ref(10)
//获取query中的spaceId
const spaceId  = typeof route.query.spaceId === 'undefined' ? 0 : +route.query.spaceId
console.log(spaceId,'spaceId')
//发起签到方法
const launchLoading = ref(false) //发起签到后的延迟
const  launchSign = function(){
  launchLoading.value = true
  locationLoading.value = true
  console.log(canSee.value,'签到列表是否可见')
  console.log(inputName.value,'签到名')
  console.log(durationTime.value,'活动时长字符串')
  console.log(requestDurationTime.value,'活动实际请求发送的时长')
  //赋值请求数据
  signRequestData.longitude = longitude.value
  signRequestData.latitude = latitude.value
  signRequestData.signName = inputName.value||`signName${nanoid()}`
  signRequestData.duration = requestDurationTime.value
  signRequestData.visible = canSee.value
  signRequestData.spaceId = spaceId
  console.log(signRequestData,'发起签到接口请求的数据')
  sign(signRequestData).then(res=>{
    console.log(res,'发起签到接口返回的res')
    if(res.code===401){
        Notify({
          message: '身份验证失效!',
          color: '#fff',
          background: 'rgba(0,0,0,.7)',
          // 展示时长
          duration: 700,
        })
        router.push({ path: `/`})
    }else if(res.code===501){
        Notify({
          message: res.msg,
          color: '#fff',
          background: 'rgba(0,0,0,.7)',
          // 展示时长
          duration: 700,
        })
    }else{
        signResponseData.attend = res.data.attend
        signResponseData.createTime = res.data.createTime
        signResponseData.id = res.data.id
        signResponseData.signCode = res.data.signCode
        signResponseData.signName = res.data.signName
        signResponseData.spaceName = res.data.spaceName
        signResponseData.status = res.data.status
        console.log(signResponseData,'发起签到接口返回的数据')
        Notify({
          message: `${signRequestData.duration}分钟后自动结束签到`,
          color: '#fff',
          background: 'rgba(0,0,0,.7)',
          // 展示时长
          duration: 700,
        })
        signShow.value=!signShow.value
    }
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

// 弹出层控制
const popShow = ref(false)
const changePopShow = () => {
  popShow.value = true
}

// 时间选择器
//持续时间展示字符串
let durationTime = ref('10分钟')
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
    defaultIndex: 10
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
  console.log(currentValue,'时间数据')
  //将天小时全部转换为分钟
  let dayCnt = currentValue[0][0] === '0' ? 0 : currentValue[0][0]
  let hourCnt = currentValue[1][0] === '0' ? 0 : currentValue[1][0]
  let minCnt = currentValue[2][0] === '0' ? 0 : +currentValue[2][0]
  if(currentValue[1][0] !== '0' && currentValue[1][1]!='小') {
    hourCnt = hourCnt+currentValue[1][1]
  }
  if(currentValue[2][0] !== '0' && currentValue[2][1]!='分') {
    minCnt = minCnt+currentValue[2][1]
  }
  console.log(dayCnt,hourCnt,minCnt)
  let dayToMin = dayCnt*1440
  let hourToMin = hourCnt*60
  let Min = minCnt
  let res = Number(dayToMin) + Number(hourToMin) + Number(Min)
  console.log(dayToMin,'天转换的分钟数')
  console.log(hourToMin,'小时转换的分钟数')
  console.log(Min,'分钟数')
  console.log(res,'总分钟数')
  requestDurationTime.value = res
  popShow.value = false
}
</script>
<template>
  <div class="p-3 h-screen">
    <div class="bg-hex-F2EFF6 p-3">
      <div v-show="signShow">
        <div class="text-sm">
          <div>
            <input class="w-100% p-3" v-model="inputName" placeholder="请输入标题（不填将自动生成）" />
          </div>
          <div class="bg-white border-t border-hex-ccc flex justify-between py-3 px-2">
            <div>签到列表是否可见</div>
            <van-radio-group v-model="canSee" direction="horizontal">
              <van-radio icon-size="15px" :name="1">可见</van-radio>
              <van-radio icon-size="15px" :name="0">不可见</van-radio>
            </van-radio-group>
          </div>
          <div class="bg-white border-t border-hex-ccc flex justify-between py-3 px-2">
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
          <div
            class="rounded bg-hex-41AA62 text-white p-3 px-7"
            v-if="locationLoading&&!launchLoading"
          >
            正在获取位置信息……
          </div>
          <div
            class="rounded bg-hex-41AA62 text-white p-3 px-7"
            v-if="!locationLoading"
            @click="launchSign"
          >
            发起签到
          </div>
          <div
            class="flex justify-center rounded bg-hex-99CDAC text-white p-3 px-7"
            v-if="launchLoading"
          >
            <van-loading size="20px" type="spinner" />发起中...
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
      <div class="color-hex-41AA62 mt-2">定位失败怎么办</div>
      <div class="bg-hex-f7f7f7 px-4">
        请确保打开GPS
      </div>
      <div class="color-hex-41AA62 mt-2">有问题、意见、建议</div>
      <div class="bg-hex-f7f7f7 px-4">
        如果在使用过程中有什么问题、意见或建议，并且在常见问题中无法找到想要的帮助时，
        可以添加我们的面对面活动答疑QQ群与我们联系（Q群号：137861282）
      </div>
      <div class="mt-5">
        <van-button size="large" color="rgb(129,185,138)" @click="$router.push('/help')">
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
