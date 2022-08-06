import Layout from '@/layout'
export default {
    path: '/report',
    component: Layout,
    redirect: '/report/index',
    name: 'report',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/report/index'),
      }
    ]
  }