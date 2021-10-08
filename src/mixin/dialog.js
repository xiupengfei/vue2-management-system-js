/*
 * @Descripttion:
 * @Version: v0.1
 * @Author: pengfei.xiu
 * @Date: 2021-10-08 14:59:47
 * @LastEditors: pengfei.xiu
 * @LastEditTime: 2021-10-08 18:56:05
 */
import { deepClone } from '@/utils'

export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      form: {},
    }
  },
  methods: {
    show(data) {
      if (data !== undefined) {
        this.form = deepClone(data)
      }

      this.dialogVisible = true
      this.loading = false
    },
    hide() {
      Object.entries(this.form).map(([_, v]) => {
        if (Array.isArray(v)) {
          v.splice(0)
        }
      })
      if (this.$refs.ruleForm) {
        this.$refs.ruleForm.resetFields()
      }
      this.dialogVisible = false
    },
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$emit('cb', deepClone(this.form))
        } else {
          return false
        }
      })
    },
  },
}
