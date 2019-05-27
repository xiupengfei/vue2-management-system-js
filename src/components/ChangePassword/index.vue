<template>
  <div id="ChangePassword">
    <el-dialog title="密码修改" :visible.sync="dialogVisible">
      <el-form ref="ruleForm" label-position="right" :model="form" :rules="rules">
        <el-form-item label="原密码" prop="checkOldPass" :label-width="formLabelWidth">
          <el-input v-model="form.oldPassword" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" prop="checkNewPass" :label-width="formLabelWidth">
          <el-input v-model="form.newPassword" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" :label-width="formLabelWidth">
          <el-input v-model="form.newPassword2" type="password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="!loading" type="primary" @click="submit">提交</el-button>
        <el-button v-if="loading" type="primary" :loading="loading" @click="submit">加载中...</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'ChangePassword',
  components: {},
  data() {
    return {
      dialogVisible: false,
      formLabelWidth: '120px',
      form: {
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      },
      rules: {
        checkOldPass: [{ validator: this.checkOldPass, trigger: ['blur', 'change'] }],
        checkNewPass: [{ validator: this.checkNewPass, trigger: ['blur', 'change'] }],
        checkPass: [{ validator: this.checkPass, trigger: ['blur', 'change'] }]
      },
      loading: false
    }
  },
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    checkOldPass(rule, value, callback) {
      if (this.form.oldPassword.length < 6) {
        callback(new Error('密码长度要大于6位'))
      } else {
        callback()
      }
    },
    checkNewPass(rule, value, callback) {
      if (this.form.newPassword.length < 6) {
        callback(new Error('密码长度要大于6位'))
      } else {
        if (this.form.newPassword2 !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    },
    checkPass(rule, value, callback) {
      if (this.form.newPassword !== this.form.newPassword2) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    submit() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.dialogVisible = false
        this.$message.success('密码修改成功')
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
