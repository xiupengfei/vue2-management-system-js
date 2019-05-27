import { asyncRoutes, constantRoutes } from '@/router'
import { SET_ROUTES } from '@/store/types/permission'
import { getRouterNames } from '@/resources/actionsMappingRouter'
import { superAdminRoleNames } from '@/settings'

/**
 * 使用meta.role确定当前用户是否具有权限
 * @param roles
 * @param routerNames
 */
const hasPermission = (routerNames, route) => {
  if (route.meta && route.meta.permission) {
    return routerNames.some(name => route.name === name)
  } else {
    return true
  }
}

/**
 * 按递归筛选异步路由表
 * @param routes asyncRoutes
 * @param routerNames
 */
const filterAsyncRoutes = (routes, routerNames) => {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }

    if (hasPermission(routerNames, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, routerNames)
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
  generateRoutes({ commit }, { roles, actions }) {
    return new Promise(resolve => {
      let accessedRoutes

      if (roles.some(role => superAdminRoleNames.includes(role))) {
        accessedRoutes = asyncRoutes || []
      } else {
        const routerNames = getRouterNames(actions)
        accessedRoutes = filterAsyncRoutes(asyncRoutes, routerNames)
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
