/*
 * @Descripttion: 首页
 * @Version: v0.1
 * @Author: pengfei.xiu
 * @Date: 2021-09-22 09:53:20
 * @LastEditors: pengfei.xiu
 * @LastEditTime: 2021-09-22 10:53:53
 */
/** 个人信息管理页面 **/

import Layout from '@/layout'

export default {
  path: '/dashboard',
  component: Layout,
  redirect: '/dashboard/index',
  alwaysShow: false,
  // hidden: true,
  name: 'dashboard',
  meta: {
    title: 'Dashboard',
    icon: 'dashboard'
  },
  children: [
    {
      path: 'index',
      component: () =>
        import(/* webpackChunkName: "dashboard_index" */ '@/views/dashboard/index'),
      name: 'dashboard_index',
      meta: {
        title: 'Dashboard',
        affix: true
      }
    }
  ]
}
