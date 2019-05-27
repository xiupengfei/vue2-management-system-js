import { deepClone } from '@/utils'

export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      form: {}
    }
  },
  methods: {
    show(data = {}) {
      this.form = deepClone(data)
      this.dialogVisible = true
      this.loading = false
    },
    hide() {
      this.dialogVisible = false
    },
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$emit('cb', this.form)
        } else {
          return false
        }
      })
    }
  }
}
