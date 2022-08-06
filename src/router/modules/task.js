import Layout from '@/layout'
export default {
    path: '/task',
    component: Layout,
    redirect: '/task/business',
    name: 'task',
    children: [
      {
        path: 'business',
        name: 'business',
        component: () => import('@/views/task/business'),
      },
      {
        path: 'operation',
        name: 'operation',
        component: () => import('@/views/task/operation'),
      }
    ]
  }