/** 业务组管理页面 **/

import Layout from '@/layout'

const businessGroupRouter = {
  path: '/business/group',
  component: Layout,
  redirect: '/business/group/index',
  alwaysShow: false,
  name: 'business_group',
  meta: {
    title: '业务组管理',
    icon: 'group',
    permission: true
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/business_group/index'),
      name: 'business_group_index',
      meta: {
        title: '业务组管理',
        icon: 'group',
        permission: true
      }
    }
  ]
}

export default businessGroupRouter
