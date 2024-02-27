<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="upload_qiniu_area"
      :auto-upload="true"
      :limit="3"
      accept="image/jpg,image/png,image/jpeg"
      :file-list="fileList"
      list-type="picture-card"
      :on-preview="picCardPreview"
      :before-upload="beforePicUpload"
      :on-remove="removePic"
      :http-request="uploadQiniu"
    >
      <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>

  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'UploadFile',
  props: {
    dialogImageUrl: {
      type: String,
      default: function() { return '' }
    }
  },
  data() {
    return {
      fileList: [],
      upload_qiniu_area: 'https://upload-z2.qiniup.com', // 七牛云上传储存区域的上传域名
      token: '-rjpJvRjStoqz_RANz2Rh_Rh06ubc_3gB1DhSnvz:D6J-YbjYVVpzcD1JkZdTYtkZbiM=:eyJpbnNlcnRPbmx5IjoxLCJzY29wZSI6Imhvb2tmdW5jIiwicmV0dXJuQm9keSI6IntcbiAgICBcInVybFwiOiBcImh0dHBzOi8vb3NzLmhvb2tmdW5jLmNvbS8kKGtleSlcIixcbiAgICBcInNpemVcIjogJChmc2l6ZSksXG4gICAgXCJ0eXBlXCI6ICQobWltZVR5cGUpLFxuICAgIFwiaGFzaFwiOiAkKGV0YWcpLFxuICAgIFwid1wiOiAkKGltYWdlSW5mby53aWR0aCksXG4gICAgXCJoXCI6ICQoaW1hZ2VJbmZvLmhlaWdodClcbn0iLCJkZWFkbGluZSI6MTcwOTAyNjgxNiwiZmlsZVR5cGUiOjB9'
    }
  },
  methods: {
    picCardPreview(file) { // 上传图预览
      this.dialogImageUrl = file.url
      this.dialogVisible = true
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
      this.handleUpload(request).then((result) => {
        if (!result.data.url) {
          this.$message.error({ message: '图片上传失败,请重新上传', duration: 2000 })
        } else {
          this.fileList.push({ url: result.data.url })
          this.$emit('uploadSuccess', this.fileList)
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
          console.log(res)
          if (res.status === 200 && res.data) {
            console.log('success')
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
