/** 个人信息管理页面 **/

import Layout from '@/layout'

const dashboardRouter = {
  path: '/dashboard',
  component: Layout,
  redirect: '/dashboard/index',
  alwaysShow: false,
  // hidden: true,
  name: 'dashboard',
  meta: {
    title: '首页',
    icon: 'dashboard'
  },
  children: [
    {
      path: 'index',
      component: () => import(/* webpackChunkName: "dashboard_index" */ '@/views/dashboard/index'),
      name: 'dashboard_index',
      meta: {
        title: '首页',
        affix: true
      }
    }
  ]
}

export default dashboardRouter
