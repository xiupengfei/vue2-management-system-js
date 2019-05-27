import { login, logout } from '@/api'
import { getToken, setToken, setUserInfo, getUserInfo, setRoles, getRoles } from '@/utils/auth'
import { ClearAllStorate } from '@/utils'
// import router, { resetRouter } from '@/router'
import { resetRouter } from '@/router'
import { SET_TOKEN, SET_AVATAR, SET_ROLES, SET_USERINFO, SET_ACTIONS } from '@/store/types/user'

const state = {
  token: getToken(),
  avatar: '',
  userinfo: {}, // 用户信息
  roles: [], // 角色列表
  actions: [] // 操作权限
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
  [SET_USERINFO]: (state, userinfo) => {
    state.userinfo = userinfo
  },
  [SET_ACTIONS]: (state, actions) => {
    state.actions = actions
  }
}

const getActionsFromRoles = roles => {
  const res = []
  roles.map(role => {
    res.push(...role.actions)
  })
  return [...new Set(res)]
}

const actions = {
  // 登录
  login({ commit, dispatch }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: window.btoa(password) }).then(response => {
        const roles = response.roles.map(role => role.name)
        commit(SET_TOKEN, response.token)
        // commit('SET_USERINFO', response)
        // commit('SET_ROLES', roles)
        // dispatch('permission/generateRoutes', roles)
        setToken(response.token)
        setUserInfo(response)
        setRoles(roles)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取并初始化信息
  getInitData({ commit, state }) {
    const roles = getRoles()
    const userinfo = getUserInfo()
    const token = getToken()
    const actions = getActionsFromRoles(userinfo.roles)
    return new Promise((resolve, reject) => {
      commit(SET_TOKEN, token)
      commit(SET_ROLES, roles)
      commit(SET_USERINFO, userinfo)
      commit(SET_AVATAR, (userinfo.avatar))
      commit(SET_ACTIONS, actions)
      resolve({
        roles,
        userinfo,
        token,
        actions
      })
    })
  },

  // 登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit(SET_TOKEN, '')
        commit(SET_ROLES, [])
        commit(SET_USERINFO, {})
        ClearAllStorate()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 移除 token
  resetToken({ commit }) {
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
