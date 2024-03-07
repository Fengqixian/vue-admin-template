<template>
  <div class="dashboard-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="商品ID">
        <el-input v-model="formInline.id" placeholder="商品ID" />
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="formInline.goodsTitle" placeholder="商品名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="danger" @click="onClean">清空</el-button>
        <el-button type="success" @click="createGoods">创建</el-button>
      </el-form-item>
    </el-form>

    <el-table size="mini" :stripe="true" :data="userList" style="width: 100%">
      <el-table-column align="center" prop="id" label="商品ID" width="80" />
      <el-table-column label="商品类型" width="80">
        <template slot-scope="scope">
          {{ GoodsType[scope.row.goodsType]?GoodsType[scope.row.goodsType]:'未知' }}
        </template>
      </el-table-column>
      <el-table-column
        label="商品封面"
        width="80"
      >
        <template slot-scope="scope">
          <el-avatar shape="square" size="small" :src="scope.row.goodsCoverImage" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="goodsTitle" label="商品名称" />
      <el-table-column align="center" prop="goodsDescribe" label="商品描述" />
      <el-table-column align="center" prop="price" label="单价" width="80" />
      <el-table-column align="center" prop="nickName" label="已售" width="80" />
      <el-table-column align="center" prop="quantity" label="库存" width="80" />
      <el-table-column label="上下架状态" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.publishState == 1" type="success">{{ PublishState[scope.row.publishState] }}</el-tag>
          <el-tag v-else type="danger">{{ PublishState[scope.row.publishState] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="sort" label="排序权重" width="80" />
      <el-table-column align="center" prop="createTime" label="创建时间" width="180" />
      <el-table-column align="center" prop="createUser" label="创建人" width="180" />
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="publishStateUpdateEvent(scope.$index, scope.row)">
            {{ scope.row.publishState == 1 ? '下架' : '上架' }}
          </el-button>
          <el-button type="text" size="small" @click.native.prevent="updateRow(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, scope.row)">
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
import { manageGoodsList, updatePublishState } from '../../api/goods'
import { GoodsType } from '../../utils/goods-type'
import { PublishState } from '../../utils/publish-state'

export default {
  components: {
    CreateGoods
  },
  data() {
    return {
      updateGoods: {},
      GoodsType: GoodsType,
      PublishState: PublishState,
      goodsDialog: false,
      formInline: {
        id: null,
        goodsTitle: null
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
      this.updateGoods = row
      this.goodsDialog = true
    },
    closeGoodsDialogEvent() {
      this.goodsDialog = false
      this.updateGoods = {}
      this.getManageGoodsList(1)
    },
    onClean() {
      for (const key in this.formInline) {
        this.formInline[key] = null
      }
    },
    onSubmit() {
      this.getManageGoodsList(1)
    },
    changeCurrentPageEvent(page) {
      this.getManageGoodsList(page)
    },
    getManageGoodsList(page) {
      manageGoodsList({ condition: this.formInline, page: page, size: this.pageSize }).then(res => {
        this.userList = res.list
        this.total = res.total
      })
    },
    publishStateUpdateEvent(index, row) {
      updatePublishState(row.id, row.publishState === 1 ? 0 : 1).then(() => {
        this.getManageGoodsList(1)
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
