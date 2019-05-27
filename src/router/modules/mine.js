/** 个人信息管理页面 **/

import Layout from '@/layout'

const mineRouter = {
  path: '/mine',
  component: Layout,
  redirect: '/mine/index',
  alwaysShow: false,
  // hidden: true,
  name: 'mine',
  meta: {
    title: '个人信息',
    icon: 'mine',
    permission: false
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/mine/index'),
      name: 'mine_index',
      meta: {
        title: '个人信息',
        affix: true,
        permission: false
      }
    }
  ]
}

export default mineRouter
