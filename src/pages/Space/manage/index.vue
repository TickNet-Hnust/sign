<!--
 * @Descipttion:
 * @Author: 曹俊
 * @Date: 2022-04-20 21:46:45
 * @LastEditors: caojun
 * @LastEditTime: 2022-05-16 11:05:20
-->
<script setup leng="ts">
import { Notify, Picker, Toast } from 'vant'
import src from '~/assets/1.png'
import { deleteSignSpace, getSignSpace, quitSignSpace, updateSignSpace } from '~/api/mySpace/index'
import { deleteSpaceMember, getSpaceMemberList, updateSpaceMember } from '~/api/mySpace/spaceMember'
const route = useRoute()
const active = ref(0)
const loading = ref(false)
const fininshed = ref(true)
const details_list = reactive([
  {
    title: '发起签到',
    icon: 'i-carbon-3d-cursor-alt',
    link: '/launch',
  },
  {
    title: '发起投票',
    icon: 'i-carbon-receipt',
    link: 'vote',
  },
  {
    title: '发起抽签',
    icon: 'i-carbon-align-box-middle-center',
    link: 'draw',
  },
  {
    title: '发起点名',
    icon: 'i-carbon-user-certification',
    link: 'call_the_roll',
  },
  {
    title: '成员追加',
    icon: 'i-carbon-user-follow',
    link: 'add_member',
  },
  {
    title: '签到统计',
    icon: 'i-carbon-report',
    link: 'scorecard',
  },
])
// 成员列表
const member_list = ref([])
const router = useRouter()
const finished = ref(true)
const id = ref(route.query.id)
const jumpPage = (item) => {
  if (item.title !== '发起签到') {
    router.push({
      path: `manage/${item.link}`,
      query: {
        id: id.value,
      },
    })
  }
  else {
    router.push({
      path: item.link,
      query: {
        spaceId: id.value,
      },
    })
  }
}
// 初始化一个空间列表
const spaceList = reactive({
  id: '',
  spaceName: '',
  count: '',
  createTime: '',
})
// 负责人的操作 ++++
// 负责人修改空间名称请求的数据
const updateData = reactive({
  spaceName: '',
  spaceId: 0,
})
// 负责人删除空间请求的数据
const deleteData = reactive({ spaceId: 0 })

// 负责人改变管理员权限的数据
const changeAdminData = reactive({
  userId: '',
  spaceId: 0,
})

// 负责人改变学生权限的数据
const changeStuData = reactive({
  userId: '',
  spaceId: 0,
})
// 管理员删除学生的数据
const deleteStudentData = reactive({
  userId: '',
  spaceId: 0,
})
// 管理员退出空间
const quitSpaceData = reactive({
  userId: '1905040121',
  spaceId: 0,
})
// 获取当前操作者的权限 1为管理员 2为负责人
const rank = ref(0)
// 查询空间列表的参数
getSignSpace(id.value).then((res) => {
  rank.value = res.data.memberRank
  spaceList.id = res.data.id
  spaceList.createTime = res.data.createTime
  spaceList.spaceName = res.data.spaceName
  spaceList.count = res.data.count
  updateData.spaceName = res.data.spaceName
  updateData.spaceId = res.data.id
  deleteData.spaceId = res.data.id
  deleteStudentData.spaceId = res.data.id
  deleteStudentData.userId = res.data.id
  quitSpaceData.spaceId = res.data.id
})
// 获取空间成员列表
getSpaceMemberList(id.value).then((res) => {
  if (res.code === 200)
    member_list.value = res.rows
})

// 负责人修改空间名称
const updateSpaceName = () => {
  updateSignSpace(updateData).then((res) => {
    if (res.code === 200)
      spaceList.spaceName = updateData.spaceName
  })
}
// 负责人解散空间
const deleteSpace = () => {
  deleteSignSpace(deleteData).then((res) => {
    if (res.code === 200) {
      Notify({ type: 'primary', message: '解散成功' })
      router.push('/Space')
    }
  })
}
const showUpdate = ref(false)// 是否显示修改空间名称的弹窗
const showDelete = ref(false)// 是否显示删除空间的弹窗
const showDeleteAdmin = ref(false)// 是否负责人显示删除管理员的弹窗
const showDeleteStu = ref(false)// 是否显示负责人删除学生的弹窗
const showAdminChange = ref(false)// 是否显示操作管理员权限的弹出层
const showStuChange = ref(false)// 是否显示操作学生权限的弹出层
const showStudentChange = ref(false)// 是否显示管理员操作学生权限的弹出层
const showDeleteStudent = ref(false)// 是否显示删除学生的弹窗
const showQuit = ref(false)// 是否显示管理员退出空间的弹窗
// 点击管理员的方法
const changeAdmin = (item) => {
  if (rank.value === 2) {
    showAdminChange.value = true
    changeAdminData.userId = item.userId
    changeAdminData.spaceId = id
  }
}
// 点击学生的方法
const changeStu = (item) => {

}
// 操作成员方法
const changeMenber = (item) => {
  if (item.memberRank === 1) {
    showAdminChange.value = true
    changeAdminData.userId = item.userId
    changeAdminData.spaceId = id
  }
  else {
    if (rank.value === 2) {
      showStuChange.value = true
      changeStuData.userId = item.userId
      changeStuData.spaceId = id
    }
    else if (rank.value === 1) {
      showStudentChange.value = true
      deleteStudentData.userId = item.userId
      deleteStudentData.spaceId = id
    }
  }
}
// 操作管理员列表
// const columnsAdmin = ['取消管理员资格', '删除成员']
const columnsAdmin = ['取消管理员资格', '删除成员']
// 操作管理员的方法
const onConfirmAdmin = (index, value) => {
  if (value === 0) {
    updateSpaceMember(changeAdminData).then((res) => {
      getSpaceMemberList(id.value).then((res) => {
        if (res.code === 200) {
          member_list.value = res.rows
          showAdminChange.value = false
          Notify({ type: 'success', message: '操作成功' })
        }
      })
    })
  }
  else if (value === 1) {
    showDeleteAdmin.value = true
  }
}
// 负责人确认删除管理员
const onConfirmDeleteAdmin = () => {
  deleteSpaceMember(changeAdminData).then((res) => {
    getSpaceMemberList(id.value).then((res) => {
      if (res.code === 200) {
        member_list.value = res.rows
        showAdminChange.value = false
        Notify({ type: 'success', message: '操作成功' })
      }
    })
  })
}
// 负责人确认删除学生
const onConfirmDeleteStu = () => {
  deleteSpaceMember(changeStuData).then((res) => {
    getSpaceMemberList(id.value).then((res) => {
      if (res.code === 200) {
        member_list.value = res.rows
        showStuChange.value = false
        Notify({ type: 'success', message: '操作成功' })
      }
    })
  })
}
// 管理员确认删除学生
const onConfirmDeleteStudent = () => {
  deleteSpaceMember(deleteStudentData).then((res) => {
    getSpaceMemberList(id.value).then((res) => {
      if (res.code === 200) {
        member_list.value = res.rows
        showStudentChange.value = false
        Notify({ type: 'success', message: '操作成功' })
      }
    })
  })
}
// 负责人操作普通成员列表
const columnsStu = ['设为管理员', '删除成员']
// 管理员操作普通成员列表
const columnsStudent = ['删除成员']
// 点击取消,关闭弹窗(通用)
const onCancel = () => {
  showAdminChange.value = false
  showStuChange.value = false
  showStudentChange.value = false
  Toast('取消')
}

// 负责人将成员设为管理员
const onConfirmStu = (index, value) => {
  if (value === 0) {
    updateSpaceMember(changeStuData).then((res) => {
      getSpaceMemberList(id.value).then((res) => {
        if (res.code === 200) {
          console.log(res, '成员列表')
          member_list.value = res.rows
          showStuChange.value = false
          Notify({ type: 'success', message: '操作成功' })
        }
      })
    })
  }
  else if (value === 1) {
    showDeleteStu.value = true
  }
}
// 管理员确认删除成员
const onConfirmStudent = (index, value) => {
  if (value === 0)
    showDeleteStudent.value = true// 展示是否删除成员弹窗
}
// 管理员退出空间的方法
const quitSpace = () => {
  quitSignSpace(quitSpaceData).then((res) => {
    if (res.code === 200) {
      Notify({ type: 'primary', message: '退出成功' })
      router.push('/Space')
    }
  })
}
</script>
<template>
  <div class="bg-gray-500/8 p-3 min-h-screen">
    <div class="text-left text-hex-aaa text-xs ml-3">
      空间信息
    </div>
    <div class="bg-hex-fff rounded px-5 pt-2 text-hex-666 border border-hex-ccc">
      <div class="flex justify-between border-b border-hex-ccc text-14px py-2">
        <span>空间名称</span>
        <span>
          {{ spaceList.spaceName }}
          <span v-if="rank ===2" @click="showUpdate = true"><van-icon name="edit" /></span>
        </span>
      </div>
      <div class="flex justify-between text-14px py-2">
        <span>成员</span>
        <span>
          {{ member_list.length }}人
        </span>
      </div>
      <van-dialog
        v-model:show="showUpdate"
        title="修改空间名称"
        confirm-button-color="rgb(63,133,255)"
        show-cancel-button
        @confirm="updateSpaceName()"
      >
        <div class="mt-5 px-10">
          <van-field
            v-model="updateData.spaceName"
            class="border-b border-hex-ccc mb-3"
            placeholder="请输入新的空间名称"
            :rules="[{ required: true, message: '请输入新名称' }]"
          />
        </div>
      </van-dialog>
      <van-dialog
        v-model:show="showDelete"
        title="是否解散此空间"
        confirm-button-color="rgb(63,133,255)"
        show-cancel-button
        @confirm="deleteSpace()"
      />
      <van-dialog
        v-model:show="showDeleteAdmin"
        title="是否删除此成员"
        confirm-button-color="rgb(63,133,255)"
        show-cancel-button
        @confirm="onConfirmDeleteAdmin()"
      />
      <van-dialog
        v-model:show="showDeleteStu"
        title="是否删除此成员"
        confirm-button-color="rgb(63,133,255)"
        show-cancel-button
        @confirm="onConfirmDeleteStu()"
      />
      <van-dialog
        v-model:show="showDeleteStudent"
        title="是否删除此成员"
        confirm-button-color="rgb(63,133,255)"
        show-cancel-button
        @confirm="onConfirmDeleteStudent()"
      />
      <van-dialog
        v-model:show="showQuit"
        title="是否退出空间"
        confirm-button-color="rgb(63,133,255)"
        show-cancel-button
        @confirm="quitSpace()"
      />
    </div>
    <van-tabs v-model:active="active" class="mt-3" color="rgb(40,182,72)">
      <van-tab title="概况">
        <div class="text-left text-hex-aaa text-xs ml-3 mt-3">
          应用
        </div>
        <div class="bg-white p-3 py-5 rounded border border-hex-10AA62">
          <div grid="~ cols-3">
            <div
              v-for="item in details_list"
              :key="item"
              class="mb-5 mx-auto inline-block text-hex-666 w-20vw h-20vw"
              @click="jumpPage(item,id)"
            >
              <div class="mt-2" text="2xl" color="green-600" m="auto" :class="item.icon" />
              <div class="mt-3 text-14px">
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="rank===1"
          class="p-2 bg-white mt-3 rounded border border-hex-ccc text-red font-600"
          @click="showQuit = true"
        >
          退出空间
        </div>
        <div
          v-if="rank===2"
          class="p-2 bg-white mt-3 rounded border border-hex-ccc text-red font-600"
          @click="showDelete = true"
        >
          解散空间
        </div>
      </van-tab>
      <van-tab title="成员">
        <div class="text-left mt-3 text-hex-aaa text-xs ml-3">
          成员
        </div>
        <div class="bg-white rounded items-center p-1 border border-hex-ccc">
          <van-list>
            <div class="flex items-center text-sm py-2">
              <span class="flex-1">学号/工号</span>
              <span class="flex-1">姓名</span>
              <span class="flex-1">角色</span>
            </div>
            <div
              v-for="item in member_list" :key="item" class="flex items-center text-sm py-2 border-t border-hex-ddd "
            >
              <div class="flex-1 font-sans">
                {{ item.userId }}
              </div>
              <div class="flex-1">
                {{ item.name }}
              </div>
              <div class="flex-1">
                <span v-if="item.memberRank == 2">
                  <van-tag color="#38bdf8">负责人</van-tag>
                </span>
                <span v-if="item.memberRank == 1">
                  <van-tag color="#10b981">管理员</van-tag>
                </span>
                <span v-if="item.memberRank == 0" class="text-xs">
                  <van-tag plain color="#78716c">成员</van-tag>
                </span>
              </div>
              <span style="transform: rotate(90deg);position: absolute; right: 1em">
                <van-icon v-if="item.memberRank<rank" name="ellipsis" @click="changeMenber(item)" />
              </span>
            </div>
          </van-list>
        </div>
      </van-tab>
      <van-popup
        v-model:show="showAdminChange"
        position="bottom"
        :style="{ height: '50%' }"
      >
        <van-picker
          class="mt-10"
          title="请选择操作"
          :columns="columnsAdmin"
          @confirm="onConfirmAdmin"
          @cancel="onCancel"
        />
      </van-popup>
      <van-popup
        v-model:show="showStuChange"
        position="bottom"
        :style="{ height: '50%' }"
      >
        <van-picker
          class="mt-10"
          title="请选择操作"
          :columns="columnsStu"
          @confirm="onConfirmStu"
          @cancel="onCancel"
        />
      </van-popup>
      <van-popup
        v-model:show="showStudentChange"
        position="bottom"
        :style="{ height: '50%' }"
      >
        <van-picker
          class="mt-10"
          title="请选择操作"
          :columns="columnsStudent"
          @confirm="onConfirmStudent"
          @cancel="onCancel"
        />
      </van-popup>
    </van-tabs>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  title: 空间详情
</route>
