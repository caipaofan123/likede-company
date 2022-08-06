import Layout from '@/layout'
export default {
    path: '/node',
    component: Layout,
    redirect: '/node/region',
    name: 'node',
    children: [
      {
        path: 'region',
        name: 'region',
        component: () => import('@/views/node/region'),
      },
      {
        path: 'node',
        name: 'node',
        component: () => import('@/views/node/node'),
      },
      {
        path: 'partner',
        name: 'partner',
        component: () => import('@/views/node/partner'),
      }
    ]
  }