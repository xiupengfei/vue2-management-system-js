<template>
  <section class="app-main">
    <!-- <el-scrollbar wrap-class="scroll-wrapper" view-class="view-box" :native="false"> -->
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
    <!-- </el-scrollbar> -->
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  &>.el-scrollbar{
      height: calc(100vh - 50px);
  }
}

.fixed-header+.app-main {
  padding-top: 50px;
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
    &>.el-scrollbar{
      height: calc(100vh - 84px);
    }
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

