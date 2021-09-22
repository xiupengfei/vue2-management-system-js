import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

import getPageTitle from '@/utils/get-page-title' // 获取页面标题

NProgress.configure({ showSpinner: false }) // NProgress 配置

const whiteList = ['/login', '/auth-redirect'] // 没有重定向白名单

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  // 确定用户是否已登录
  const hasToken = getToken()
  // const Roles = getRoles()
  // 若无角色限制登录： && Roles && Roles.length
  if (hasToken) {
    if (to.path === '/login') {
      // 重定向到首页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 获取store中的角色信息
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 角色必须是数组, 例如: ['admin']
          const { roles } = await store.dispatch('user/getUserInfo')
          // 基于角色生成可访问的路由映射
          const accessRoutes = await store.dispatch('permission/generateRoutes', { roles })

          // 动态添加可访问的路由
          router.addRoutes(accessRoutes)

          // 针对无角色用户跳转
          if (roles.length === 0) {
            next()
            return
          }
          // 确保addRoutes有完整的hack方法
          // 设置replace:true, 这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 移除token, 重定向到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || '出错了！')
          // next(`/login?redirect=${to.path}`)
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有token*/

    if (whiteList.includes(to.path)) {
      // 在免费登录白名单中，直接进入
      next()
    } else {
      // 其他没有访问权限的页面将重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 进度条完成
  NProgress.done()
})
