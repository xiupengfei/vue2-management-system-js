import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import mineRouter from './modules/mine'
import userRouter from './modules/user'
import systemRouter from './modules/system'
import operatorRouter from './modules/operator'
import businessGroupRouter from './modules/business_group'
import businessOverviewRouter from './modules/business_overview'
import businessRankingRouter from './modules/business_ranking'
import businessEnteringRouter from './modules/business_entering'

/**
 * 说明: 只有当路由子菜单长度大于等于1时才会出现 children.length >= 1
 *
 * # 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1 ()
 * hidden: true                   默认： false
 *
 * # 当一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 * # 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 * # 若不管路由下面的 children 声明的个数都显示根路由
 * # 可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * alwaysShow: true
 *
 * # 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
 * redirect: noRedirect
 *
 * # 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题(很重要 !!!)
 * name:'router-name'
 *
 * # metadata
 * meta : {
    permission: false            // 设置该路由进入是否鉴权
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标
    noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    affix: true                  // 如果为true标签将固定在 tags-view
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/example/list'  // 如果设置路径，侧边栏将突出显示设置的路径
  }
 */

/**
 * 静态路由
 * @description 这些页面将被所有用户看见
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/mine'
  },
  mineRouter
]

/**
 * 动态路由
 * @description 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  userRouter,
  systemRouter,
  operatorRouter,
  businessGroupRouter,
  businessOverviewRouter,
  businessRankingRouter,
  businessEnteringRouter,
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   meta: { permission: false },
  //   children: [
  //     {
  //       path: 'https://www.baidu.com/',
  //       meta: { title: '百度', icon: 'link', permission: false }
  //     }
  //   ]
  // },

  // 404 必须在最后!!!
  { path: '*', redirect: '/404', hidden: true, meta: { permission: false }}
]

const createRouter = () => new Router({
  // mode: 'history', // 需要服务端支持
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
