import { asyncRoutes, constantRoutes } from '@/router'
import { SET_ROUTES } from '@/store/types/permission'
import { superAdminRoleNames } from '@/settings'

/**
 * 使用meta.role确定当前用户是否具有权限
 * @param roles
 * @param route
 */
const hasPermission = (roles, route) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 按递归筛选异步路由表
 * @param routes asyncRoutes
 * @param routerNames
 */
const filterAsyncRoutes = (routes, roles) => {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [], // 所有路由
  addRoutes: [] // 动态路由
}

const mutations = {
  [SET_ROUTES]: (state, routes) => {
    state.addRoutes = routes
    state.routes = [...constantRoutes, ...routes]
  }
}

const actions = {
  generateRoutes({ commit }, { roles }) {
    return new Promise(resolve => {
      let accessedRoutes

      if (roles.some(role => superAdminRoleNames.includes(role))) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit(SET_ROUTES, accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
