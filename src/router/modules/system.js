/** 系统管理页面 **/

import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/group',
  alwaysShow: false,
  name: 'system',
  meta: {
    title: '系统管理',
    icon: 'system',
    permission: true
  },
  children: [
    {
      path: 'group',
      component: () => import('@/views/system/group/index'),
      name: 'system_group',
      meta: {
        title: '用户组管理',
        icon: 'group',
        permission: true
      }
    },
    {
      path: 'role',
      component: () => import('@/views/system/role/index'),
      name: 'role',
      meta: {
        title: '权限管理',
        icon: 'lock',
        permission: true
      }
    }
  ]
}

export default systemRouter
