import Layout from '@/layout'
export default {
    path: '/vm',
    component: Layout,
    redirect: '/vm/index',
    name: 'vm',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/vm/index'),
      },
      {
        path: 'status',
        name: 'status',
        component: () => import('@/views/vm/status'),
      },
      {
        path: 'type',
        name: 'type',
        component: () => import('@/views/vm/type'),
      }
    ]
  }