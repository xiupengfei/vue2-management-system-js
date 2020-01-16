<template>
  <div id="System" class="page-container">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>

export default {
  name: 'System',
  props: {},
  data() {
    return {
      msg: '系统设置: 仅[admin]能看见'
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
