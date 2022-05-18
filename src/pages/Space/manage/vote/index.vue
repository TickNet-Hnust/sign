<!--
 * @Descipttion: 
 * @Author: 刘晴
 * @Date: 2022-04-20 21:46:45
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-18 13:28:13
-->
<script setup lang="ts">
import { newVote } from '~/api/record/index'
import { FormInstance, Toast, Notify } from 'vant'
interface VoteMsg {
  voteName: String // 投票名称
  voteNumLimit: Number // 可选的选项上限
  duration: Number  // 持续时间
  voteOption: Array<String> // 投票选项集合
  spaceId: Number // 空间id
  anonymity: Number // 是否匿名 0为匿名
}
const route = useRoute()
const router = useRouter()
const voteMsg:VoteMsg = reactive({
  voteName: '',
  voteNumLimit: 1,
  duration: 60,
  voteOption: [],
  spaceId: Number(route.query.id),
  anonymity: 1
})
// 选项直接绑定voteMsg.voteOption有点小问题 增加一个临时变量
const OptionsText = ref('')
//选项数组
const voteOptions = ref([
  {value:''},{value:''},
])
// 增加选项
const addOption = () => {
  voteOptions.value.push({
    value: ''
  })
}
// 删除选项
const deleteOption = (index: any) => {
  if(voteOptions.value.length>2) {
    voteOptions.value.splice(index,1)
  }
}
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
    defaultIndex: 1
  },
  {
    values: ['0分钟','1分钟','2分钟','3分钟','4分钟','5分钟','6分钟','7分钟','8分钟',
    '9分钟','10分钟','11分钟','12分钟','13分钟','14分钟','15分钟','16分钟','17分钟',
    '18分钟','19分钟','20分钟','21分钟','22分钟','23分钟','24分钟','25分钟','26分钟',
    '27分钟','28分钟','29分钟','30分钟','31分钟','32分钟','33分钟','34分钟','35分钟',
    '36分钟','37分钟','38分钟','39分钟','40分钟','41分钟','42分钟','43分钟','44分钟',
    '45分钟','46分钟','47分钟','48分钟','49分钟','50分钟','51分钟','52分钟','53分钟',
    '54分钟','55分钟','56分钟','57分钟','58分钟','59分钟',],
    defaultIndex: 0
  },
])
const typePicker = [
  {text: '单选'},
  {text: '多选'}
]
const showTypePicker = ref(false)
const showTimePicker = ref(false)
const voteType = ref('单选')
const durationTime = ref('60分钟')
// 时间选择器
const onTimeConfirm = (currentValue: any) => {
  durationTime.value = ''
  for(var i=0;i<3;i++) {
    if(currentValue[i].charAt(0) !=='0' )
    durationTime.value += currentValue[i]
  }
  console.log(currentValue,'时间数据')
  //将天小时全部转换为分钟
  let dayToMin = currentValue[0][0] === '0' ? 0 : currentValue[0][0]*1440
  let hourToMin = currentValue[1][0] === '0' ? 0 : currentValue[1][0]*60
  let Min = currentValue[2][0] === '0' ? 0 : +currentValue[2][0]
  let res = dayToMin + hourToMin + Min
  console.log(dayToMin,'天转换的分钟数')
  console.log(hourToMin,'小时转换的分钟数')
  console.log(Min,'分钟数')
  console.log(res,'总分钟数')
  if(res !== 0) {
    voteMsg.duration = res
    showTimePicker.value = false
  } else {
    Notify({
      type: 'warning',
      message: '持续时间不能为0',
      duration: 1000
    })
  }
  
}
const onTimeCancel = () => {
  showTimePicker.value = false
}
// 单多选选择器
const onTypeConfirm = (currentValue: any) => {
  voteType.value = currentValue.text
  showTypePicker.value = false
}
const onTypeCancel = () => {
  showTypePicker.value = false
}
// 最多可选控制
const currentCount = ref(2)
const subCount = () => {
  if(currentCount.value > 2) {
    currentCount.value--
  }
}
const addCount = () => {
  if(currentCount.value < voteOptions.value.length) {
    currentCount.value++
  }
}
// 是否匿名
const anonymity = ref(true)
// 表单验证
const voteForm = ref<FormInstance>()
const validatorMessage = (val: any) => {
  if( val === '') {
    return '输入内容不能为空'
  } else if(!/^[\u4E00-\u9FA5A-Za-z0-9\,\(\)\[\]_\"\'\u2018\u2019\u201C\u201D\u3010\u3011\uFF08\uFF09\u3001\uFF0C]+$/.test(val)){
    return '只能包括逗号、顿号、括号、引号、减号、下划线、汉字、数字、字母！'
  }
}
// 发起投票
const beginVote = async () => {
  voteForm.value?.validate().then(() => {
    voteMsg.voteOption.length = 0
    voteOptions.value.forEach((item) => {
      voteMsg.voteOption.push(item.value)
    })
    if(anonymity) voteMsg.anonymity = 1
    else voteMsg.anonymity = 0

    if(voteType.value === '多选') {
      voteMsg.voteNumLimit = currentCount.value
    }
    newVote(voteMsg).then((res: any) => {
      if(res.code === 200) {
        Toast.success({
          message: '发起投票成功'
        })
        router.push({
          path: '/space/manage/vote/owner_vote',
          query: {id: res.data}
        })
      } else {
        Toast({
          message: res.message
        })
      }
    })
  })
}
</script>
<template>
  <div class="bg-gray-500/8 p-3 min-h-100vh">
    <div class="bg-hex-fff rounded p-3">
      <van-form ref="voteForm">
        <div class="border-b-1 border-hex-C9C9C9">
          <span class="flex items-center">
            <i
              class="border border-hex-30B648 rounded-1/2 text-hex-30B648 text-sm w-2.2em h-2em"   
              style="line-height: 2em"
              @click="deleteOption(index)">
              <van-icon name="records" />
            </i>
            <van-field
              class="text-lg" type="text"
              placeholder="投票标题"
              name="validatorMessage"
              :rules="[{ validator: validatorMessage}]"
              v-model="voteMsg.voteName" />
          </span>
        </div>
        <div
          class="border-b-1 border-hex-C9C9C9"
          v-for="(item, index) in voteOptions"
          :key="item"
        >
          <span class="flex items-center">
            <i
              class="bg-red-500 rounded-1/2 text-white text-xs w-2.2em h-2em"
              style="line-height: 2em"
              @click="deleteOption(index)">
              <van-icon name="minus" />
            </i>
            <van-field
              v-model="item.value"
              :placeholder="`选项${index+1}`"
              name="validatorMessage"
              :rules="[{ validator: validatorMessage}]"
            />
          </span>
        </div>
      </van-form>
      <div class="border-b-1 border-hex-C9C9C9 py-2.5">
        <span class="flex items-center" @click="addOption">
          <i
            class="bg-blue-500 rounded-1/2 text-white text-xs w-2em h-2em mr-3"
            style="line-height: 2em">
            <van-icon name="plus" />
          </i>
          添加选项
        </span>
      </div>
    </div>
    <div class="mt-4 bg-white text-sm p-3">
      <div class="flex justify-between h-3em items-center border-b-1 border-hex-C9C9C9">
        <span>投票类型</span>
        <span @click="()=>{showTypePicker=true}">{{voteType}}<van-icon name="arrow" /></span>
      </div>
      <div v-if="voteType === '多选' " class="flex justify-between h-3em items-center border-b-1 border-hex-C9C9C9">
        <span>最多可选</span>
        <span>
          <span class="bg-hex-ccc px-1 py-0.5" @click="subCount"><van-icon name="minus" /></span>
          <span class="bg-hex-ccc px-3 py-0.5 ml-2">{{currentCount}}</span>
          <span class="bg-hex-ccc px-1 py-0.5 ml-2" @click="addCount"><van-icon name="plus" /></span>
          
        </span>
      </div>
      <div class="flex justify-between h-3em items-center border-b-1 border-hex-C9C9C9">
        <span>持续时间</span>
        <span @click="()=>{showTimePicker=true}">{{durationTime}}<van-icon name="arrow" /></span>
      </div>
      <div class="flex justify-between h-3em items-center border-b-1 border-hex-C9C9C9">
        <span>匿名</span>
        <span>
          <van-switch v-model="anonymity" size="1.5em"/>
        </span>
      </div>
    </div>
    <div class="mt-8">
      <van-button type="success" size="large" @click="beginVote">
        发起投票
      </van-button>
    </div>
    <!-- 单选多选选择器 -->
    <van-popup
      v-model:show="showTypePicker"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-picker
        title="投票类型"
        :columns="typePicker"
        @confirm="onTypeConfirm"
        @cancel="onTypeCancel"
      />
    </van-popup>
    <!-- 时间选择器 -->
    <van-popup
      v-model:show="showTimePicker"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-picker
        title="活动时长"
        :columns="timePicker"
        @confirm="onTimeConfirm"
        @cancel="onTimeCancel"
      />
    </van-popup>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 发起投票
</route>
