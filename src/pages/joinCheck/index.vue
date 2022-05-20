<script setup lang="ts">
  import { Notify, Toast } from 'vant';
  import {signRecordByCode} from '~/api/launchSign/index'
  const pattern = /^\d{4}$/ // 用户输入的签到码正则匹配规则
  const router = useRouter()
  const inputValue = ref('')
  const canCheck = ref(false) // 是否可以开始签到
  const checkShow = ref(true)
  const showKeyboard = ref(false)
  const titleText = ref(
    computed( () => {
      if(!pattern.test(inputValue.value)) {
        canCheck.value = false
        return '请输入4位有效的签到码*^_^*'
      } else {
          canCheck.value = true
          return '点击确认签到进行签到'       
      }
    })
  )
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

//签到请求数据(初始数据)
let signRecordRequestData = reactive({
  longitude:0,
  latitude:0,
  signCode:'',
  os:'windows10',
  browser:'chrome',
  ip:'127.0.0.1'
})
//签到收到的数据
let signRecordResponseData = reactive({
  id:0,
})
//确认签到
const joinCheck = () => {
  if(canCheck.value) {
    signRecordRequestData.longitude = longitude.value
    signRecordRequestData.latitude = latitude.value
    signRecordRequestData.signCode = inputValue.value
    console.log(signRecordRequestData,'签到请求传去的数据')
    signRecordByCode(signRecordRequestData).then((res)=>{
      console.log(res,'签到请求传来的数据')
      let {msg,code} = res
      if(code!==200){
        Toast({
          message: msg,
          duration: 2000
        })
      }else if(code===200){
        Toast({
          message: msg,
          duration: 1000
        })
        signRecordResponseData.id = res.data
        checkShow.value = false
      }
    })
}
}

//跳转到签到记录
const jumpRecord = function() {
  router.push({ path: `/join/sign/detail`,
    query: { 
      id:signRecordResponseData.id,
    } 
  }
  )
}

</script>
<template>
  <div class="p-3">
    <div class="bg-hex-F2EFF6 p-3">
      <div class="text-sm p-2 bg-hex-E0FAFB text-hex-003399 border border-hex-A6DEFB mt-3">{{ titleText }}</div>
      <div v-show="checkShow">
        <div class="mt-6">
          <van-password-input
            :value="inputValue"
            :mask="false"
            :length="4"
            :gutter="5"
            :focused="showKeyboard"
            @focus="showKeyboard = true"
          />
          <van-number-keyboard
            v-model="inputValue"
            :show="showKeyboard"
            @blur="showKeyboard = false"
            maxlength="4"
          />
        </div>
        <div
          class="my-6 border w-200px mx-auto py-3 text-base rounded border-hex-4FC09C text-hex-4FC09C"
          v-if="locationLoading"
        >
          正在获取位置信息……
        </div>
        <div
          class="my-6 border w-150px mx-auto py-3 text-xl rounded border-hex-4FC09C text-hex-4FC09C"
          v-else
          @click="joinCheck"
        >
          确认签到
        </div>
      </div>
      <div v-show="!checkShow">
        <div class="text-3xl mt-5">{{ inputValue }}</div>
        <div
          class="my-6 border w-150px mx-auto py-3 text-xl rounded border-hex-4FC09C text-hex-4FC09C"
          @click="jumpRecord"
        >
          查看签到记录
        </div>
      </div>
    </div>
    <div class="bg-hex-F7F7F7 mt-1 text-sm text-left p-4 leading-loose">
      <div class="color-hex-41AA62">怎么签到</div>
      <div class="bg-hex-f7f7f7 px-4">
        先打开WIFI（只需要打开，连不连接都可以），然后点击上方签到按钮
      </div>
      <div class="color-hex-41AA62 mt-2">定位失败怎么办</div>
      <div class="bg-hex-f7f7f7 px-4">
        确保WIFI已经打开，且能够搜索到周围的WIFI信号，最好同时打开GPS
      </div>
      <div class="color-hex-41AA62 mt-2">多次定位失败怎么办</div>
      <div class="bg-hex-f7f7f7 px-4">
       如果多次签到失败，请寻找签到发起人进行扫码签到或者补录
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
  title: 我要签到
</route>
