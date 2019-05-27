/** 运营管理页面 **/

import Layout from '@/layout'

const operatorRouter = {
  path: '/operator',
  component: Layout,
  redirect: '/operator/business',
  alwaysShow: false,
  name: 'operator',
  meta: {
    title: '运营管理',
    icon: 'operator',
    permission: true
  },
  children: [
    {
      path: 'group',
      component: () => import('@/views/operator/businesses/index'),
      name: 'businesses',
      meta: {
        title: '小组管理',
        icon: 'group',
        permission: true
      }
    },
    {
      path: 'index',
      component: () => import('@/views/operator/business/index'),
      name: 'business',
      meta: {
        title: '业务管理',
        icon: 'business',
        permission: true
      }
    },
    {
      path: 'job_number',
      component: () => import('@/views/operator/job_number/index'),
      name: 'job_number',
      meta: {
        title: '移动工号管理',
        icon: 'job_number',
        permission: true
      }
    }
  ]
}

export default operatorRouter
