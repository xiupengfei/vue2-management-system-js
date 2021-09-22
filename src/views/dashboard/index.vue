<template>
  <div id="Dashboard" class="page-container">
    <h1>{{ msg }}</h1>
    <!-- <div>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div> -->
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  props: {},
  data() {
    return {
      msg: 'Dashboard'
    }
  },
  mounted() {},
  created() {},
  beforeMount() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
#Dashboard {
  height: 1000px;
  color: rgb(133, 131, 131);
}
</style>
