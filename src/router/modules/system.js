/** 系统管理页面 **/

import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/index',
  alwaysShow: false,
  name: 'system',
  meta: {
    title: '系统管理',
    icon: 'system',
    roles: ['system']
  },
  children: [
    {
      path: 'index',
      component: () => import(/* webpackChunkName: "system_index" */ '@/views/system/index'),
      name: 'system_index',
      meta: {
        title: '系统管理',
        icon: 'system'
      }
    }
  ]
}

export default systemRouter
