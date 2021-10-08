<!--
 * @Descripttion: 
 * @Version: v0.1
 * @Author: pengfei.xiu
 * @Date: 2021-10-08 14:59:47
 * @LastEditors: pengfei.xiu
 * @LastEditTime: 2021-10-08 18:49:33
-->
<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :background-color="variables['custom-menu-bg']"
        :text-color="variables['custom-menu-text-color']"
        :unique-opened="false"
        :active-text-color="variables['custom-menu-text-color']"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in permissionRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    permissionRoutes() {
      return this.$store.getters.permission_routes
    },
    showLogo() {
      return this.$store.getters.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.$store.getters.sidebar.opened
    },
  },
}
</script>
