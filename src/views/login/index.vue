<template>
  <div class="login-container">
    <div>
      <div v-if="qrCodeExpire" class="qr-code-div custom-center expire-cover">
        <span class="expire-text">二维码已过期</span>
      </div>
      <el-image class="qr-code-div" :src="loginQrCode" :loading="loadingLoginCode">
        <div slot="error" class="image-slot">
          <div class="qr-code-div custom-center loading-cover">
            <i class="el-icon-loading" style="font-size: 24px;" />
          </div>
        </div>
      </el-image>
    </div>
  </div>
</template>
<script>
import { wechatLoginCode } from '../../api/user'

export default {
  name: 'Login',
  data() {
    return {
      loadingLoginCode: false,
      loginQrCode: '',
      loginCode: '',
      qrCodeExpire: false, // 请求次数
      intervalId: null // setInterval的ID
    }
  },
  created() {
    this.loadLoginQrCode()
  },
  methods: {
    loadLoginQrCode() {
      this.loadingLoginCode = true
      wechatLoginCode().then(data => {
        this.loginCode = data.code
        this.loginQrCode = 'data:image/png;base64,' + data.wechatCode
        this.loadingLoginCode = false
        this.intervalId = setInterval(this.handleLogin, 1000)
      }).catch(err => {
        console.log(err)
        this.loadingLoginCode = false
      })
    },
    handleLogin() {
      this.$store.dispatch('user/login', this.loginCode).then(res => {
        if (res) {
          clearInterval(this.intervalId)
          this.$router.push({ path: this.redirect || '/' })
        }
      }).catch(() => {
        clearInterval(this.intervalId)
        this.qrCodeExpire = true
      })
    }

  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.custom-center {
  display: flex;
  align-items: center; /* 在交叉轴上居中 */
  justify-content: center; /* 在主轴上居中 */
}

.loading-cover {
  background-color: white;
}

.expire-cover {
  z-index: 999;
  background-color: rgba(77, 73, 73, 0.5); /* 设置背景色为半透明的红色 */
}

.expire-text {
  font-size: 18px;
  font-weight: 700;
  color: white;
  opacity: 1;
}

.qr-code-div {
  text-align: center;
  border-radius: 5%;
  width: 300px;
  height: 300px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
