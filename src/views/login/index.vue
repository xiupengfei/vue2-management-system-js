<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="login-form"
    >
      <h2 class="title">{{ title }}</h2>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon"
            style="height: 39px;width: 13px;margin-left: 2px;"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon
            slot="prefix"
            icon-class="password"
            class="el-input__icon"
            style="height: 39px;width: 13px;margin-left: 2px;"
          />
        </el-input>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
      <p class="version">Version: {{ version }}</p>
    </el-form>
    <div
      style="position:absolute; left: 0px; top:0px; text-align:left; padding: 40px;"
      class="login-tip"
    >
      <div v-for="i in tipData" :key="i.username">
        <span style="width: 160px;display: inline-block;">用户名：{{ i.username }}</span>
        <span style="width: 100px;display: inline-block;">密码： {{ i.password }}</span>
        <span>权限：{{ i.role }}</span>
      </div>
    </div>
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
      tipData: [
        {
          username: 'admin',
          password: '123456',
          role: '超级管理员'
        },
        {
          username: 'system',
          password: '123456',
          role: '系统管理员'
        },
        {
          username: 'hr',
          password: '123456',
          role: '人事权限'
        },
        {
          username: 'manager',
          password: '123456',
          role: '运营管理权限'
        },
        {
          username: 'leader',
          password: '123456',
          role: '业务组长权限'
        },
        {
          username: 'default',
          password: '123456',
          role: '普通用户'
        }
      ],
      loginForm: {
        username: 'admin',
        password: '123456',
        rememberMe: false
      },
      loginRules: {
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
            })
            .catch(() => {
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
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #2d3a4b;
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
  }

  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 365px;
    padding: 25px 25px 5px 25px;
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

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
</style>
