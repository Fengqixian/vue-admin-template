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
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="coverImageUrl" :src="coverImageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
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
import { GoodsType } from '../../utils/goods-type'
export default {
  name: 'CreateGoods',
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
    },
    handleAvatarSuccess(res, file) {
      this.coverImageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
