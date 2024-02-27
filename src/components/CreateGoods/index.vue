<template>
  <div>
    <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="100px" class="demo-dynamic">
      <el-form-item
        prop="goodsType"
        label="商品类型"
        :rules="[
          { required: true, message: '请选择商品类型', trigger: 'blur' }
        ]"
      >
        <el-select v-model="dynamicValidateForm.goodsType" placeholder="请选择商品类型">
          <el-option v-for="(value,key) in GoodsTypeList" :key="'item' + key" :label="value" :value="key" />
        </el-select>
      </el-form-item>
      <el-form-item
        prop="goodsName"
        label="商品名称"
        :rules="[
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ]"
      >
        <el-input v-model="dynamicValidateForm.goodsName" />
      </el-form-item>
      <el-form-item
        prop="goodsDescribe"
        label="商品描述"
        :rules="[
          { required: true, message: '请输入商品商品描述', trigger: 'blur' }
        ]"
      >
        <el-input
          v-model="dynamicValidateForm.goodsDescribe"
          type="textarea"
          :rows="2"
        />
      </el-form-item>
      <el-form-item
        prop="price"
        label="单价"
        :rules="[
          { required: true, message: '单价不能为空'},
          { type: 'number', message: '单价必须为数字值'}
        ]"
      >
        <el-input v-model.number="dynamicValidateForm.price" autocomplete="off" />
      </el-form-item>
      <el-form-item
        prop="quantity"
        label="库存"
        :rules="[
          { required: true, message: '库存不能为空'},
          { type: 'number', message: '库存必须为数字值'}
        ]"
      >
        <el-input v-model.number="dynamicValidateForm.quantity" placeholder="输入-1则为无限库存数量" autocomplete="off" />
      </el-form-item>
      <el-form-item
        prop="goodsCoverId"
        label="封面图片"
        :rules="[
          { required: true, message: '请上传商品展示封面图片'},
        ]"
      >
        <UploadFile />
      </el-form-item>
      <el-form-item
        prop="sort"
        label="排序权重"
        :rules="[
          { type: 'number', message: '排序权重必须为数字值'}
        ]"
      >
        <el-input v-model.number="dynamicValidateForm.sort" placeholder="数值越大排序越靠前" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">添加</el-button>
        <el-button @click="cancelEvent">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UploadFile from '../UploadFile'
import { GoodsType } from '../../utils/goods-type'
export default {
  name: 'CreateGoods',
  components: { UploadFile },
  props: {
    goods: {
      type: Object,
      default: function() { return {} }
    }
  },
  data() {
    return {
      GoodsTypeList: GoodsType,
      coverImageUrl: this.goods?.coverImageUrl,
      dynamicValidateForm: {
        id: this.goods?.id,
        goodsType: this.goods?.goodsType,
        goodsName: this.goods?.goodsName,
        goodsDescribe: this.goods?.goodsDescribe,
        price: this.goods?.price,
        quantity: this.goods?.quantity,
        sort: this.goods?.sort,
        goodsCoverId: this.goods?.goodsCoverId
      }
    }
  },
  methods: {
    submitForm(formName) {
      console.log(this.dynamicValidateForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancelEvent() {
      this.$parent.$parent.closeGoodsDialogEvent()
    }
  }
}
</script>

