import Layout from '@/layout'
export default {
    path: '/policy',
    component: Layout,
    redirect: '/policy/index',
    name: 'policy',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/policy/index'),
      }
    ]
  }