<template>
  <div class="errPage-container">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>

export default {
  name: 'Page401',
  data() {
    return {
      msg: '401'
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 100px auto;
  }
</style>
