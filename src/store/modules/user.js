// import { login, logout } from '@/api'
import { login, getUserInfo } from '@/api'
import { getToken, setToken } from '@/utils/auth'
import { ClearAllStorate } from '@/utils'
// import router, { resetRouter } from '@/router'
import { resetRouter } from '@/router'
import { SET_TOKEN, SET_AVATAR, SET_ROLES, SET_PERMISSION, SET_USERINFO } from '@/store/types/user'

const state = {
  token: getToken(),
  avatar: '', // 头像
  userinfo: {}, // 用户信息
  roles: [], // 角色列表
  permissions: [] // 权限列表
}

const mutations = {
  [SET_TOKEN]: (state, token) => {
    state.token = token
  },
  [SET_AVATAR]: (state, avatar) => {
    state.avatar = avatar
  },
  [SET_ROLES]: (state, roles) => {
    state.roles = roles
  },
  [SET_PERMISSION]: (state, permissions) => {
    state.permissions = permissions
  },
  [SET_USERINFO]: (state, userinfo) => {
    state.userinfo = userinfo
  }
}

const actions = {
  // 登录
  login ({ commit, dispatch }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(res => {
        commit(SET_TOKEN, res.token)
        // dispatch('permission/generateRoutes', roles)
        setToken(res.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取并初始化信息
  getUserInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo(getToken()).then(res => {
        let permissions = []
        if (Array.isArray(res.permissions)) {
          permissions = res.permissions
        }

        const _roles = []
        permissions.forEach(permission => {
          _roles.push(permission.split(':')[0])
        })
        res.roles = [...new Set(_roles)]
        commit(SET_PERMISSION, permissions)
        commit(SET_ROLES, res.roles)

        commit(SET_AVATAR, res.avatar)
        commit(SET_USERINFO, res)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 登出
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      // ***********测试使用****************
      commit(SET_TOKEN, '')
      commit(SET_ROLES, [])
      commit(SET_USERINFO, {})
      ClearAllStorate()
      resetRouter()
      resolve()
      // ***************************
      /* logout(state.token).then(() => {
        commit(SET_TOKEN, '')
        commit(SET_ROLES, [])
        commit(SET_USERINFO, {})
        ClearAllStorate()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      }) */
    })
  },

  // 移除 token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit(SET_TOKEN, '')
      commit(SET_ROLES, [])
      commit(SET_USERINFO, {})
      ClearAllStorate()
      resolve()
    })
  }

  // 动态修改权限
  // changeRoles({ commit, dispatch }, role) {
  //   return new Promise(async resolve => {
  //     const token = role + '-token'

  //     commit(SET_TOKEN, token)
  //     setToken(token)

  //     const { roles } = await dispatch('user/getInitData')

  //     resetRouter()

  //     // 基于角色生成可访问的路由映射
  //     const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

  //     // 动态添加可访问的路由
  //     router.addRoutes(accessRoutes)

  //     resolve()
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
