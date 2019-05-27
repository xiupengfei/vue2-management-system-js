/** 业务排名页面 **/

import Layout from '@/layout'

const businessRankingRouter = {
  path: '/business/ranking',
  component: Layout,
  redirect: '/business/ranking/index',
  alwaysShow: false,
  name: 'business_ranking',
  hidden: true,
  meta: {
    title: '业务排名',
    icon: 'ranking',
    permission: true
  },
  children: [
    {
      path: 'ranking',
      component: () => import('@/views/business_ranking/index'),
      name: 'business_ranking_index',
      meta: {
        title: '业务排名',
        icon: 'ranking',
        permission: true
      }
    }
  ]
}

export default businessRankingRouter
