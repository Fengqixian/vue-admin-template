<template>
  <div class="dashboard-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="商品ID">
        <el-input v-model="formInline.id" placeholder="商品ID" />
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="formInline.nickName" placeholder="商品名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="danger" @click="onClean">清空</el-button>
        <el-button type="success" @click="createGoods">创建</el-button>
      </el-form-item>
    </el-form>

    <el-table size="mini" :stripe="true" :data="userList" style="width: 100%">
      <el-table-column align="center" prop="userInfo.id" label="商品ID" width="80" />
      <el-table-column align="center" label="商品类型" width="180">
        <template slot-scope="scope">
          <el-avatar shape="square" size="small" :src="scope.row.userInfo.avatar" />
        </template>
      </el-table-column>
      <el-table-column label="封面" width="180">
        <template slot-scope="scope">
          {{ GoodsType[scope.row.userInfo.avatar]?GoodsType[scope.row.userInfo.avatar]:'未知' }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="userInfo.nickName" label="商品名称" width="80" />
      <el-table-column align="center" prop="userInfo.nickName" label="商品描述" />
      <el-table-column align="center" prop="userInfo.nickName" label="单价" width="80" />
      <el-table-column align="center" prop="userInfo.nickName" label="已售" width="80" />
      <el-table-column align="center" prop="userInfo.nickName" label="库存" width="80" />
      <el-table-column align="center" prop="userInfo.nickName" label="上下架状态" width="80" />
      <el-table-column align="center" prop="userInfo.nickName" label="排序权重" width="80" />
      <el-table-column align="center" prop="userInfo.nickName" label="创建时间" width="180" />
      <el-table-column align="center" prop="userInfo.nickName" label="创建人" width="180" />
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)">
            下架/上架
          </el-button>
          <el-button type="text" size="small" @click.native.prevent="updateRow(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom-right">
      <el-pagination layout="total, prev, pager, next" :total="total" :page-size="pageSize" @current-change="changeCurrentPageEvent" />
    </div>

    <!-- 创建弹窗-->
    <el-dialog title="添加商品" :visible.sync="goodsDialog" width="40%" top="10vh" :close-on-click-modal="false" @before-close="closeGoodsDialogEvent">
      <CreateGoods v-if="goodsDialog" :goods="updateGoods" />
    </el-dialog>
  </div>
</template>

<script>
import CreateGoods from '@/components/CreateGoods'
import { manageUserList } from '../../api/user'
import { GoodsType } from '../../utils/goods-type'

export default {
  components: {
    CreateGoods
  },
  data() {
    return {
      updateGoods: {},
      GoodsType: GoodsType,
      goodsDialog: false,
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
    createGoods() {
      this.updateGoods = {}
      this.goodsDialog = true
    },
    updateRow(index, row) {
      this.updateGoods = { goodsName: '测试' }
      this.goodsDialog = true
    },
    closeGoodsDialogEvent() {
      this.goodsDialog = false
      this.updateGoods = {}
    },
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
  position: fixed;
  /* 使用固定定位，使其相对于浏览器窗口固定位置 */
  right: 0;
  /* 距离右侧的距离为0 */
  background-color: #ffffff;
  /* 背景颜色，可根据需要自行调整 */
  padding: 0px;
  /* 内边距，根据需要自行调整 */
  margin-right: 80px;
  margin-top: 20px;
}
</style>
