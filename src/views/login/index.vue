<template>
  <div :style="{backgroundImage:'url('+require('@/assets/images/bg_login.png')+')', backgroundSize:'100% 100%'}" class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item prop="userName">
        <span class="svg-container svg-container_login">
          <img :src="require('@/assets/images/icon_username.png')">
        </span>
        <el-input v-model="loginForm.userName" name="userName" type="text" placeholder="用户名" style="border:none;" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <img :src="require('@/assets/images/icon_password.png')">
        </span>
        <el-input :type="passwordType" v-model="loginForm.password" name="password" placeholder="密码" @keyup.enter.native="handleLogin" />
        <!-- <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span> -->
      </el-form-item>

      <el-button :loading="loading" type="primary" class="btn-login" @click.native.prevent="handleLogin">登 录</el-button>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (validateUsername == null) {
        callback(new Error('请输入正确的管理员用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('管理员密码长度应大于6'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userName: 'admin-lqx',
        password: '111111',
        validateCodeKey: '700233df-30c6-4412-92cd-6eebd24af07a',
        validateCode: 'K5UW',
        platform: '133EFB922DF3'
      },
      loginRules: {
        userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword },
        { min: 1, max: 8, message: '密码不能超过8位', trigger: 'blur' }]
      },
      passwordType: 'password',
      loading: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }

  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
    this.autoLogin()
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid && !this.loading) {
          this.loading = true
          this.$store.dispatch('login', this.loginForm).then(() => {
            this.loading = false
            const userName = this.loginForm.userName
            this.$router.push({ path: '/shop/decoration' })
            // if (userName === 'admin') {
            //   this.$router.push({ path: '/platform/admin' })
            // } else {
            //   this.$router.push({ path: '/shop/decoration' })
            // }
          }).catch(error => {
            this.$notify.error({
              title: '失败',
              message: error
            })
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    login(userName, password) {
      this.loading = true
      this.loginForm = Object.assign({}, this.loginForm, {userName, password})
      this.$store.dispatch('login', this.loginForm).then(() => {
        this.loading = false
        this.$router.push({ path: '/shop/decoration' })
      }).catch(error => {
        this.$notify.error({
          title: '失败',
          message: error
        })
        this.loading = false
      })
    },
    autoLogin() {
      let userName = this.$route.query.name
      let password = this.$route.query.password
      if(userName!=undefined && password!=undefined) {
        this.login('admin-lqx', '111111')
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;
$light_block:#000;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: calc(100% - 30px);
    input {
      background: transparent;
      border: 0px;
      border-bottom:1px solid #EEEEEE;
      border-color:#eee;
      -webkit-appearance: none;
      border-radius: 0px;
      margin:0px 5px;
      padding:12px 5px 12px 35px;
      color: $light_block;
      height: 47px;
      font-size: 16px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    // border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
$light_blue:#3b89fe;
$bg_white:#fff;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 60px 40px;
    margin: 120px auto;
    border-radius:10px;
    background-color:$bg_white;
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
    // padding: 6px 5px 6px 15px;
    // color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    position:absolute;
    left:10px;
    top:10px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 30px;
      font-weight: 400;
      color: $light_blue;
      margin: 0px auto 40px auto;
      // text-align: center;
      // font-weight: bold;
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
.btn-login{
  width:100%;
  height: 50px;
  border-radius:25px;
  font-size:20px;
  color:$bg-white;
  margin-top:30px;
}
</style>
