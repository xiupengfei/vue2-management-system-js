<template>
  <div id="Mine" class="app-container">
    <div>
      <img :src="form.avatar" alt="" width="100px" height="100px">
    </div>
    <el-form ref="form" :model="form" :inline="true" :rules="rules" label-width="80px">
      <el-form-item label="姓名" :style="{width: formWidth}">
        <!-- <el-input v-model="form.username" :style="{width: inputWidth}" /> -->
        <span>{{ form.username }}</span>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.gender" :style="{width: inputWidth}">
          <el-option label="男" value="man" />
          <el-option label="女" value="wom" />
        </el-select>
      </el-form-item>
      <el-form-item label="级别" :style="{width: formWidth}">
        <span>{{ form.level }}</span>
      </el-form-item>
      <el-form-item label="生日" :style="{width: formWidth}">
        <span>{{ form.birth }}</span>
      </el-form-item>
      <el-form-item label="工资" :style="{width: formWidth}">
        <span>{{ form.salary }}</span>
      </el-form-item>
      <el-form-item
        prop="mobile_phone"
        label="电话"
      >
        <el-input v-model.number="form.mobile_phone" :style="{width: inputWidth}" />
      </el-form-item>
      <el-form-item label="入职时间" :style="{width: formWidth}">
        <span>{{ form.entry_time }}</span>
      </el-form-item>
      <el-form-item label="所属部门" :style="{width: formWidth}">
        <span>{{ form.department }}</span>
      </el-form-item>
      <el-form-item label="所属组" :style="{width: formWidth}">
        <span>{{ form.group }}</span>
      </el-form-item>
      <el-form-item
        prop="mail"
        label="邮箱"
      >
        <el-input v-model="form.mail" :style="{width: inputWidth}" />
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-button type="primary" @click.native="onSubmit">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isPhoneNumber } from '@/utils/validate'
import { deepClone } from '@/utils'

export default {
  name: 'Mine',
  props: {},
  data() {
    return {
      inputWidth: '400px',
      formWidth: '480px',
      form: {
        username: '',
        gender: '',
        group: '',
        mobile_phone: '',
        entry_time: '',
        mail: '',
        salary: '',
        level: ''
      },
      rules: {
        mail: [
          { required: true, message: '请输入正确邮箱地址', trigger: ['blur', 'change'] },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile_phone: [{ validator: this.validatorPhone }]
      }
    }
  },
  mounted() {},
  created() {},
  beforeMount() {
    const userinfo = this.$store.getters.userinfo
    this.form = deepClone(userinfo)
    console.log(userinfo)
  },
  methods: {
    openFullScreen() {
      this.fullscreenLoading = true
      setTimeout(() => {
        this.fullscreenLoading = false
      }, 2000)
    },
    onSubmit() {
      console.log('submit!')
    },
    validatorPhone(rule, value, callback) {
      if (isPhoneNumber(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号'))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
