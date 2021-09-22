<template>
  <div id="System" class="page-container">
    <h1>{{ msg }}</h1>
    <el-button v-permission="['system:create']" type="primary">
      添加操作
    </el-button>
    <el-button v-permission="['system:update']" type="success">
      修改操作
    </el-button>
    <el-button v-permission="['system:delete']" type="danger">
      删除操作
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'System',
  props: {},
  data() {
    return {
      msg: '系统设置页面: 能进入此页面即至少有查询权限'
    }
  },
  beforeMount() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
#System {
  h1 {
    color: gray;
  }
}
</style>
