<!--
 * @Descripttion:
 * @Version: v0.1
 * @Author: pengfei.xiu
 * @Date: 2021-09-22 09:53:20
 * @LastEditors: pengfei.xiu
 * @LastEditTime: 2021-10-08 15:45:47
-->
<template>
  <div :class="classObj" class="app-container">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <Sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <!-- <div class="fixed-header">
        <navbar @scp="showChangePassword" />
        <tags-view v-if="showTagsView" />
      </div> -->
      <Navbar @scp="showChangePassword" />
      <TagsView v-if="showTagsView" />
      <AppMain />
    </div>
    <ChangePassword ref="changePassword" />
  </div>
</template>

<script>
import ChangePassword from '@/components/ChangePassword'
import { AppMain, Navbar, Sidebar, TagsView } from './components'
import { ResizeHandler, Socket } from './mixin'

// import styles from '@/styles/variables.scss'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,

    Sidebar,
    TagsView,
    ChangePassword
  },
  mixins: [ResizeHandler, Socket],
  computed: {
    sidebar() {
      return this.$store.getters.sidebar
    },
    device() {
      return this.$store.getters.device
    },
    showSettings() {
      return this.$store.getters.showSettings
    },
    showTagsView() {
      return this.$store.getters.showTagsView
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    showChangePassword() {
      this.$refs.changePassword.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-container {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .main-container {
    height: 100%;
      min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: $sideBarWidth;
    position: relative;
  }
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.sidebar-container {
  transition: width 0.28s;
    width: $sideBarWidth !important;
    background-color: $menuBg;
    height: 100%;
    position: fixed;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
}

.drawer-bg {
  background: black;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
