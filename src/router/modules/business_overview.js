/** 业务查看页面 **/

import Layout from '@/layout'

const businessOverview = {
  path: '/business/overview',
  component: Layout,
  redirect: '/business/overview/index',
  alwaysShow: false,
  name: 'business_overview',
  meta: {
    title: '业务查看',
    icon: 'documentation',
    permission: true
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/business_overview/index'),
      name: 'business_overview_index',
      meta: {
        title: '业务查看',
        icon: 'documentation',
        permission: true
      }
    }
  ]
}

export default businessOverview
