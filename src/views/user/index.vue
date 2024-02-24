<template>
  <div class="dashboard-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户ID">
        <el-input v-model="formInline.id" placeholder="用户ID" />
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="formInline.nickName" placeholder="用户昵称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="danger" @click="onClean">清空</el-button>
      </el-form-item>
    </el-form>

    <el-table
      size="mini"
      :stripe="true"
      :data="userList"
      style="width: 100%"
    >
      <el-table-column
        align="center"
        prop="userInfo.id"
        label="用户ID"
        width="180"
      />
      <el-table-column
        align="center"
        prop="userInfo.nickName"
        label="用户昵称"
        width="180"
      />
      <el-table-column
        label="用户头像"
      >
        <template slot-scope="scope">
          <el-avatar shape="square" size="small" :src="scope.row.userInfo.avatar" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="userInfo.openid"
        label="openid"
      />
      <el-table-column
        align="center"
        prop="userInfo.createTime"
        label="用户注册时间"
      />
      <el-table-column
        label="角色"
      >
        <template slot-scope="scope">
          <el-tag
            v-for="tag in scope.row.roleList"
            :key="tag.role"
          >
            {{ tag.description }}
          </el-tag>

        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          >
            拉黑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          >
            角色管理
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom-right">
      <el-pagination
        layout="total, prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="changeCurrentPageEvent"
      />
    </div>
  </div>
</template>

<script>
import { manageUserList } from '../../api/user'

export default {
  name: 'Dashboard',
  data() {
    return {
      formInline: {
        id: null,
        nickName: null
      },
      userList: [],
      total: 0,
      pageSize: 10
    }
  },
  created() {
    this.onSubmit()
  },
  methods: {
    onClean() {
      for (const key in this.formInline) {
        this.formInline[key] = null
      }
    },
    onSubmit() {
      this.getManageUserList(1)
    },
    changeCurrentPageEvent(page) {
      this.getManageUserList(page)
    },
    getManageUserList(page) {
      manageUserList({ condition: this.formInline, page: page, size: this.pageSize }).then(res => {
        this.userList = res.list
        this.total = res.total
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  width: calc(100% - 20px);
  padding: 20px;
}
.demo-form-inline {
  margin-top: 20px;
}
.bottom-right {
    position: fixed; /* 使用固定定位，使其相对于浏览器窗口固定位置 */
    right: 0; /* 距离右侧的距离为0 */
    background-color: #ffffff; /* 背景颜色，可根据需要自行调整 */
    padding: 0px; /* 内边距，根据需要自行调整 */
    margin-right: 80px;
    margin-top: 20px;
}
</style>
