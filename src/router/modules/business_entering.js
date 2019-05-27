/** 业务录入页面 **/

import Layout from '@/layout'

const businessEnteringRouter = {
  path: '/business/entering',
  component: Layout,
  redirect: '/business/entering/index',
  alwaysShow: false,
  name: 'business_entering',
  meta: {
    title: '业务录入',
    icon: 'entering',
    permission: true
  },
  children: [
    {
      path: 'entering',
      component: () => import('@/views/business_entering/index'),
      name: 'business_entering_index',
      meta: {
        title: '业务录入',
        icon: 'entering',
        permission: true
      }
    }
  ]
}

export default businessEnteringRouter
