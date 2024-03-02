<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="upload_qiniu_area"
      :auto-upload="true"
      :limit="1"
      accept="image/jpg,image/png,image/jpeg"
      :file-list="fileList"
      list-type="picture-card"
      :on-preview="picCardPreview"
      :before-upload="beforePicUpload"
      :on-remove="removePic"
      :http-request="uploadQiniu"
    >
      <i class="el-icon-plus avatar-uploader-icon" />
    </el-upload>

  </div>
</template>
<script>
import axios from 'axios'
import { getFileUploadToken, uploadResourceInfo } from '../../api/user'

export default {
  name: 'UploadFile',
  props: {
    dialogImageList: {
      type: Array,
      default: function() { return [] }
    }
  },
  data() {
    return {
      token: null,
      fileList: [],
      upload_qiniu_area: 'https://upload-z2.qiniup.com' // 七牛云上传储存区域的上传域名
    }
  },
  created() {
    this.fileList = this.dialogImageList
    getFileUploadToken().then(res => {
      this.token = res
    })
  },
  methods: {
    picCardPreview(file) { // 上传图预览
      console.log(123)
      this.dialogImageUrl = file.url
    },
    beforePicUpload(file) { // 图片校验
      const limitPic = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg'
      if (!limitPic) {
        this.$notify.warning({
          title: '警告',
          message: '请上传格式为image/png,image/jpg,image/jpeg的图片'
        })
      }
      const limitSize = file.size / 1024 / 1024 / 2 < 2
      if (!limitSize) {
        this.$notify.warning({
          title: '警告',
          message: '图片大小必须小于2M'
        })
      }
      return limitPic && limitSize
    },
    removePic(file, fileList) { // 移除图片
      this.fileList = fileList
    },
    uploadQiniu(request) { // 上传七牛
      const _this = this
      this.handleUpload(request).then((result) => {
        if (!result.data.url) {
          this.$message.error({ message: '图片上传失败,请重新上传', duration: 2000 })
        } else {
          uploadResourceInfo({ resourceLink: result.data.url, resourceType: 0 }).then(res => {
            this.fileList.push({ url: result.data.url, id: res })
            _this.$emit('uploadsuccess', this.fileList)
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error({ message: `图片上传失败${err}`, duration: 2000 })
      })
    },
    handleUpload(request) {
      const promise = new Promise((resolve, reject) => {
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        let fileType = ''
        if (request.file.type === 'image/jpg') {
          fileType = 'jpg'
        } else if (request.file.type === 'image/png') {
          fileType = 'png'
        } else if (request.file.type === 'image/jpeg') {
          fileType = 'jpeg'
        }
        const key = `image/manage_goods_${new Date().getTime()}${Math.floor(Math.random() * 100)}.${fileType}`// 自定义图片名
        const fd = new FormData()
        fd.append('file', request.file)
        fd.append('token', this.token)
        fd.append('key', key)
        axios.post(this.upload_qiniu_area, fd, config).then(res => {
          if (res.status === 200 && res.data) {
            resolve(res)
          } else {
            reject(res)
          }
        }).catch(err => {
          console.log(err)
          this.$message.error({ message: `上传失败[${err.status}]`, duration: 2000 })
        })
      })
      return promise
    }
  }
}
</script>
<style scoped>

</style>
