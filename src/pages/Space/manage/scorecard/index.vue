<!--
 * @Descipttion: 
 * @Author: 刘晴
 * @Date: 2022-04-20 21:46:45
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-22 16:13:40
-->
<script lang="ts" setup>
import { spaceSignRecord, spaceSignList, spaceDeptList } from '~/api/record/index'
interface RecordList {// 记录列表
  userId: String //学号/工号
  userName: String //用户名
  number: String //用户当前获取积分
  total: String //总积分
}
interface SignList { //发起过的签到列表
  name: String //签到名
  id: String // 签到活动id
  createTime: String //签到发起时间
}
interface DeptList { //班级列表
  id: String //班级id
  name: String // 班级名
  createTime: String 
}
// 获取空间id
const route = useRoute()
const spaceId = route.query.id
const recordList: Array<RecordList> = reactive([])
// 获取签到统计列表
const recordRequest = reactive({
  spaceId: spaceId,
  signId: '',
  deptId: ['0']
})
const getSpaceSignRecord = () => {
  // 先将列表数据清零
  recordList.length = 0
  spaceSignRecord(recordRequest).then((res: any) => {
    if(res.code === 200) {
      recordList.push(...res.data)
    }
  }).catch((err) => {
    console.log(err)
  })
}
// 该空间发起过的签到列表
const signList: Array<SignList> = reactive([])
// 该空间可能存在的班级
const deptList: Array<DeptList> = reactive([])
// 初始化数据
onMounted(() => {
  // 获取所有签到统计
  getSpaceSignRecord()
  // 获取该空间发起过的签到列表
  spaceSignList({spaceId: spaceId}).then((res: any) => {
    if(res.code === 200) {
      signList.push(...res.data)
      if(signList.length !==0 ) {
        signList.push({
          name: '所有记录',
          id: '',
          createTime: ''
        })
      }
    }
  })
  // 获取该空间可能存在的班级
  spaceDeptList({spaceId: spaceId}).then((res) => {
    if(res.code === 200) {
      deptList.push(...res.data)
    }
  })
})

// 筛选签到
const sign = ref(null)
const checkedId = ref('') // 选中的签到id
const onCancel = () => {
  // 点击取消按钮
  checkedId.value = recordRequest.signId
  checkedDeptList.value = recordRequest.deptId
}
// 筛选班级
const dept = ref(null)
const checkedDeptList = ref([])
const searchSign = (option: any) => {
  // 点击确定按钮
  if(option === 'sign') {
    recordRequest.signId = checkedId.value
    sign.value.toggle()
  }
  else {
    recordRequest.deptId = checkedDeptList.value
    dept.value.toggle()
  }
  getSpaceSignRecord()
}
</script>

<template>
  <div class="bg-gray-500/8 p-3 min-h-100%">
    <div class="bg-white text-left p-4 pb-5 text-15px rounded">
      <li class="flex items-center">
        <div class="w-5.5em">
          • 活动名称
        </div>
        <div class="text-13px">
          班级会议
        </div>
      </li>
      <li class="mt-3 flex items-center">
        <div class="w-5.5em">
          • 统计规则
        </div>
        <div class="text-13px text-hex-41AA62">
          统计签到记录
        </div>
      </li>
      <li class="mt-3 flex items-center">
        <div class="w-5.5em">
          • 说明
        </div>
        <div class="text-13px text-hex-41AA62">
          统计方式：成员积分/总积分
        </div>
      </li>
    </div>
    <!-- 下拉筛选菜单 -->
    <div class="mt-2">
      <van-dropdown-menu active-color="#1989fa">
        <van-dropdown-item ref="sign" class="mx-3" title="筛选签到" @close="onCancel">
          <van-empty
            v-if="signList.length===0"
            description="该空间暂时没有发起过签到"
            image-size="5em"
          />
          <van-radio-group
            v-if="signList.length!==0"
            class="p-3 border-t-hex-ccc border-t"
            v-model="checkedId"
            checked-color="#10AA62"
          >
            <van-radio
              v-for="item in signList" 
              :key="item" :name="item.id" icon-size="15px"
            >
              <div class="my-2 text-center">
                <div class="text-14px text-hex-666">{{item.name}}</div>
                <div v-if="item.createTime!=='' " class="text-12px text-hex-999">（{{item.createTime}}）</div>
              </div>
            </van-radio>
          </van-radio-group>
          <div
            v-if="signList.length!==0"
            class="bg-hex-28B648 text-white rounded-2xl my-2 mx-5 py-1.5"
            @click="searchSign('sign')"
          >确定</div>
        </van-dropdown-item>
        <van-dropdown-item ref="dept" class="mx-3" title="筛选班级" @close="onCancel">
          <van-empty
            v-if="deptList.length===0"
            description="抱歉暂时没有找到该空间可能存在的班级"
            image-size="5em"
          />
          <van-checkbox-group
            v-if="deptList.length!==0"
            class="p-3 border-t-hex-ccc border-t"
            v-model="checkedDeptList"
            checked-color="#10AA62"
          >
            <van-checkbox
              shape="square"
              name="0" icon-size="15px" 
              class="flex items-center text-14px text-hex-666 py-2"
            >
              原空间内成员
            </van-checkbox>
            <van-checkbox
              v-for="item in deptList"
              shape="square"
              :key="item" :name="item.id" icon-size="15px"
              class="flex items-center py-2"
            >
              <div class="text-14px text-hex-666">{{item.name}}</div>
            </van-checkbox>
          </van-checkbox-group>
          <div
            v-if="deptList.length!==0"
            class="bg-hex-28B648 text-white rounded-2xl my-2 mx-5 py-1.5"
            @click="searchSign('dept')"
          >确定</div>
        </van-dropdown-item>
      </van-dropdown-menu>      
    </div>
    <ul class="bg-white mt-2 border border-t-2 border-hex-ccc border-t-hex-28B648 px-2">
      <li class="flex py-1">
        <span class="flex-1">学号/工号<van-icon name="sort" /></span>
        <span class="flex-1">姓名</span>
        <span class="flex-1">统计</span>
      </li>
      <li
        v-for="item in recordList"
        :key="item"
        class="flex py-1 border-t border-hex-ccc"
        :style="{color: item.add?'#ee2c79':'#333'}"
      >
        <span class="flex-1">{{ item.userId }}</span>
        <span class="flex-1">{{ item.userName }}</span>
        <span class="flex-1">{{ item.number }} / {{ item.total }}</span>
      </li>
    </ul>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 签到统计
</route>
<style>
:root {
  --van-dropdown-menu-box-shadow: 0;
}
</style>