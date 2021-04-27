<template>
  <div class="navbar boxshadow">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="fl" />
    <div class="right-menu fr">
      <div v-if="showSystemTime" class="right-menu-item">
        <system-time />
      </div>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper pointer">
          <!-- <img :src="avatar" class="user-avatar inline-block"> -->
          <span class="username inline-block">{{ userinfo.name }}</span>
          <i class="el-icon-caret-bottom inline-block" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item @click.native.prevent="$emit('scp')">修改密码</el-dropdown-item> -->
          <el-dropdown-item divided>
            <span style="display: block" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import SystemTime from '@/components/SystemTime'
import { showSystemTime } from '@/settings'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    SystemTime
  },
  data() {
    return {
      showSystemTime
    }
  },
  computed: {
    sidebar() {
      return this.$store.getters.sidebar
    },
    avatar() {
      return this.$store.getters.avatar
    },
    device() {
      return this.$store.getters.device
    },
    userinfo() {
      return this.$store.getters.userinfo
    }
  },
  beforeMount() {},
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.navbar {
  height: $navBarHeight;
  overflow: hidden;
  position: relative;
  background: #fff;
  &.boxshadow {
    box-shadow: 0 4px 3px 0 rgba(0, 0, 0, 0.2);
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .right-menu {
    height: 100%;
    line-height: $navBarHeight;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        height: 100%;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          vertical-align: middle;
        }
        .username {
          vertical-align: middle;
          height: 100%;
        }
        .el-icon-caret-bottom {
          vertical-align: middle;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
