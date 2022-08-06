import Layout from '@/layout'
export default {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'user',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/user/index'),
      },
      {
        path: 'user-task-stats',
        name: 'user-task-stats',
        component: () => import('@/views/user/user-task-stats'),
      },
      {
        path: 'user-work',
        name: 'user-work',
        component: () => import('@/views/user/user-work'),
      }
    ]
  }