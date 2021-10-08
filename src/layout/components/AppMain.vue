<!--
 * @Descripttion:
 * @Version: v0.1
 * @Author: pengfei.xiu
 * @Date: 2021-09-22 09:53:20
 * @LastEditors: pengfei.xiu
 * @LastEditTime: 2021-09-22 11:34:54
-->
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
@import '~@/styles/variables.scss';

.app-main {
  min-height: calc(100% - #{$navBarHeight});
  height: calc(100% - #{$navBarHeight});
  width: 100%;
  position: relative;
  overflow-x: hidden;
  padding: 10px 10px 0;
  & > div {
    height: 100%;
  }
}

.hasTagsView {
  .app-main {
    /* app-main = navbar + tags-view = 50 + 34 */
    min-height: calc(100% - #{$navBarHeight} - 34px);
    height: calc(100% - #{$navBarHeight} - 34px);
  }
}
</style>
