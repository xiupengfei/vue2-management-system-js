/** 用户管理页面 **/

import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/index',
  alwaysShow: false,
  name: 'user',
  meta: {
    title: '用户管理',
    icon: 'user',
    permission: true
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/user/index'),
      name: 'user_index',
      meta: {
        title: '用户管理',
        icon: 'user',
        permission: true
      }
    }
  ]
}

export default userRouter
