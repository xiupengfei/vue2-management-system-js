/** 权限管理页面 **/

import Layout from '@/layout'

const systemRouter = {
  path: '/permission',
  component: Layout,
  redirect: '/permission/index',
  alwaysShow: false,
  name: 'permission',
  meta: {
    title: '权限管理',
    icon: 'system',
    roles: ['permission']
  },
  children: [
    {
      path: 'index',
      component: () => import(/* webpackChunkName: "permission_index" */ '@/views/permission/index'),
      name: 'permission_index',
      meta: {
        title: '权限管理',
        icon: 'system'
      }
    }
  ]
}

export default systemRouter
