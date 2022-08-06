import Layout from '@/layout'
export default {
    path: '/order',
    component: Layout,
    redirect: '/order/index',
    name: 'order',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/order/index'),
      }
    ]
  }