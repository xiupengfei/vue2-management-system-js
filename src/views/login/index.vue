<template>
  <div id="login">
    <el-form ref="loginForm" :model="loginForm" :rules="rules" label-position="left" label-width="0px" class="login-form">
      <div class="title-container">
        <img src="~@/assets/img/logo/logo.png">
        <h2 class="title">{{ title }}</h2>
      </div>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" auto-complete="off" placeholder="账号" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="mine" class="el-input__icon" style="height: 39px;width: 13px;margin-left: 2px;" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon" style="height: 39px;width: 13px;margin-left: 2px;" />
        </el-input>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item>
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
      <p class="version">Copyright © 2019 HongShen Software 版权所有</p>
      <p class="version">Version: {{ version }}</p>
    </el-form>
  </div>
</template>

<script>
import { title, version } from '@/settings'
import { ClearAllStorate } from '@/utils'

export default {
  name: 'Login',
  data() {
    return {
      title: title,
      version: version,
      loginForm: {
        username: 'admin',
        password: 'admin',
        rememberMe: false
      },
      rules: {
        username: [{ required: true, trigger: ['blur', 'change'], message: '用户名不能为空' }],
        password: [{ required: true, trigger: ['blur', 'change'], message: '密码不能为空' }]
      },
      loading: false,
      redirect: undefined
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
    ClearAllStorate()
  },
  mounted() {
    this.$store.dispatch('tagsView/delAllViews', [])
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$formWidth: 380px;

#login {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  height: 100%;
  background: #2d3a4b;
  overflow: hidden;

  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: $formWidth;
    padding: 25px 25px 5px 25px;
    margin: 0 auto;
    margin-top: 150px;
    .title-container {
      text-align: center;
      .title {
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        color: #707070;
      }
      img {
        display: inline-block;
        vertical-align: middle;
        width: 40px;
        height: 40px;
      }
    }
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
  }
  .version {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
}
</style>
