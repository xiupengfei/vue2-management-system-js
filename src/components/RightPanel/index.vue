<template>
  <el-drawer
    title="设置"
    :visible.sync="visible"
    direction="rtl"
    :before-close="handleClose"
  >
    <slot />
  </el-drawer>
</template>

<script>

export default {
  name: 'RightPanel',
  props: {
    clickNotClose: {
      default: false,
      type: Boolean
    },
    buttonTop: {
      default: 250,
      type: Number
    },
    icon: {
      type: String,
      default: 'el-icon-setting'
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    theme() {
      return this.$store.state.settings.theme
    }
  },
  methods: {
    handleClose(done) {
      done()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
