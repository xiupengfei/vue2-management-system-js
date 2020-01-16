<template>
  <div :class="classObj" class="app-container">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView: showTagsView}" class="main-container">
      <!-- <div class="fixed-header">
        <navbar @scp="showChangePassword" />
        <tags-view v-if="showTagsView" />
      </div> -->
      <navbar @scp="showChangePassword" />
      <tags-view v-if="showTagsView" />
      <app-main />
      <right-panel v-if="showSettings" />
    </div>
    <change-password ref="changePassword" />
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import ChangePassword from '@/components/ChangePassword'
import { AppMain, Navbar, Sidebar, TagsView } from './components'
import { ResizeHandler, Socket } from './mixin'

// import styles from '@/styles/variables.scss'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
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
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-container {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    .main-container {
      height: 100%;
    }
    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
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
