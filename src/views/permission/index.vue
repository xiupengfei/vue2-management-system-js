<template>
  <div id="Permission" class="page-container">
    <h1>{{ msg }}</h1>
    <el-button v-permission="['permission:create']" type="primary">
      添加操作
    </el-button>
    <el-button v-permission="['permission:update']" type="success">
      修改操作
    </el-button>
    <el-button v-permission="['permission:delete']" type="danger">
      删除操作
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'Permission',
  props: {},
  data() {
    return {
      msg: '权限配置页面: 能进入此页面即至少有查询权限'
    }
  },
  beforeMount() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
#Permission {
  h1 {
    color: gray;
  }
}
</style>
